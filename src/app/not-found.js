import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 text-center">
      <p className="inline-block nb-chip bg-[#ffd23f] px-3 py-1.5 mono-chip text-[13px] uppercase">
        404
      </p>
      <h1 className="mt-6 font-display text-4xl md:text-6xl uppercase tracking-tight text-balance">
        Page not found.
      </h1>
      <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="nb-btn nb-btn-yellow mt-8 min-h-[52px] px-8 text-base uppercase tracking-wide"
      >
        Back home
      </Link>
    </div>
  );
}
