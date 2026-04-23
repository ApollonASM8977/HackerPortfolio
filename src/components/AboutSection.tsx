// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { GlitchText } from './GlitchText';

/* ── Animated counter hook ───────────────────────────── */
function useAnimatedCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(target * ease));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ── Hash identifier ─────────────────────────────────── */
function identifyHash(h: string): { type: string; bits: number | null; color: string } {
  const s = h.trim();
  if (!s) return { type: '', bits: null, color: '#444' };
  if (/^\$2[aby]\$/.test(s)) return { type: 'bcrypt', bits: null, color: '#a855f7' };
  if (/^\$1\$/.test(s))      return { type: 'MD5-crypt', bits: null, color: '#ffcc00' };
  if (/^\$6\$/.test(s))      return { type: 'SHA-512-crypt', bits: null, color: '#ff0040' };
  if (/^\$5\$/.test(s))      return { type: 'SHA-256-crypt', bits: null, color: '#ffcc00' };
  const hex = /^[0-9a-fA-F]+$/.test(s);
  if (hex) {
    const map: Record<number, [string, number, string]> = {
      32:  ['MD5',     128, '#ffcc00'],
      40:  ['SHA-1',   160, '#ff6b6b'],
      56:  ['SHA-224', 224, '#00d4ff'],
      64:  ['SHA-256', 256, '#00ff41'],
      96:  ['SHA-384', 384, '#00d4ff'],
      128: ['SHA-512', 512, '#a855f7'],
    };
    const m = map[s.length];
    if (m) return { type: m[0], bits: m[1], color: m[2] };
  }
  if (/^[A-Za-z0-9+/=]+$/.test(s)) {
    const b64map: Record<number, [string, number, string]> = {
      24: ['MD5 (Base64)',     128, '#ffcc00'],
      28: ['SHA-1 (Base64)',   160, '#ff6b6b'],
      44: ['SHA-256 (Base64)', 256, '#00ff41'],
      88: ['SHA-512 (Base64)', 512, '#a855f7'],
    };
    const m = b64map[s.length];
    if (m) return { type: m[0], bits: m[1], color: m[2] };
    return { type: 'Possible Base64 / unknown', bits: null, color: '#444' };
  }
  return { type: `Unknown (${s.length} chars)`, bits: null, color: '#444' };
}

