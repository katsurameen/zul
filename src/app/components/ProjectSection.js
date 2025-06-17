"use client";

import { motion } from "framer-motion";

export default function ProjectSection() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-start px-6 py-8 pt-50 text-white max-w-7xl mx-auto scroll-mt-20"
    >
        <div>
            soon
        </div>
    </motion.section>
  );
}
