// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState } from 'react';
import { Terminal, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Level {
  title: string;
  icon: 'terminal' | 'wifi';
  log: string[];
  question: string;
  answer: string;
  placeholder: string;
  hint: string;
  successMsg: string;
}

const LEVELS: Level[] = [
  {
    title: 'HTTP Packet Capture Analysis',
    icon: 'terminal',
    log: [
      '[2025-01-15 03:42:11] GET  /api/users HTTP/1.1          ↑ 200 OK',
      '[2025-01-15 03:42:12] POST /login HTTP/1.1               ↑ 401 UNAUTHORIZED',
      '[2025-01-15 03:42:13] GET  /admin/flag.txt HTTP/1.1      ↑ 200 OK',
      '  └─ Response body: FLAG{p4ck3t_sn1ff3r}',
      '[2025-01-15 03:42:14] GET  /logout HTTP/1.1              ↑ 200 OK',
      '[2025-01-15 03:42:15] GET  /api/health HTTP/1.1          ↑ 200 OK',
    ],
    question: 'Analyze the captured HTTP traffic above. What flag was found in the response body?',
    answer: 'FLAG{p4ck3t_sn1ff3r}',
    placeholder: 'FLAG{...}',
    hint: 'Look for a GET request that returned 200 OK and contained a flag in the response body.',
    successMsg: 'Packet sniffed successfully! Wireshark would be proud.',
  },
  {
    title: 'Nmap Port Scan Analysis',
    icon: 'wifi',
    log: [
      'Starting Nmap 7.94 ( https://nmap.org ) at 2025-01-15 04:17',
      'Nmap scan report for 192.168.1.105',
      'Host is up (0.0012s latency).',
      '',
      'PORT      STATE  SERVICE    VERSION',
      '22/tcp    open   ssh        OpenSSH 8.2p1 Ubuntu',
      '80/tcp    open   http       nginx 1.18.0',
      '443/tcp   open   https      nginx 1.18.0',
      '3306/tcp  open   mysql      MySQL 5.7.44',
      '8080/tcp  open   http       Apache Tomcat 9.0.30',
      '4444/tcp  open   ???        [NO BANNER - SUSPICIOUS]',
      '',
      'Nmap done: 1 IP address (1 host up) scanned in 3.21 seconds',
    ],
    question: "Which port number is the attacker's backdoor / reverse shell? (Classic Metasploit/netcat port)",
    answer: '4444',
    placeholder: 'Port number...',
    hint: 'One port shows no service banner and is flagged as SUSPICIOUS. It\'s a well-known default reverse shell port.',
    successMsg: 'Backdoor identified! Port 4444 — classic Metasploit meterpreter shell.',
  },
];

export function NetworkChallenge({ onSolve }: { onSolve: () => void }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [levelSolved, setLevelSolved] = useState([false, false]);
  const [showHint, setShowHint] = useState(false);

  const current = LEVELS[levelIndex];
  const solvedCount = levelSolved.filter(Boolean).length;

  const handleSubmit = () => {
    const correct = input.trim() === current.answer;

    if (correct) {
      const newSolved = [...levelSolved];
      newSolved[levelIndex] = true;
      setLevelSolved(newSolved);
      setFeedback('correct');
      const newCount = newSolved.filter(Boolean).length;

      if (newCount === 2) {
        setTimeout(onSolve, 1200);
      } else {
        setTimeout(() => {
          const next = newSolved.findIndex(s => !s);
          if (next !== -1) {
            setLevelIndex(next);
            setInput('');
            setFeedback(null);
            setShowHint(false);
          }
        }, 1000);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      {/* Progress bars */}
      <div className="flex gap-2 mb-4">
        {LEVELS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-all duration-500 ${
              levelSolved[i] ? 'bg-[#00ff41]' : 'bg-[#1a2332]'
            }`}
          />
        ))}
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 items-center">
        {LEVELS.map((lv, i) => (
          <button
            key={i}
            onClick={() => { setLevelIndex(i); setInput(''); setFeedback(null); setShowHint(false); }}
            className={`px-3 py-1 text-xs rounded border transition-all flex items-center gap-1 ${
              levelIndex === i
                ? 'border-[#00d4ff] text-[#00d4ff]'
                : levelSolved[i]
                ? 'border-[#00ff4133] text-[#00ff4166]'
                : 'border-[#1a2332] text-[#555]'
            }`}
          >
            {levelSolved[i] ? '✓ ' : ''}
            {lv.icon === 'terminal'
              ? <Terminal className="w-3 h-3" />
              : <Wifi className="w-3 h-3" />}
            L{i + 1}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#555]">{solvedCount}/2 solved</span>
      </div>

      {/* Title */}
      <div className="text-[#00d4ff] text-xs uppercase tracking-widest flex items-center gap-2">
        {current.icon === 'terminal'
          ? <Terminal className="w-3.5 h-3.5" />
          : <Wifi className="w-3.5 h-3.5" />}
        {current.title}
      </div>

      {/* Log terminal box */}
      <div className="bg-[#020408] border border-[#1a2332] rounded-lg overflow-hidden">
        {/* Terminal title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#1a2332] bg-[#050b14]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[#555] text-xs">
            {current.icon === 'terminal' ? 'capture.pcap — Wireshark' : 'nmap_scan.txt'}
          </span>
        </div>

        {/* Log content */}
        <div className="p-3 space-y-0.5 overflow-x-auto">
          {current.log.map((line, i) => {
            // Colour coding for the HTTP log
            const isFlag = line.includes('FLAG{');
            const is200 = line.includes('↑ 200');
            const is401 = line.includes('↑ 401');
            const isSuspicious = line.includes('SUSPICIOUS');
            const isPort4444 = line.startsWith('4444');
            const isEmpty = line === '';

            let colour = 'text-[#aaa]';
            if (isFlag) colour = 'text-[#00ff41] font-bold';
            else if (is200) colour = 'text-[#00ff41]';
            else if (is401) colour = 'text-[#ff4444]';
            else if (isSuspicious || isPort4444) colour = 'text-[#ff4444] font-bold';
            else if (line.startsWith('PORT') || line.startsWith('Starting') || line.startsWith('Nmap')) colour = 'text-[#00d4ff]';

            if (isEmpty) return <div key={i} className="h-2" />;

            return (
              <div key={i} className={`text-xs ${colour} whitespace-pre`}>
                {line}
              </div>
            );
          })}
        </div>
      </div>

      {/* Question */}
      <div className="bg-[#050b14] border border-[#1a2332] rounded px-3 py-2 text-xs text-[#ccc]">
        <span className="text-[#ffcc00]">Q: </span>{current.question}
      </div>

      {/* Hint */}
      <button
        onClick={() => setShowHint(h => !h)}
        className="text-xs text-[#555] hover:text-[#ffcc00] border border-[#1a2332] px-3 py-1 rounded transition-colors"
      >
        {showHint ? 'Hide hint' : 'Show hint'}
      </button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#0a0f1a] border border-[#1a2332] rounded px-3 py-2 text-xs text-[#ffcc00]">
              <span className="text-[#555]">HINT: </span>{current.hint}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="space-y-2">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setFeedback(null); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={current.placeholder}
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
          disabled={levelSolved[levelIndex]}
        />
        <button
          onClick={handleSubmit}
          disabled={levelSolved[levelIndex] || !input.trim()}
          className="w-full py-2 text-xs rounded border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4111] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          SUBMIT ANSWER
        </button>
      </div>

      {/* Feedback */}
      <AnimatePresence mode="wait">
        {feedback === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[#00ff41] text-xs mt-2"
          >
            ✓ Correct! {current.successMsg}
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[#ff4444] text-xs mt-2"
          >
            ✗ Incorrect. Read the log carefully.
          </motion.div>
        )}
      </AnimatePresence>

      {/* All solved */}
      {solvedCount === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-[#00ff41] font-bold py-2 border border-[#00ff4133] rounded bg-[#00ff4108]"
        >
          NETWORK ANALYST — Packet sniffer & port scanner mastered!
        </motion.div>
      )}
    </div>
  );
}

