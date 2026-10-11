'use client';

const columns = [
  {
    title: "Navigate",
    links: [
      { name: "Profile", href: "#profile" },
      { name: "Work", href: "#work" },
      { name: "Projects", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { name: "GitHub", href: "https://github.com/katsurameen" },
      { name: "LinkedIn", href: "https://linkedin.com/in/zulfasulthany" },
      { name: "Instagram", href: "https://instagram.com/zlf_sltn" },
    ],
  },
  {
    title: "Files",
    links: [{ name: "Download CV", href: "/Files/CV Zulfa.pdf" }],
  },
];

export default function LayoutShell({ children }) {
  return (
    <div className="min-h-dvh flex flex-col bg-[#fffdf5] text-black">
      <a href="#profile" className="skip-link">
        Skip to content
      </a>
      {children}
      <footer className="border-t-[3px] border-black mt-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-lg uppercase">Zulfa Sulthany</p>
            <p className="mt-2 max-w-[36ch] leading-relaxed">
              Backend developer based in Bandung, Indonesia.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer ${col.title}`}>
              <p className="font-bold uppercase text-sm tracking-wide">{col.title}</p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="font-medium underline decoration-2 underline-offset-4 hover:bg-[#ffd23f]"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-t-[3px] border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between mono-chip text-[13px] uppercase">
            <span>© 2026 Zulfa Sulthany</span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
