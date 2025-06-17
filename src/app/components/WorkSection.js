"use client";

import { motion } from "framer-motion";

export default function WorkSection() {
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="min-h-screen flex flex-col justify-start px-6 py-8 pt-50 text-white max-w-7xl mx-auto scroll-mt-20"
    >
        <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">-Work-</h2>
          <div className="space-y-6">
            <div>
            <div className="flex justify-between text-sm pb-5">
                <p className="font-semibold">Orchid Cluster</p>
                <p className="text-gray-300">Mar 2024 - Apr 2024</p>
            </div>  
            <div className="flex justify-between text-sm">
                <p className="text-gray-300"><u>Software Engineer</u></p>
                <p className="text-gray-400 ml-4">(Part time)</p>
            </div>
            </div>
            <div>
            <div className="flex justify-between text-sm pb-5 pt-8">
                <p className="font-semibold">PT. EGEOS</p>
                <p className="text-gray-300">Sep 2023 - Jan 2024</p>
            </div>  
            <div className="flex justify-between text-sm">
                <p className="text-gray-300"><u>Mobile App Developer</u></p>
                <p className="text-gray-400 ml-4">(Internship)</p>
            </div>
            </div>

            <div>
            <div className="flex justify-between text-sm pb-5 pt-8">
                <p className="font-semibold">PT. Kotak Pintar</p>
                <p className="text-gray-300">Jun 2023 - Aug 2023</p>
            </div>  
            <div className="flex justify-between text-sm">
                <p className="text-gray-300"><u>Mobile App Developer</u></p>
                <p className="text-gray-400 ml-4">(Internship)</p>
            </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">-Other-</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm pb-5">
                <p className="font-semibold">ITENAS</p>
                <p className="text-gray-300">Feb 2024 - Jul 2024</p>
              </div>  
              <p><u>Machine Learning Lab Assistant</u></p>
            </div>

            <div>
              <div className="flex justify-between text-sm pb-5">
                <p className="font-semibold">ITENAS</p>
                <p className="text-gray-300">Feb 2024 - Jul 2024</p>
              </div>  
              <p><u>Robotics Lab Assistant</u></p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
