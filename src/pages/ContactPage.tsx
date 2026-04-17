// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { ChevronLeft } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';
import type { Page } from '../App';

export function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="relative z-10 min-h-screen w-full">

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 flex items-center gap-4 px-6 py-4
                      border-b border-[#0f1923] bg-[#070b10]/95 backdrop-blur-sm">
        <button className="back-btn" onClick={() => navigate('home')}>
          <ChevronLeft className="w-4 h-4" />
          home
        </button>
        <span className="text-[#1e2d42] text-xs">·</span>
        <span className="mono text-[#333] text-xs">contact.sh</span>

        <div className="ml-auto">
          <span className="mono text-[#ffcc00] text-xs">Available</span>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="w-full">
        <ContactSection />
      </div>
    </div>
  );
}
