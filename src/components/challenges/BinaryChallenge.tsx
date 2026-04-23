// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState } from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LevelType = 'binary' | 'hex';

interface Level {
  type: LevelType;
  encoded: string;
  answer: string;
  label: string;
  hint: string;
  successMsg: string;
}

const LEVELS: Level[] = [
  {
    type: 'binary',
    encoded: '01000011 01010100 01000110',
    answer: 'CTF',
    label: 'Convert binary to ASCII text',
    hint: 'Each 8-bit group = 1 ASCII character. 01000011 = 67 = C',
    successMsg: 'Binary decoded! 3 chars, easy mode.',
  },
  {
    type: 'binary',
    encoded:
      '01000110 01001100 01000001 01000111 01111011 01100010 00110001 01101110 00110100 01110010 01111101',
    answer: 'FLAG{b1n4r}',
    label: 'Decode the full flag from binary',
    hint: 'Convert each byte: 01000110=70=F, 01001100=76=L, 01000001=65=A…',
    successMsg: 'Flag captured! Binary fluency unlocked.',
  },
  {
    type: 'hex',
    encoded: '53 45 43 7B 68 33 78 5F 6D 34 73 74 33 72 7D',
    answer: 'SEC{h3x_m4st3r}',
    label: '[HEX] Decode the hex bytes to ASCII',
    hint: 'Hex to ASCII: 53=S, 45=E, 43=C, 7B={, 68=h… use parseInt("53",16)=83=S',
    successMsg: 'HEX master! All encoding types defeated.',
  },
];

export function BinaryChallenge({ onSolve }: { onSolve: () => void }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [levelSolved, setLevelSolved] = useState([false, false, false]);
  const [showHint, setShowHint] = useState(false);

  const current = LEVELS[levelIndex];
  const solvedCount = levelSolved.filter(Boolean).length;

  const handleSubmit = () => {
    const correct = input.trim() === current.answer;

    if (correct) {
      const newSolved = [...levelSolved];
      newSolved[levelIndex] = true;
      setLevelSolved(newSolved);
      setFeedback('correct');
      const newCount = newSolved.filter(Boolean).length;

      if (newCount === 3) {
        setTimeout(onSolve, 1200);
      } else {
        setTimeout(() => {
          const next = newSolved.findIndex(s => !s);
          if (next !== -1) {
            setLevelIndex(next);
            setInput('');
            setFeedback(null);
            setShowHint(false);
          }
        }, 1000);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      {/* Progress bars */}
      <div className="flex gap-2 mb-4">
        {LEVELS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-all duration-500 ${
              levelSolved[i] ? 'bg-[#00ff41]' : 'bg-[#1a2332]'
            }`}
          />
        ))}
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 items-center">
        {LEVELS.map((lv, i) => (
          <button
            key={i}
            onClick={() => { setLevelIndex(i); setInput(''); setFeedback(null); setShowHint(false); }}
            className={`px-3 py-1 text-xs rounded border transition-all ${
              levelIndex === i
                ? lv.type === 'hex'
                  ? 'border-[#ffcc00] text-[#ffcc00]'
                  : 'border-[#00d4ff] text-[#00d4ff]'
                : levelSolved[i]
                ? 'border-[#00ff4133] text-[#00ff4166]'
                : 'border-[#1a2332] text-[#555]'
            }`}
          >
            {levelSolved[i] ? 'âœ“ ' : ''}
            {lv.type === 'hex' ? 'HEX' : `BIN ${i + 1}`}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#555]">{solvedCount}/3 solved</span>
      </div>

      {/* Label */}
      <div
        className={`text-xs uppercase tracking-widest ${
          current.type === 'hex' ? 'text-[#ffcc00]' : 'text-[#00d4ff]'
        }`}
      >
        {current.label}
      </div>

      {/* Encoded display */}
      <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-3">
        <div className="text-[#555] text-xs mb-2">
          {current.type === 'hex' ? 'HEX STRING' : 'BINARY STRING'}
        </div>
        <div
          className={`font-mono text-xs break-all leading-loose tracking-widest ${
            current.type === 'hex' ? 'text-[#ffcc00]' : 'text-[#00d4ff]'
          }`}
        >
          {current.encoded}
        </div>
      </div>

      {/* Hint toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowHint(h => !h)}
          className="text-xs text-[#555] hover:text-[#ffcc00] flex items-center gap-1 transition-colors"
        >
          <Info className="w-3 h-3" />
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#0a0f1a] border border-[#1a2332] rounded px-3 py-2 text-xs text-[#ffcc00] overflow-hidden"
          >
            <span className="text-[#555]">HINT: </span>{current.hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="space-y-2">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setFeedback(null); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={`Enter decoded ASCII (e.g. ${current.answer.slice(0, 3)}...)`}
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
          disabled={levelSolved[levelIndex]}
        />
        <button
          onClick={handleSubmit}
          disabled={levelSolved[levelIndex] || !input.trim()}
          className="w-full py-2 text-xs rounded border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4111] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          VERIFY DECODED TEXT
        </button>
      </div>

      {/* Feedback */}
      <AnimatePresence mode="wait">
        {feedback === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[#00ff41] text-xs mt-2"
          >
            âœ“ Correct! {current.successMsg}
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[#ff4444] text-xs mt-2"
          >
            âœ— Incorrect. Check case and special characters.
          </motion.div>
        )}
      </AnimatePresence>

      {/* All solved */}
      {solvedCount === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-[#00ff41] font-bold py-2 border border-[#00ff4133] rounded bg-[#00ff4108]"
        >
          BINARY + HEX MASTER — All encoding layers decoded!
        </motion.div>
      )}
    </div>
  );
}

