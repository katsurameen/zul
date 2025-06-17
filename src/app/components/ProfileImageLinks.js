const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/zlf_sltn" },
  { name: "Github", url: "https://github.com/katsurameen" },
  { name: "LinkedIn", url: "https://linkedin.com/in/zulfasulthany" },
];

export default function ProfileImageLinks() {
  return (
    <section className="flex flex-col items-center space-y-6 w-full sm:w-auto">
      <img
        src="/Images/zul.jpg"
        alt="Profile"
        className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded"
      />

      <div className="flex flex-col items-center space-y-3 text-lg text-white w-full max-w-xs">
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-center hover:text-red-400 transition"
          >
            {item.name}s
          </a>
        ))}
      </div>

      
    </section>
  );
}
