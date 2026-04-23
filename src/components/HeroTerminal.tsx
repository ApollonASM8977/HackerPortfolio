// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ROLES = [
  'M.S. Cybersecurity @ Montclair State University',
  'Security Researcher & CTF Player',
  'Full-Stack Developer',
  'TryHackMe WIZARD — Top 4% Worldwide',
];

const TERMINAL_LINES = [
  { text: '$ whoami', delay: 400,  color: '#ffcc00' },
  { text: 'aboubacar — security researcher | full-stack dev | ctf player', delay: 700, color: '#ccc' },
  { text: '', delay: 900, color: '' },
  { text: '$ nmap -sV --script vuln challenges/', delay: 1100, color: '#ffcc00' },
  { text: 'Starting Nmap scan... Found 4 challenges open', delay: 1500, color: '#00d4ff' },
  { text: 'PORT   SERVICE     STATE', delay: 1700, color: '#666' },
  { text: '21/tcp linux-terminal  OPEN  ← try me', delay: 1900, color: '#00ff41' },
  { text: '22/tcp caesar-cipher   OPEN  ← encrypted', delay: 2050, color: '#00ff41' },
  { text: '80/tcp hash-cracker    OPEN  ← MD5 hashes', delay: 2200, color: '#ffcc00' },
  { text: '443/tcp sql-injection  OPEN  ← vulnerable', delay: 2350, color: '#ff6b6b' },
  { text: '', delay: 2500, color: '' },
  { text: '$ echo "Can you beat all 4 challenges?"', delay: 2700, color: '#ffcc00' },
  { text: 'Can you beat all 4 challenges?', delay: 3000, color: '#ff0040' },
];

export function HeroTerminal() {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [termLines, setTermLines] = useState(0);

  // Typing effect for roles
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 45);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  // Terminal lines appear one by one
  useEffect(() => {
    TERMINAL_LINES.forEach((_, i) => {
      setTimeout(() => setTermLines(i + 1), TERMINAL_LINES[i].delay);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 z-10">

      {/* ── Name + role ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        {/* Avatar initials */}
        <div className="w-20 h-20 rounded-full border-2 border-[#00ff41] flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#00ff41] glow-green shadow-lg shadow-green-900/30">
          AM
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3 glitch">
          Aboubacar <span className="text-[#00ff41]">Sidick</span> Meite
        </h1>

        {/* Typing role */}
        <div className="h-7 flex items-center justify-center">
          <span className="text-[#00d4ff] text-base md:text-lg font-mono">
            {displayed}<span className="animate-blink text-[#00ff41]">█</span>
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {[
            { label: '🎓 M.S. Cybersecurity', color: '#00ff41' },
            { label: '🧙 TryHackMe WIZARD', color: '#00d4ff' },
            { label: '🏆 Top 4% Worldwide', color: '#ffcc00' },
            { label: '🔐 (ISC)² CC Certified', color: '#ff6b6b' },
          ].map(b => (
            <span
              key={b.label}
              className="px-3 py-1 text-xs rounded-full border font-mono"
              style={{ borderColor: b.color + '55', color: b.color, background: b.color + '11' }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Terminal window ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-2xl hacker-panel shadow-2xl shadow-green-900/10"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a2332]">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-[#666] text-xs font-mono">root@apollon:~/challenges</span>
        </div>

        {/* Terminal output */}
        <div className="p-5 font-mono text-xs leading-6 min-h-[200px]">
          {TERMINAL_LINES.slice(0, termLines).map((line, i) => (
            <div key={i} style={{ color: line.color || '#00ff41' }}>{line.text}</div>
          ))}
          {termLines < TERMINAL_LINES.length && (
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
          )}
        </div>
      </motion.div>

      {/* ── Scroll hint ───────────────────────────────────────── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="mt-12 flex flex-col items-center gap-2 text-[#444] hover:text-[#00ff41] transition-colors"
      >
        <span className="text-xs tracking-widest font-mono">SCROLL</span>
        <ChevronDown className="animate-bounce w-5 h-5" />
      </motion.a>
    </section>
  );
}

