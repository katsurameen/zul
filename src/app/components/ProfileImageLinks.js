const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/zlf_sltn" },
  { name: "Github", url: "https://github.com/katsurameen" },
  { name: "LinkedIn", url: "https://linkedin.com/in/zulfasulthany" },
];

export default function ProfileImageLinks() {
  return (
    <section className="flex flex-col items-center space-y-6 sm:space-y-8 w-full sm:w-auto">
      <img
        src="/Images/zul.jpg"
        alt="Profile"
        className="w-48 h-48 object-cover rounded"
      />
      <div className="flex flex-col space-y-4 text-lg w-full max-w-xs sm:max-w-none text-white">
        {socialLinks.map((item) => (
            <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-center sm:text-left block"
            >
            {item.name}
            </a>
        ))}
        </div>
        <div className="flex justify-center pt-6">
            <a
            href="/Files/CV Zulfa.pdf"
            download
            className="bg-[#ff004d] text-white text-sm px-6 py-3 border-4 border-white rounded-sm hover:bg-[#ff3366] transition-all duration-200 font-pixel"
            >
            Download CV
            </a>
        </div>
        </section>
  );
}
