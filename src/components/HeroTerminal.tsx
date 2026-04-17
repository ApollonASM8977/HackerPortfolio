// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const BOOT_SEQUENCE = [
  { text: '[  0.000000] Initializing kernel...', delay: 0,    color: '#666' },
  { text: '[  0.112345] Loading security modules... OK', delay: 300,  color: '#666' },
  { text: '[  0.284712] Mounting encrypted filesystem... OK', delay: 500,  color: '#666' },
  { text: '[  0.431200] Starting network interfaces... OK', delay: 700,  color: '#666' },
  { text: '[  0.612900] Enabling firewall rules... OK', delay: 900,  color: '#666' },
  { text: '[  0.891034] Loading Nmap, Wireshark, Metasploit... OK', delay: 1100, color: '#00d4ff' },
  { text: '[  1.204500] Connecting to TryHackMe VPN... OK', delay: 1400, color: '#00d4ff' },
  { text: '[  1.500000] System ready.', delay: 1700, color: '#00ff41' },
  { text: '', delay: 2000, color: '#00ff41' },
  { text: '╔══════════════════════════════════════════════════════╗', delay: 2100, color: '#00ff41' },
  { text: '║         ABOUBACAR SIDICK MEITE — ApollonIUGB77       ║', delay: 2200, color: '#00ff41' },
  { text: '║       M.S. Cybersecurity @ Montclair State Univ.     ║', delay: 2300, color: '#00ff41' },
  { text: '║    TryHackMe WIZARD ★ Top 4% ★ 21 badges ★ 98 rooms ║', delay: 2400, color: '#00d4ff' },
  { text: '╚══════════════════════════════════════════════════════╝', delay: 2500, color: '#00ff41' },
  { text: '', delay: 2600, color: '#00ff41' },
  { text: '$ whoami', delay: 2800, color: '#ffcc00' },
  { text: 'aboubacar — Security Researcher | Full-Stack Dev | CTF Player', delay: 3000, color: '#fff' },
  { text: '', delay: 3100, color: '' },
  { text: '$ cat /etc/skills', delay: 3200, color: '#ffcc00' },
  { text: 'Python ████████████████░░░░ 85%', delay: 3400, color: '#00ff41' },
  { text: 'Linux  ████████████████████ 90%', delay: 3500, color: '#00ff41' },
  { text: 'React  ███████████████░░░░░ 75%', delay: 3600, color: '#00d4ff' },
  { text: 'Crypto ████████████████░░░░ 82%', delay: 3700, color: '#00d4ff' },
  { text: 'Pentest████████████░░░░░░░░ 70%', delay: 3800, color: '#ff6b6b' },
  { text: '', delay: 3900, color: '' },
  { text: '$ ls ./challenges/', delay: 4000, color: '#ffcc00' },
  { text: 'caesar_cipher/  linux_terminal/  hash_cracker/  sql_injection/', delay: 4200, color: '#fff' },
  { text: '', delay: 4300, color: '' },
  { text: '$ echo "Welcome. Can you beat my challenges?"', delay: 4400, color: '#ffcc00' },
  { text: 'Welcome. Can you beat my challenges?', delay: 4600, color: '#ff0040' },
  { text: '', delay: 4700, color: '' },
  { text: '▶ Scroll down to start ↓', delay: 4900, color: '#00ff41' },
];

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    BOOT_SEQUENCE.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10">
      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl hacker-panel shadow-2xl shadow-green-900/20"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a2332] bg-[#0d1117]">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
          <span className="ml-3 text-[#666] text-xs">root@apollon:~</span>
        </div>

        {/* Terminal body */}
        <div className="p-6 font-mono text-sm leading-6 min-h-[420px]">
          {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ color: line.color || '#00ff41' }}>
              {line.text}
            </div>
          ))}
          {visibleLines < BOOT_SEQUENCE.length && (
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
          )}
        </div>
      </motion.div>

      {/* Scroll hint */}
      {visibleLines >= BOOT_SEQUENCE.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-2 text-[#00ff41] opacity-70"
        >
          <span className="text-xs tracking-widest">SCROLL DOWN</span>
          <ChevronDown className="animate-bounce w-5 h-5" />
        </motion.div>
      )}
    </section>
  );
}
