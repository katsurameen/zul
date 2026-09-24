import Image from "next/image";

export default function Header({ activeSection, onMenuOpen, isMenuOpen }) {
  const sections = [
    { name: "Profile", id: "profile" },
    { name: "Work", id: "work" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-8 max-w-7xl mx-auto px-1 sm:px-6">
      <div className="pixel-panel-sm flex items-center justify-between bg-[#1a1a1a] border-2 border-neutral-700 px-3 sm:px-6 py-2 sm:py-3">
      {/* Logo (compact on mobile, full on desktop) */}
      <div className="flex items-center gap-3">
        <Image
          src="/Images/zel.png"
          alt="White pixel style letter Z logo"
          width={44}
          height={44}
          className="w-8 h-8 sm:w-11 sm:h-11"
        />
        <span className="text-[10px] text-neutral-400 hidden lg:inline">ZUMA.WAHIB</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center gap-2 text-[11px]">
        {sections.map(({ name, id }, i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-3 py-2 border-2 transition ${
              activeSection === id
                ? "bg-yellow-400 text-black border-yellow-400"
                : "text-neutral-300 border-transparent hover:border-neutral-600 hover:text-white"
            }`}
          >
            <span className="text-neutral-500 mr-2">0{i + 1}</span>
            {name}
          </a>
        ))}
      </nav>

      {/* Burger Menu (mobile only, labelled + 44px target) */}
      {!isMenuOpen && (
        <button
          aria-label="Open menu"
          className="sm:hidden z-30 ml-auto flex items-center gap-2 px-3 min-h-[44px] border-2 border-neutral-700 bg-[#1a1a1a] text-[10px] text-white active:border-yellow-400"
          onClick={onMenuOpen}
        >
          MENU
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      </div>
    </header>
  );
}
