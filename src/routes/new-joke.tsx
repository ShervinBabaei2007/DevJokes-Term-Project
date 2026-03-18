import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import {
  createJokeMutation,
  type CreateJokeMutationVariables,
} from "#/queries";
import { createJoke } from "#/serverFunctions/jokeFns";
import { useServerFn } from "@tanstack/react-start";
import type { Joke } from "#/types";

export const Route = createFileRoute("/new-joke")({
  component: NewJokePage,
});

function NewJokePage() {
  const navigate = useNavigate();
  const createJokeServerFn = useServerFn(createJoke);
  const { mutateAsync, isPending, error, reset } = useMutation<
    Joke,
    Error,
    CreateJokeMutationVariables
  >({
    ...createJokeMutation,
    mutationFn: createJokeServerFn,
  });

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const question = String(formData.get("question") ?? "").trim();
    const answer = String(formData.get("answer") ?? "").trim();

    if (!question || !answer) return;

    reset();

    try {
      await mutateAsync({
        data: { question, answer },
      });

      await navigate({ to: "/" });
    } catch {
      // Error is surfaced via mutation state and rendered below the form.
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:pt-14">
      <section className="rounded-[1.45rem] border border-(--line) bg-[radial-gradient(circle_at_92%_15%,rgba(47,143,127,0.16)_0,transparent_34%),linear-gradient(180deg,var(--surface-strong)_0%,#fff8ed_100%)] p-[clamp(1.1rem,3.1vw,1.9rem)] shadow-[0_18px_40px_rgba(137,91,33,0.1)] max-sm:rounded-[1.05rem]">
        <p className="mb-2 mt-0 text-[0.78rem] font-black uppercase tracking-[0.09em] text-(--accent-strong)">
          Ship A Punchline
        </p>
        <h1 className="m-0 font-(--font-display) text-[clamp(1.9rem,5vw,2.6rem)] leading-[1.1]">
          Add a New Joke
        </h1>
        <p className="mt-[0.65rem] max-w-[54ch] text-(--ink-soft)">
          Drop in a setup and punchline. Once it saves, you will be redirected
          back to the collection.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-[1.2rem] grid max-w-2xl gap-[0.95rem]"
        >
          <div>
            <label
              htmlFor="question"
              className="mb-[0.35rem] block font-[640] text-[#4f3f2e]"
            >
              Setup
            </label>
            <input
              id="question"
              name="question"
              required
              className="w-full rounded-[0.72rem] border border-[#e2d7c4] bg-[#fffdfa] px-[0.85rem] py-[0.7rem] text-(--ink-strong) placeholder:text-[#a89276] focus:border-[rgba(221,107,32,0.55)] focus:outline-none focus:ring-3 focus:ring-[rgba(221,107,32,0.17)]"
              placeholder="Why did..."
            />
          </div>

          <div>
            <label
              htmlFor="answer"
              className="mb-[0.35rem] block font-[640] text-[#4f3f2e]"
            >
              Punchline
            </label>
            <textarea
              id="answer"
              name="answer"
              required
              rows={4}
              className="w-full rounded-[0.72rem] border border-[#e2d7c4] bg-[#fffdfa] px-[0.85rem] py-[0.7rem] text-(--ink-strong) placeholder:text-[#a89276] focus:border-[rgba(221,107,32,0.55)] focus:outline-none focus:ring-3 focus:ring-[rgba(221,107,32,0.17)]"
              placeholder="Because..."
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-fit cursor-pointer items-center self-start rounded-[0.72rem] border-0 bg-[linear-gradient(180deg,#dd6b20_0%,#b45309_100%)] px-4 py-[0.62rem] font-[740] tracking-[0.01em] text-[#fffaf2] shadow-[0_10px_18px_rgba(180,83,9,0.24)] transition-[transform,box-shadow] duration-150 ease-in-out hover:-translate-y-px hover:shadow-[0_12px_20px_rgba(180,83,9,0.32)] disabled:cursor-not-allowed disabled:opacity-56"
          >
            Save Joke
          </button>
          {error ? (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error.message}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