function HashIdentifier() {
  const [input, setInput] = useState('');
  const result = identifyHash(input);

  return (
    <div className="hacker-panel p-5 w-full flex flex-col gap-3">
      <div className="mono text-[#333] text-xs">$ hash-identifier — paste any hash</div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="5f4dcc3b5aa765d61d8327deb882cf99"
        className="bg-transparent border border-[#1a2332] rounded px-3 py-2 mono text-xs
                   text-[#e2e8f0] outline-none focus:border-[#00ff4155] transition-colors placeholder:text-[#333]"
      />
      {input && (
        <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
          className="flex items-center gap-3">
          <span className="mono font-bold text-sm" style={{ color: result.color }}>{result.type}</span>
          {result.bits && <span className="mono text-[#444] text-xs">({result.bits}-bit)</span>}
        </motion.div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {[
          ['MD5 sample',    '5f4dcc3b5aa765d61d8327deb882cf99'],
          ['SHA-256 sample','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'],
          ['bcrypt sample', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'],
        ].map(([label, val]) => (
          <button key={label} onClick={() => setInput(val)}
            className="mono text-[10px] px-2 py-0.5 rounded border border-[#1a2332] text-[#333]
                       hover:text-[#00ff41] hover:border-[#00ff4144] transition-colors">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

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
  { name: '(ISC)Â² Certified in Cybersecurity (CC)',  icon: 'ðŸ›¡ï¸', status: 'Obtained',          color: '#00ff41' },
  { name: 'EC-Council — CSCU',                       icon: 'ðŸ”', status: 'Obtained',          color: '#00ff41' },
  { name: 'Fortinet — NSE 2 Network Security',       icon: 'ðŸ”’', status: 'Obtained',          color: '#00ff41' },
  { name: 'TryHackMe — Intro to Cybersecurity Path', icon: 'ðŸ§ ', status: 'Aug 24 2024',       color: '#00d4ff' },
  { name: 'TryHackMe — Pre Security Path',           icon: 'ðŸ”‘', status: 'Sep 8 2024',        color: '#00d4ff' },
  { name: 'CompTIA Security+ / Network+',            icon: 'ðŸ“¡', status: 'In progress 2026',  color: '#ffcc00' },
];

const INTERESTS = [
  'ðŸ” Cryptography & Information Security',
  'ðŸ§  Ethical Hacking & CTF Challenges',
  'ðŸ“¡ Network Security & Vulnerability Assessment',
  'âš™ï¸  Algorithms & Data Structures',
  'ðŸ’» Full-Stack Web Development',
];

const TIMELINE = [
  { year: '2019', title: 'B.S. Computer Science — Started', place: 'UniversitÃ© de CÃ´te d\'Ivoire ðŸ‡¨ðŸ‡®', color: '#00ff41' },
  { year: '2023', title: 'TryHackMe — First room', place: 'Started ethical hacking journey · 589 events Y1', color: '#00d4ff' },
  { year: '2023', title: 'TryHackMe WIZARD rank [0xA]', place: 'Top 4% worldwide — 21 badges earned', color: '#ffcc00' },
  { year: '2024', title: 'M.S. Cybersecurity — Started', place: 'Montclair State University, NJ ðŸ‡ºðŸ‡¸', color: '#a855f7' },
  { year: '2024', title: '(ISC)Â² CC Certification', place: 'Certified in Cybersecurity (CC)', color: '#00ff41' },
  { year: '2025', title: '98+ Rooms · 13 CTF challenges built', place: 'TryHackMe | Portfolio launch', color: '#ff6b6b' },
  { year: '2026', title: 'M.S. Cybersecurity — Expected', place: 'Graduation + CompTIA Security+ / Network+', color: '#00d4ff' },
];

const BADGES: { name: string; rarity: 'Legendary' | 'Epic' | 'Rare' | 'Uncommon' | 'Common' | 'Seasonal'; color: string; icon: string }[] = [
  { name: '365-Day Streak',       rarity: 'Legendary', color: '#ffcc00', icon: 'ðŸ”¥' },
  { name: '180-Day Streak',       rarity: 'Epic',      color: '#a855f7', icon: 'ðŸ”¥' },
  { name: 'Mr. Robot',            rarity: 'Rare',      color: '#00d4ff', icon: 'ðŸ¤–' },
  { name: 'Throwback',            rarity: 'Rare',      color: '#00d4ff', icon: 'ðŸªŸ' },
  { name: 'cat',                  rarity: 'Rare',      color: '#00d4ff', icon: 'ðŸ±' },
  { name: '90-Day Streak',        rarity: 'Uncommon',  color: '#00d4ff', icon: 'ðŸ”¥' },
  { name: 'Blue',                 rarity: 'Uncommon',  color: '#00d4ff', icon: 'ðŸ’™' },
  { name: 'Metasploitable',       rarity: 'Uncommon',  color: '#00ff41', icon: 'ðŸ’»' },
  { name: 'World Wide Web',       rarity: 'Uncommon',  color: '#00ff41', icon: 'ðŸŒ' },
  { name: 'Pre Security',         rarity: 'Uncommon',  color: '#00d4ff', icon: 'ðŸ›¡ï¸' },
  { name: 'Intro to Cyber',       rarity: 'Uncommon',  color: '#00d4ff', icon: 'ðŸ§ ' },
  { name: 'Web Fundamentals',     rarity: 'Uncommon',  color: '#00ff41', icon: 'ðŸ•¸ï¸' },
  { name: 'Hash Cracker',         rarity: 'Common',    color: '#aaa',    icon: '#ï¸âƒ£' },
  { name: '30-Day Streak',        rarity: 'Common',    color: '#aaa',    icon: 'ðŸ”¥' },
  { name: '7-Day Streak',         rarity: 'Common',    color: '#aaa',    icon: 'ðŸ”¥' },
  { name: 'Networking Nerd',      rarity: 'Common',    color: '#aaa',    icon: 'ðŸ“¡' },
  { name: 'Linux Fundamentals',   rarity: 'Common',    color: '#aaa',    icon: 'ðŸ§' },
  { name: 'OG',                   rarity: 'Common',    color: '#aaa',    icon: 'ðŸ‘¾' },
  { name: 'Advent of Cyber 2024', rarity: 'Seasonal',  color: '#ff6b6b', icon: 'ðŸŽ„' },
  { name: 'Advent of Cyber 2023', rarity: 'Seasonal',  color: '#ff6b6b', icon: 'ðŸŽ„' },
  { name: 'Advent of Cyber 2022', rarity: 'Seasonal',  color: '#ff6b6b', icon: 'ðŸŽ„' },
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

const RARITY_ORDER: Record<string, number> = { Legendary: 0, Epic: 1, Rare: 2, Uncommon: 3, Common: 4, Seasonal: 5 };

function BadgesShowcase() {
  const sorted = [...BADGES].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
  return (
    <div className="hacker-panel p-6 w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="mono text-[#333] text-xs">$ ls ~/.thm/badges/ &nbsp;·&nbsp; {BADGES.length} earned</div>
        <a href="https://tryhackme.com/p/exterminator" target="_blank" rel="noopener noreferrer"
          className="mono text-[10px] text-[#00d4ff] hover:underline">tryhackme.com/p/exterminator â†—</a>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-[10px] mono">
        {(['Legendary','Epic','Rare','Uncommon','Common','Seasonal'] as const).map(r => {
          const c = BADGES.find(b => b.rarity === r)?.color ?? '#aaa';
          return (
            <span key={r} className="px-2 py-0.5 rounded"
              style={{ color: c, background: c + '15', border: `1px solid ${c}33` }}>{r}</span>
          );
        })}
      </div>
      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {sorted.map((b, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.025 }}
            title={`${b.name} — ${b.rarity}`}
            className="flex flex-col items-center gap-1 p-2 rounded-lg border cursor-default
                       hover:scale-105 transition-transform"
            style={{ background: b.color + '08', borderColor: b.color + '25' }}>
            <span className="text-xl leading-none">{b.icon}</span>
            <span className="mono text-[8px] text-center leading-tight text-[#777]">{b.name}</span>
          </motion.div>
        ))}
      </div>
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

/* ── Animated stat card ──────────────────────────────── */
function AnimatedStatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  // Parse numeric value (e.g. "98", "21", "Top 4%")
  const numeric = parseInt(stat.value.replace(/\D/g, ''));
  const isNumeric = !isNaN(numeric) && String(numeric).length > 0 && /^\d/.test(stat.value.replace(/\D/, ''));
  const { count, ref } = useAnimatedCounter(isNumeric ? numeric : 0);
  const display = isNumeric ? stat.value.replace(String(numeric), String(count)) : stat.value;

  return (
    <motion.div ref={ref} initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
      transition={{ delay }} className="hacker-panel p-5 flex flex-col items-center gap-1">
      <div className="text-xl font-bold mono"
        style={{ color: stat.color, textShadow:`0 0 10px ${stat.color}88` }}>
        {display}
      </div>
      <div className="text-[#444] text-xs text-center">{stat.label}</div>
    </motion.div>
  );
}

/* ───────────────────── MAIN ────────────────────────── */
export function AboutSection() {
  return (
    <div className="flex flex-col items-center w-full px-6 pt-16 pb-32 gap-20">

      {/* Title + CV */}
      <motion.div {...f(0)} className="text-center flex flex-col items-center gap-4">
        <h2 className="text-4xl font-bold text-white mb-1">
          About <GlitchText color="#00ff41">Me</GlitchText>
        </h2>
        <p className="text-[#555] text-sm leading-7">
          Security researcher, full-stack developer & CTF player — New Jersey, USA
        </p>
        <a href="/resume.pdf" download
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#00ff4155]
                     rounded-lg mono text-xs text-[#00ff41] hover:bg-[#00ff4111] transition-all">
          ↑ Download Resume (PDF)
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
            ðŸ‡ºðŸ‡¸ New Jersey &nbsp;·&nbsp; Originally ðŸ‡¨ðŸ‡® CÃ´te d'Ivoire
          </div>
        </div>
      </motion.div>

      {/* Quote rotator */}
      <motion.div {...f(0.13)} className="w-full max-w-2xl">
        <QuoteRotator />
      </motion.div>

      {/* Stats — animated counters */}
      <motion.div {...f(0.15)} className="w-full max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => <AnimatedStatCard key={i} stat={s} delay={0.2 + i * 0.08} />)}
        </div>
      </motion.div>

      {/* TryHackMe Badges */}
      <motion.div {...f(0.17)} className="w-full max-w-2xl flex flex-col items-center gap-3">
        <p className="mono text-[#333] text-xs text-center">$ cat ~/.thm/badges.log</p>
        <BadgesShowcase />
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
                <span className="text-[#00ff41]">â€º</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Hash Identifier mini-tool */}
      <motion.div {...f(0.28)} className="w-full max-w-2xl flex flex-col gap-3">
        <p className="mono text-[#333] text-xs text-center">$ hash-identifier — live tool</p>
        <HashIdentifier />
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

