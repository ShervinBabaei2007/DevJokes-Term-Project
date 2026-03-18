import { useSuspenseQuery } from "@tanstack/react-query";
import { getJokesQuery } from "#/queries";
import { JokesSection } from "#/components/jokes-list/JokeSections";
import { useJokesListController } from "#/components/jokes-list/hooks";
import { JokesListHeading } from "#/components/jokes-list/JokesListHeading";

export function JokesList() {
  const controller = useJokesListController();

  const {
    data: { topJokes, remainingJokes },
  } = useSuspenseQuery(getJokesQuery);

  if (topJokes.length === 0 && remainingJokes.length === 0) {
    return <p className="text-gray-500 italic">No jokes found.</p>;
  }

  return (
    <div className="space-y-7">
      <JokesListHeading />
      <JokesSection
        title="Top 3 Jokes"
        showStar={true}
        isTopJokes={true}
        jokes={topJokes}
        {...controller}
      />
      <JokesSection
        title="More Jokes"
        isTopJokes={false}
        jokes={remainingJokes}
        {...controller}
      />
    </div>
  );
}
