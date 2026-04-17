// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const STATS = [
  { label: 'TryHackMe Rank',  value: '[0xA] WIZARD', color: '#00d4ff' },
  { label: 'Global Position', value: 'Top 4%',        color: '#ffcc00' },
  { label: 'Badges Earned',   value: '21',            color: '#00ff41' },
  { label: 'Rooms Completed', value: '98',            color: '#ff6b6b' },
];

const SKILLS = [
  { name: 'Linux / Bash',        pct: 90, color: '#00ff41' },
  { name: 'Python',              pct: 85, color: '#3776AB' },
  { name: 'Cryptography',        pct: 82, color: '#ffcc00' },
  { name: 'React / TypeScript',  pct: 75, color: '#61DAFB' },
  { name: 'Network Security',    pct: 75, color: '#00d4ff' },
  { name: 'PHP / MySQL',         pct: 70, color: '#777BB4' },
  { name: 'Penetration Testing', pct: 70, color: '#ff0040' },
  { name: 'Flutter / Dart',      pct: 65, color: '#54C5F8' },
];

const TOOLS = [
  'Nmap','Wireshark','Metasploit','Burp Suite',
  'Hydra','Nessus','Nikto','John the Ripper',
  'Hashcat','SQLmap','Netcat','Aircrack-ng',
];

const CERTS = [
  { name: '(ISC)² Certified in Cybersecurity (CC)', icon: '🛡️', status: 'Obtained',         color: '#00ff41' },
  { name: 'EC-Council — CSCU',                      icon: '🔐', status: 'Obtained',         color: '#00ff41' },
  { name: 'Fortinet — NSE 2 Network Security',      icon: '🔒', status: 'Obtained',         color: '#00ff41' },
  { name: 'TryHackMe — Intro to Cybersecurity',     icon: '🧠', status: 'Aug 2024',         color: '#00d4ff' },
  { name: 'CompTIA Security+ / Network+',           icon: '📡', status: 'In progress 2026', color: '#ffcc00' },
];

const INTERESTS = [
  '🔐 Cryptography & Information Security',
  '🧠 Ethical Hacking & CTF Challenges',
  '📡 Network Security & Vulnerability Assessment',
  '⚙️  Algorithms & Data Structures',
  '💻 Full-Stack Web Development',
];

/* tiny fade-up helper */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export function AboutSection() {
  return (
    <section className="relative z-10 w-full px-6 py-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-20">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            About <span className="text-[#00ff41]">Me</span>
          </h2>
          <p className="text-[#555] text-sm max-w-lg mx-auto leading-7">
            Security researcher, full-stack developer, and CTF player — based in New Jersey.
          </p>
        </motion.div>

        {/* ── Bio ────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="max-w-2xl mx-auto w-full space-y-5 text-center">
          <p className="text-[#aaa] leading-8 text-sm">
            I'm a cybersecurity graduate student at{' '}
            <span className="text-[#00ff41]">Montclair State University</span>,
            passionate about breaking and building secure systems.
            I specialize in cryptography, ethical hacking, and full-stack development.
          </p>
          <p className="text-[#aaa] leading-8 text-sm">
            On TryHackMe I hold the rank{' '}
            <span className="text-[#00d4ff] font-bold">[0xA] WIZARD</span>, placing me in the{' '}
            <span className="text-[#ffcc00]">top 4%</span> worldwide
            with 21 badges and 98 completed rooms.
          </p>

          {/* Status + Location */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="hacker-panel px-5 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
              <span className="mono text-[#00ff41] text-xs">Open to opportunities</span>
              <span className="text-[#333] text-xs">Remote • On-site</span>
            </div>
            <div className="hacker-panel px-5 py-3 text-xs text-[#aaa] mono">
              🇺🇸 New Jersey, USA &nbsp;·&nbsp; Originally 🇨🇮 Côte d'Ivoire
            </div>
          </div>
        </motion.div>

        {/* ── Stats ──────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.15)}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="hacker-panel p-5 text-center"
              >
                <div
                  className="text-xl font-bold mono mb-1"
                  style={{ color: s.color, textShadow: `0 0 10px ${s.color}88` }}
                >
                  {s.value}
                </div>
                <div className="text-[#444] text-xs">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Interests ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0.2)} className="max-w-2xl mx-auto w-full">
          <div className="hacker-panel p-6">
            <div className="text-xs text-[#444] mono mb-4">$ cat interests.txt</div>
            <ul className="space-y-3">
              {INTERESTS.map(item => (
                <li key={item} className="text-[#aaa] text-xs flex items-center gap-3">
                  <span className="text-[#00ff41]">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Skills ─────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.25)}>
          <div className="flex items-center gap-4 mb-8">
            <Terminal className="w-4 h-4 text-[#333]" />
            <span className="text-[#333] text-xs mono">$ cat /etc/skills</span>
            <div className="flex-1 h-px bg-[#0f1923]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {SKILLS.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mono mb-2">
                  <span className="text-[#bbb]">{skill.name}</span>
                  <span style={{ color: skill.color }}>{skill.pct}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(90deg, ${skill.color}55, ${skill.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tools + Certs ──────────────────────────────────── */}
        <motion.div {...fadeUp(0.3)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Tools */}
          <div className="hacker-panel p-6">
            <div className="text-xs text-[#444] mono mb-5">$ ls /usr/share/tools/</div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs border border-[#1a2332] text-[#00d4ff] rounded-md
                             hover:border-[#00d4ff55] transition-colors cursor-default mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Certs */}
          <div className="hacker-panel p-6">
            <div className="text-xs text-[#444] mono mb-5">$ cat certifications.txt</div>
            <div className="space-y-4">
              {CERTS.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-base shrink-0">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#bbb] text-xs truncate">{c.name}</div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded mono shrink-0"
                    style={{ color: c.color, background: c.color + '18', border: `1px solid ${c.color}44` }}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
