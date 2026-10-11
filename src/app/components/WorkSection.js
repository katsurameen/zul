"use client";

import { motion, useReducedMotion } from "framer-motion";

const groups = [
  {
    title: "Industry",
    tab: "bg-[#74b9ff]",
    items: [
      { org: "PT Summit Global Teknologi", role: "Junior Backend Developer", type: "Full-time", date: "Aug 2025 - Present" },
      { org: "Orchid Cluster", role: "Software Engineer", type: "Part-time", date: "Mar 2024 - Apr 2024" },
      { org: "PT. EGEOS", role: "Mobile App Developer", type: "Internship", date: "Sep 2023 - Jan 2024" },
      { org: "PT. Kotak Pintar", role: "Mobile App Developer", type: "Internship", date: "Jun 2023 - Aug 2023" },
    ],
  },
  {
    title: "Campus labs",
    tab: "bg-[#88d498]",
    items: [
      { org: "ITENAS", role: "Machine Learning Lab Assistant", date: "Feb 2024 - Jul 2024" },
      { org: "ITENAS", role: "Robotics Lab Assistant", date: "Feb 2024 - Jul 2024" },
    ],
  },
];

export default function WorkSection() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-white border-y-[3px] border-black">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24"
      >
        <p className="inline-block nb-chip bg-[#ffd23f] px-3 py-1.5 mono-chip text-[13px] uppercase">
          Work experience
        </p>
        <h2 className="mt-5 font-display text-4xl md:text-6xl uppercase tracking-tight text-balance">
          Six roles, one craft.
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">
          From mobile apps to backend systems, across industry teams and campus labs.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {groups.map((group) => (
            <article key={group.title} className="nb-card p-6 sm:p-8">
              <h3 className={`inline-block border-[3px] border-black px-3 py-1 font-display text-lg uppercase ${group.tab}`}>
                {group.title}
              </h3>
              <ul className="mt-5">
                {group.items.map((item) => (
                  <li key={`${item.org}-${item.role}`} className="border-t-[3px] border-black py-4 last:pb-0">
                    <p className="text-lg font-bold">{item.role}</p>
                    <p className="mt-0.5">{item.org}</p>
                    <p className="mono-chip mt-1.5 text-[13px] uppercase">
                      {item.date}{item.type ? ` / ${item.type}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
