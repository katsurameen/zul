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
      className={`fixed inset-0 z-[60] sm:hidden bg-black/[0.96] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0 visible" : "-translate-x-full invisible"
      }`}
    >
      {/* Top bar with logo and close button */}
      <div className="shrink-0 flex justify-between items-center px-4 py-3 border-b-2 border-neutral-800">
        <img src="/Images/zel.png" alt="Z Logo" className="w-10 h-10" />
        <button
          aria-label="Close menu"
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          className="flex items-center gap-2 text-white text-[10px] px-3 min-h-[44px] min-w-[44px] border-2 border-neutral-700 active:border-yellow-400 active:text-yellow-400"
        >
          CLOSE
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-stretch px-6 gap-3 mt-6">
        {items.map((item, i) => {
          const id = item.toLowerCase();
          const active = activeSection === id;
          return (
            <a
              key={item}
              href={`#${id}`}
              onClick={(e) => goTo(e, id)}
              tabIndex={isOpen ? 0 : -1}
              aria-current={active ? "true" : undefined}
              className={`flex items-center gap-3 px-4 min-h-[56px] border-2 transition-colors active:border-yellow-400 active:text-yellow-400 ${
                active
                  ? "border-yellow-400 text-yellow-400 bg-[#1c1c1c]"
                  : "border-neutral-700 bg-[#1a1a1a] text-white"
              }`}
            >
              <span className={`text-[10px] ${active ? "text-yellow-400" : "text-neutral-500"}`}>
                0{i + 1}
              </span>
              {item}
            </a>
          );
        })}
      </nav>

      {/* Primary action */}
      <div className="px-6 mt-6">
        <a
          href="/Files/CV Zulfa.pdf"
          download
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          className="pixel-btn flex items-center justify-center min-h-[52px] w-full bg-[#ff004d] text-white text-[11px] border-2 border-white hover:bg-[#ff3366] active:bg-[#ff3366]"
        >
          Download CV
        </a>
      </div>

      {/* Footer */}
      <p className="mt-auto px-6 pt-6 text-[8px] tracking-widest text-neutral-600">
        ZUMA.WAHIB / PORTFOLIO v1.0
      </p>
    </div>
  );
}
