"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";


const projects = [
  {
    id: 1,
    title: "Palm Tree Health Detection",
    image: "/Images/project1.jpg",
    description: "Detecting palm tree health using Mask R-CNN and NDVI in aerial imagery.",
    tag: "ML / CV",
    pill: "bg-[#88d498]",
  },
  {
    id: 2,
    title: "ORLINK",
    image: "/Images/project2.jpg",
    description: "A website for subscribing to the internet in residential areas.",
    tag: "WEB",
    pill: "bg-[#74b9ff]",
  },
  {
    id: 3,
    title: "E-GEOS Mobile",
    image: "/Images/project3.jpg",
    description: "A mobile app for uploading and processing aerial data from the field.",
    tag: "MOBILE",
    pill: "bg-[#ff90e8]",
  },
  {
    id: 4,
    title: "Spicetify",
    image: "/Images/project4.jpg",
    description: "A website for gathering stats from your daily Spotify.",
    tag: "WEB",
    pill: "bg-[#ffd23f]",
  },
];

function ExpandableCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggle = () => setOpen((v) => !v);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      className="nb-card nb-card-hover group cursor-pointer overflow-hidden"
    >
      <div className="overflow-hidden border-b-[3px] border-black">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-5 sm:p-6">
        <span className={`nb-chip px-2 py-0.5 mono-chip text-xs uppercase ${project.pill}`}>
          {project.tag}
        </span>
        <div className="mt-3 flex items-center justify-between gap-3">
          <h3 className="font-display text-xl uppercase tracking-tight">{project.title}</h3>
          <span aria-hidden="true" className="shrink-0 font-display text-2xl transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              key={`content-${project.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="mt-3 border-t-[3px] border-black pt-3 leading-relaxed">{project.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ProjectSection() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24"
    >
      <p className="inline-block nb-chip bg-[#ff90e8] px-3 py-1.5 mono-chip text-[13px] uppercase">
        Projects
      </p>
      <h2 className="mt-5 font-display text-4xl md:text-6xl uppercase tracking-tight text-balance">
        Selected projects.
      </h2>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">
        Real products shipped across web, mobile, and machine learning. Click a card to expand details.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, i) => (
          <ExpandableCard key={project.id} project={project} index={i} />
        ))}
      </div>
      <div className="mt-10">
        <a
          href="https://github.com/katsurameen"
          target="_blank"
          rel="noopener noreferrer"
          className="nb-btn nb-btn-white min-h-[52px] px-8 text-base uppercase tracking-wide"
        >
          More on GitHub
          <span aria-hidden="true" className="ml-2">→</span>
        </a>
      </div>
    </motion.div>
  );
}
