export default function Header({ activeSection, onMenuOpen, isMenuOpen }) {
  const sections = [
    { name: "Work", id: "work" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fffdf5] border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <a
          href="#profile"
          onClick={(e) => scrollTo(e, "profile")}
          className="flex items-center gap-3"
          aria-label="Back to top"
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ffd23f] border-[3px] border-black shadow-[3px_3px_0_0_#000] font-display text-lg" aria-hidden="true">
            Z
          </span>
          <span className="font-display text-base sm:text-lg tracking-tight hidden min-[420px]:inline">ZULFA SULTHANY</span>
        </a>

        <nav className="hidden sm:flex items-center gap-2" aria-label="Primary">
          {sections.map(({ name, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "true" : undefined}
              onClick={(e) => scrollTo(e, id)}
              className={`px-4 py-2 font-bold uppercase text-sm tracking-wide border-[3px] transition-all ${
                activeSection === id
                  ? "bg-[#ffd23f] border-black shadow-[3px_3px_0_0_#000]"
                  : "border-transparent hover:border-black hover:bg-white"
              }`}
            >
              {name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/Files/CV Zulfa.pdf"
            download
            className="nb-btn nb-btn-yellow hidden sm:inline-flex min-h-[44px] px-5 text-sm uppercase tracking-wide"
          >
            Download CV
          </a>
          {!isMenuOpen && (
            <button
              aria-label="Open menu"
              className="sm:hidden px-4 min-h-[44px] font-bold uppercase text-sm bg-white border-[3px] border-black shadow-[3px_3px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              onClick={onMenuOpen}
            >
              Menu
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
