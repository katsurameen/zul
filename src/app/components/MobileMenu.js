"use client";

import { useEffect } from "react";

const items = ["Profile", "Work", "Projects", "Contact"];

export default function MobileMenu({ isOpen, onClose, activeSection }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const goTo = (e, id) => {
    e.preventDefault();
    onClose();
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] sm:hidden bg-[#fffdf5] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transform transition-all duration-200 ease-in-out ${
        isOpen ? "translate-x-0 visible" : "-translate-x-full invisible"
      }`}
    >
      <div className="shrink-0 flex justify-between items-center px-4 h-16 border-b-[3px] border-black">
        <span className="font-display text-lg uppercase">Menu</span>
        <button
          aria-label="Close menu"
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          className="px-4 min-h-[44px] font-bold uppercase text-sm bg-white border-[3px] border-black shadow-[3px_3px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Close
        </button>
      </div>

      <nav className="flex flex-col px-4 py-4 gap-3" aria-label="Mobile">
        {items.map((item) => {
          const id = item.toLowerCase();
          const active = activeSection === id;
          return (
            <a
              key={item}
              href={`#${id}`}
              onClick={(e) => goTo(e, id)}
              tabIndex={isOpen ? 0 : -1}
              aria-current={active ? "true" : undefined}
              className={`px-4 min-h-[56px] flex items-center font-display text-xl uppercase border-[3px] ${
                active
                  ? "bg-[#ffd23f] border-black shadow-[3px_3px_0_0_#000]"
                  : "bg-white border-black"
              }`}
            >
              {item}
            </a>
          );
        })}
      </nav>

      <div className="px-4 mt-2">
        <a
          href="/Files/CV Zulfa.pdf"
          download
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          className="nb-btn nb-btn-yellow w-full min-h-[52px] text-base uppercase tracking-wide"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}
