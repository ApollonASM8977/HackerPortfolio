// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/* ───────────────────── DATA ────────────────────────── */
const QUOTES = [
  { text: 'The quieter you become, the more you are able to hear.', author: 'Kali Linux' },
  { text: 'Security is not a product, but a process.', author: 'Bruce Schneier' },
  { text: 'The only truly secure system is one that is powered off.', author: 'Gene Spafford' },
  { text: 'To catch a hacker, you must think like a hacker.', author: 'Unknown' },
  { text: 'Given enough eyeballs, all bugs are shallow.', author: "Linus's Law" },
  { text: 'There are only two types of companies: those that have been hacked, and those that will be.', author: 'Robert Mueller' },
  { text: 'Privacy is not for the paranoid — it is for the prepared.', author: 'Unknown' },
  { text: 'In cybersecurity, offense informs defense.', author: 'Unknown' },
  { text: 'Hackers are the immune system of the information age.', author: 'Ralph Nader' },
  { text: 'The art of war is to subdue the enemy without fighting.', author: 'Sun Tzu' },
];

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

const RADAR_SKILLS = [
  { label: 'Linux', value: 90 },
  { label: 'Python', value: 85 },
  { label: 'Crypto', value: 82 },
  { label: 'React/TS', value: 75 },
  { label: 'Network', value: 75 },
  { label: 'Pentest', value: 70 },
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

const TIMELINE = [
  { year: '2021', title: 'B.S. Computer Science', place: 'University of Côte d\'Ivoire 🇨🇮', color: '#00ff41' },
  { year: '2023', title: 'M.S. Cybersecurity — Started', place: 'Montclair State University, NJ 🇺🇸', color: '#00d4ff' },
  { year: '2024', title: '(ISC)² CC Certification', place: 'Certified in Cybersecurity', color: '#a855f7' },
  { year: '2024', title: 'TryHackMe WIZARD [0xA]', place: 'Top 4% worldwide — 21 badges', color: '#ffcc00' },
  { year: '2025', title: '98+ Rooms completed', place: 'TryHackMe | 13 CTF challenges built', color: '#ff6b6b' },
  { year: '2026', title: 'M.S. Cybersecurity — Expected', place: 'Graduation + Security+ / Network+', color: '#00ff41' },
];

/* ───────────────────── HELPERS ─────────────────────── */
const f = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d },
});

/* ───────────────────── SUB-COMPONENTS ──────────────── */
function QuoteRotator() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % QUOTES.length); setVisible(true); }, 500);
    }, 5000);
    return () => clearInterval(iv);
  }, []);
  const q = QUOTES[idx];
  return (
    <div className="hacker-panel px-6 py-5 w-full text-center min-h-[96px] flex flex-col items-center justify-center gap-2">
      <div className="mono text-[#444] text-xs mb-1">$ cat quotes.txt</div>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div key={idx} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-8 }} transition={{ duration:0.4 }}
            className="flex flex-col items-center gap-1">
            <p className="text-[#aaa] text-sm italic leading-6 max-w-lg">"{q.text}"</p>
            <span className="text-[#00ff41] text-xs mono">— {q.author}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RadarChart() {
  const cx = 130, cy = 130, r = 95;
  const n = RADAR_SKILLS.length;
  const angle = (i: number) => (i * (2 * Math.PI / n)) - Math.PI / 2;
  const pt = (i: number, s: number) => ({
    x: cx + r * s * Math.cos(angle(i)),
    y: cy + r * s * Math.sin(angle(i)),
  });
  const polygon = (level: number) =>
    RADAR_SKILLS.map((_, i) => pt(i, level))
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';

  const dataPath = RADAR_SKILLS.map((s, i) => pt(i, s.value / 100))
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="mono text-[#333] text-xs">$ skill_radar.py</p>
      <svg viewBox="0 0 260 260" className="w-56 h-56">
        {/* Grid */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map(l => (
          <path key={l} d={polygon(l)} fill="none" stroke="#1a2332" strokeWidth="1" />
        ))}
        {/* Axes */}
        {RADAR_SKILLS.map((_, i) => {
          const p = pt(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#1a2332" strokeWidth="1" />;
        })}
        {/* Data fill */}
        <path d={dataPath} fill="#00ff4118" stroke="#00ff41" strokeWidth="2" />
        {/* Data dots */}
        {RADAR_SKILLS.map((s, i) => {
          const p = pt(i, s.value / 100);
          return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#00ff41" />;
        })}
        {/* Labels */}
        {RADAR_SKILLS.map((s, i) => {
          const p = pt(i, 1.24);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
              fill="#aaa" fontSize="9.5" fontFamily="Fira Code, monospace">
              {s.label}
            </text>
          );
        })}
        {/* % labels on outer ring */}
        {[20,40,60,80,100].map(pct => {
          const p = pt(2, pct / 100);
          return (
            <text key={pct} x={p.x + 5} y={p.y} fill="#333" fontSize="7.5"
              fontFamily="Fira Code, monospace">{pct}%</text>
          );
        })}
      </svg>
    </div>
  );
}

