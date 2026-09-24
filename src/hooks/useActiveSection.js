"use client";
import { useEffect, useRef, useState } from "react";

export default function useActiveSection(sectionIds, rootRef) {
  const [activeSection, setActiveSection] = useState("profile");
  const visibleRef = useRef({});

  useEffect(() => {
    const observerOptions = {
      root: rootRef?.current ?? null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visibleRef.current[entry.target.id] = entry.isIntersecting;
      }
      // Pick the deepest visible section in document order so a shared
      // boundary never resolves to the section above (e.g. Work over Projects).
      const visible = sectionIds.filter((id) => visibleRef.current[id]);
      if (visible.length > 0) {
        setActiveSection(visible[visible.length - 1]);
      }
    }, observerOptions);

    const elements = sectionIds.map((id) => document.getElementById(id));
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
