// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

type Msg = { role: 'user' | 'bot'; text: string; time: Date };

function getBotResponse(input: string): string {
  const i = input.toLowerCase();

  if (/hello|hi\b|hey|salut|bonjour/.test(i))
    return "Hey! 👾 I'm ApolloBot — Aboubacar's portfolio assistant. Ask me about his skills, projects, certifications, or how to reach him!";

  if (/who|about|apollon|aboubacar|yourself/.test(i))
    return "Aboubacar Sidick Meite (alias ApollonIUGB77) is a cybersecurity graduate student at Montclair State University, New Jersey. Security researcher, CTF player, and full-stack developer specializing in cryptography and ethical hacking.";

  if (/skill|technolog/.test(i))
    return "Top skills: Linux/Bash (90%), Python (85%), Cryptography (82%), React/TypeScript (75%), Network Security (75%). Tools include Nmap, Metasploit, Burp Suite, Wireshark, Hashcat, SQLmap...";

  if (/project|build|github/.test(i))
    return "Key projects:\n• CipherLab — full crypto toolkit (React + FastAPI)\n• CryptoMath — RSA, DH from scratch in Python\n• SecureShare — AES-256 + RSA-2048 E2E file sharing\n• CommuTaxi — Flutter ride app with Firebase\n• Atlas Money — secure PHP mobile money app\nAll at: github.com/ApollonIUGB77";

  if (/contact|email|reach|hire|work/.test(i))
    return "Best way to reach him:\n• LinkedIn: linkedin.com/in/aboubacar-sidick-meite-b5b309276\n• GitHub: github.com/ApollonIUGB77\n• TryHackMe: tryhackme.com/p/exterminator\nOpen to internships, research & collaborations!";

  if (/tryhackme|thm|rank|ctf|challenge/.test(i))
    return "TryHackMe stats:\n🧙 Rank: [0xA] WIZARD\n🏆 Top 4% worldwide\n🎖️ 21 badges earned\n✅ 98 rooms completed\n\nAlso try the 11 interactive CTF challenges on this portfolio!";

  if (/cert|certif/.test(i))
    return "Certifications:\n✅ (ISC)² Certified in Cybersecurity (CC)\n✅ EC-Council CSCU\n✅ Fortinet NSE 2 Network Security\n✅ TryHackMe — Intro to Cybersecurity\n🔄 CompTIA Security+ / Network+ (2026)";

  if (/school|university|education|degree|study/.test(i))
    return "M.S. Cybersecurity @ Montclair State University, New Jersey 🇺🇸\nOriginally from Côte d'Ivoire 🇨🇮";

  if (/french|francais|speak|langue/.test(i))
    return "Je parle français et anglais! 🇫🇷🇺🇸 French is my first language — originally from Côte d'Ivoire.";

  if (/location|where|country/.test(i))
    return "Based in Montclair, New Jersey, USA 🇺🇸 — open to remote, on-site, or any location.";

  if (/available|opportunit|internship|open/.test(i))
    return "Yes! Currently open to internships, research opportunities, and collaborations in cybersecurity or full-stack development. Reach out on LinkedIn!";

  if (/flag|hack me|secret|password/.test(i))
    return "Nice try, hacker 😏 FLAG{n0_fr33_fl4gs_h3r3} — but head to the Challenges page to earn real flags!";

  if (/help|what can|command/.test(i))
    return "I can tell you about:\n• Bio & background\n• Skills & tools\n• Projects\n• Certifications\n• TryHackMe / CTF stats\n• How to get in touch\nJust ask!";

  return "I don't have a specific answer for that. Check the portfolio sections, or reach out directly on LinkedIn for anything specific! 🔐";
}

const QUICK_REPLIES = ["Who are you?", "Your skills?", "Projects", "Contact info", "CTF stats"];

const INITIAL_MESSAGES: Msg[] = [
  {
    role: 'bot',
    text: "Hello! 👾 I'm ApolloBot — Aboubacar's portfolio assistant. Ask me anything about his skills, projects, or how to reach him.",
    time: new Date(),
  },
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Msg = { role: 'user', text: trimmed, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 600 + Math.random() * 300;
    setTimeout(() => {
      const botMsg: Msg = { role: 'bot', text: getBotResponse(trimmed), time: new Date() };
      setTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage(input);
  }

  function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-[9998]">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="chat-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setOpen(true)}
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: 56,
                height: 56,
                background: '#070b10',
                border: '2px solid #00ff41',
              }}
              aria-label="Open chat"
            >
              {/* Pulsing ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: '#00ff4122', animationDuration: '1.8s' }}
              />
              <MessageSquare size={24} color="#00ff41" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="absolute bottom-0 right-0 w-80 rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: '#070b10',
                border: '1px solid #1a2332',
                boxShadow: '0 8px 40px #00ff4118',
                maxHeight: '520px',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: '#0d1117', borderBottom: '1px solid #1a2332' }}
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 34, height: 34, background: '#0a1a0a', border: '1px solid #00ff4166' }}
                >
                  <Bot size={17} color="#00ff41" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono font-semibold" style={{ color: '#00ff41' }}>
                    ApolloBot v1.0
                  </div>
                </div>
                {/* Online dot */}
                <span
                  className="rounded-full flex-shrink-0"
                  style={{ width: 8, height: 8, background: '#00ff41', boxShadow: '0 0 6px #00ff41' }}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="ml-1 flex-shrink-0 rounded p-0.5 transition-colors"
                  style={{ color: '#555' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex flex-col gap-3 px-4 py-3 overflow-y-auto"
                style={{ height: 256, scrollbarWidth: 'thin', scrollbarColor: '#1a2332 transparent' }}
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className="rounded-lg px-3 py-2 text-xs font-mono max-w-[92%] whitespace-pre-wrap break-words"
                      style={
                        msg.role === 'bot'
                          ? { background: '#0d1117', border: '1px solid #1a2332', color: '#ccc' }
                          : {
                              background: '#00ff4122',
                              border: '1px solid #00ff4133',
                              color: '#00ff41',
                            }
                      }
                    >
                      {msg.text}
                    </div>
                    <span className="font-mono mt-0.5" style={{ fontSize: 10, color: '#333' }}>
                      {formatTime(msg.time)}
                    </span>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex items-start">
                    <div
                      className="rounded-lg px-3 py-2.5 flex gap-1 items-center"
                      style={{ background: '#0d1117', border: '1px solid #1a2332' }}
                    >
                      {[0, 1, 2].map(n => (
                        <span
                          key={n}
                          className="rounded-full"
                          style={{
                            width: 6,
                            height: 6,
                            background: '#00ff41',
                            display: 'inline-block',
                            animation: `bounce 1s infinite ${n * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick reply chips */}
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {QUICK_REPLIES.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="text-xs font-mono px-2 py-0.5 rounded-full transition-all"
                    style={{
                      border: '1px solid #1a2332',
                      color: '#555',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#00ff4166';
                      e.currentTarget.style.color = '#00ff41';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#1a2332';
                      e.currentTarget.style.color = '#555';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <div
                className="flex items-center gap-2 px-3 pb-3"
                style={{ borderTop: '1px solid #1a2332', paddingTop: 8 }}
              >
                <span className="font-mono text-xs flex-shrink-0" style={{ color: '#00ff41' }}>
                  $
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-xs font-mono outline-none placeholder:text-[#333]"
                  style={{ color: '#00ff41', minWidth: 0 }}
                  autoComplete="off"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="flex-shrink-0 rounded p-1 transition-all"
                  style={{ color: input.trim() ? '#00ff41' : '#333' }}
                  aria-label="Send"
                >
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bounce keyframe */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
