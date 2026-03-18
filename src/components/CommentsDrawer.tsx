import type { Joke } from "#/types";
import { X } from "lucide-react";

interface CommentsDrawerProps {
  joke: Joke;
  isOpen: boolean;
  onClose: () => void;
}

export function CommentsDrawer({ joke, isOpen, onClose }: CommentsDrawerProps) {
  return (
    <section
      className={`mt-0 grid overflow-hidden transition-[grid-template-rows,opacity,transform,margin-top] duration-[260ms,220ms,220ms,220ms] ease-in-out ${
        isOpen
          ? "pointer-events-auto mt-3 grid-rows-[1fr] translate-y-0 opacity-100"
          : "pointer-events-none grid-rows-[0fr] -translate-y-1.5 opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="min-h-0 overflow-hidden rounded-2xl border border-[#eadcca] bg-gradient-to-b from-[#fffdf8] to-[#fff8eb] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="flex items-start justify-between gap-3">
          <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#8a6740]">
            Comments
          </p>
          <button
            type="button"
            className="inline-flex h-[1.7rem] w-[1.7rem] cursor-pointer items-center justify-center rounded-lg border border-[#e6d7bf] bg-[#fffefb] text-[#7f6140] hover:bg-[#fff4df]"
            onClick={onClose}
            aria-label="Close comments drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {joke.comments.length ? (
          <ul className="mt-3 grid list-none gap-2 p-0">
            {joke.comments.map((comment, index) => (
              <li
                key={`${joke.id}-comment-${index}`}
                className="rounded-xl border border-[#ecdfcd] bg-[#fffdf8] px-2.5 py-2 text-[0.9rem] leading-[1.45] text-[#594a38]"
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-[0.9rem] italic text-[#7a6750]">
            No comments yet.
          </p>
        )}
      </div>
    </section>
  );
}
