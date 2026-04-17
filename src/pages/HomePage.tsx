// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Swords, FolderOpen, Mail, ArrowRight } from 'lucide-react';
import type { Page } from '../App';

/* ── Boot sequence ───────────────────────────────────────── */
const BOOT: { text: string; color: string; delay: number }[] = [
  { text: 'BIOS v2.4.1 — POST check...', color: '#444', delay: 50 },
  { text: '▸ CPU  Intel Core i7-12700H ......... [OK]', color: '#00ff41', delay: 200 },
  { text: '▸ RAM  16 384 MB DDR5 ............... [OK]', color: '#00ff41', delay: 380 },
  { text: '▸ NET  eth0 192.168.1.100 ........... [OK]', color: '#00ff41', delay: 560 },
  { text: '▸ SEC  Firewall loaded .............. [OK]', color: '#00ff41', delay: 740 },
  { text: '', color: '', delay: 860 },
  { text: 'Loading apollon@kali  [████████████] 100%', color: '#00d4ff', delay: 1000 },
  { text: '', color: '', delay: 1150 },
  { text: '$ whoami', color: '#ffcc00', delay: 1300 },
  { text: 'apollon  — security researcher • CTF player • developer', color: '#ccc', delay: 1550 },
  { text: '$ cat flag.txt', color: '#ffcc00', delay: 1800 },
  { text: 'FLAG{w3lc0m3_t0_my_p0rtf0l10}', color: '#ff0040', delay: 2050 },
  { text: '$ _', color: '#00ff41', delay: 2300 },
];

/* ── Nav cards ───────────────────────────────────────────── */
const ROLES = [
  'M.S. Cybersecurity @ Montclair State',
  'Security Researcher & CTF Player',
  'Full-Stack Developer',
  'TryHackMe WIZARD — Top 4%',
];

const NAV_CARDS = [
  { page: 'about'      as Page, icon: <User className="w-5 h-5" />,      title: 'About Me',   desc: 'Skills, tools & certifications',    accent: '#00ff41', num: '01' },
  { page: 'challenges' as Page, icon: <Swords className="w-5 h-5" />,    title: 'Challenges', desc: '8 CTF challenges — crypto, web, net', accent: '#00d4ff', num: '02' },
  { page: 'projects'   as Page, icon: <FolderOpen className="w-5 h-5" />, title: 'Projects',   desc: 'Security tools & full-stack apps',   accent: '#a855f7', num: '03' },
  { page: 'contact'    as Page, icon: <Mail className="w-5 h-5" />,       title: 'Contact',    desc: 'LinkedIn, GitHub, TryHackMe',        accent: '#ffcc00', num: '04' },
];

export function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [bootLines, setBootLines] = useState(0);
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [ready, setReady]         = useState(false);

  /* boot sequence */
  useEffect(() => {
    BOOT.forEach((_, i) => {
      setTimeout(() => setBootLines(i + 1), BOOT[i].delay);
    });
    setTimeout(() => setReady(true), 300);
  }, []);

  /* typing animation */
  useEffect(() => {
    const role = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length)
      t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 42);
    else if (!deleting && displayed.length === role.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8">

      {/* ── Identity ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full border-2 border-[#00ff41] bg-[#0d1117] flex items-center justify-center mx-auto mb-5 text-lg font-bold text-[#00ff41] mono glow-green">
          AM
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
          Aboubacar <span className="text-[#00ff41]">Sidick</span> Meite
        </h1>
        <p className="mono text-[#444] text-xs mb-3 tracking-widest">@ApollonIUGB77</p>

        {/* Typing */}
        <div className="h-6 flex justify-center items-center mb-4">
          <span className="mono text-[#00d4ff] text-sm">
            {displayed}<span className="blink text-[#00ff41]">█</span>
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2">
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

      {/* ── Boot terminal ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.97 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-xl hacker-panel shadow-lg shadow-green-900/10"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a2332]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[#555] text-xs mono">root@apollon:~</span>
        </div>
        {/* Output */}
        <div className="px-5 py-4 mono text-xs leading-[1.7] min-h-[140px]">
          {BOOT.slice(0, bootLines).map((line, i) => (
            <div key={i} style={{ color: line.color || '#00ff41' }}>{line.text}</div>
          ))}
          {bootLines < BOOT.length && (
            <span className="inline-block w-2 h-3.5 bg-[#00ff41] animate-pulse" />
          )}
        </div>
      </motion.div>

      {/* ── Nav cards ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-xl grid grid-cols-2 gap-3"
      >
        {NAV_CARDS.map((card, i) => (
          <motion.button
            key={card.page}
            onClick={() => navigate(card.page)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
            className="nav-card text-left group"
            style={{ '--accent': card.accent } as React.CSSProperties}
          >
            <div className="mono text-xs mb-2" style={{ color: card.accent + '55' }}>
              {card.num}
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span style={{ color: card.accent }}>{card.icon}</span>
                <span className="font-semibold text-white text-sm">{card.title}</span>
              </div>
              <ArrowRight
                className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                style={{ color: card.accent }}
              />
            </div>
            <p className="text-[#4a5568] text-xs leading-4">{card.desc}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* ── Footer ───────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 1.2 }}
        className="mono text-[#2a2a2a] text-xs"
      >
        © 2026 Aboubacar Sidick Meite
      </motion.p>
    </div>
  );
}
