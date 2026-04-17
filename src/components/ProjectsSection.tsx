// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Shield, Key, Terminal, Smartphone, Globe, Lock } from 'lucide-react';

const PROJECTS = [
  {
    icon: <Key className="w-5 h-5" />,
    name: 'CipherLab',
    desc: 'Complete cryptography toolkit — AES, RSA, DES, Caesar, Vigenère, Base64. Full React + FastAPI stack with step-by-step encryption demos.',
    tags: ['Python', 'React', 'FastAPI', 'Cryptography'],
    color: '#a855f7',
    github: 'https://github.com/ApollonIUGB77/CipherLab',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    name: 'CryptoMath',
    desc: 'RSA, Diffie-Hellman, Miller-Rabin primality testing, Baby-step Giant-step discrete log — all from scratch in pure Python.',
    tags: ['Pure Python', 'Number Theory', 'RSA', 'Math'],
    color: '#00d4ff',
    github: 'https://github.com/ApollonIUGB77/CryptoMath',
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    name: 'AlgoToolkit',
    desc: '8 sorting + 6 searching + 6 data structures + 5 graph algorithms. Each returns complexity analysis, step traces, and benchmarks.',
    tags: ['Python', 'Java', 'Algorithms', 'CLI'],
    color: '#00ff41',
    github: 'https://github.com/ApollonIUGB77/AlgoToolkit',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    name: 'SecureShare',
    desc: 'End-to-end encrypted file sharing over LAN. AES-256-CBC + RSA-2048 key exchange. PyQt6 GUI with bcrypt auth and admin panel.',
    tags: ['Python', 'PyQt6', 'AES-256', 'RSA-2048'],
    color: '#ff0040',
    github: 'https://github.com/ApollonIUGB77/secure-file-sharing',
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    name: 'CommuTaxi',
    desc: 'Flutter ride-booking app with Firebase Auth, Google Maps, real-time driver tracking, fare estimation and full trip history.',
    tags: ['Flutter', 'Firebase', 'Google Maps', 'Dart'],
    color: '#ffcc00',
    github: 'https://github.com/ApollonIUGB77/TaxiApp-Users',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    name: 'Atlas Money',
    desc: 'Mobile money web app — send money, withdrawals, admin panel, transaction history. Secured with prepared statements, bcrypt, CSRF.',
    tags: ['PHP', 'MySQL', 'Security', 'Web'],
    color: '#1a237e',
    github: 'https://github.com/ApollonIUGB77/bank.atlas.bk',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 max-w-5xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#666] text-sm">03.</span>
          <h2 className="text-[#00ff41] text-2xl font-bold tracking-wide">{'<Projects />'}</h2>
          <div className="flex-1 h-px bg-[#1a2332]" />
        </div>
        <p className="text-[#666] text-sm pl-10">Real projects — built, secured, and deployed.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="hacker-panel p-5 group hover:border-opacity-60 transition-all duration-300"
            style={{ ['--hover-color' as string]: p.color }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded border border-[#1a2332] group-hover:border-opacity-50 transition-colors"
                   style={{ color: p.color }}>
                {p.icon}
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                 className="text-[#666] hover:text-white transition-colors"
                 onClick={e => e.stopPropagation()}>
                <GitFork className="w-4 h-4" />
              </a>
            </div>

            <h3 className="text-white font-bold mb-2 group-hover:text-[#00ff41] transition-colors">
              {p.name}
            </h3>
            <p className="text-[#666] text-xs leading-5 mb-4 flex-1">{p.desc}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {p.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 border border-[#1a2332] text-[#aaa] rounded">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: p.color }}
            >
              <ExternalLink className="w-3 h-3" />
              View on GitHub
            </a>
          </motion.div>
        ))}
      </div>

      {/* GitHub link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <a
          href="https://github.com/ApollonIUGB77"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#00ff41] text-[#00ff41] rounded text-sm hover:bg-[#00ff4111] transition-all"
        >
          <GitFork className="w-4 h-4" />
          View all projects on GitHub
        </a>
      </motion.div>
    </section>
  );
}
