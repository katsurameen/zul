"use client";
import ProjectSection from './components/ProjectSection';
import WorkSection from './components/WorkSection';
import ProfileSection from './components/ProfileSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import useActiveSection from '@/hooks/useActiveSection';
import { useState } from 'react';

export default function HomePage() {
  const activeSection = useActiveSection([
    "profile",
    "work",
    "projects",
    "contact",
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="snap-y snap-mandatory overflow-y-scroll h-screen scroll-hide">
      <Header activeSection={activeSection} onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <section id="profile" className="snap-start min-h-screen">
        <ProfileSection />
      </section>
      <section id="work" className="snap-start min-h-screen">
        <WorkSection />
      </section>
      <section id="projects" className="snap-start min-h-screen">
        <ProjectSection />
      </section>
      <section id="contact" className="snap-start min-h-screen">
        <ContactSection />
      </section>
    </main>
  );
}
