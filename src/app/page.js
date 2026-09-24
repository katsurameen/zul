"use client"
import { useEffect, useRef, useState } from 'react';
import ProjectSection from './components/ProjectSection';
import WorkSection from './components/WorkSection';
import ProfileSection from './components/ProfileSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import useActiveSection from '@/hooks/useActiveSection';

export default function HomePage() {
  const scrollRef = useRef(null);
  const activeSection = useActiveSection(
    [
      "profile",
      "work",
      "projects",
      "contact",
    ],
    scrollRef
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById("profile");
    if (el) {
      el.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  return (
    <main ref={scrollRef} className={`flex-1 min-h-0 overflow-x-hidden overscroll-contain scroll-hide scroll-pt-24 sm:snap-y sm:snap-proximity ${isMenuOpen ? "overflow-hidden" : "overflow-y-scroll"}`}>
      <Header 
        activeSection={activeSection} 
        onMenuOpen={() => setIsMenuOpen(true)} 
        isMenuOpen={isMenuOpen}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeSection={activeSection} />

      <section id="profile" className="sm:snap-start sm:min-h-screen">
        <ProfileSection />
      </section>
      <section id="work" className="sm:snap-start sm:min-h-screen">
        <WorkSection />
      </section>
      <section id="projects" className="sm:snap-start sm:min-h-screen">
        <ProjectSection />
      </section>
      <section id="contact" className="sm:snap-start sm:min-h-screen">
        <ContactSection />
      </section>
    </main>
  );
}
