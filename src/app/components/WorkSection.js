"use client";

import { motion } from "framer-motion";

export default function WorkSection() {
  const jobs = [
    { org: "PT Summit Global Teknologi", role: "Junior Backend Developer", type: "Full-time", date: "Aug 2025 - Current" },
    { org: "Orchid Cluster", role: "Software Engineer", type: "Part-time", date: "Mar 2024 - Apr 2024" },
    { org: "PT. EGEOS", role: "Mobile App Developer", type: "Internship", date: "Sep 2023 - Jan 2024" },
    { org: "PT. Kotak Pintar", role: "Mobile App Developer", type: "Internship", date: "Jun 2023 - Aug 2023" },
  ];
  const others = [
    { org: "ITENAS", role: "Machine Learning Lab Assistant", date: "Feb 2024 - Jul 2024" },
    { org: "ITENAS", role: "Robotics Lab Assistant", date: "Feb 2024 - Jul 2024" },
  ];

  const renderEntry = (item, accent) => (
    <div
      key={`${item.org}-${item.role}`}
      className="group relative px-4 py-5 border-2 border-neutral-800 bg-[#181818] transition-all duration-200 hover:border-neutral-500 hover:bg-[#202020] hover:translate-x-1 active:border-neutral-500 active:bg-[#202020]"
    >
      <span
        className={`absolute -left-[35px] top-6 w-3 h-3 border-2 border-black transition-transform duration-200 group-hover:scale-150 ${accent}`}
      />
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-semibold leading-relaxed">{item.org}</p>
        <p className="text-[10px] text-neutral-300 leading-relaxed group-hover:text-yellow-400 transition-colors duration-200">{item.role}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[8px] text-black bg-neutral-300 px-2 py-1">{item.date}</span>
          {item.type && (
            <span className="text-[8px] text-neutral-400 border border-neutral-700 px-2 py-1">{item.type}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col justify-start sm:justify-center px-3 sm:px-6 py-12 sm:py-10 text-white max-w-6xl mx-auto scroll-mt-20 sm:min-h-screen"
    >
      <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400 mb-2">02 / CAREER LOG</p>
      <h2 className="text-lg sm:text-2xl mb-2 sm:mb-6">- Work -</h2>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
        {/* Work Section */}
        <div className="flex-1 pixel-panel bg-[#1c1c1c] border-2 border-neutral-700 p-4 sm:p-6 min-w-0">
          <h3 className="text-[11px] text-yellow-400 mb-6">EXPERIENCE</h3>
          <div className="relative pl-6 border-l-2 border-neutral-700 space-y-4">
            {jobs.map((j) => renderEntry(j, "bg-yellow-400"))}
          </div>
        </div>

        {/* Other Section */}
        <div className="flex-1 pixel-panel bg-[#1c1c1c] border-2 border-neutral-700 p-4 sm:p-6 min-w-0">
          <h3 className="text-[11px] text-yellow-400 mb-6">CAMPUS LABS</h3>
          <div className="relative pl-6 border-l-2 border-neutral-700 space-y-4">
            {others.map((o) => renderEntry(o, "bg-[#ff004d]"))}
          </div>
          <div className="mt-6 border-2 border-dashed border-neutral-700 p-4 text-[10px] text-neutral-300 leading-loose">
            6 roles so far across industry teams and campus labs. I currently work as a junior backend developer.
          </div>
        </div>
      </div>
    </motion.section>
  );
}
