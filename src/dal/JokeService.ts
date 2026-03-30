import type { CreateJokeInput, DeleteJokeInput, Joke, VoteJokeInput } from "#/types";
import { eq, sql } from "drizzle-orm";
import type { DbClient } from "./db/client";
import { commentsTable, jokesTable } from "./db/schema";

export class JokeService {
  constructor(private readonly db: DbClient) {}

  async getJokes(userId?: string): Promise<Joke[]> {
    const rows = await this.db.query.jokesTable.findMany({
      with: {
        comments: {
          columns: {
            body: true,
          },
          orderBy: (comment, { asc }) => [asc(comment.createdAt)],
        },
      },
      orderBy: (joke, { asc }) => [asc(joke.createdAt)],
    });

    return rows.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      score: row.score,
      comments: row.comments.map((comment) => comment.body),
      isOwner: userId ? row.authorId === userId : false,
    }));
  }

  async createJoke(input: CreateJokeInput, authorId: string): Promise<Joke> {
    const [insertedJoke] = await this.db
      .insert(jokesTable)
      .values({
        question: input.question.trim(),
        answer: input.answer.trim(),
        score: 0,
        authorId,
      })
      .returning({
        id: jokesTable.id,
        question: jokesTable.question,
        answer: jokesTable.answer,
        score: jokesTable.score,
      });

    if (!insertedJoke) {
      throw new Error("Failed to insert joke.");
    }

    return { ...insertedJoke, comments: [], isOwner: true };
  }

  async voteJoke(input: VoteJokeInput): Promise<Joke> {
    const [updatedJokeRow] = await this.db
      .update(jokesTable)
      .set({
        score: sql<number>`${jokesTable.score} + ${input.delta}`,
      })
      .where(eq(jokesTable.id, input.id))
      .returning({
        id: jokesTable.id,
        question: jokesTable.question,
        answer: jokesTable.answer,
        score: jokesTable.score,
      });

    if (!updatedJokeRow) {
      throw new Error("Joke not found.");
    }

    const comments = await this.db.query.commentsTable.findMany({
      columns: {
        body: true,
      },
      where: eq(commentsTable.jokeId, input.id),
      orderBy: (comment, { asc }) => [asc(comment.createdAt)],
    });

    return {
      ...updatedJokeRow,
      comments: comments.map((comment) => comment.body),
      isOwner: false,
    };
  }

  async deleteJoke(input: DeleteJokeInput, userId: string): Promise<void> {
    const joke = await this.db.query.jokesTable.findFirst({
      where: (t, { eq }) => eq(t.id, input.id),
    });

    if (!joke) throw new Error("Joke not found.");
    if (joke.authorId !== userId) throw new Error("Not authorized.");

    await this.db.delete(jokesTable).where(eq(jokesTable.id, input.id));
  }
}
