import type { CreateJokeInput, DeleteJokeInput, Joke, VoteJokeInput } from "#/types";
import { and, eq, inArray, sql } from "drizzle-orm";
import type { DbClient } from "./db/client";
import { commentsTable, jokesTable, jokeVotesTable } from "./db/schema";

export class JokeService {
  constructor(private readonly db: DbClient) {}

  async getJokes(userId?: string): Promise<Joke[]> {
    const rows = await this.db.query.jokesTable.findMany({
      with: {
        comments: {
          columns: { body: true },
          orderBy: (comment, { asc }) => [asc(comment.createdAt)],
        },
      },
      orderBy: (joke, { asc }) => [asc(joke.createdAt)],
    });

    // Fetch this user's votes in one query, then build a lookup map
    const jokeIds = rows.map((r) => r.id);
    const userVotes =
      userId && jokeIds.length > 0
        ? await this.db
            .select({ jokeId: jokeVotesTable.jokeId, value: jokeVotesTable.value })
            .from(jokeVotesTable)
            .where(and(eq(jokeVotesTable.userId, userId), inArray(jokeVotesTable.jokeId, jokeIds)))
        : [];

    const voteMap = new Map(userVotes.map((v) => [v.jokeId, v.value]));

    return rows.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      score: row.score,
      comments: row.comments.map((c) => c.body),
      isOwner: userId ? row.authorId === userId : false,
      userVote: (voteMap.get(row.id) ?? 0) as 1 | -1 | 0,
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

    if (!insertedJoke) throw new Error("Failed to insert joke.");

    return { ...insertedJoke, comments: [], isOwner: true, userVote: 0 };
  }

  async voteJoke(input: VoteJokeInput, userId: string): Promise<Joke> {
    const existingVote = await this.db.query.jokeVotesTable.findFirst({
      where: (v, { and, eq }) => and(eq(v.jokeId, input.id), eq(v.userId, userId)),
    });

    let scoreDelta: number;
    let newUserVote: 1 | -1 | 0;

    if (!existingVote) {
      // No prior vote — insert and apply delta
      await this.db.insert(jokeVotesTable).values({ jokeId: input.id, userId, value: input.delta });
      scoreDelta = input.delta;
      newUserVote = input.delta;
    } else if (existingVote.value === input.delta) {
      // Same direction — toggle off (undo vote)
      await this.db
        .delete(jokeVotesTable)
        .where(and(eq(jokeVotesTable.jokeId, input.id), eq(jokeVotesTable.userId, userId)));
      scoreDelta = -input.delta;
      newUserVote = 0;
    } else {
      // Opposite direction — flip vote (net change is ±2)
      await this.db
        .update(jokeVotesTable)
        .set({ value: input.delta })
        .where(and(eq(jokeVotesTable.jokeId, input.id), eq(jokeVotesTable.userId, userId)));
      scoreDelta = input.delta * 2;
      newUserVote = input.delta;
    }

    const [updatedJokeRow] = await this.db
      .update(jokesTable)
      .set({ score: sql<number>`${jokesTable.score} + ${scoreDelta}` })
      .where(eq(jokesTable.id, input.id))
      .returning({
        id: jokesTable.id,
        question: jokesTable.question,
        answer: jokesTable.answer,
        score: jokesTable.score,
      });

    if (!updatedJokeRow) throw new Error("Joke not found.");

    const comments = await this.db.query.commentsTable.findMany({
      columns: { body: true },
      where: eq(commentsTable.jokeId, input.id),
      orderBy: (comment, { asc }) => [asc(comment.createdAt)],
    });

    return {
      ...updatedJokeRow,
      comments: comments.map((c) => c.body),
      isOwner: false,
      userVote: newUserVote,
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
