const laughSquad = [
  {
    emoji: "🤣",
    label: "Crash Cackler",
    tint: "from-[#ffd18a] to-[#ffbb63]",
    delay: "motion-safe:delay-[180ms]",
  },
  {
    emoji: "😂",
    label: "Pun Pilot",
    tint: "from-[#d6f8ee] to-[#bfeee1]",
    delay: "motion-safe:delay-[260ms]",
  },
  {
    emoji: "😆",
    label: "Loop Laughter",
    tint: "from-[#ffe7d9] to-[#ffd4c0]",
    delay: "motion-safe:delay-[340ms]",
  },
  {
    emoji: "😹",
    label: "Merge Meower",
    tint: "from-[#fff0b7] to-[#ffe39a]",
    delay: "motion-safe:delay-[420ms]",
  },
];

export function HomeHero() {
  return (
    <section className="rounded-[1.45rem] border border-(--line) bg-[radial-gradient(circle_at_86%_22%,rgba(221,107,32,0.16)_0,transparent_39%),linear-gradient(130deg,var(--surface)_0%,#fff8e8_100%)] p-[clamp(1.2rem,3vw,2.2rem)] shadow-[0_18px_40px_rgba(145,95,36,0.11)] max-sm:rounded-[1.05rem]">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="motion-safe:delay-75 motion-safe:transition motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:starting:translate-y-2 motion-safe:starting:scale-[0.99] motion-safe:starting:opacity-0">
          <p className="mb-2 mt-0 text-[0.78rem] font-black uppercase tracking-[0.09em] text-(--accent-strong)">
            Freshly Deployed Humor
          </p>
          <h1 className="m-0 font-(--font-display) text-[clamp(2rem,5vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-[#2f2518]">
            Welcome to DevJokes,
            <br />
            where commits come with chuckles.
          </h1>
          <p className="mt-3 max-w-[48ch] text-[clamp(0.98rem,2vw,1.1rem)] text-(--ink-soft)">
            Browse the hottest jokes, vote the funniest one to the top, and keep
            your debugging sessions dangerously entertaining.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#efcc95] bg-[#fff2d7] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#8d5a15]">
              Punchline Powered
            </span>
            <span className="rounded-full border border-[#bfe5d9] bg-[#e7faf4] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#216959]">
              Community Voted
            </span>
          </div>
        </div>

        <div className="relative motion-safe:delay-150 motion-safe:transition motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:starting:translate-y-2 motion-safe:starting:scale-[0.99] motion-safe:starting:opacity-0">
          <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 rounded-full bg-[#ffdca4]/70 blur-sm" />
          <div className="pointer-events-none absolute -bottom-2 right-5 h-12 w-12 rounded-full bg-[#cdf4e9]/70 blur-sm" />
          <ul className="grid grid-cols-2 gap-3">
            {laughSquad.map((character) => (
              <li
                key={character.label}
                className={`rounded-2xl border border-white/80 bg-linear-to-br ${character.delay} ${character.tint} p-3 shadow-[0_10px_24px_rgba(106,73,36,0.15)] motion-safe:transition motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:starting:translate-y-3 motion-safe:starting:scale-[0.96] motion-safe:starting:opacity-0`}
              >
                <p className="m-0 text-[1.8rem] leading-none drop-shadow-[0_1px_1px_rgba(90,60,20,0.35)]">
                  {character.emoji}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#6a4b2f]">
                  {character.label}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-xl border border-[#ead9c2] bg-[#fffaf0]/90 px-3 py-2 text-sm font-medium text-[#7a5e43] motion-safe:delay-500 motion-safe:transition motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:starting:translate-y-2 motion-safe:starting:opacity-0">
            Drop a joke and join the chaos.
          </p>
        </div>
      </div>
    </section>
  );
}
