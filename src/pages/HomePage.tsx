// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Swords, FolderOpen, Mail, ArrowRight } from 'lucide-react';
import type { Page } from '../App';

const ROLES = [
  'M.S. Cybersecurity @ Montclair State',
  'Security Researcher & CTF Player',
  'Full-Stack Developer',
  'TryHackMe WIZARD — Top 4%',
];

const NAV_CARDS = [
  {
    page: 'about' as Page,
    icon: <User className="w-6 h-6" />,
    title: 'About Me',
    desc: 'Background, skills, tools & certifications',
    accent: '#00ff41',
    num: '01',
  },
  {
    page: 'challenges' as Page,
    icon: <Swords className="w-6 h-6" />,
    title: 'Challenges',
    desc: 'Linux terminal, cipher, hash cracking, SQL injection',
    accent: '#00d4ff',
    num: '02',
  },
  {
    page: 'projects' as Page,
    icon: <FolderOpen className="w-6 h-6" />,
    title: 'Projects',
    desc: 'Security tools, crypto, full-stack apps',
    accent: '#a855f7',
    num: '03',
  },
  {
    page: 'contact' as Page,
    icon: <Mail className="w-6 h-6" />,
    title: 'Contact',
    desc: 'LinkedIn, GitHub, TryHackMe',
    accent: '#ffcc00',
    num: '04',
  },
];

export function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [ready, setReady]         = useState(false);

  // Short boot delay before showing content
  useEffect(() => { setTimeout(() => setReady(true), 200); }, []);

  // Typing animation
  useEffect(() => {
    const role = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length)
      t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 42);
    else if (!deleting && displayed.length === role.length)
      t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">

      {/* ── Identity block ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -24 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border-2 border-[#00ff41] bg-[#0d1117] flex items-center justify-center mx-auto mb-6 text-xl font-bold text-[#00ff41] mono glow-green">
          AM
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-1">
          Aboubacar{' '}
          <span className="text-[#00ff41]">Sidick</span>{' '}
          Meite
        </h1>
        <p className="mono text-[#555] text-xs mb-4 tracking-widest">@ApollonIUGB77</p>

        {/* Typing role */}
        <div className="h-7 flex justify-center items-center">
          <span className="mono text-[#00d4ff] text-sm">
            {displayed}
            <span className="blink text-[#00ff41]">█</span>
          </span>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {[
            ['🎓 M.S. Cybersecurity', '#00ff41'],
            ['🧙 WIZARD Rank',        '#00d4ff'],
            ['🏆 Top 4% Worldwide',   '#ffcc00'],
            ['🛡️ (ISC)² CC',          '#a855f7'],
          ].map(([label, color]) => (
            <span
              key={label as string}
              className="px-3 py-1 text-xs rounded-full mono"
              style={{ color: color as string, border: `1px solid ${color}44`, background: `${color}11` }}
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Navigation cards ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {NAV_CARDS.map((card, i) => (
          <motion.button
            key={card.page}
            onClick={() => navigate(card.page)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="nav-card text-left group"
            style={{ '--accent': card.accent } as React.CSSProperties}
          >
            {/* Number */}
            <div className="mono text-xs mb-3" style={{ color: card.accent + '55' }}>
              {card.num}
            </div>

            {/* Icon + title */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span style={{ color: card.accent }}>{card.icon}</span>
                <span className="font-semibold text-white text-base">{card.title}</span>
              </div>
              <ArrowRight
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                style={{ color: card.accent }}
              />
            </div>

            {/* Desc */}
            <p className="text-[#4a5568] text-xs leading-5">{card.desc}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* ── Footer line ──────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="mono text-[#2a2a2a] text-xs mt-12"
      >
        © 2026 Aboubacar Sidick Meite
      </motion.p>
    </div>
  );
}
