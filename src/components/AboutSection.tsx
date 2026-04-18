// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';

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

const f = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d },
});

export function AboutSection() {
  return (
    <div className="flex flex-col items-center w-full px-6 py-20 gap-20">

      {/* ── Title ──────────────────────────────────────────── */}
      <motion.div {...f(0)} className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          About <span className="text-[#00ff41]">Me</span>
        </h2>
        <p className="text-[#555] text-sm leading-7">
          Security researcher, full-stack developer & CTF player — New Jersey, USA
        </p>
      </motion.div>

      {/* ── Bio ────────────────────────────────────────────── */}
      <motion.div {...f(0.1)} className="flex flex-col items-center gap-5 w-full max-w-2xl text-center">
        <p className="text-[#aaa] leading-8 text-sm">
          I'm a cybersecurity graduate student at{' '}
          <span className="text-[#00ff41]">Montclair State University</span>, passionate about
          breaking and building secure systems. I specialize in cryptography, ethical hacking,
          and full-stack development.
        </p>
        <p className="text-[#aaa] leading-8 text-sm">
          On TryHackMe I hold the rank{' '}
          <span className="text-[#00d4ff] font-bold">[0xA] WIZARD</span>, placing me in the{' '}
          <span className="text-[#ffcc00]">top 4%</span> worldwide with 21 badges and 98 rooms.
        </p>

        {/* Status + location pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <div className="hacker-panel px-5 py-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="mono text-[#00ff41] text-xs">Open to opportunities</span>
          </div>
          <div className="hacker-panel px-5 py-3 mono text-[#aaa] text-xs">
            🇺🇸 New Jersey &nbsp;·&nbsp; Originally 🇨🇮 Côte d'Ivoire
          </div>
        </div>
      </motion.div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <motion.div {...f(0.15)} className="w-full max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="hacker-panel p-5 flex flex-col items-center gap-1"
            >
              <div
                className="text-xl font-bold mono"
                style={{ color: s.color, textShadow: `0 0 10px ${s.color}88` }}
              >
                {s.value}
              </div>
              <div className="text-[#444] text-xs text-center">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Interests ──────────────────────────────────────── */}
      <motion.div {...f(0.2)} className="w-full max-w-lg">
        <div className="hacker-panel p-6">
          <div className="mono text-xs text-[#444] mb-4 text-center">$ cat interests.txt</div>
          <ul className="flex flex-col gap-3">
            {INTERESTS.map(item => (
              <li key={item} className="flex items-center justify-center gap-3 text-[#aaa] text-xs">
                <span className="text-[#00ff41]">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Skills ─────────────────────────────────────────── */}
      <motion.div {...f(0.25)} className="w-full max-w-2xl flex flex-col gap-6">
        <p className="mono text-[#333] text-xs text-center">$ cat /etc/skills</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
          {SKILLS.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between mono text-xs mb-2">
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

      {/* ── Tools ──────────────────────────────────────────── */}
      <motion.div {...f(0.3)} className="w-full max-w-2xl flex flex-col items-center gap-4">
        <p className="mono text-[#333] text-xs">$ ls /usr/share/tools/</p>
        <div className="hacker-panel p-6 w-full">
          <div className="flex flex-wrap justify-center gap-2">
            {TOOLS.map(t => (
              <span
                key={t}
                className="px-3 py-1 text-xs border border-[#1a2332] text-[#00d4ff]
                           rounded-md hover:border-[#00d4ff55] transition-colors cursor-default mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Certs ──────────────────────────────────────────── */}
      <motion.div {...f(0.35)} className="w-full max-w-2xl flex flex-col items-center gap-4">
        <p className="mono text-[#333] text-xs">$ cat certifications.txt</p>
        <div className="hacker-panel p-6 w-full flex flex-col gap-4">
          {CERTS.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-lg shrink-0">{c.icon}</span>
              <span className="flex-1 text-[#bbb] text-xs">{c.name}</span>
              <span
                className="text-xs px-2 py-0.5 rounded mono shrink-0"
                style={{ color: c.color, background: c.color + '18', border: `1px solid ${c.color}44` }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
