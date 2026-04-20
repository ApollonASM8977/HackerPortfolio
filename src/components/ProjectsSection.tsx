// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Shield, Key, Terminal, Smartphone, Globe, Lock } from 'lucide-react';
import { GlitchText } from './GlitchText';

const PROJECTS = [
  { icon: <Key className="w-5 h-5" />,        name: 'CipherLab',   color: '#a855f7',
    desc: 'Complete cryptography toolkit — AES, RSA, DES, Caesar, Vigenère, Base64. React + FastAPI with step-by-step encryption demos.',
    tags: ['Python','React','FastAPI','Cryptography'], github: 'https://github.com/ApollonIUGB77/CipherLab' },
  { icon: <Shield className="w-5 h-5" />,     name: 'CryptoMath',  color: '#00d4ff',
    desc: 'RSA, Diffie-Hellman, Miller-Rabin primality, Baby-step Giant-step discrete log — from scratch in pure Python.',
    tags: ['Pure Python','Number Theory','RSA','Math'], github: 'https://github.com/ApollonIUGB77/CryptoMath' },
  { icon: <Terminal className="w-5 h-5" />,   name: 'AlgoToolkit', color: '#00ff41',
    desc: '8 sorting + 6 searching + 6 data structures + 5 graph algorithms. Each returns complexity analysis and benchmarks.',
    tags: ['Python','Java','Algorithms','CLI'], github: 'https://github.com/ApollonIUGB77/AlgoToolkit' },
  { icon: <Lock className="w-5 h-5" />,       name: 'SecureShare', color: '#ff0040',
    desc: 'E2E encrypted file sharing over LAN. AES-256-CBC + RSA-2048 key exchange. PyQt6 GUI with bcrypt auth.',
    tags: ['Python','PyQt6','AES-256','RSA-2048'], github: 'https://github.com/ApollonIUGB77/secure-file-sharing' },
  { icon: <Smartphone className="w-5 h-5" />, name: 'CommuTaxi',   color: '#ffcc00',
    desc: 'Flutter ride-booking app — Firebase Auth, Google Maps, real-time tracking, fare estimation, trip history.',
    tags: ['Flutter','Firebase','Google Maps','Dart'], github: 'https://github.com/ApollonIUGB77/TaxiApp-Users' },
  { icon: <Globe className="w-5 h-5" />,      name: 'Atlas Money',  color: '#60a5fa',
    desc: 'Mobile money web app — transfers, withdrawals, admin panel. Secured with prepared statements, bcrypt & CSRF.',
    tags: ['PHP','MySQL','Security','Web'], github: 'https://github.com/ApollonIUGB77/bank.atlas.bk' },
];

/* ── 3-D tilt card ───────────────────────────────────── */
function TiltCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) *  10;
    el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    el.style.transition = 'transform 0.08s ease';
    el.style.boxShadow  = `0 20px 60px ${p.color}22, 0 0 0 1px ${p.color}22`;
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.45s ease, box-shadow 0.45s ease';
    el.style.boxShadow  = '';
  };

  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      transition={{ delay: 0.1 + i * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="tilt-card hacker-panel p-6 flex flex-col gap-4 group relative overflow-hidden h-full"
        style={{ transformStyle:'preserve-3d' }}
      >
        {/* Shine overlay */}
        <div className="tilt-shine" />

        {/* Colored top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background:`linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />

        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-lg border border-[#1a2332]"
            style={{ color: p.color, background: p.color + '11' }}>
            {p.icon}
          </div>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="text-[#333] hover:text-[#aaa] transition-colors">
            <GitFork className="w-4 h-4" />
          </a>
        </div>

        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">{p.name}</h3>
          <p className="text-[#555] text-xs leading-6">{p.desc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 border border-[#1a2332] text-[#555] rounded mono
                                     group-hover:border-[#2a3d55] transition-colors">{t}</span>
          ))}
        </div>

        <a href={p.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs mono hover:opacity-80 transition-opacity"
          style={{ color: p.color }}>
          <ExternalLink className="w-3 h-3" />
          View on GitHub
        </a>
      </div>
    </motion.div>
  );
}

/* ── GitHub live stats ───────────────────────────────── */
import { useEffect, useState } from 'react';

function GitHubStats() {
  const [stats, setStats] = useState<{ repos: number; followers: number; stars: number } | null>(null);
  const [err, setErr]     = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem('gh_stats');
    if (cached) { try { setStats(JSON.parse(cached)); return; } catch { /**/ } }

    Promise.all([
      fetch('https://api.github.com/users/ApollonIUGB77'),
      fetch('https://api.github.com/users/ApollonIUGB77/repos?per_page=100'),
    ])
      .then(([u, r]) => Promise.all([u.json(), r.json()]))
      .then(([user, repos]) => {
        const stars = Array.isArray(repos)
          ? repos.reduce((s: number, r: { stargazers_count: number }) => s + (r.stargazers_count || 0), 0)
          : 0;
        const s = { repos: user.public_repos || 0, followers: user.followers || 0, stars };
        setStats(s);
        sessionStorage.setItem('gh_stats', JSON.stringify(s));
      })
      .catch(() => setErr(true));
  }, []);

  if (err || !stats) return null;

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
      className="flex items-center justify-center gap-6 hacker-panel px-8 py-4">
      {[
        { label: 'Public Repos', value: stats.repos,     color: '#00ff41' },
        { label: 'Followers',    value: stats.followers, color: '#00d4ff' },
        { label: 'Total Stars',  value: stats.stars,     color: '#ffcc00' },
      ].map(s => (
        <div key={s.label} className="text-center">
          <div className="mono font-bold text-lg" style={{ color: s.color }}>{s.value}</div>
          <div className="mono text-[#444] text-[10px]">{s.label}</div>
        </div>
      ))}
      <div className="text-[#333] text-[10px] mono ml-2">live · github.com/ApollonIUGB77</div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <div className="flex flex-col items-center w-full px-6 pt-16 pb-32 gap-12">
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }} className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Featured <GlitchText color="#a855f7">Projects</GlitchText>
        </h2>
        <p className="text-[#555] text-sm leading-7">
          Real projects — built, secured, and pushed to GitHub.
        </p>
      </motion.div>

      {/* GitHub live stats */}
      <GitHubStats />

      {/* 3D tilt grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => <TiltCard key={i} p={p} i={i} />)}
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
        <a href="https://github.com/ApollonIUGB77" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[#a855f755]
                     text-[#a855f7] rounded-lg mono text-sm hover:bg-[#a855f711] transition-all">
          <GitFork className="w-4 h-4" />
          View all on GitHub
        </a>
      </motion.div>
    </div>
  );
}
