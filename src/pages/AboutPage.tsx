// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { ChevronLeft } from 'lucide-react';
import { AboutSection } from '../components/AboutSection';
import type { Page } from '../App';

export function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 flex items-center gap-4 px-6 py-4
                      border-b border-[#0f1923] bg-[#070b10]/95 backdrop-blur-sm">
        <button className="back-btn" onClick={() => navigate('home')}>
          <ChevronLeft className="w-4 h-4" />home
        </button>
        <span className="text-[#1e2d42] text-xs">·</span>
        <span className="mono text-[#333] text-xs">about_me.sh</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="mono text-[#00ff41] text-xs">Open to opportunities</span>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}

