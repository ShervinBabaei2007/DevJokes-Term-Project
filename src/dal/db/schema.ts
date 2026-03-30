import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const jokesTable = pgTable("jokes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  authorId: text("author_id").references(() => user.id, { onDelete: "cascade" }), // no .notNull()
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  score: integer("score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const jokeVotesTable = pgTable(
  "joke_votes",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    jokeId: integer("joke_id")
      .notNull()
      .references(() => jokesTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    value: integer("value").notNull(),
  },
  (table) => [uniqueIndex("joke_votes_user_joke_idx").on(table.userId, table.jokeId)],
);

export const commentsTable = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  jokeId: integer("joke_id")
    .notNull()
    .references(() => jokesTable.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const jokesRelations = relations(jokesTable, ({ many }) => ({
  comments: many(commentsTable),
  votes: many(jokeVotesTable),
}));

export const jokeVotesRelations = relations(jokeVotesTable, ({ one }) => ({
  joke: one(jokesTable, {
    fields: [jokeVotesTable.jokeId],
    references: [jokesTable.id],
  }),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  joke: one(jokesTable, {
    fields: [commentsTable.jokeId],
    references: [jokesTable.id],
  }),
}));

export type JokeRow = typeof jokesTable.$inferSelect;
export type NewJokeRow = typeof jokesTable.$inferInsert;
export type CommentRow = typeof commentsTable.$inferSelect;
export type NewCommentRow = typeof commentsTable.$inferInsert;
export type JokeVoteRow = typeof jokeVotesTable.$inferSelect;

export * from "./auth-schema";
