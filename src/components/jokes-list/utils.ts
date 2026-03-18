import type { Joke } from "#/types";

export interface PartitionedJokes {
  topJokes: Joke[];
  remainingJokes: Joke[];
}

export function partitionJokesByTopScore(jokes: Joke[]): PartitionedJokes {
  const rankedJokes = [...jokes].sort((a, b) => b.score - a.score);

  return {
    topJokes: rankedJokes.slice(0, 3),
    remainingJokes: rankedJokes.slice(3),
  };
}
