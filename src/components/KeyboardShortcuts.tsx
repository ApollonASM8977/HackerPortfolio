// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Page } from '../App';

const SHORTCUTS = [
  { keys: ['G', 'H'], desc: 'Go to Home',       page: 'home'       as Page },
  { keys: ['G', 'A'], desc: 'Go to About',       page: 'about'      as Page },
  { keys: ['G', 'C'], desc: 'Go to Challenges',  page: 'challenges' as Page },
  { keys: ['G', 'P'], desc: 'Go to Projects',    page: 'projects'   as Page },
  { keys: ['G', 'K'], desc: 'Go to Contact',     page: 'contact'    as Page },
];

const MISC = [
  { keys: ['?'],                      desc: 'Show this help' },
  { keys: ['→→↑↑←â†’←â†’', 'B', 'A'],   desc: 'Konami code — ROOT ACCESS' },
  { keys: ['ESC'],                    desc: 'Close overlay / modal' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  navigate: (p: Page) => void;
}

export function KeyboardShortcuts({ open, onClose, navigate }: Props) {
  // global key listener — G+letter combos
  useEffect(() => {
    let gPressed = false;
    let gTimer: ReturnType<typeof setTimeout>;

    const down = (e: KeyboardEvent) => {
      // close on ESC
      if (e.key === 'Escape') { onClose(); return; }
      // open on ?
      if (e.key === '?' && !open) { /* handled in App */ return; }

      if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        gPressed = true;
        clearTimeout(gTimer);
        gTimer = setTimeout(() => { gPressed = false; }, 1200);
        return;
      }
      if (gPressed) {
        const map: Record<string, Page> = { h:'home', a:'about', c:'challenges', p:'projects', k:'contact' };
        const dest = map[e.key.toLowerCase()];
        if (dest) { navigate(dest); gPressed = false; onClose(); }
      }
    };

    window.addEventListener('keydown', down);
    return () => { window.removeEventListener('keydown', down); clearTimeout(gTimer); };
  }, [navigate, onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[99998] flex items-center justify-center px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* panel */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{    scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative z-10 w-full max-w-md hacker-panel p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="mono text-[#00ff41] font-bold text-sm">Keyboard Shortcuts</div>
                <div className="mono text-[#333] text-xs mt-0.5">$ man keyboard</div>
              </div>
              <button onClick={onClose}
                className="text-[#444] hover:text-[#00ff41] transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* navigation shortcuts */}
            <div className="mb-4">
              <div className="mono text-[#333] text-[10px] mb-2 tracking-widest uppercase">Navigation</div>
              <div className="flex flex-col gap-2">
                {SHORTCUTS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { navigate(s.page); onClose(); }}
                    className="flex items-center justify-between group hover:bg-[#0d1117] rounded px-2 py-1.5 transition-colors"
                  >
                    <span className="text-[#666] text-xs group-hover:text-[#aaa] transition-colors">{s.desc}</span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k, j) => (
                        <span key={j}>
                          <kbd className="px-2 py-0.5 rounded border border-[#1a2332] mono text-[10px] text-[#00ff41] bg-[#070b10]">{k}</kbd>
                          {j < s.keys.length - 1 && <span className="text-[#333] text-[10px] mx-0.5">then</span>}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* misc */}
            <div>
              <div className="mono text-[#333] text-[10px] mb-2 tracking-widest uppercase">Other</div>
              <div className="flex flex-col gap-2">
                {MISC.map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-[#666] text-xs">{s.desc}</span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k, j) => (
                        <kbd key={j} className="px-2 py-0.5 rounded border border-[#1a2332] mono text-[10px] text-[#ffcc00] bg-[#070b10]">{k}</kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#0f1923] mono text-[#252525] text-[10px] text-center">
              press ESC or click outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

