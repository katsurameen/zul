"use client";

const SECTIONS = [
  { name: "Profile", id: "profile" },
  { name: "Work", id: "work" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export default function SectionDots({ activeSection }) {
  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeSection)
  );

  const step = (dir) => {
    const next = Math.min(Math.max(activeIndex + dir, 0), SECTIONS.length - 1);
    smoothTo(SECTIONS[next].id);
  };

  return (
    <>
    <nav
      aria-label="Section navigation"
      className="hidden min-[1440px]:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] px-2 py-3"
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={activeIndex === 0}
        aria-label="Previous section"
        className="w-8 h-8 flex items-center justify-center font-display text-base border-[3px] border-transparent hover:border-black hover:bg-[#ffd23f] active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <span aria-hidden="true">↑</span>
      </button>
      <div className="flex flex-col items-center gap-2.5 py-1">
        {SECTIONS.map(({ name, id }) => {
          const active = id === SECTIONS[activeIndex].id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => smoothTo(id)}
              aria-label={`Go to ${name}`}
              aria-current={active ? "true" : undefined}
              className={`block border-[3px] border-black transition-all duration-200 ${
                active
                  ? "w-4 h-4 bg-[#ffd23f] shadow-[2px_2px_0_0_#000]"
                  : "w-3 h-3 bg-white hover:bg-black"
              }`}
            />
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={activeIndex === SECTIONS.length - 1}
        aria-label="Next section"
        className="w-8 h-8 flex items-center justify-center font-display text-base border-[3px] border-transparent hover:border-black hover:bg-[#ffd23f] active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <span aria-hidden="true">↓</span>
      </button>
    </nav>
    <nav
      aria-label="Section navigation"
      className="min-[1440px]:hidden fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] px-2 py-1.5"
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={activeIndex === 0}
        aria-label="Previous section"
        className="w-11 h-11 flex items-center justify-center font-display text-lg active:bg-[#ffd23f] transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <span aria-hidden="true">←</span>
      </button>
      <div className="flex items-center gap-2 px-1">
        {SECTIONS.map(({ name, id }) => {
          const active = id === SECTIONS[activeIndex].id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => smoothTo(id)}
              aria-label={`Go to ${name}`}
              aria-current={active ? "true" : undefined}
              className={`flex items-center justify-center border-[3px] border-black transition-all duration-200 ${
                active
                  ? "w-11 h-7 bg-[#ffd23f] shadow-[2px_2px_0_0_#000]"
                  : "w-7 h-7 bg-white"
              }`}
            />
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={activeIndex === SECTIONS.length - 1}
        aria-label="Next section"
        className="w-11 h-11 flex items-center justify-center font-display text-lg active:bg-[#ffd23f] transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <span aria-hidden="true">→</span>
      </button>
    </nav>
    </>
  );
}
