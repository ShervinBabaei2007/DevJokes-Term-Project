import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:pt-14">
      <section className="rounded-[1.45rem] border border-(--line) bg-[radial-gradient(circle_at_92%_15%,rgba(47,143,127,0.16)_0,transparent_34%),linear-gradient(180deg,var(--surface-strong)_0%,#fff8ed_100%)] p-[clamp(1.1rem,3.1vw,1.9rem)] shadow-[0_18px_40px_rgba(137,91,33,0.1)] max-sm:rounded-[1.05rem]">
        <p className="mb-2 mt-0 text-[0.78rem] font-black uppercase tracking-[0.09em] text-(--accent-strong)">
          About
        </p>
        <h1 className="m-0 font-(--font-display) text-[clamp(1.9rem,5vw,2.6rem)] leading-[1.1]">
          A tiny app for developer humor
        </h1>
        <p className="mt-[0.65rem] max-w-[54ch] text-(--ink-soft)">
          DevJokes is an application made by the FSWD students that uses a
          combination of procedural as well as object oriented programming
          practices.
        </p>
      </section>
    </main>
  );
}
