"use client"
import { useEffect, useState } from 'react';
import ProjectSection from './components/ProjectSection';
import WorkSection from './components/WorkSection';
import ProfileSection from './components/ProfileSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import useActiveSection from '@/hooks/useActiveSection';

export default function HomePage() {
  const activeSection = useActiveSection([
    "profile",
    "work",
    "projects",
    "contact",
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById("profile");
    if (el) {
      el.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  return (
    <main className="snap-y snap-mandatory overflow-y-scroll h-screen scroll-hide">
      <Header 
        activeSection={activeSection} 
        onMenuOpen={() => setIsMenuOpen(true)} 
        isMenuOpen={isMenuOpen}
      />
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
