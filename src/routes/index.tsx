import { HomeHero } from "#/components/HomeHero";
import { JokesList } from "#/components/JokesList";
import { JokesListShimmer } from "#/components/JokesListShimmer";
import { getSession } from "#/lib/auth.functions";
import { getJokesQuery } from "#/queries";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // We still fetch the session on the server for the hard-refresh fix
    const session = await getSession();

    // allows guests to stay on the page
    return {
      user: session?.user ?? null,
    };
  },
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(getJokesQuery);
  },
  component: App,
});

function App() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:pt-14">
      <HomeHero />
      <section className="mt-4 rounded-[1.2rem] border border-(--line) bg-[rgba(255,255,255,0.74)] p-[clamp(1rem,2.8vw,1.4rem)] shadow-[0_14px_30px_rgba(126,88,42,0.09)] max-sm:rounded-[1.05rem]">
        <Suspense fallback={<JokesListShimmer />}>
          <JokesList />
        </Suspense>
      </section>
    </main>
  );
}
