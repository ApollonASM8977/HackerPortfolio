// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Swords, FolderOpen, Mail, ArrowRight } from 'lucide-react';
import { LiveTerminal } from '../components/LiveTerminal';
import type { Page } from '../App';

const ROLES = [
  'M.S. Cybersecurity @ Montclair State',
  'Security Researcher & CTF Player',
  'Full-Stack Developer',
  'TryHackMe WIZARD — Top 4%',
];

const NAV_CARDS = [
  { page: 'about'      as Page, icon: <User className="w-5 h-5" />,       title: 'About Me',   desc: 'Skills, tools & certifications',     accent: '#00ff41', num: '01' },
  { page: 'challenges' as Page, icon: <Swords className="w-5 h-5" />,     title: 'Challenges', desc: '13 CTF challenges — crypto, web, net', accent: '#00d4ff', num: '02' },
  { page: 'projects'   as Page, icon: <FolderOpen className="w-5 h-5" />, title: 'Projects',   desc: 'Security tools & full-stack apps',    accent: '#a855f7', num: '03' },
  { page: 'contact'    as Page, icon: <Mail className="w-5 h-5" />,       title: 'Contact',    desc: 'LinkedIn, GitHub, TryHackMe',         accent: '#ffcc00', num: '04' },
];

export function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [ready, setReady]         = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 200); }, []);

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
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-10 gap-7">

      {/* ── Identity ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-full border-2 border-[#00ff41] bg-[#0d1117]
                        flex items-center justify-center mx-auto mb-4
                        text-lg font-bold text-[#00ff41] mono glow-green">
          AM
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
          Aboubacar <span className="text-[#00ff41]">Sidick</span> Meite
        </h1>
        <p className="mono text-[#444] text-xs mb-3 tracking-widest">@ApollonIUGB77</p>
        <div className="h-6 flex justify-center items-center mb-4">
          <span className="mono text-[#00d4ff] text-sm">
            {displayed}<span className="blink text-[#00ff41]">█</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[['🎓 M.S. Cybersecurity','#00ff41'],['🧙 WIZARD Rank','#00d4ff'],['🏆 Top 4%','#ffcc00'],['🛡️ (ISC)² CC','#a855f7']].map(([l,c]) => (
            <span key={l} className="px-3 py-1 text-xs rounded-full mono"
              style={{ color: c, border:`1px solid ${c}44`, background:`${c}11` }}>{l}</span>
          ))}
        </div>
      </motion.div>

      {/* ── Live terminal ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.97 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-xl"
      >
        <LiveTerminal />
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
            <div className="mono text-xs mb-2" style={{ color: card.accent + '55' }}>{card.num}</div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span style={{ color: card.accent }}>{card.icon}</span>
                <span className="font-semibold text-white text-sm">{card.title}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                style={{ color: card.accent }} />
            </div>
            <p className="text-[#4a5568] text-xs leading-4">{card.desc}</p>
          </motion.button>
        ))}
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.5 }}
        className="mono text-[#2a2a2a] text-xs">
        © 2026 Aboubacar Sidick Meite
      </motion.p>
    </div>
  );
}
