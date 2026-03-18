import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const jokesTable = pgTable("jokes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  score: integer("score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

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

export * from "./auth-schema";
