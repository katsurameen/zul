import Image from "next/image";

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Top bar with logo and close button */}
      <div className="flex justify-between items-center p-6">
        <img src="/Images/zel.png" alt="Z Logo" className="w-12 h-12" />
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="text-white w-10 h-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-center space-y-8 text-xl mt-8">
        {["Profile", "Work", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={onClose}
            className="hover:underline"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}
