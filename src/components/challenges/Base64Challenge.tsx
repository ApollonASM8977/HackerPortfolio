// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LEVELS = [
  {
    encoded: 'ZmxhZ3tiNHNlNjR9',
    answer: 'flag{b4se64}',
    label: 'Decode the Base64 string below',
    successMsg: 'Nice work! Basic Base64 cracked.',
  },
  {
    encoded: 'Q1RGe0RlYzBkZXJfTHZsMn0=',
    answer: 'CTF{Dec0der_Lvl2}',
    label: 'Decode and enter the full flag',
    successMsg: 'Level 2 cleared! You\'re getting faster.',
  },
  {
    encoded: 'U0VDezRkdjRuY2VkQjRzZX0=',
    answer: 'SEC{4dv4ncedB4se}',
    label: 'Advanced encoding â€” decode this flag',
    successMsg: 'MASTER DECODER! All levels complete.',
  },
];

function copyToClipboard(text: string, setCopied: (v: boolean) => void) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  });
}

export function Base64Challenge({ onSolve }: { onSolve: () => void }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [levelSolved, setLevelSolved] = useState([false, false, false]);
  const [copied, setCopied] = useState(false);

  const current = LEVELS[levelIndex];

  const handleSubmit = () => {
    let correct = false;
    try {
      correct = atob(current.encoded).trim() === input.trim();
    } catch {
      correct = false;
    }

    if (correct) {
      const newSolved = [...levelSolved];
      newSolved[levelIndex] = true;
      setLevelSolved(newSolved);
      const newCount = newSolved.filter(Boolean).length;
      setSolvedCount(newCount);
      setFeedback('correct');

      if (newCount === 3) {
        setTimeout(onSolve, 1200);
      } else {
        setTimeout(() => {
          const nextUnsolved = newSolved.findIndex(s => !s);
          if (nextUnsolved !== -1) {
            setLevelIndex(nextUnsolved);
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
      <div className="flex gap-2">
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
            {levelSolved[i] ? 'âœ“ ' : ''}L{i + 1}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#555] self-center">
          {solvedCount}/3 solved
        </span>
      </div>

      {/* Level label */}
      <div className="text-[#00d4ff] text-xs uppercase tracking-widest">
        {current.label}
      </div>

      {/* Encoded string display */}
      <div
        className="bg-[#020408] border border-[#1a2332] rounded-lg p-3 cursor-pointer group relative"
        onClick={() => copyToClipboard(current.encoded, setCopied)}
        title="Click to copy"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#555] text-xs">BASE64 ENCODED</span>
          <span className="text-[#555] text-xs flex items-center gap-1 group-hover:text-[#00d4ff] transition-colors">
            {copied ? <CheckCircle className="w-3 h-3 text-[#00ff41]" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </div>
        <div className="text-[#ffcc00] font-mono text-xs break-all tracking-wider leading-relaxed">
          {current.encoded}
        </div>
      </div>

      {/* Hint box */}
      <div className="bg-[#0a0f1a] border border-[#1a2332] rounded px-3 py-2 text-xs text-[#555]">
        <span className="text-[#ffcc00]">HINT:</span>{' '}
        Browser console:{' '}
        <span className="text-[#00d4ff]">atob('{current.encoded}')</span>
        {' '}â€” or use any online Base64 decoder
      </div>

      {/* Input */}
      <div className="space-y-2">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setFeedback(null); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter decoded text..."
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
          disabled={levelSolved[levelIndex]}
        />
        <button
          onClick={handleSubmit}
          disabled={levelSolved[levelIndex] || !input.trim()}
          className="w-full py-2 text-xs rounded border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4111] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          SUBMIT DECODED FLAG
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
            âœ— Incorrect. Try again. (Check case sensitivity)
          </motion.div>
        )}
      </AnimatePresence>

      {/* All solved banner */}
      {solvedCount === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-[#00ff41] font-bold py-2 border border-[#00ff4133] rounded bg-[#00ff4108]"
        >
          ALL LEVELS DECODED â€” Base64 Master!
        </motion.div>
      )}
    </div>
  );
}

