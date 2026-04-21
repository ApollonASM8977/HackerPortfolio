// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

interface Props {
  onSolve: () => void;
}

function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, ch => {
    const base = ch >= 'a' ? 97 : 65;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

const LEVELS = [
  {
    id: 1,
    cipher: 'SYNT{ebg13_qrpbqrq}',
    answer: 'FLAG{rot13_decoded}',
    hint: 'ROT13 rotates each letter by 13 positions in the alphabet.',
    level3hint: null,
    check: (cipher: string, userAnswer: string) =>
      rot13(cipher).toLowerCase() === userAnswer.trim().toLowerCase(),
    flag: 'FLAG{rot13_decoded}',
  },
  {
    id: 2,
    cipher: 'Frphevgl vf n cebprff, abg n cebqhpg.',
    answer: 'Security is a process, not a product.',
    hint: 'ROT13 rotates each letter by 13 positions in the alphabet.',
    level3hint: null,
    check: (_cipher: string, userAnswer: string) =>
      userAnswer.trim().toLowerCase() === 'security is a process, not a product.',
    flag: 'Security is a process, not a product.',
  },
  {
    id: 3,
    cipher: 'Gur synt vf: CTF{e0g13_ceb}. Tbbq wbo!',
    answer: 'CTF{r0t13_pro}',
    hint: 'ROT13 rotates each letter by 13 positions in the alphabet.',
    level3hint: 'The flag is hidden inside the decoded message. Extract only CTF{...}',
    check: (_cipher: string, userAnswer: string) =>
      userAnswer.trim().toLowerCase() === 'ctf{r0t13_pro}',
    flag: 'CTF{r0t13_pro}',
  },
];

export function ROT13Challenge({ onSolve }: Props) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [decoded, setDecoded] = useState(false);
  const [solvedFlags, setSolvedFlags] = useState<string[]>([]);

  const level = LEVELS[currentLevel];

  function handleVerify() {
    const ok = level.check(level.cipher, userAnswer);
    if (ok) {
      setStatus('correct');
      setSolvedFlags(prev => [...prev, level.flag]);
      setTimeout(() => {
        if (currentLevel + 1 >= LEVELS.length) {
          onSolve();
        } else {
          setCurrentLevel(prev => prev + 1);
          setUserAnswer('');
          setStatus('idle');
          setDecoded(false);
        }
      }, 1000);
    } else {
      setStatus('wrong');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleVerify();
    if (status === 'wrong') setStatus('idle');
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Level progress */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-all duration-500 ${
              currentLevel > i ? 'bg-[#00ff41]' : i === currentLevel ? 'bg-[#00ff4188]' : 'bg-[#1a2332]'
            }`}
          />
        ))}
      </div>

      {/* Level label */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs" style={{ color: '#00ff41' }}>
          LEVEL {level.id} / 3
        </span>
        <span className="font-mono text-xs" style={{ color: '#444' }}>
          ROT13 Cipher
        </span>
      </div>

      {/* Ciphertext display */}
      <div>
        <div className="font-mono text-xs mb-1" style={{ color: '#555' }}>
          &gt; Ciphertext:
        </div>
        <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 font-mono text-xs text-[#00ff41] overflow-x-auto">
          {level.cipher}
        </div>
      </div>

      {/* Hint */}
      <div
        className="font-mono text-xs px-3 py-2 rounded"
        style={{ background: '#0d1117', border: '1px solid #1a2332', color: '#555' }}
      >
        ðŸ’¡ Hint: {level.hint}
        {level.level3hint && (
          <div className="mt-1" style={{ color: '#00ff4188' }}>
            ðŸš© {level.level3hint}
          </div>
        )}
      </div>

      {/* Decode reveal button */}
      <button
        onClick={() => setDecoded(true)}
        className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded transition-all self-start"
        style={{
          border: '1px solid #1a2332',
          color: decoded ? '#555' : '#00ff4188',
          background: 'transparent',
        }}
        disabled={decoded}
      >
        <Eye size={13} />
        {decoded ? 'Decoded (hint used)' : 'Reveal decoded text (hint)'}
      </button>

      <AnimatePresence>
        {decoded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#020408] border border-[#00ff4133] rounded-lg p-3 font-mono text-xs overflow-x-auto"
            style={{ color: '#00ff4199' }}
          >
            {rot13(level.cipher)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer input */}
      <div>
        <div className="font-mono text-xs mb-1" style={{ color: '#555' }}>
          &gt; Your answer:
        </div>
        <input
          value={userAnswer}
          onChange={e => {
            setUserAnswer(e.target.value);
            if (status === 'wrong') setStatus('idle');
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            level.id === 3 ? 'Enter the flag CTF{...}' : 'Type your decoded answer...'
          }
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Verify button */}
      <button
        onClick={handleVerify}
        disabled={!userAnswer.trim() || status === 'correct'}
        className="font-mono text-xs px-4 py-2 rounded transition-all self-start"
        style={{
          background: '#00ff4122',
          border: '1px solid #00ff4166',
          color: '#00ff41',
          opacity: !userAnswer.trim() ? 0.4 : 1,
        }}
      >
        [ VERIFY ]
      </button>

      {/* Feedback */}
      <AnimatePresence mode="wait">
        {status === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-xs mt-2 font-mono"
            style={{ color: '#00ff41' }}
          >
            <CheckCircle size={14} />
            âœ“ Correct! FLAG: {level.flag}
          </motion.div>
        )}
        {status === 'wrong' && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-xs mt-2 font-mono"
            style={{ color: '#ff4444' }}
          >
            <XCircle size={14} />
            âœ— Incorrect. Try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previously solved */}
      {solvedFlags.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {solvedFlags.map((_f, i) => (
            <div key={i} className="font-mono text-xs" style={{ color: '#00ff4166' }}>
              âœ“ Level {i + 1} solved
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

