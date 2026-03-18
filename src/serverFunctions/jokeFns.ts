import { createServerFn } from "@tanstack/react-start";
import type { CreateJokeInput, DeleteJokeInput, VoteJokeInput } from "#/types";

export const getJokes = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    return context.jokeService.getJokes();
  },
);

export const createJoke = createServerFn({ method: "POST" })
  .inputValidator((input: CreateJokeInput) => input)
  .handler(async ({ data, context }) => {
    return context.jokeService.createJoke(data);
  });

export const voteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: VoteJokeInput) => input)
  .handler(async ({ data, context }) => {
    return context.jokeService.voteJoke(data);
  });

export const deleteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: DeleteJokeInput) => input)
  .handler(async ({ data, context }) => {
    return context.jokeService.deleteJoke(data);
  });
