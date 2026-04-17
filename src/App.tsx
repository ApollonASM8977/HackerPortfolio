// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import './index.css';
import { MatrixRain }        from './components/MatrixRain';
import { Navbar }            from './components/Navbar';
import { HeroTerminal }      from './components/HeroTerminal';
import { AboutSection }      from './components/AboutSection';
import { ChallengesSection } from './components/ChallengesSection';
import { ProjectsSection }   from './components/ProjectsSection';
import { ContactSection }    from './components/ContactSection';

export default function App() {
  return (
    <div className="scanlines relative min-h-screen bg-[#0a0a0a]">
      <MatrixRain />
      <Navbar />
      <main className="relative z-10">
        <HeroTerminal />
        <AboutSection />
        <ChallengesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
