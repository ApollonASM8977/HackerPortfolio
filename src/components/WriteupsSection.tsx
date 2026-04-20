// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface Writeup {
  platform: string;
  platformColor: string;
  room: string;
  category: string;
  difficulty: string;
  diffColor: string;
  date: string;
  summary: string;
  tools: string[];
  steps: string[];
  flag: string;
  link: string;
}

const WRITEUPS: Writeup[] = [
  {
    platform: 'TryHackMe',
    platformColor: '#00d4ff',
    room: 'Pickle Rick',
    category: 'Web · Linux',
    difficulty: 'Easy',
    diffColor: '#00ff41',
    date: '2024',
    summary: 'Enumerate a Rick & Morty themed web server, exploit command injection in a PHP web panel to achieve RCE, then pivot to root via sudo misconfiguration.',
    tools: ['Nmap', 'Gobuster', 'Burp Suite', 'curl'],
    steps: [
      'Nmap scan reveals ports 22 (SSH) and 80 (HTTP)',
      'Page source contains username hint: R1ckRul3s',
      'Gobuster finds /robots.txt — contains password Wubbalubbadubdub',
      'Login to /login.php — command panel with RCE via PHP system()',
      'cat /home/rick/Sup3rS3cretPickl3Ingred.txt → Flag 1',
      'sudo -l shows NOPASSWD ALL → sudo cat /root/3rd.txt → Flag 3',
    ],
    flag: 'FLAG{mr_meeseeks_can_do_it}',
    link: 'https://tryhackme.com/room/picklerick',
  },
  {
    platform: 'TryHackMe',
    platformColor: '#00d4ff',
    room: 'OhSINT',
    category: 'OSINT · Recon',
    difficulty: 'Easy',
    diffColor: '#00ff41',
    date: '2024',
    summary: 'Open-source intelligence challenge. Starting from a single profile picture, chain metadata extraction and social-media recon to locate a target\'s city, ISP, and email.',
    tools: ['ExifTool', 'Google Reverse Image', 'Twitter/X', 'Wigle.net'],
    steps: [
      'ExifTool on WindowsXP.jpg → GPS + Copyright "OWoodflint"',
      'Twitter search "@OWoodflint" → GitHub profile linked',
      'GitHub repos reveal city: London, personal email exposed',
      'Wigle.net BSSID lookup → ISP and exact network location',
      'Blog post leaks holiday destination (final flag)',
    ],
    flag: 'FLAG{0s1nt_1s_p0w3rful}',
    link: 'https://tryhackme.com/room/ohsint',
  },
  {
    platform: 'TryHackMe',
    platformColor: '#00d4ff',
    room: 'OWASP Top 10 — 2021',
    category: 'Web · OWASP',
    difficulty: 'Easy',
    diffColor: '#00d4ff',
    date: '2024',
    summary: 'Hands-on walkthrough of the OWASP Top 10. Exploiting broken access control, cryptographic failures, injection, insecure design, and server-side request forgery.',
    tools: ['Burp Suite', 'curl', 'SQLmap', 'Python3'],
    steps: [
      'A01 — Broken Access Control: IDOR via /api/user?id=0 → admin notes',
      'A02 — Crypto failure: flat-file DB with MD5 hashes → hashcat cracked in 3s',
      'A03 — SQLi: login form " OR 1=1-- → bypass, then UNION dump',
      'A07 — XSS: reflected payload <script>alert(document.cookie)</script>',
      'A10 — SSRF: fetch internal metadata http://169.254.169.254/latest/meta-data/',
    ],
    flag: 'FLAG{0w4sp_m4st3r_2024}',
    link: 'https://tryhackme.com/room/owasptop10',
  },
  {
    platform: 'CTFtime',
    platformColor: '#a855f7',
    room: 'RSA Beginner — NahamCon CTF',
    category: 'Crypto · RSA',
    difficulty: 'Medium',
    diffColor: '#ffcc00',
    date: '2025',
    summary: 'Classical RSA challenge with small public exponent e=3. Recover the plaintext by taking the cube root of the ciphertext directly (no modular reduction needed when m³ < n).',
    tools: ['Python3 (gmpy2)', 'SageMath', 'RsaCtfTool'],
    steps: [
      'Given: n (2048-bit), e=3, c=ciphertext',
      'Check: if m³ < n, then c = m³ in ℤ (no mod)',
      'Compute: m = iroot(c, 3) using gmpy2.iroot()',
      'Convert int to bytes: long_to_bytes(m)',
      'Recover flag string from plaintext bytes',
    ],
    flag: 'FLAG{sm4ll_3xp0n3nt_w34k_rsa}',
    link: 'https://ctftime.org',
  },
];

export function WriteupsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="flex flex-col items-center w-full px-6 py-16 gap-10">

      {/* Header */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }} className="text-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          CTF <span className="text-[#00d4ff]">Writeups</span>
        </h2>
        <p className="text-[#444] text-xs mono">
          $ ls ~/ctf-writeups/ — methodology, tools, and flags
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {WRITEUPS.map((w, i) => (
          <motion.div key={w.room} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: 0.05 + i * 0.07 }}
            className="hacker-panel overflow-hidden">

            {/* Header — clickable */}
            <div className="p-4 cursor-pointer select-none"
              onClick={() => setExpanded(expanded === w.room ? null : w.room)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="mono text-[10px] px-2 py-0.5 rounded"
                      style={{ color: w.platformColor, border:`1px solid ${w.platformColor}44`, background:`${w.platformColor}11` }}>
                      {w.platform}
                    </span>
                    <span className="mono text-[10px] px-2 py-0.5 rounded"
                      style={{ color: w.diffColor, border:`1px solid ${w.diffColor}44` }}>
                      {w.difficulty}
                    </span>
                  </div>
                  <div className="text-white text-sm font-semibold mt-1">{w.room}</div>
                  <div className="mono text-[#444] text-[10px]">{w.category} · {w.date}</div>
                </div>
                <span className="text-[#333] mt-1">
                  {expanded === w.room ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </div>
              <p className="text-[#555] text-xs leading-5">{w.summary}</p>
            </div>

            {/* Expanded — stopPropagation */}
            <AnimatePresence>
              {expanded === w.room && (
                <motion.div
                  initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                  exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}
                  className="overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="border-t border-[#1a2332] p-4 flex flex-col gap-4">
                    {/* Steps */}
                    <div>
                      <div className="mono text-[#333] text-[10px] mb-2 uppercase tracking-widest">Methodology</div>
                      <ol className="flex flex-col gap-1.5">
                        {w.steps.map((s, si) => (
                          <li key={si} className="flex items-start gap-2">
                            <span className="mono text-[#00ff41] text-[10px] mt-0.5 shrink-0">{String(si+1).padStart(2,'0')}.</span>
                            <span className="text-[#666] text-xs leading-5">{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    {/* Tools */}
                    <div>
                      <div className="mono text-[#333] text-[10px] mb-2 uppercase tracking-widest">Tools used</div>
                      <div className="flex flex-wrap gap-1.5">
                        {w.tools.map(t => (
                          <span key={t} className="mono text-[10px] px-2 py-0.5 rounded border border-[#1a2332] text-[#00d4ff]">{t}</span>
                        ))}
                      </div>
                    </div>
                    {/* Flag */}
                    <div className="flex items-center justify-between">
                      <div className="mono text-[#ff0040] text-xs tracking-wide">{w.flag}</div>
                      <a href={w.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 mono text-[10px] text-[#444] hover:text-[#00d4ff] transition-colors">
                        <ExternalLink className="w-3 h-3" /> View room
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
