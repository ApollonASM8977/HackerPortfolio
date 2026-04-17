// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Vigenère decryption: C - K mod 26 (uppercase only)
function vigenereDecrypt(ciphertext: string, key: string): string {
  const ct = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const k = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!k.length) return ct;
  return ct
    .split('')
    .map((ch, i) => {
      const c = ch.charCodeAt(0) - 65;
      const shift = k[i % k.length].charCodeAt(0) - 65;
      return String.fromCharCode(((c - shift + 26) % 26) + 65);
    })
    .join('');
}

interface Level {
  ciphertext: string;
  key: string | null;
  answer: string;
  keyHint: string;
  label: string;
  description: string;
  successMsg: string;
}

const LEVELS: Level[] = [
  {
    ciphertext: 'JYDOKJCQPRPCU',
    key: 'CYBER',
    answer: 'HACKTHEPLANET',
    keyHint: 'Key is given above — use it!',
    label: 'Level 1 — Known Key Decryption',
    description: 'The key is provided. Use Vigenère decryption to reveal the plaintext.',
    successMsg: 'Decrypted! The matrix has you.',
  },
  {
    ciphertext: 'BOZB',
    key: null,
    answer: 'ROOT',
    keyHint: 'The key is a 4-letter Linux security distro (think rolling-release hacker OS)',
    label: 'Level 2 — Unknown Key',
    description: 'No key this time. Figure out the key from the hint, then decrypt.',
    successMsg: 'Root access granted! KALI was the key.',
  },
];

// Mini alphabet reference strip
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function VigenereChallenge({ onSolve }: { onSolve: () => void }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [levelSolved, setLevelSolved] = useState([false, false]);
  const [showTable, setShowTable] = useState(false);

  const current = LEVELS[levelIndex];
  const solvedCount = levelSolved.filter(Boolean).length;

  // Live preview for level 1 (key is known)
  const liveDecrypt =
    current.key ? vigenereDecrypt(current.ciphertext, current.key) : null;

  const handleSubmit = () => {
    const correct = input.trim().toUpperCase() === current.answer.toUpperCase();

    if (correct) {
      const newSolved = [...levelSolved];
      newSolved[levelIndex] = true;
      setLevelSolved(newSolved);
      setFeedback('correct');
      const newCount = newSolved.filter(Boolean).length;

      if (newCount === 2) {
        setTimeout(onSolve, 1200);
      } else {
        setTimeout(() => {
          const next = newSolved.findIndex(s => !s);
          if (next !== -1) {
            setLevelIndex(next);
            setInput('');
            setFeedback(null);
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
        {LEVELS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setLevelIndex(i); setInput(''); setFeedback(null); }}
            className={`px-3 py-1 text-xs rounded border transition-all ${
              levelIndex === i
                ? 'border-[#00d4ff] text-[#00d4ff]'
                : levelSolved[i]
                ? 'border-[#00ff4133] text-[#00ff4166]'
                : 'border-[#1a2332] text-[#555]'
            }`}
          >
            {levelSolved[i] ? '✓ ' : ''}Level {i + 1}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#555]">{solvedCount}/2 solved</span>
      </div>

      {/* Label + description */}
      <div>
        <div className="text-[#00d4ff] text-xs uppercase tracking-widest mb-1">{current.label}</div>
        <div className="text-[#555] text-xs">{current.description}</div>
      </div>

      {/* Cipher info panel */}
      <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-3 space-y-2">
        <div className="flex gap-6 flex-wrap">
          <div>
            <div className="text-[#555] text-xs mb-1">CIPHERTEXT</div>
            <div className="text-[#ff6b6b] font-bold tracking-[0.3em] text-sm">
              {current.ciphertext}
            </div>
          </div>
          {current.key && (
            <div>
              <div className="text-[#555] text-xs mb-1">KEY</div>
              <div className="text-[#ffcc00] font-bold tracking-[0.3em] text-sm">
                {current.key}
              </div>
            </div>
          )}
        </div>

        {/* Level 1 live shift display */}
        {current.key && liveDecrypt && (
          <div className="mt-2 pt-2 border-t border-[#1a2332]">
            <div className="text-[#555] text-xs mb-1">DECRYPTED PREVIEW</div>
            <div className="text-[#00ff41] font-bold tracking-[0.3em] text-sm">
              {liveDecrypt}
            </div>
            <div className="text-[#555] text-xs mt-1">
              Shift map:{' '}
              {current.ciphertext.split('').map((ch, i) => {
                const k = current.key![i % current.key!.length];
                const shift = k.charCodeAt(0) - 65;
                return (
                  <span key={i} className="text-[#00d4ff]">
                    {ch}−{k}({shift})={liveDecrypt[i]}{' '}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Level 2 hint */}
        {!current.key && (
          <div className="text-xs text-[#ffcc00] pt-2 border-t border-[#1a2332]">
            <span className="text-[#555]">HINT: </span>{current.keyHint}
          </div>
        )}
      </div>

      {/* Vigenère alphabet table toggle */}
      <button
        onClick={() => setShowTable(t => !t)}
        className="text-xs text-[#555] hover:text-[#00d4ff] border border-[#1a2332] px-3 py-1 rounded transition-colors"
      >
        {showTable ? 'Hide' : 'Show'} Alphabet Reference
      </button>

      <AnimatePresence>
        {showTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#020408] border border-[#1a2332] rounded p-2">
              <div className="text-[#555] text-xs mb-1">
                Formula: plaintext = (cipherchar − keychar + 26) mod 26
              </div>
              <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                {ALPHABET.map((ch, i) => (
                  <span key={ch} className="text-xs">
                    <span className="text-[#00d4ff]">{ch}</span>
                    <span className="text-[#333]">=</span>
                    <span className="text-[#ffcc00]">{String(i).padStart(2, '0')}</span>
                    <span className="text-[#222]"> </span>
                  </span>
                ))}
              </div>
              <div className="text-[#555] text-xs mt-2">
                Example (Level 1): J(9) − C(2) = 7 → H &nbsp;|&nbsp; Y(24) − Y(24) = 0 → A
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="space-y-2">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value.toUpperCase()); setFeedback(null); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter decrypted plaintext (uppercase)..."
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
          disabled={levelSolved[levelIndex]}
        />
        <button
          onClick={handleSubmit}
          disabled={levelSolved[levelIndex] || !input.trim()}
          className="w-full py-2 text-xs rounded border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4111] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          SUBMIT PLAINTEXT
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
            ✓ Correct! {current.successMsg}
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
            ✗ Incorrect. Check your key and decryption formula.
          </motion.div>
        )}
      </AnimatePresence>

      {/* All solved */}
      {solvedCount === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-[#00ff41] font-bold py-2 border border-[#00ff4133] rounded bg-[#00ff4108]"
        >
          VIGENÈRE CIPHER BROKEN — Cryptanalyst status achieved!
        </motion.div>
      )}
    </div>
  );
}
