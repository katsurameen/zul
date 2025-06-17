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
      className="flex flex-col pt-50 lg:flex-row lg:justify-between lg:items-start gap-10 max-w-7xl mx-auto snap-start min-h-screen items-center justify-center px-6"
    >
      <ProfileContent />
      <ProfileImageLinks />
    </motion.section>
  );
}
