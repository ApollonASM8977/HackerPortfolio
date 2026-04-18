// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Shield, Key, Terminal, Smartphone, Globe, Lock } from 'lucide-react';

const PROJECTS = [
  {
    icon: <Key className="w-5 h-5" />,
    name: 'CipherLab',
    desc: 'Complete cryptography toolkit — AES, RSA, DES, Caesar, Vigenère, Base64. React + FastAPI with step-by-step encryption demos.',
    tags: ['Python', 'React', 'FastAPI', 'Cryptography'],
    color: '#a855f7',
    github: 'https://github.com/ApollonIUGB77/CipherLab',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    name: 'CryptoMath',
    desc: 'RSA, Diffie-Hellman, Miller-Rabin primality, Baby-step Giant-step discrete log — from scratch in pure Python.',
    tags: ['Pure Python', 'Number Theory', 'RSA', 'Math'],
    color: '#00d4ff',
    github: 'https://github.com/ApollonIUGB77/CryptoMath',
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    name: 'AlgoToolkit',
    desc: '8 sorting + 6 searching + 6 data structures + 5 graph algorithms. Each returns complexity analysis and benchmarks.',
    tags: ['Python', 'Java', 'Algorithms', 'CLI'],
    color: '#00ff41',
    github: 'https://github.com/ApollonIUGB77/AlgoToolkit',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    name: 'SecureShare',
    desc: 'E2E encrypted file sharing over LAN. AES-256-CBC + RSA-2048 key exchange. PyQt6 GUI with bcrypt auth.',
    tags: ['Python', 'PyQt6', 'AES-256', 'RSA-2048'],
    color: '#ff0040',
    github: 'https://github.com/ApollonIUGB77/secure-file-sharing',
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    name: 'CommuTaxi',
    desc: 'Flutter ride-booking app — Firebase Auth, Google Maps, real-time tracking, fare estimation, trip history.',
    tags: ['Flutter', 'Firebase', 'Google Maps', 'Dart'],
    color: '#ffcc00',
    github: 'https://github.com/ApollonIUGB77/TaxiApp-Users',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    name: 'Atlas Money',
    desc: 'Mobile money web app — transfers, withdrawals, admin panel. Secured with prepared statements, bcrypt & CSRF.',
    tags: ['PHP', 'MySQL', 'Security', 'Web'],
    color: '#60a5fa',
    github: 'https://github.com/ApollonIUGB77/bank.atlas.bk',
  },
];

export function ProjectsSection() {
  return (
    <div className="flex flex-col items-center w-full px-6 py-20 gap-16">

      {/* ── Title ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Featured <span className="text-[#00ff41]">Projects</span>
        </h2>
        <p className="text-[#555] text-sm leading-7">
          Real projects — built, secured, and pushed to GitHub.
        </p>
      </motion.div>

      {/* ── Grid ───────────────────────────────────────────── */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="hacker-panel p-6 flex flex-col gap-4 group"
          >
            <div className="flex items-start justify-between">
              <div
                className="p-2.5 rounded-lg border border-[#1a2332]"
                style={{ color: p.color, background: p.color + '11' }}
              >
                {p.icon}
              </div>
              <a
                href={p.github} target="_blank" rel="noopener noreferrer"
                className="text-[#333] hover:text-[#aaa] transition-colors"
              >
                <GitFork className="w-4 h-4" />
              </a>
            </div>

            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">{p.name}</h3>
              <p className="text-[#555] text-xs leading-6">{p.desc}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {p.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 border border-[#1a2332] text-[#555] rounded mono">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={p.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs mono hover:opacity-80 transition-opacity"
              style={{ color: p.color }}
            >
              <ExternalLink className="w-3 h-3" />
              View on GitHub
            </a>
          </motion.div>
        ))}
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <a
          href="https://github.com/ApollonIUGB77" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[#00ff41]
                     text-[#00ff41] rounded-lg mono text-sm hover:bg-[#00ff4111] transition-all"
        >
          <GitFork className="w-4 h-4" />
          View all on GitHub
        </a>
      </motion.div>

    </div>
  );
}
