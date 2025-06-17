"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const projects = [
  {
    id: 1,
    title: "Palm Tree Health Detection",
    image: "/images/project/project1.jpg",
    description: "Detecting palm tree health using Mask R-CNN and NDVI in aerial imagery.",
  },
  {
    id: 2,
    title: "ORLINK",
    image: "/images/project/project2.jpg",
    description: "A Website for subscribe to the internet in residential areas.",
  },
  {
    id: 3,
    title: "E-GEOS Mobile",
    image: "/images/project/project3.jpg",
    description: "A mobile app for uploading and processing data aerial from field.",
  },
  {
    id: 4,
    title: "Spicetify",
    image: "/images/project/project4.jpg",
    description: "A Website for gathering statistic from your daily spotify.",
  },
];

export default function ProjectSection() {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="min-h-screen px-4 pt-20 sm:pt-0 sm:px-6 py-10 lg:pt-50 text-white max-w-7xl mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 tracking-widest text-center">
        PROJECTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
            className="cursor-pointer p-4 border border-gray-700 rounded-md bg-white text-black transition-all duration-300"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>

            <AnimatePresence>
              {selectedId === project.id && (
                <motion.div
                  key={`content-${project.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-sm mb-4"
                  />
                  <p>{project.description}</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ))}
      </div>
    </section>
  );
}
