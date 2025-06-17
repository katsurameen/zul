export default function ProfileContent() {
  return (
    <section className="lg:flex-1 text-base leading-relaxed text-justify space-y-6 px-2 sm:px-0 w-full">
      {/* Short preview for mobile */}
      <p className="sm:hidden">
        Hi, I’m Zulfa! I’m a{' '}
        <span className="text-yellow-400">mobile app developer</span> based in{' '}
        <span className="text-yellow-400">Bandung</span>.
      </p>

      {/* Full first paragraph for sm and up */}
      <p className="hidden sm:block">
        Hi, I’m Zulfa! I’m a{' '}
        <span className="text-yellow-400">mobile app developer</span> passionate about
        building intuitive and impactful digital experiences. Based in{' '}
        <span className="text-yellow-400">Bandung, Indonesia</span>, I specialize in
        developing applications with clean architecture. With a
        background in Informatics, I love turning ideas into reliable,
        user-friendly products.
      </p>

      {/* Only shown on larger screens */}
      <p className="hidden sm:block">
        When I’m not coding, you’ll probably find me exploring the latest tech
        trends or adding a touch of humor to my projects–because I believe
        creativity and a bit of fun go a long way.
      </p>

      <div className="pt-4 flex justify-center sm:justify-start">
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
