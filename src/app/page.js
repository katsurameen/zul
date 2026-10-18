"use client"
import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ProfileSection from './components/ProfileSection';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import SectionDots from './components/SectionDots';
import useActiveSection from '@/hooks/useActiveSection';

// Below-the-fold sections are code-split so their JS does not sit in the
// initial bundle. They are still server-rendered, so there is no layout shift.
const WorkSection = dynamic(() => import('./components/WorkSection'));
const ProjectSection = dynamic(() => import('./components/ProjectSection'));
const CtaSection = dynamic(() => import('./components/CtaSection'));
const ContactSection = dynamic(() => import('./components/ContactSection'));

export default function HomePage() {
  const scrollRef = useRef(null);
  const sectionIds = useMemo(
    () => ["profile", "work", "projects", "contact"],
    []
  );
  const activeSection = useActiveSection(sectionIds, scrollRef);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Reset to the top on a fresh load, but respect deep links (#projects etc.).
    if (!window.location.hash) {
      window.scrollTo({ top: 0 });
    }
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
