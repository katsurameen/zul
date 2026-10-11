"use client"
import { useEffect, useRef, useState } from 'react';
import ProjectSection from './components/ProjectSection';
import WorkSection from './components/WorkSection';
import ProfileSection from './components/ProfileSection';
import ContactSection from './components/ContactSection';
import CtaSection from './components/CtaSection';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import SectionDots from './components/SectionDots';
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
    document.getElementById("profile")?.scrollIntoView({ behavior: "auto" });
  }, []);

  return (
    <main ref={scrollRef} className="flex-1 w-full">
      <Header
        activeSection={activeSection}
        onMenuOpen={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeSection={activeSection} />
      {!isMenuOpen && <SectionDots activeSection={activeSection} />}

      <section id="profile" className="scroll-mt-20">
        <ProfileSection />
      </section>
      <section id="work" className="scroll-mt-20">
        <WorkSection />
      </section>
      <section id="projects" className="scroll-mt-20">
        <ProjectSection />
      </section>
      <CtaSection />
      <section id="contact" className="scroll-mt-20">
        <ContactSection />
      </section>
    </main>
  );
}
