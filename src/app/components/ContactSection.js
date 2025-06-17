"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-start px-6 py-8 pt-50 text-white max-w-7xl mx-auto scroll-mt-2"
    >
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 tracking-widest">
        CONTACT ME
      </h2>

      <div className="w-full flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <textarea
            placeholder="Your message"
            className="w-full h-64 p-4 bg-white text-black rounded-sm resize-none text-base outline-none"
          />
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <label className="block mb-2 text-white">Fullname</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-sm text-white outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-2 text-white">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-sm text-white outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <button className="w-full px-4 py-3 rounded-sm border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-200">
              Send message
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
