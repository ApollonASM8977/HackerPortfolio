// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const LEVELS = [
  {
    ciphertext: 'KHOOR ZRUOG â€” FUBSWRJUDSKB LV IXQ',
    answer: 'HELLO WORLD â€” CRYPTOGRAPHY IS FUN',
    hint: 'ROT-3 (Caesar\'s classic shift)',
    shift: 3,
  },
  {
    ciphertext: 'CMP TMKCZQ AW JZMIYCPD KWVBZWT WN BPM AMKZMB NTIOP',
    answer: 'THE HACKERS WHO BREACHED CONTROL OF THE SECRET FLAGP',
    hint: 'Try a larger shift...',
    shift: 8,
  },
  {
    ciphertext: 'YSK{n3p_v3a0k_z0r_xvgu_p3r_pvcure}',
    answer: 'FLAG{y0u_h4ck3d_th1s_w1th_c3s_c1pher}',
    hint: 'Flag format: FLAG{...} â€” brute force the shift!',
    shift: 10,
  },
];

function caesar(text: string, shift: number): string {
  return text.split('').map(ch => {
    if (ch >= 'A' && ch <= 'Z') return String.fromCharCode(((ch.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
    if (ch >= 'a' && ch <= 'z') return String.fromCharCode(((ch.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
    return ch;
  }).join('');
}

export function CaesarChallenge({ onSolve }: { onSolve: () => void }) {
  const [level, setLevel] = useState(0);
  const [shift, setShift] = useState(0);
  const [solved, setSolved] = useState<boolean[]>([false, false, false]);
  const [showHint, setShowHint] = useState(false);

  const current = LEVELS[level];
  const decoded = caesar(current.ciphertext, shift);
  const isCorrect = decoded.toUpperCase() === current.answer.toUpperCase();

  const handleShiftChange = (val: number) => {
    setShift(val);
    const dec = caesar(current.ciphertext, val);
    if (dec.toUpperCase() === current.answer.toUpperCase()) {
      const newSolved = [...solved];
      newSolved[level] = true;
      setSolved(newSolved);
      if (newSolved.every(Boolean)) { setTimeout(onSolve, 500); }
    }
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      {/* Level selector */}
      <div className="flex gap-2">
        {LEVELS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setLevel(i); setShift(0); setShowHint(false); }}
            className={`px-3 py-1 text-xs rounded border transition-all ${
              level === i
                ? 'border-[#00ff41] text-[#00ff41]'
                : solved[i]
                ? 'border-[#00ff4133] text-[#00ff4166]'
                : 'border-[#1a2332] text-[#666]'
            }`}
          >
            {solved[i] ? 'âœ“ ' : ''}Level {i + 1}
          </button>
        ))}
      </div>

      {/* Ciphertext */}
      <div className="bg-black rounded p-3 border border-[#1a2332]">
        <div className="text-[#666] text-xs mb-1">CIPHERTEXT:</div>
        <div className="text-[#ff6b6b] font-bold tracking-wider break-all">{current.ciphertext}</div>
      </div>

      {/* Shift slider */}
      <div>
        <div className="flex justify-between text-xs text-[#666] mb-1">
          <span>Shift: <span className="text-[#ffcc00]">{shift}</span></span>
          <button
            onClick={() => { setShift(0); }}
            className="text-[#666] hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
        <input
          type="range" min="0" max="25" value={shift}
          onChange={e => handleShiftChange(Number(e.target.value))}
          className="w-full accent-green-400"
        />
        <div className="flex justify-between text-xs text-[#333] mt-0.5">
          <span>0</span><span>25</span>
        </div>
      </div>

      {/* Decoded */}
      <div className={`bg-black rounded p-3 border transition-all ${isCorrect ? 'border-[#00ff41] shadow-sm shadow-green-500/20' : 'border-[#1a2332]'}`}>
        <div className="text-[#666] text-xs mb-1">DECODED:</div>
        <div className={`font-bold tracking-wider break-all ${isCorrect ? 'text-[#00ff41] glow-green' : 'text-[#aaa]'}`}>
          {decoded}
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-[#666] hover:text-[#ffcc00] border border-[#1a2332] px-3 py-1 rounded transition-all"
        >
          {showHint ? 'Hide hint' : 'ðŸ’¡ Show hint'}
        </button>
        {isCorrect && <span className="text-[#00ff41] text-xs font-bold animate-pulse">âœ“ CORRECT! Shift = {shift}</span>}
      </div>

      {showHint && (
        <div className="text-xs text-[#ffcc00] bg-[#1a1500] border border-[#ffcc0033] rounded p-2">
          ðŸ’¡ {current.hint}
        </div>
      )}

      {solved.every(Boolean) && (
        <div className="text-center text-[#00ff41] font-bold glow-green py-2">
          ðŸŽ‰ ALL LEVELS SOLVED! Master cryptanalyst!
        </div>
      )}
    </div>
  );
}

