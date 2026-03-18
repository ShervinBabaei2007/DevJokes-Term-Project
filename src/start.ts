import { createMiddleware, createStart } from "@tanstack/react-start";
import { JokeService } from "#/dal/JokeService";
import { dbConnection } from "#/dal/db/client";

const jokeServiceMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const jokeService = new JokeService(dbConnection());
    return next({
      context: {
        jokeService,
      },
    });
  },
);

export const startInstance = createStart(() => ({
  requestMiddleware: [jokeServiceMiddleware],
}));
