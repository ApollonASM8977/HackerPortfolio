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
  { name: 'Python',             pct: 85, color: '#3776AB' },
  { name: 'Linux / Bash',       pct: 90, color: '#00ff41' },
  { name: 'React / TypeScript', pct: 75, color: '#61DAFB' },
  { name: 'Cryptography',       pct: 82, color: '#ffcc00' },
  { name: 'Penetration Testing',pct: 70, color: '#ff0040' },
  { name: 'Network Security',   pct: 75, color: '#00d4ff' },
  { name: 'PHP / MySQL',        pct: 70, color: '#777BB4' },
  { name: 'Flutter / Dart',     pct: 65, color: '#54C5F8' },
];

const TOOLS = [
  'Nmap', 'Wireshark', 'Metasploit', 'Burp Suite',
  'Hydra', 'Nessus', 'Nikto', 'John the Ripper',
  'Hashcat', 'SQLmap', 'Netcat', 'Aircrack-ng',
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
  '⚙️ Algorithms & Data Structures',
  '💻 Full-Stack Web Development',
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-24">

      {/* ── Section title ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          About <span className="text-[#00ff41]">Me</span>
        </h2>
        <p className="text-[#555] text-sm max-w-xl mx-auto">
          Security researcher, developer, and CTF player based in New Jersey.
        </p>
      </motion.div>

      {/* ── Bio + Stats ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

        {/* Bio — 3 cols */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 space-y-5"
        >
          <p className="text-[#aaa] leading-7 text-sm">
            I'm a cybersecurity graduate student at{' '}
            <span className="text-[#00ff41]">Montclair State University</span>,
            passionate about breaking and building secure systems. I specialize in
            cryptography, ethical hacking, and full-stack development.
          </p>
          <p className="text-[#aaa] leading-7 text-sm">
            On TryHackMe I hold the rank{' '}
            <span className="text-[#00d4ff] font-bold">[0xA] WIZARD</span>, placing me in the{' '}
            <span className="text-[#ffcc00]">top 4% worldwide</span> with 21 badges and 98 completed rooms.
            I actively participate in CTF competitions and continuously sharpen my offensive and defensive security skills.
          </p>

          {/* Interests */}
          <div className="hacker-panel p-5 mt-4">
            <div className="text-xs text-[#444] font-mono mb-3">$ cat interests.txt</div>
            <ul className="space-y-1.5">
              {INTERESTS.map(i => (
                <li key={i} className="text-[#aaa] text-xs flex items-center gap-2">
                  <span className="text-[#00ff41]">›</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Stats — 2 cols */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 grid grid-cols-2 gap-3 content-start"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hacker-panel p-4 text-center"
            >
              <div
                className="text-2xl font-bold font-mono mb-1"
                style={{ color: s.color, textShadow: `0 0 10px ${s.color}88` }}
              >
                {s.value}
              </div>
              <div className="text-[#555] text-xs">{s.label}</div>
            </motion.div>
          ))}

          {/* Location card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="hacker-panel p-4 col-span-2"
          >
            <div className="text-[#444] text-xs font-mono mb-2">$ echo $LOCATION</div>
            <div className="text-white text-sm">🇺🇸 Montclair, New Jersey, USA</div>
            <div className="text-[#555] text-xs mt-1">Originally from 🇨🇮 Côte d'Ivoire</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="hacker-panel p-4 col-span-2"
          >
            <div className="text-[#444] text-xs font-mono mb-2">$ echo $STATUS</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] shadow-sm shadow-green-400 animate-pulse" />
              <span className="text-[#00ff41] text-sm font-mono">Open to opportunities</span>
            </div>
            <div className="text-[#555] text-xs mt-1">Remote • On-site • Any location</div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Skills ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-6">
          <Terminal className="w-4 h-4 text-[#444]" />
          <span className="text-[#444] text-xs font-mono">$ cat /etc/skills</span>
          <div className="flex-1 h-px bg-[#0f1923]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {SKILLS.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#bbb]">{skill.name}</span>
                <span style={{ color: skill.color }}>{skill.pct}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                  style={{ background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Tools + Certs ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Security tools */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hacker-panel p-6"
        >
          <div className="text-xs text-[#444] font-mono mb-4">$ ls /usr/share/tools/</div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(t => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs border border-[#1a2332] text-[#00d4ff] rounded-md hover:border-[#00d4ff66] transition-colors cursor-default font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hacker-panel p-6"
        >
          <div className="text-xs text-[#444] font-mono mb-4">$ cat /etc/certifications</div>
          <div className="space-y-3">
            {CERTS.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-base">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[#bbb] text-xs truncate">{c.name}</div>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded font-mono shrink-0"
                  style={{ color: c.color, background: c.color + '18', border: `1px solid ${c.color}44` }}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
