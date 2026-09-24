export default function ProfileContent() {
  const stack = ["Flutter", "React Native", "Next.js", "Python"];
  return (
    <section className="lg:flex-1 w-full min-w-0 text-left sm:text-justify leading-relaxed space-y-4 sm:space-y-6 px-0 max-sm:bg-[#1c1c1c] max-sm:border-2 max-sm:border-neutral-700 max-sm:p-4">
      <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400">
        <span className="text-yellow-400">LV.24</span> / JUNIOR BACKEND DEVELOPER
      </p>
      <h1 className="text-[15px] sm:text-xl lg:text-2xl leading-[2] sm:leading-snug text-left text-balance">
        Hi, I’m Zulfa! I’m a{' '}
        <span className="text-yellow-400">backend developer</span> based in{' '}
        <span className="text-yellow-400">Bandung, Indonesia</span>.
      </h1>

      {/* Compact bio for mobile */}
      <p className="sm:hidden text-[10px] leading-loose text-neutral-300">
        I build backend systems with clean architecture. Previously mobile apps.
      </p>

      {/* Full bio for sm and up */}
      <p className="hidden sm:block text-[11px] leading-loose text-neutral-300 text-justify">
        Informatics background, focused on clean architecture and reliable
        products people enjoy using. When I’m not coding, I explore tech trends
        and add humor to projects.
      </p>

      <div className="flex flex-wrap gap-2 justify-start">
        {stack.map((s) => (
          <span key={s} className="text-[8px] sm:text-[9px] px-2.5 sm:px-3 py-2 border-2 border-neutral-700 bg-[#1a1a1a] text-neutral-200">
            {s}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        {[
          ["2+", "YEARS"],
          ["4", "PROJECTS"],
          ["6", "ROLES"],
        ].map(([n, l]) => (
          <div key={l} className="border-2 border-neutral-700 bg-[#1a1a1a] px-1 sm:px-2 py-3 text-center min-w-0">
            <p className="text-sm text-yellow-400">{n}</p>
            <p className="text-[7px] sm:text-[8px] text-neutral-400 mt-1 truncate">{l}</p>
          </div>
        ))}
      </div>

      <div className="pt-1 sm:pt-2 flex justify-start">
        <a
          href="/Files/CV Zulfa.pdf"
          download
          className="pixel-btn inline-flex items-center justify-center min-h-[48px] w-full sm:w-auto bg-[#ff004d] text-white text-[11px] px-6 border-2 border-white font-pixel hover:bg-[#ff3366] active:bg-[#ff3366]"
        >
          Download CV
        </a>
      </div>

    </section>
  );
}
