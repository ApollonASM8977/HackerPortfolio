// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { text: 'BIOS v2.6 — POST check .......................... [OK]', color: '#444',    ms: 0   },
  { text: '▸ apollon@kali kernel 6.5.0 loading ..............', color: '#00ff41', ms: 180  },
  { text: '▸ Cryptography engine ............................ [OK]', color: '#00ff41', ms: 340  },
  { text: '▸ Network interface eth0 ......................... [OK]', color: '#00ff41', ms: 490  },
  { text: '▸ Security modules (IDS/IPS) ..................... [OK]', color: '#00ff41', ms: 620  },
  { text: '▸ Firewall rules loaded .......................... [OK]', color: '#00ff41', ms: 750  },
  { text: '', color: '', ms: 860 },
  { text: 'Mounting portfolio filesystem ..........', color: '#00d4ff', ms: 900  },
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines]       = useState<typeof LINES>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    LINES.forEach((l, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, l]);
        setProgress(Math.round(((i + 1) / LINES.length) * 100));
      }, l.ms + 100);
    });
    // progress bar fills after lines
    const t1 = setTimeout(() => setProgress(100), 1100);
    const t2 = setTimeout(() => setDone(true),    1500);
    const t3 = setTimeout(onDone,                 1950);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const BAR = Math.min(progress, 100);
  const filled = Math.round(BAR / 5); // 0-20 blocks

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-[#070b10] flex flex-col items-center justify-center px-8"
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.45 }}
    >
      {/* Logo */}
      <div className="mono text-[#00ff41] text-2xl font-bold glow-green mb-8 tracking-widest">
        apollon@portfolio:~$
      </div>

      {/* Boot lines */}
      <div className="w-full max-w-lg hacker-panel px-6 py-5 mono text-xs leading-7 mb-6 min-h-[220px]">
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.color || '#00ff41' }}>{l.text || '\u00A0'}</div>
        ))}
        {lines.length > 0 && !done && (
          <span className="blink text-[#00ff41]">█</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg">
        <div className="flex justify-between mono text-xs text-[#444] mb-1">
          <span>Loading portfolio</span>
          <span className="text-[#00ff41]">{BAR}%</span>
        </div>
        <div className="h-2 bg-[#0d1117] rounded border border-[#1a2332] overflow-hidden">
          <motion.div
            className="h-full rounded"
            style={{ background: 'linear-gradient(90deg, #00ff4166, #00ff41)' }}
            animate={{ width: `${BAR}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="mono text-[#222] text-[10px] mt-2 text-center tracking-widest">
          {'[' + '█'.repeat(filled) + '░'.repeat(20 - filled) + ']'}
        </div>
      </div>

      {/* Skip hint */}
      <button
        onClick={onDone}
        className="mt-6 mono text-[#252525] text-xs hover:text-[#444] transition-colors"
      >
        press any key to skip
      </button>
    </motion.div>
  );
}

