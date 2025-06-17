"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-start pt-20 sm:pt-0 px-4 sm:px-6 py-10 lg:pt-50 text-white max-w-7xl mx-auto scroll-mt-20"

    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 tracking-widest text-center sm:text-left">
        CONTACT ME
      </h2>

      <form className="w-full flex flex-col lg:flex-row gap-10">
        {/* Message box */}
        <div className="flex-1">
          <label className="block mb-2 text-white">Message</label>
          <textarea
            placeholder="Your message"
            className="w-full h-64 p-4 bg-white text-black rounded-sm resize-none text-base outline-none border border-gray-300"
          />
        </div>

        {/* Name, email, and button */}
        <div className="flex-1 space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-white">
              Fullname
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-sm text-black outline-none bg-white border border-gray-300"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-sm text-black outline-none bg-white border border-gray-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-sm border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </motion.section>
  );
}
