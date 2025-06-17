"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress({ scrollRef }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (scrollRef?.current) {
      setTarget(scrollRef.current);
    }
  }, [scrollRef]);

  const { scrollYProgress } = useScroll({
    container: target ?? undefined,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
        style={{ scaleX }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-11/12 sm:w-3/4 bg-red-500 origin-left z-50 rounded-full"
    />
  );
}