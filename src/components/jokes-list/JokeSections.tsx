import { Star } from "lucide-react";
import type { Joke } from "#/types";
import { JokeCard } from "#/components/jokes-list/JokeCard";

interface JokesSectionProps {
  title: string;
  showStar?: boolean;
  isTopJokes: boolean;
  jokes: Joke[];
  openCommentsJokeId: number | null;
  onVote: (jokeId: number, delta: 1 | -1) => void;
  onToggleComments: (jokeId: number) => void;
  onCloseComments: () => void;
  onDelete: (jokeId: number) => void;
  deletingJokeId: number | null;
}

export function JokesSection({
  title,
  showStar = false,
  isTopJokes,
  jokes,
  openCommentsJokeId,
  onVote,
  onToggleComments,
  onCloseComments,
  onDelete,
  deletingJokeId,
}: JokesSectionProps) {
  if (!jokes.length) return null;

  return (
    <section className="space-y-3">
      <h3 className="m-0 inline-flex items-center gap-2 text-[0.92rem] font-bold uppercase tracking-[0.01em] text-[#6b553d]">
        {showStar ? <Star className="h-4 w-4" fill="currentColor" /> : null}
        {title}
      </h3>
      <div className="space-y-4">
        {jokes.map((joke) => (
          <JokeCard
            key={joke.id}
            joke={joke}
            isTopJoke={isTopJokes}
            isCommentsOpen={openCommentsJokeId === joke.id}
            onVote={onVote}
            onToggleComments={onToggleComments}
            onCloseComments={onCloseComments}
            onDelete={onDelete}
            isDeleting={deletingJokeId === joke.id}
          />
        ))}
      </div>
    </section>
  );
}
