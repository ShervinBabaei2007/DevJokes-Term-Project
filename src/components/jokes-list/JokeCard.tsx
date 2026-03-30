import { CommentsDrawer } from "#/components/CommentsDrawer";
import { authClient } from "#/lib/auth-client";
import type { Joke } from "#/types";
import { ArrowBigDown, ArrowBigUp, MessageCircle, Star, Trash2 } from "lucide-react";

interface JokeCardProps {
  joke: Joke;
  isTopJoke: boolean;
  isCommentsOpen: boolean;
  onVote: (jokeId: number, delta: 1 | -1) => void;
  onToggleComments: (jokeId: number) => void;
  onCloseComments: () => void;
  onDelete: (jokeId: number) => void;
  isDeleting: boolean;
}

export function JokeCard({
  joke,
  isTopJoke,
  isCommentsOpen,
  onVote,
  onToggleComments,
  onCloseComments,
  onDelete,
  isDeleting,
}: JokeCardProps) {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const isVoteDisabled = isPending || !isLoggedIn;

  return (
    <div
      className={`rounded-[0.95rem] border p-4 shadow-[0_12px_20px_rgba(117,86,46,0.08)] transition-transform duration-150 ease-in hover:-translate-y-0.5 ${
        isTopJoke
          ? "border-[#f2cb7f] bg-[radial-gradient(circle_at_85%_16%,rgba(251,191,36,0.18)_0,transparent_38%),#fffdf8]"
          : "border-[#e9dfcf] bg-[#fffefd]"
      }`}
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <div
          className="flex min-w-[2.05rem] flex-col items-center gap-[0.15rem] rounded-[0.7rem] border border-[#f0e2cc] bg-[#fffaef] px-[0.22rem] py-[0.3rem]"
          aria-label="Joke score controls"
        >
          <button
            type="button"
            className="inline-flex h-[1.4rem] w-[1.4rem] cursor-pointer items-center justify-center rounded-[0.4rem] border-0 bg-transparent text-[#8a6942] hover:bg-[#f7ebd8] hover:text-[#5f472a] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-[#8a6942]"
            onClick={() => onVote(joke.id, 1)}
            aria-label="Upvote joke"
            disabled={isVoteDisabled}
            title={!isLoggedIn ? "Sign in to vote" : undefined}
          >
            <ArrowBigUp className="h-4 w-4" />
          </button>

          <span className="min-w-[1.3rem] text-center text-[0.84rem] font-black text-[#5c4b35]">
            {joke.score}
          </span>

          <button
            type="button"
            className="inline-flex h-[1.4rem] w-[1.4rem] cursor-pointer items-center justify-center rounded-[0.4rem] border-0 bg-transparent text-[#8a6942] hover:bg-[#f7ebd8] hover:text-[#5f472a] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-[#8a6942]"
            onClick={() => onVote(joke.id, -1)}
            aria-label="Downvote joke"
            disabled={isVoteDisabled}
            title={!isLoggedIn ? "Sign in to vote" : undefined}
          >
            <ArrowBigDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col justify-start gap-2">
          <div className="flex min-h-30 flex-col justify-evenly gap-1">
            <p className="m-0 text-[1.1rem] font-black leading-[1.35]">{joke.question}</p>
            <p className="m-0 text-[#5b4a38]">{joke.answer}</p>

            <div className="mt-0 flex flex-wrap items-center gap-2">
              {isTopJoke ? (
                <span className="mt-0 inline-flex items-center gap-1 rounded-full border border-[#f4d593] bg-[#fff1cd] px-2 py-[0.17rem] text-[0.72rem] font-black uppercase tracking-[0.06em] text-[#935f14]">
                  <Star className="h-3.5 w-3.5" fill="currentColor" />
                  Top Joke
                </span>
              ) : null}

              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-[0.28rem] rounded-full border border-[#dfd7c8] bg-[#fffefb] px-[0.52rem] py-[0.2rem] text-[0.76rem] font-bold text-[#5c4a35] hover:border-[#e4c694] hover:bg-[#fff6e9]"
                onClick={() => onToggleComments(joke.id)}
                aria-label="View joke comments"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{joke.comments.length}</span>
              </button>

              {joke.isOwner ? (
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-[0.28rem] rounded-full border border-[#efc7c7] bg-[#fff7f7] px-[0.52rem] py-[0.2rem] text-[0.76rem] font-bold text-[#8c2f2f] hover:border-[#e7a8a8] hover:bg-[#ffeded] disabled:cursor-not-allowed disabled:opacity-65"
                  onClick={() => onDelete(joke.id)}
                  aria-label="Delete joke"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                </button>
              ) : null}
            </div>
          </div>

          <CommentsDrawer joke={joke} isOpen={isCommentsOpen} onClose={onCloseComments} />
        </div>
      </div>
    </div>
  );
}
