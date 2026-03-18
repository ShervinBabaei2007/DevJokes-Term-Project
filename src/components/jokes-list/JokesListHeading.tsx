import { useIsFetching } from "@tanstack/react-query";
import { jokesQueryKey } from "#/queries/keys";

export function JokesListHeading() {
  const isFetching = useIsFetching({ queryKey: jokesQueryKey }) > 0;

  return (
    <h2 className="inline-flex items-center gap-2 font-(--font-display) text-[clamp(1.35rem,3.5vw,1.7rem)] text-[#3a2f1f]">
      <strong>📫 Joke Bin</strong>
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center">
        <span
          className={`h-3.5 w-3.5 rounded-full border-2 border-gray-400 border-t-transparent transition-opacity ${
            isFetching ? "animate-spin opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </h2>
  );
}
