// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID = [
  ['C','h','x','q','z','w','m','p','b'],
  ['n','T','k','r','o','s','j','v','u'],
  ['y','l','F','d','e','t','a','i','c'],
  ['g','q','w','{','k','x','n','m','h'],
  ['r','o','p','z','d','j','s','b','e'],
  ['u','v','t','a','c','1','w','y','n'],
  ['b','m','h','e','l','f','4','o','k'],
  ['i','k','c','j','r','n','q','g','x'],
  ['s','x','d','p','w','m','a','u','}'],
];

const LEVELS = [
  {
    title: 'Level 1 — Acrostic',
    flag: 'FLAG{4cr0st1c_sp34k}',
    check: (a: string) => a.toUpperCase() === 'FLAG' || a.toLowerCase() === 'flag{4cr0st1c_sp34k}',
    hint: 'Read only the FIRST letter of each line.',
  },
  {
    title: 'Level 2 — Matrix Diagonal',
    flag: 'CTF{d14g}',
    check: (a: string) => a.toLowerCase() === 'ctf{d14g}',
    hint: 'Read the diagonal from top-left to bottom-right.',
  },
  {
    title: 'Level 3 — Position Pattern',
    flag: 'FLAG{st3g_m4st3r}',
    check: (a: string) => a.toLowerCase() === 'flag{st3g_m4st3r}',
    hint: 'Extract chars at positions 3, 9, 15, 20 (0-indexed) from the string below.',
  },
];

const POEM_LINES = [
  'Firewalls are the first line of defense.',
  'Linux is the preferred OS for researchers.',
  'Always verify before trusting any input.',
  'Great hackers think outside the box.',
];

const STEG_STRING = 'abcSxxxxxTxxxxxExxxxGabcdef';

export function SteganographyChallenge({ onSolve }: { onSolve: () => void }) {
  const [level, setLevel]   = useState(0);
  const [input, setInput]   = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [showHint, setShowHint] = useState(false);

  const verify = () => {
    if (LEVELS[level].check(input.trim())) {
      setStatus('ok');
      setTimeout(() => {
        if (level === LEVELS.length - 1) { onSolve(); return; }
        setLevel(l => l + 1);
        setInput(''); setStatus('idle'); setShowHint(false);
      }, 1200);
    } else {
      setStatus('err');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  const current = LEVELS[level];

  return (
    <div className="flex flex-col gap-4">
      {/* progress */}
      <div className="flex gap-2">
        {LEVELS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded transition-all duration-500 ${level > i ? 'bg-[#00ff41]' : i === level ? 'bg-[#00ff4166]' : 'bg-[#1a2332]'}`} />
        ))}
      </div>

      <div className="text-[#00d4ff] text-xs mono">{current.title}</div>

      {/* ── Level content ─── */}
      <AnimatePresence mode="wait">
        <motion.div key={level} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

          {level === 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-[#555] text-xs">Read the first letter of each line to find the hidden word.</p>
              <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 mono text-xs">
                {POEM_LINES.map((line, i) => (
                  <div key={i} className="leading-7">
                    <span className="text-[#00ff41] font-bold">{line[0]}</span>
                    <span className="text-[#555]">{line.slice(1)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#444] text-xs">Enter the 4-letter hidden word, then the full flag: <span className="text-[#666]">FLAG{'{'}&hellip;{'}'}</span></p>
            </div>
          )}

          {level === 1 && (
            <div className="flex flex-col gap-3">
              <p className="text-[#555] text-xs">A flag is hidden in this 9Ã—9 grid. Find the pattern.</p>
              <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 mono text-xs overflow-x-auto">
                {GRID.map((row, ri) => (
                  <div key={ri} className="flex gap-2 leading-7">
                    {row.map((cell, ci) => (
                      <span
                        key={ci}
                        className={`w-4 text-center ${ri === ci ? 'text-[#00ff41] font-bold' : 'text-[#333]'}`}
                      >
                        {ri === ci ? `[${cell}]` : cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-[#444] text-xs">Enter the flag you see in the highlighted positions.</p>
            </div>
          )}

          {level === 2 && (
            <div className="flex flex-col gap-3">
              <p className="text-[#555] text-xs">Extract characters at specific positions from this string:</p>
              <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 mono text-xs">
                <div className="text-[#00ff41] tracking-widest">{STEG_STRING}</div>
                <div className="text-[#333] tracking-widest">
                  {[...Array(STEG_STRING.length).keys()].map(i =>
                    i.toString().padStart(1, '0')
                  ).join(' ')}
                </div>
                <div className="text-[#ffcc00] mt-2">Extract positions: 3, 9, 15, 20</div>
                <div className="text-[#555] mt-1">
                  [{STEG_STRING[3]}] [{STEG_STRING[9]}] [{STEG_STRING[15]}] [{STEG_STRING[20]}] ↑ ?
                </div>
              </div>
              <p className="text-[#444] text-xs">The letters spell a word. Enter: <span className="text-[#666]">FLAG{'{st3g_m4st3r}'}</span></p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* hint */}
      <button
        onClick={() => setShowHint(h => !h)}
        className="text-[#444] hover:text-[#ffcc00] text-xs mono transition-colors text-left"
      >
        {showHint ? 'â–¾' : 'â–¸'} Hint
      </button>
      {showHint && <p className="text-[#ffcc00] text-xs mono">{current.hint}</p>}

      {/* input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && verify()}
          placeholder="Enter your answer..."
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41]
                     mono text-xs flex-1 outline-none focus:border-[#00ff4166]"
        />
        <button
          onClick={verify}
          className="px-4 py-2 border border-[#1a2332] text-[#aaa] hover:text-white
                     hover:border-[#00ff4155] rounded mono text-xs transition-colors"
        >
          Verify
        </button>
      </div>

      {status === 'ok'  && <p className="text-[#00ff41] text-xs mono">✓ Correct! Flag found: {current.flag}</p>}
      {status === 'err' && <p className="text-[#ff4444] text-xs mono">âœ— Incorrect. Try again.</p>}
    </div>
  );
}

