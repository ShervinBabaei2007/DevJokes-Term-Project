import {
  deleteJokeMutation,
  getJokesQuery,
  voteJokeMutation,
  type DeleteJokeMutationVariables,
  type VoteJokeMutationVariables,
} from "#/queries";
import { deleteJoke, voteJoke } from "#/serverFunctions/jokeFns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

export function useOpenCommentsJoke() {
  const [openCommentsJokeId, setOpenCommentsJokeId] = useState<number | null>(null);

  const toggleCommentsForJoke = (jokeId: number) => {
    setOpenCommentsJokeId((currentId) => (currentId === jokeId ? null : jokeId));
  };

  const closeComments = () => {
    setOpenCommentsJokeId(null);
  };

  return { openCommentsJokeId, toggleCommentsForJoke, closeComments };
}

export function useVoteJoke() {
  const voteJokeServerFn = useServerFn(voteJoke);
  const queryClient = useQueryClient();

  const { mutate: mutateVote } = useMutation({
    ...voteJokeMutation,
    // Explicitly defining the mutation function to ensure correct variable handoff
    mutationFn: (variables: VoteJokeMutationVariables) => voteJokeServerFn(variables),
    onSettled: () => {
      // Invalidate the jokes query to refresh the list after voting
      queryClient.invalidateQueries(getJokesQuery);
    },
  });

  const vote = (jokeId: number, delta: 1 | -1) => {
    mutateVote({
      data: { id: jokeId, delta },
    });
  };

  return { vote };
}

export function useDeleteJoke() {
  const deleteJokeServerFn = useServerFn(deleteJoke);
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    variables,
  } = useMutation<void, Error, DeleteJokeMutationVariables>({
    ...deleteJokeMutation,
    mutationFn: (variables: DeleteJokeMutationVariables) => deleteJokeServerFn(variables),
    onSettled: () => {
      // Invalidate the jokes query to refresh the list after deletion
      queryClient.invalidateQueries(getJokesQuery);
    },
  });

  const deleteById = (jokeId: number) => {
    mutateDelete({
      data: { id: jokeId },
    });
  };

  return {
    deleteById,
    isDeleting: isPending,
    deletingJokeId: variables?.data?.id ?? null,
  };
}

export function useJokesListController() {
  const { vote } = useVoteJoke();
  const { deleteById, deletingJokeId } = useDeleteJoke();
  const { openCommentsJokeId, toggleCommentsForJoke, closeComments } = useOpenCommentsJoke();

  return {
    openCommentsJokeId,
    onVote: vote,
    onToggleComments: toggleCommentsForJoke,
    onCloseComments: closeComments,
    onDelete: deleteById,
    deletingJokeId,
  };
}
