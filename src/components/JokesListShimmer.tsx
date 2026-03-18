export function JokesListShimmer() {
  return (
    <div className="space-y-4">
      <h2 className="inline-flex items-center gap-2 text-[clamp(1.35rem,3.5vw,1.7rem)] font-bold text-[#3a2f1f]">
        📫 Joke Bin
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      </h2>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-[#eadfce] bg-white/80 p-4"
        >
          <div className="mb-2 h-5 w-3/4 rounded bg-[#f1e5d3]" />
          <div className="h-4 w-full rounded bg-[#f6ecde]" />
        </div>
      ))}
    </div>
  );
}
