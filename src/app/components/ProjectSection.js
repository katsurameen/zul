"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const projects = [
  {
    id: 1,
    title: "Palm Tree Health Detection",
    image: "/Images/project1.jpg",
    description: "Detecting palm tree health using Mask R-CNN and NDVI in aerial imagery.",
    tag: "ML / CV",
  },
  {
    id: 2,
    title: "ORLINK",
    image: "/Images/project2.jpg",
    description: "A website for subscribing to the internet in residential areas.",
    tag: "WEB",
  },
  {
    id: 3,
    title: "E-GEOS Mobile",
    image: "/Images/project3.jpg",
    description: "A mobile app for uploading and processing aerial data from the field.",
    tag: "MOBILE",
  },
  {
    id: 4,
    title: "Spicetify",
    image: "/Images/project4.jpg",
    description: "A website for gathering stats from your daily Spotify.",
    tag: "WEB",
  },
];

export default function ProjectSection() {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="px-3 sm:px-6 py-12 sm:py-10 text-white max-w-6xl mx-auto flex flex-col justify-start sm:justify-center sm:min-h-screen"
    >
      <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400 mb-2 text-center">03 / SELECTED QUESTS</p>
      <h2 className="text-lg sm:text-2xl mb-2 tracking-widest text-center">
        PROJECTS
      </h2>
      <p className="text-[8px] sm:text-[9px] text-neutral-500 text-center mb-6 sm:mb-8">CLICK A CARD TO EXPAND</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project, i) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
            className={`cursor-pointer border-2 transition-all duration-200 pixel-panel-sm min-w-0 active:border-yellow-400 ${
              selectedId === project.id
                ? "border-yellow-400 bg-[#1c1c1c]"
                : "border-neutral-700 bg-[#1c1c1c] hover:border-neutral-500 hover:-translate-y-0.5"
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover border-b-2 border-neutral-700"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[8px] text-neutral-500">0{i + 1}</span>
                <span className="text-[8px] px-2 py-1 bg-yellow-400 text-black">{project.tag}</span>
              </div>
              <h3 className="text-[12px] leading-relaxed">{project.title}</h3>

              <AnimatePresence>
                {selectedId === project.id && (
                  <motion.div
                    key={`content-${project.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[10px] leading-loose text-neutral-300 mt-3 pt-3 border-t border-dashed border-neutral-700">{project.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
