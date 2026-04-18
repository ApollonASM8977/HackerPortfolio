// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Key, Hash, Database, Trophy, Lock, Binary, Network, Shield, Code2 } from 'lucide-react';
import { LinuxTerminal }    from './challenges/LinuxTerminal';
import { CaesarChallenge }  from './challenges/CaesarChallenge';
import { HashChallenge }    from './challenges/HashChallenge';
import { SQLChallenge }     from './challenges/SQLChallenge';
import { Base64Challenge }  from './challenges/Base64Challenge';
import { BinaryChallenge }  from './challenges/BinaryChallenge';
import { VigenereChallenge } from './challenges/VigenereChallenge';
import { NetworkChallenge } from './challenges/NetworkChallenge';

const CHALLENGES = [
  {
    id: 'linux',
    icon: <Terminal className="w-5 h-5" />,
    title: 'Linux Terminal',
    category: 'RECON',
    difficulty: 'Easy',
    diffColor: '#00ff41',
    description: 'Navigate a real Linux shell. Find and read the hidden flag.txt using ls, cd, cat, find...',
    component: LinuxTerminal,
  },
  {
    id: 'caesar',
    icon: <Key className="w-5 h-5" />,
    title: 'Caesar Cipher',
    category: 'CRYPTO',
    difficulty: 'Easy',
    diffColor: '#00d4ff',
    description: 'Decrypt 3 levels of Caesar-ciphered messages by finding the correct rotation shift.',
    component: CaesarChallenge,
  },
  {
    id: 'binary',
    icon: <Binary className="w-5 h-5" />,
    title: 'Binary & Hex',
    category: 'ENCODING',
    difficulty: 'Easy',
    diffColor: '#00ff41',
    description: 'Decode binary strings and hex sequences to reveal hidden ASCII messages.',
    component: BinaryChallenge,
  },
  {
    id: 'base64',
    icon: <Code2 className="w-5 h-5" />,
    title: 'Base64 Decoder',
    category: 'ENCODING',
    difficulty: 'Easy',
    diffColor: '#00d4ff',
    description: 'Decode 3 levels of Base64-encoded strings. Use your browser console or an online tool.',
    component: Base64Challenge,
  },
  {
    id: 'vigenere',
    icon: <Shield className="w-5 h-5" />,
    title: 'Vigenère Cipher',
    category: 'CRYPTO',
    difficulty: 'Medium',
    diffColor: '#ffcc00',
    description: 'Crack Vigenère-encrypted messages. Level 1 gives you the key — level 2, find it yourself.',
    component: VigenereChallenge,
  },
  {
    id: 'hash',
    icon: <Hash className="w-5 h-5" />,
    title: 'Hash Cracker',
    category: 'CRACKING',
    difficulty: 'Medium',
    diffColor: '#ffcc00',
    description: 'Crack 3 MD5 hashes using dictionary attacks and brute-force techniques.',
    component: HashChallenge,
  },
  {
    id: 'network',
    icon: <Network className="w-5 h-5" />,
    title: 'Network Analysis',
    category: 'NETWORK',
    difficulty: 'Medium',
    diffColor: '#ff6b6b',
    description: 'Analyse HTTP packet captures and nmap scan results. Find the flag hidden in the traffic.',
    component: NetworkChallenge,
  },
  {
    id: 'sql',
    icon: <Database className="w-5 h-5" />,
    title: 'SQL Injection',
    category: 'WEB',
    difficulty: 'Hard',
    diffColor: '#ff0040',
    description: 'Exploit a vulnerable login form with SQL injection, then dump the entire database.',
    component: SQLChallenge,
  },
];

export function ChallengesSection() {
  const [active, setActive] = useState<string | null>(null);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const handleSolve = (id: string) => {
    setSolved(prev => new Set([...prev, id]));
    setShowSuccess(id);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const allSolved = solved.size === CHALLENGES.length;

  return (
    <section className="relative z-10 flex flex-col items-center w-full px-6 py-20">

      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 w-full max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Hacking <span className="text-[#00ff41]">Challenges</span>
        </h2>
        <p className="text-[#555] text-sm max-w-xl mx-auto mb-5">
          8 interactive challenges across Linux, crypto, encoding, network recon and web exploitation.
        </p>

        {/* Score */}
        <div className="flex items-center justify-center gap-3">
          <Trophy className="w-4 h-4 text-[#ffcc00]" />
          <span className="text-[#ffcc00] font-mono text-sm font-bold">{solved.size} / {CHALLENGES.length}</span>
          <span className="text-[#444] text-sm">solved</span>
        </div>
      </motion.div>

      {/* ── Progress bar ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 hacker-panel px-4 py-3 flex items-center gap-4 w-full max-w-2xl"
      >
        <Lock className="w-4 h-4 text-[#666] shrink-0" />
        <div className="flex-1 skill-bar">
          <motion.div
            className="skill-bar-fill"
            animate={{ width: `${(solved.size / CHALLENGES.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <span className="text-xs text-[#00ff41] font-mono w-8 text-right">
          {Math.round((solved.size / CHALLENGES.length) * 100)}%
        </span>
      </motion.div>

      {/* ── All solved ─────────────────────────────────────── */}
      <AnimatePresence>
        {allSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 hacker-panel p-6 text-center border border-[#00ff41] w-full max-w-2xl"
          >
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-[#00ff41] text-xl font-bold glow-green">ALL CHALLENGES SOLVED!</div>
            <div className="text-[#666] text-sm mt-1">You've proven your skills. Welcome to the team.</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Challenge grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {CHALLENGES.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            {/* Card */}
            <div
              className={`hacker-panel cursor-pointer transition-all duration-300 ${
                solved.has(c.id) ? 'border-[#00ff4133]' : ''
              } ${active === c.id ? 'border-[#00ff4144]' : ''}`}
              onClick={() => setActive(active === c.id ? null : c.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded border ${
                      solved.has(c.id)
                        ? 'border-[#00ff4133] text-[#00ff41]'
                        : 'border-[#1a2332] text-[#555]'
                    }`}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{c.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[#444] text-xs mono">{c.category}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded mono"
                          style={{ color: c.diffColor, border: `1px solid ${c.diffColor}44` }}
                        >
                          {c.difficulty}
                        </span>
                        {solved.has(c.id) && (
                          <span className="text-[#00ff41] text-xs">✓ SOLVED</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#333] text-sm select-none">
                    {active === c.id ? '▲' : '▼'}
                  </span>
                </div>
                <p className="text-[#4a5568] text-xs leading-5">{c.description}</p>
              </div>

              {/* Expanded */}
              <AnimatePresence>
                {active === c.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#1a2332] p-4">
                      <c.component onSolve={() => handleSolve(c.id)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toast */}
            <AnimatePresence>
              {showSuccess === c.id && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-center text-xs text-[#00ff41] glow-green font-mono font-bold"
                >
                  🎉 Challenge Solved! +100 pts
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
