import Image from "next/image";

export default function Header({ activeSection, onMenuOpen, isMenuOpen }) {
  const sections = [
    { name: "Profile", id: "profile" },
    { name: "Work", id: "work" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 pt-12 flex items-center justify-between mb-12 sm:mb-20 max-w-7xl mx-auto px-6">
      {/* Desktop Logo only (hidden on mobile) */}
      <div className="hidden sm:flex items-center space-x-6">
        <Image
          src="/Images/zel.png"
          alt="White pixel style letter Z logo"
          width={84}
          height={84}
        />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex space-x-6 text-lg">
        {sections.map(({ name, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`hover:underline transition ${
              activeSection === id ? "text-yellow-400 font-bold" : "text-white"
            }`}
          >
            {name}
          </a>
        ))}
      </nav>

      {/* Burger Menu (mobile only) */}
      {!isMenuOpen && (
        <button
          aria-label="Toggle menu"
          className="sm:hidden z-30 ml-auto"
          onClick={onMenuOpen}
        >
          <svg
            className="w-8 h-8 text-white"
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
    </header>
  );
}
