import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  deleteJokeMutation,
  voteJokeMutation,
  type DeleteJokeMutationVariables,
} from "#/queries";
import { deleteJoke, voteJoke } from "#/serverFunctions/jokeFns";

export function useOpenCommentsJoke() {
  const [openCommentsJokeId, setOpenCommentsJokeId] = useState<number | null>(
    null,
  );

  const toggleCommentsForJoke = (jokeId: number) => {
    setOpenCommentsJokeId((currentId) =>
      currentId === jokeId ? null : jokeId,
    );
  };

  const closeComments = () => {
    setOpenCommentsJokeId(null);
  };

  return { openCommentsJokeId, toggleCommentsForJoke, closeComments };
}

export function useVoteJoke() {
  const voteJokeServerFn = useServerFn(voteJoke);

  const { mutate: mutateVote } = useMutation({
    ...voteJokeMutation,
    mutationFn: voteJokeServerFn,
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

  const {
    mutate: mutateDelete,
    isPending,
    variables,
  } = useMutation<void, Error, DeleteJokeMutationVariables>({
    ...deleteJokeMutation,
    mutationFn: deleteJokeServerFn,
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
  const { openCommentsJokeId, toggleCommentsForJoke, closeComments } =
    useOpenCommentsJoke();

  return {
    openCommentsJokeId,
    onVote: vote,
    onToggleComments: toggleCommentsForJoke,
    onCloseComments: closeComments,
    onDelete: deleteById,
    deletingJokeId,
  };
}
