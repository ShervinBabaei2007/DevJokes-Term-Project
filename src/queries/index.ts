import { getJokes } from "#/serverFunctions/jokeFns";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type {
  CreateJokeInput,
  DeleteJokeInput,
  Joke,
  VoteJokeInput,
} from "#/types";
import {
  createJokeMutationKey,
  deleteJokeMutationKey,
  jokesQueryKey,
  voteJokeMutationKey,
} from "#/queries/keys";
import { partitionJokesByTopScore } from "#/components/jokes-list/utils";

export const getJokesQuery = queryOptions({
  queryKey: jokesQueryKey,
  queryFn: getJokes,
  select: partitionJokesByTopScore,
  staleTime: 20_000,
});

export interface CreateJokeMutationVariables {
  data: CreateJokeInput;
}

export interface VoteJokeMutationVariables {
  data: VoteJokeInput;
}

export interface DeleteJokeMutationVariables {
  data: DeleteJokeInput;
}

export const createJokeMutation = mutationOptions<
  Joke,
  Error,
  CreateJokeMutationVariables
>({
  mutationKey: createJokeMutationKey,
});

export const voteJokeMutation = mutationOptions<
  Joke,
  Error,
  VoteJokeMutationVariables
>({
  mutationKey: voteJokeMutationKey,
});

export const deleteJokeMutation = mutationOptions<
  void,
  Error,
  DeleteJokeMutationVariables
>({
  mutationKey: deleteJokeMutationKey,
});
