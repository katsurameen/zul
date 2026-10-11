"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [
  ["2+", "years of experience", "bg-[#ffd23f]"],
  ["4", "projects shipped", "bg-[#74b9ff]"],
  ["6", "team roles", "bg-[#ff90e8]"],
];

export default function CtaSection() {
  const reduce = useReducedMotion();
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white border-y-[3px] border-black">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center"
      >
        <div className="flex items-stretch justify-center gap-4 sm:gap-6">
          {stats.map(([n, l, bg]) => (
            <div key={l} className={`min-w-0 flex-1 sm:flex-none sm:min-w-40 border-[3px] border-white shadow-[5px_5px_0_0_#ffd23f] px-3 py-5 sm:px-8 ${bg} text-black`}>
              <p className="mono-chip text-3xl sm:text-5xl font-bold tabular-nums">{n}</p>
              <p className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wide">{l}</p>
            </div>
          ))}
        </div>
        <h2 className="mx-auto mt-12 max-w-4xl font-display text-4xl md:text-6xl uppercase tracking-tight text-balance">
          Let&rsquo;s work together.
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lg">
          Tell me about your project and I will reply soon.
        </p>
        <a
          href="#contact"
          onClick={scrollToContact}
          className="nb-btn nb-btn-yellow mt-8 min-h-[56px] px-10 text-base uppercase tracking-wide"
        >
          Get in touch
        </a>
      </motion.div>
    </div>
  );
}