function Timeline() {
  return (
    <div className="flex flex-col gap-0 w-full max-w-lg relative">
      <p className="mono text-[#333] text-xs mb-6 text-center">$ git log --oneline career</p>
      {/* vertical line */}
      <div className="absolute left-[52px] top-8 bottom-2 w-px bg-[#1a2332]" />
      {TIMELINE.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
          transition={{ delay: 0.1 + i * 0.1 }}
          className="flex items-start gap-4 pb-6 relative"
        >
          {/* Year */}
          <div className="w-12 shrink-0 mono text-xs text-right pt-0.5" style={{ color: item.color }}>
            {item.year}
          </div>
          {/* Dot */}
          <div className="relative z-10 mt-1 shrink-0">
            <div className="w-3 h-3 rounded-full border-2 flex-shrink-0"
              style={{ borderColor: item.color, background: '#070b10',
                boxShadow: `0 0 8px ${item.color}66` }} />
          </div>
          {/* Content */}
          <div className="flex-1 hacker-panel px-4 py-2.5">
            <div className="text-white text-xs font-semibold">{item.title}</div>
            <div className="text-[#555] text-xs mt-0.5">{item.place}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────── MAIN ────────────────────────── */
export function AboutSection() {
  return (
    <div className="flex flex-col items-center w-full px-6 py-20 gap-20">

      {/* Title + CV */}
      <motion.div {...f(0)} className="text-center flex flex-col items-center gap-4">
        <h2 className="text-4xl font-bold text-white mb-1">
          About <span className="text-[#00ff41]">Me</span>
        </h2>
        <p className="text-[#555] text-sm leading-7">
          Security researcher, full-stack developer & CTF player — New Jersey, USA
        </p>
        <a href="/resume.pdf" download
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#00ff4155]
                     rounded-lg mono text-xs text-[#00ff41] hover:bg-[#00ff4111] transition-all">
          ↓ Download Resume (PDF)
        </a>
      </motion.div>

      {/* Bio */}
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

      {/* Quote rotator */}
      <motion.div {...f(0.13)} className="w-full max-w-2xl">
        <QuoteRotator />
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.15)} className="w-full max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="hacker-panel p-5 flex flex-col items-center gap-1">
              <div className="text-xl font-bold mono"
                style={{ color: s.color, textShadow: `0 0 10px ${s.color}88` }}>
                {s.value}
              </div>
              <div className="text-[#444] text-xs text-center">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div {...f(0.18)} className="w-full max-w-2xl flex flex-col items-center">
        <Timeline />
      </motion.div>

      {/* Skills — bars + radar */}
      <motion.div {...f(0.25)} className="w-full max-w-2xl flex flex-col gap-8">
        <p className="mono text-[#333] text-xs text-center">$ cat /etc/skills</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Bars */}
          <div className="flex flex-col gap-5">
            {SKILLS.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mono text-xs mb-2">
                  <span className="text-[#bbb]">{skill.name}</span>
                  <span style={{ color: skill.color }}>{skill.pct}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div className="skill-bar-fill" initial={{ width:0 }}
                    animate={{ width:`${skill.pct}%` }}
                    transition={{ duration:1.2, delay: 0.3 + i * 0.07, ease:'easeOut' }}
                    style={{ background:`linear-gradient(90deg, ${skill.color}55, ${skill.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Radar */}
          <RadarChart />
        </div>
      </motion.div>

      {/* Interests */}
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

      {/* Tools */}
      <motion.div {...f(0.3)} className="w-full max-w-2xl flex flex-col items-center gap-4">
        <p className="mono text-[#333] text-xs">$ ls /usr/share/tools/</p>
        <div className="hacker-panel p-6 w-full">
          <div className="flex flex-wrap justify-center gap-2">
            {TOOLS.map(t => (
              <span key={t}
                className="px-3 py-1 text-xs border border-[#1a2332] text-[#00d4ff]
                           rounded-md hover:border-[#00d4ff55] transition-colors cursor-default mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Certs */}
      <motion.div {...f(0.35)} className="w-full max-w-2xl flex flex-col items-center gap-4">
        <p className="mono text-[#333] text-xs">$ cat certifications.txt</p>
        <div className="hacker-panel p-6 w-full flex flex-col gap-4">
          {CERTS.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-lg shrink-0">{c.icon}</span>
              <span className="flex-1 text-[#bbb] text-xs">{c.name}</span>
              <span className="text-xs px-2 py-0.5 rounded mono shrink-0"
                style={{ color:c.color, background:c.color+'18', border:`1px solid ${c.color}44` }}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
