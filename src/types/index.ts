import type { CommentRow, JokeRow } from "#/server/db/schema";

export type Joke = Pick<JokeRow, "id" | "question" | "answer" | "score"> & {
  comments: CommentRow["body"][];
};

export interface CreateJokeInput {
  question: Joke["question"];
  answer: Joke["answer"];
}

export interface VoteJokeInput {
  id: Joke["id"];
  delta: 1 | -1;
}

export interface DeleteJokeInput {
  id: Joke["id"];
}
