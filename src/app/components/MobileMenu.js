export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex justify-end p-6">
        <button aria-label="Close menu" className="text-white w-10 h-10" onClick={onClose}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-8 text-xl hover:underline whitespace-nowrap">
        {["Home", "Work", "Language", "Project", "Contact"].map((item) => (
          <a key={item} href="#" className="hover:underline">{item}</a>
        ))}
      </nav>
    </div>
  );
}
