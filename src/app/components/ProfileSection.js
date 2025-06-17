"use client";
import ProfileContent from "./ProfileContent";
import ProfileImageLinks from "./ProfileImageLinks";
import { motion } from "framer-motion";

export default function ProfileSection() {
  return (
    <motion.section
      id="profile"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col-reverse lg:flex-row lg:pt-50 items-center lg:items-start justify-center gap-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto snap-start min-h-screen pt-20"
    >
      <ProfileContent />
      <ProfileImageLinks />
    </motion.section>
  );
}