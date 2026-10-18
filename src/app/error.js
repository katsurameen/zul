"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 text-center">
      <p className="inline-block nb-chip bg-[#ff6b6b] px-3 py-1.5 mono-chip text-[13px] uppercase">
        Error
      </p>
      <h1 className="mt-6 font-display text-4xl md:text-6xl uppercase tracking-tight text-balance">
        Something broke.
      </h1>
      <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed">
        This section failed to load. Try again, or head back to the top.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="nb-btn nb-btn-yellow min-h-[52px] px-8 text-base uppercase tracking-wide"
        >
          Try again
        </button>
        <Link
          href="/"
          className="nb-btn nb-btn-white min-h-[52px] px-8 text-base uppercase tracking-wide"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
