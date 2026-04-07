import { auth } from "#/lib/auth";
import type { CreateJokeInput, DeleteJokeInput, VoteJokeInput } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const getJokes = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const request = getRequest();
  const session = await auth.api.getSession({ headers: request.headers });
  return context.jokeService.getJokes(session?.user?.id ?? undefined);
});

export const createJoke = createServerFn({ method: "POST" })
  .inputValidator((input: CreateJokeInput) => input)
  .handler(async ({ data, context }) => {
    const request = getRequest();
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) throw new Error("Not authenticated.");
    return context.jokeService.createJoke(data, session.user.id);
  });

export const voteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: VoteJokeInput) => input)
  .handler(async ({ data, context }) => {
    const request = getRequest();
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) throw new Error("Not authenticated.");
    return context.jokeService.voteJoke(data, session.user.id);
  });

export const deleteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: DeleteJokeInput) => input)
  .handler(async ({ data, context }) => {
    const request = getRequest();
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) throw new Error("Not authenticated.");
    return context.jokeService.deleteJoke(data, session.user.id);
  });
