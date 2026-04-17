// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { Shield, Terminal, Code2, Cpu, Trophy, MapPin } from 'lucide-react';

const SKILLS = [
  { name: 'Python',      pct: 85, color: '#3776AB' },
  { name: 'Linux / Bash',pct: 90, color: '#00ff41' },
  { name: 'React / TS',  pct: 75, color: '#61DAFB' },
  { name: 'PHP / MySQL', pct: 70, color: '#777BB4' },
  { name: 'Cryptography',pct: 82, color: '#ffcc00' },
  { name: 'Penetration Testing', pct: 70, color: '#ff0040' },
  { name: 'Network Security',    pct: 75, color: '#00d4ff' },
  { name: 'Flutter / Dart',      pct: 65, color: '#54C5F8' },
];

const TOOLS = ['Nmap','Wireshark','Metasploit','Burp Suite','Hydra','Nessus','Nikto','John the Ripper','Hashcat','SQLmap','Netcat','Aircrack-ng'];

const CERTS = [
  { name: '(ISC)² Certified in Cybersecurity (CC)', icon: '🛡️', status: 'Obtained' },
  { name: 'EC-Council CSCU — N° ECC5764213098',     icon: '🔐', status: 'Obtained' },
  { name: 'Fortinet NSE 2 — N° RUByjTECd8',         icon: '🔒', status: 'Obtained' },
  { name: 'TryHackMe — Intro to Cybersecurity',      icon: '🧠', status: 'Aug 2024' },
  { name: 'CompTIA Security+ / Network+',            icon: '📡', status: 'In progress 2026' },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 max-w-5xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#666] text-sm">01.</span>
          <h2 className="text-[#00ff41] text-2xl font-bold tracking-wide">{'<About Me />'}</h2>
          <div className="flex-1 h-px bg-[#1a2332]" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Python class card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hacker-panel p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs text-[#666]">
            <Code2 className="w-4 h-4" />
            <span>about_me.py</span>
          </div>
          <pre className="text-xs leading-6 overflow-x-auto">
<span className="text-[#ff79c6]">class </span><span className="text-[#50fa7b]">AboubacarSidickMeite</span><span className="text-white">:</span>
{`
`}<span className="text-[#ffcc00]">    name</span>     <span className="text-white">= </span><span className="text-[#f1fa8c]">"Aboubacar Sidick Meite"</span>
{`
`}<span className="text-[#ffcc00]">    alias</span>    <span className="text-white">= </span><span className="text-[#f1fa8c]">"ApollonIUGB77"</span>
{`
`}<span className="text-[#ffcc00]">    location</span> <span className="text-white">= </span><span className="text-[#f1fa8c]">"Montclair, New Jersey 🇺🇸 | Ivoirien 🇨🇮"</span>
{`
`}<span className="text-[#ffcc00]">    education</span> <span className="text-white">= </span><span className="text-[#bd93f9]">{"{"}</span>
{`
`}<span className="text-[#f1fa8c]">        "current"</span><span className="text-white">: </span><span className="text-[#f1fa8c]">"M.S. Cybersecurity"</span><span className="text-white">,</span>
{`
`}<span className="text-[#f1fa8c]">        "school"</span> <span className="text-white">: </span><span className="text-[#f1fa8c]">"Montclair State University"</span><span className="text-white">,</span>
{`
`}<span className="text-[#f1fa8c]">        "gpa"</span>    <span className="text-white">: </span><span className="text-[#50fa7b]">3.82</span>
{`
`}<span className="text-[#bd93f9]">    {"}"}</span>
{`
`}<span className="text-[#ffcc00]">    tryhackme</span> <span className="text-white">= </span><span className="text-[#bd93f9]">{"{"}</span>
{`
`}<span className="text-[#f1fa8c]">        "rank"</span>   <span className="text-white">: </span><span className="text-[#f1fa8c]">"[0xA] WIZARD"</span><span className="text-white">,</span>
{`
`}<span className="text-[#f1fa8c]">        "top"</span>    <span className="text-white">: </span><span className="text-[#f1fa8c]">"4% worldwide"</span><span className="text-white">,</span>
{`
`}<span className="text-[#f1fa8c]">        "badges"</span> <span className="text-white">: </span><span className="text-[#50fa7b]">21</span><span className="text-white">,</span>
{`
`}<span className="text-[#f1fa8c]">        "rooms"</span>  <span className="text-white">: </span><span className="text-[#50fa7b]">98</span>
{`
`}<span className="text-[#bd93f9]">    {"}"}</span>
{`
`}<span className="text-[#ffcc00]">    motto</span> <span className="text-white">= </span><span className="text-[#f1fa8c]">"Code with purpose. Hack with ethics."</span>
          </pre>
        </motion.div>

        {/* Info cards */}
        <div className="space-y-4">
          {[
            { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: 'Montclair, NJ, USA 🇺🇸' },
            { icon: <Trophy className="w-4 h-4 text-yellow-400" />, label: 'TryHackMe', value: '[0xA] WIZARD — Top 4% — exterminator' },
            { icon: <Shield className="w-4 h-4 text-red-400" />, label: 'Experience', value: 'IT & Network Security Intern @ Sanlam Alliance' },
            { icon: <Terminal className="w-4 h-4 text-cyan-400" />, label: 'Interests', value: 'CTF, Pentest, Cryptography, Full-Stack' },
            { icon: <Cpu className="w-4 h-4 text-purple-400" />, label: 'Available', value: 'Open to work — any location' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hacker-panel px-4 py-3 flex items-center gap-3"
            >
              <span className="text-[#00ff41]">{item.icon}</span>
              <div>
                <div className="text-[#666] text-xs">{item.label}</div>
                <div className="text-white text-sm">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 hacker-panel p-6"
      >
        <div className="flex items-center gap-2 mb-6 text-xs text-[#666]">
          <Terminal className="w-4 h-4" />
          <span>$ cat /etc/skills</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#ccc]">{skill.name}</span>
                <span style={{ color: skill.color }}>{skill.pct}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                  style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 hacker-panel p-6"
      >
        <div className="text-xs text-[#666] mb-4">$ ls /usr/share/tools/</div>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map(t => (
            <span key={t} className="px-3 py-1 text-xs border border-[#1a2332] text-[#00d4ff] rounded hover:border-[#00d4ff] hover:shadow-sm hover:shadow-cyan-500/20 transition-all cursor-default">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 hacker-panel p-6"
      >
        <div className="text-xs text-[#666] mb-4">$ cat /etc/certifications</div>
        <div className="space-y-2">
          {CERTS.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span>{c.icon}</span>
              <span className="text-[#ccc] flex-1">{c.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${c.status === 'Obtained' || c.status === 'Aug 2024' ? 'text-[#00ff41] border border-[#00ff4133]' : 'text-[#ffcc00] border border-[#ffcc0033]'}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
