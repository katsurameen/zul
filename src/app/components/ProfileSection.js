"use client";
import { motion, useReducedMotion } from "framer-motion";

const skills = ["Python", "Next.js", "Flutter", "React Native", "Machine Learning", "REST APIs", "PostgreSQL", "Docker"];

const employers = [
  "PT Summit Global Teknologi",
  "Orchid Cluster",
  "PT EGEOS",
  "PT Kotak Pintar",
  "ITENAS",
];

export default function ProfileSection() {
  const reduce = useReducedMotion();
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative overflow-hidden border-b-[3px] border-black">
        <div aria-hidden="true" className="nb-dots absolute inset-0 opacity-[0.08] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="inline-block nb-chip bg-white px-3 py-1.5 mono-chip text-[13px] uppercase -rotate-2">
              Junior Backend Developer
            </p>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl xl:text-7xl leading-[0.95] tracking-tight uppercase text-balance">
              Backend systems that stay{" "}
              <span className="inline-block bg-[#ffd23f] border-[3px] border-black shadow-[5px_5px_0_0_#000] px-3 -rotate-1">
                reliable
              </span>{" "}
              in production.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg sm:text-xl leading-relaxed">
              Hi, I am Zulfa, a backend developer from Bandung who ships clean, dependable software.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="nb-btn nb-btn-yellow min-h-[56px] px-8 text-base uppercase tracking-wide"
              >
                Get in touch
              </a>
              <a
                href="/Files/CV Zulfa.pdf"
                download
                className="nb-btn nb-btn-white min-h-[56px] px-8 text-base uppercase tracking-wide"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <img
              src="/Images/zul.jpg"
              alt="Zulfa Sulthany outdoors with mountains behind"
              className="w-full h-80 sm:h-[480px] object-cover border-[3px] border-black shadow-[8px_8px_0_0_#000] rotate-1"
            />
            <p className="absolute -top-5 right-4 nb-chip bg-[#ff90e8] px-3 py-1.5 text-sm uppercase rotate-3">
              Open to work
            </p>
            <p className="absolute -bottom-5 left-4 nb-chip bg-white px-3 py-1.5 mono-chip text-[13px] uppercase -rotate-2">
              Bandung, ID
            </p>
          </motion.div>
          </div>
        </div>
      </div>

      <div className="marquee bg-black text-white border-b-[3px] border-black py-3" aria-label="Technical skills">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {skills.map((s) => (
                <span key={`${copy}-${s}`} className="mx-6 font-display text-lg uppercase whitespace-nowrap">
                  {s} <span aria-hidden="true" className="ml-6 text-[#ffd23f]">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <p className="mono-chip text-[13px] uppercase text-center">Teams I have shipped with</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-label="Previous employers">
          {employers.map((org) => (
            <li key={org} className="nb-chip bg-white px-4 py-2 text-sm font-bold">
              {org}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
