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
      className="min-h-screen flex flex-col justify-start pt-20 sm:pt-0 lg:pt-50 px-4 sm:px-6 py-10 text-white max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="flex flex-col lg:flex-row gap-12 w-full">
        {/* Work Section */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">- Work -</h2>
          <div className="space-y-8">
            {/* Job 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm pb-2">
                <p className="font-semibold">Orchid Cluster</p>
                <p className="text-gray-300">Mar 2024 - Apr 2024</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                <p className="text-gray-300 underline">Software Engineer</p>
                <p className="text-gray-400 sm:ml-4">(Part time)</p>
              </div>
            </div>

            {/* Job 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm pb-2 pt-4">
                <p className="font-semibold">PT. EGEOS</p>
                <p className="text-gray-300">Sep 2023 - Jan 2024</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                <p className="text-gray-300 underline">Mobile App Developer</p>
                <p className="text-gray-400 sm:ml-4">(Internship)</p>
              </div>
            </div>

            {/* Job 3 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm pb-2 pt-4">
                <p className="font-semibold">PT. Kotak Pintar</p>
                <p className="text-gray-300">Jun 2023 - Aug 2023</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                <p className="text-gray-300 underline">Mobile App Developer</p>
                <p className="text-gray-400 sm:ml-4">(Internship)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Section */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">- Other -</h2>
          <div className="space-y-8">
            {/* Other 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm pb-2">
                <p className="font-semibold">ITENAS</p>
                <p className="text-gray-300">Feb 2024 - Jul 2024</p>
              </div>
              <p className="underline text-gray-300 text-sm">
                Machine Learning Lab Assistant
              </p>
            </div>

            {/* Other 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm pb-2">
                <p className="font-semibold">ITENAS</p>
                <p className="text-gray-300">Feb 2024 - Jul 2024</p>
              </div>
              <p className="underline text-gray-300 text-sm">
                Robotics Lab Assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
