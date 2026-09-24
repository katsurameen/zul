"use client";
import ProfileContent from "./ProfileContent";
import ProfileImageLinks from "./ProfileImageLinks";
import { motion } from "framer-motion";

export default function ProfileSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-center lg:items-center justify-start sm:justify-center gap-10 lg:gap-16 px-3 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto sm:snap-start py-8 sm:py-10 sm:min-h-[calc(100vh-140px)]"
    >
      <ProfileImageLinks />
      <ProfileContent />
    </motion.section>
  );
}