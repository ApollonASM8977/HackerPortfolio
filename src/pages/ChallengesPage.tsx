// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { ChevronLeft } from 'lucide-react';
import { ChallengesSection } from '../components/ChallengesSection';
import { WriteupsSection }   from '../components/WriteupsSection';
import type { Page } from '../App';

export function ChallengesPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 flex items-center gap-4 px-6 py-4
                      border-b border-[#0f1923] bg-[#070b10]/95 backdrop-blur-sm">
        <button className="back-btn" onClick={() => navigate('home')}>
          <ChevronLeft className="w-4 h-4" />home
        </button>
        <span className="text-[#1e2d42] text-xs">·</span>
        <span className="mono text-[#333] text-xs">ctf_challenges.sh</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="mono text-[#00d4ff] text-xs">13 challenges</span>
          <span className="text-[#1e2d42] text-xs">·</span>
          <span className="mono text-[#a855f7] text-xs">4 writeups</span>
        </div>
      </div>
      <ChallengesSection />
      {/* divider */}
      <div className="w-full max-w-3xl mx-auto border-t border-[#0f1923] my-4" />
      <WriteupsSection />
    </div>
  );
}

