// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import type { Page } from '../App';

type Msg = { role: 'user' | 'bot'; text: string; time: Date };

/* â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 6)  return "Still up? It's the middle of the night ðŸ¦‰";
  if (h < 12) return "Good morning, hacker! â˜€ï¸";
  if (h < 18) return "Good afternoon! Ready to hack? ðŸ’»";
  return "Good evening! The best hacks happen at night ðŸŒ™";
}

/* â”€â”€ Knowledge base (EN + FR) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function getBotResponse(
  input: string,
  userName: string | null,
  navigate?: (p: Page) => void,
): { text: string; newName?: string; navTo?: Page } {

  const i = input.toLowerCase().trim();
  const isFR = /[Ã Ã©Ã¨ÃªÃ«Ã®Ã¯Ã´Ã¹Ã»Ã¼]|bonjour|salut|merci|oui|non|comment|qui|quoi|quel|projet|compÃ©ten|certif|contact|parle|disponib|oÃ¹\b|tu\b/.test(i);

  // â”€â”€ Greetings
  if (/^(hello|hi\b|hey|yo\b|salut|bonjour|bonsoir|cc\b)/.test(i)) {
    const name = userName ? `, ${userName}` : '';
    return isFR
      ? { text: `Salut${name}! ðŸ‘¾ Je suis ApolloBot — l'assistant du portfolio d'Aboubacar. Pose-moi des questions sur ses compÃ©tences, projets, certifications ou comment le contacter !` }
      : { text: `Hey${name}! ðŸ‘¾ I'm ApolloBot — Aboubacar's portfolio assistant. Ask me about his skills, projects, certifications, or how to reach him!` };
  }

  // â”€â”€ User introduces themselves
  const nameMatch = i.match(/(?:i(?:'m| am)|je(?:\s+m'appelle|\s+suis)|my name is)\s+([a-z]+)/i);
  if (nameMatch) {
    const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    return isFR
      ? { text: `EnchantÃ©, ${name}! ðŸ¤ Comment puis-je t'aider ?`, newName: name }
      : { text: `Nice to meet you, ${name}! ðŸ¤ How can I help you?`, newName: name };
  }

  // â”€â”€ Navigation commands
  if (/\b(show|take|go to|open|voir|voir|aller|ouvrir)\b.*(about|profil|Ã  propos)/i.test(i)) {
    navigate?.('about');
    return isFR
      ? { text: 'ðŸ“‚ Je t\'ouvre la page About maintenant !', navTo: 'about' }
      : { text: 'ðŸ“‚ Opening the About page for you!', navTo: 'about' };
  }
  if (/\b(show|take|go to|open|voir|aller|ouvrir)\b.*(project|projet)/i.test(i)) {
    navigate?.('projects');
    return isFR
      ? { text: 'ðŸ“‚ Je t\'ouvre la page Projects maintenant !', navTo: 'projects' }
      : { text: 'ðŸ“‚ Opening the Projects page for you!', navTo: 'projects' };
  }
  if (/\b(show|take|go to|open|voir|aller|ouvrir)\b.*(challenge|ctf|hack)/i.test(i)) {
    navigate?.('challenges');
    return isFR
      ? { text: 'âš”ï¸ Je t\'ouvre les Challenges CTF !', navTo: 'challenges' }
      : { text: 'âš”ï¸ Taking you to the CTF Challenges!', navTo: 'challenges' };
  }
  if (/\b(show|take|go to|open|voir|aller|ouvrir)\b.*(contact|reach|joindre)/i.test(i)) {
    navigate?.('contact');
    return isFR
      ? { text: 'ðŸ“¬ Je t\'ouvre la page Contact !', navTo: 'contact' }
      : { text: 'ðŸ“¬ Opening the Contact page!', navTo: 'contact' };
  }
  if (/\b(home|accueil|retour|back)\b/.test(i) && /\b(show|go|take|open|voir|aller)\b/.test(i)) {
    navigate?.('home');
    return { text: 'ðŸ  Going home!' };
  }

  // â”€â”€ Who / About
  if (/who|about|apollon|aboubacar|yourself|qui est|c'est qui|prÃ©sente/.test(i))
    return isFR
      ? { text: 'Aboubacar Sidick Meite (alias ApollonASM8977) est un Ã©tudiant en M.S. Cybersecurity Ã  Montclair State University, New Jersey. Chercheur en sÃ©curitÃ©, joueur CTF et dÃ©veloppeur full-stack spÃ©cialisÃ© en cryptographie et hacking Ã©thique. ðŸ‡¨ðŸ‡®â†’ðŸ‡ºðŸ‡¸' }
      : { text: 'Aboubacar Sidick Meite (aka ApollonASM8977) is a cybersecurity grad student at Montclair State University, NJ. Security researcher, CTF player, and full-stack dev specializing in cryptography and ethical hacking. ðŸ‡¨ðŸ‡®â†’ðŸ‡ºðŸ‡¸' };

  // â”€â”€ Skills
  if (/skill|technolog|compÃ©ten|outil|tools|stack/.test(i))
    return isFR
      ? { text: 'CompÃ©tences principales :\n• Linux/Bash — 90%\n• Python — 85%\n• Cryptographie — 82%\n• React/TypeScript — 75%\n• SÃ©curitÃ© rÃ©seau — 75%\n• Pentest — 70%\n\nOutils : Nmap, Metasploit, Burp Suite, Wireshark, Hashcat, SQLmap…' }
      : { text: 'Top skills:\n• Linux/Bash — 90%\n• Python — 85%\n• Cryptography — 82%\n• React/TypeScript — 75%\n• Network Security — 75%\n• Pentesting — 70%\n\nTools: Nmap, Metasploit, Burp Suite, Wireshark, Hashcat, SQLmap…' };

  // â”€â”€ Projects
  if (/project|build|github|projet|application/.test(i))
    return isFR
      ? { text: 'Projets clÃ©s :\nðŸ” CipherLab — toolkit crypto complet (React + FastAPI)\nðŸ”¢ CryptoMath — RSA, DH from scratch en Python\nðŸ”’ SecureShare — partage de fichiers E2E AES-256 + RSA\nðŸš• CommuTaxi — app Flutter avec Firebase\nðŸ’° Atlas Money — app mobile money sÃ©curisÃ©e PHP\n\nTout sur : github.com/ApollonASM8977', navTo: 'projects' }
      : { text: 'Key projects:\nðŸ” CipherLab — full crypto toolkit (React + FastAPI)\nðŸ”¢ CryptoMath — RSA, DH from scratch in Python\nðŸ”’ SecureShare — AES-256 + RSA-2048 E2E file sharing\nðŸš• CommuTaxi — Flutter ride app with Firebase\nðŸ’° Atlas Money — secure PHP mobile money app\n\nAll at: github.com/ApollonASM8977', navTo: 'projects' };

  // â”€â”€ Contact
  if (/contact|email|reach|hire|work|embauche|joindre|recrut/.test(i))
    return isFR
      ? { text: 'Pour le contacter :\n• LinkedIn : linkedin.com/in/aboubacar-sidick-meite-b5b309276\n• GitHub : github.com/ApollonASM8977\n• TryHackMe : tryhackme.com/p/exterminator\n\nOuvert aux stages, recherches et collaborations ! ðŸ“¬', navTo: 'contact' }
      : { text: 'Best way to reach him:\n• LinkedIn: linkedin.com/in/aboubacar-sidick-meite-b5b309276\n• GitHub: github.com/ApollonASM8977\n• TryHackMe: tryhackme.com/p/exterminator\n\nOpen to internships, research & collaborations! ðŸ“¬', navTo: 'contact' };

  // â”€â”€ TryHackMe / CTF
  if (/tryhackme|thm|rank|ctf|challenge|wizard|hacking/.test(i))
    return isFR
      ? { text: 'Stats TryHackMe :\nðŸ§™ Rang : [0xA] WIZARD\nðŸ† Top 4% mondial\nðŸŽ–ï¸ 21 badges gagnÃ©s\nâœ… 98 salles complÃ©tÃ©es\n\nEssaie aussi les 13 challenges CTF interactifs du portfolio !' }
      : { text: 'TryHackMe stats:\nðŸ§™ Rank: [0xA] WIZARD\nðŸ† Top 4% worldwide\nðŸŽ–ï¸ 21 badges earned\nâœ… 98 rooms completed\n\nAlso try the 13 interactive CTF challenges on this portfolio!' };

  // â”€â”€ Certifications
  if (/cert|certif/.test(i))
    return isFR
      ? { text: 'Certifications :\nâœ… (ISC)Â² Certified in Cybersecurity (CC)\nâœ… EC-Council CSCU\nâœ… Fortinet NSE 2 Network Security\nâœ… TryHackMe — Intro to Cybersecurity\nðŸ”„ CompTIA Security+ / Network+ (2026)' }
      : { text: 'Certifications:\nâœ… (ISC)Â² Certified in Cybersecurity (CC)\nâœ… EC-Council CSCU\nâœ… Fortinet NSE 2 Network Security\nâœ… TryHackMe — Intro to Cybersecurity\nðŸ”„ CompTIA Security+ / Network+ (2026)' };

  // â”€â”€ Education
  if (/school|university|education|degree|study|Ã©tude|universitÃ©|diplÃ´me|master/.test(i))
    return isFR
      ? { text: 'M.S. Cybersecurity @ Montclair State University, New Jersey ðŸ‡ºðŸ‡¸\nOrigine : CÃ´te d\'Ivoire ðŸ‡¨ðŸ‡®\nFormation technique solide en cryptographie, sÃ©curitÃ© rÃ©seau et dÃ©veloppement.' }
      : { text: 'M.S. Cybersecurity @ Montclair State University, New Jersey ðŸ‡ºðŸ‡¸\nOriginally from CÃ´te d\'Ivoire ðŸ‡¨ðŸ‡®' };

  // â”€â”€ Languages
  if (/french|franÃ§ais|speak|langue|language|parle/.test(i))
    return { text: 'Je parle franÃ§ais et anglais! ðŸ‡«ðŸ‡·ðŸ‡ºðŸ‡¸ French is my first language — originally from CÃ´te d\'Ivoire. Feel free to chat in either language!' };

  // â”€â”€ Location
  if (/location|where|country|ville|pays|habite/.test(i))
    return isFR
      ? { text: 'BasÃ© Ã  Montclair, New Jersey, USA ðŸ‡ºðŸ‡¸ — disponible en remote, prÃ©sentiel ou peu importe la localisation.' }
      : { text: 'Based in Montclair, New Jersey, USA ðŸ‡ºðŸ‡¸ — open to remote, on-site, or any location.' };

  // â”€â”€ Availability
  if (/available|opportunit|internship|open|disponib|stage/.test(i))
    return isFR
      ? { text: 'Oui ! Actuellement ouvert aux stages, opportunitÃ©s de recherche et collaborations en cybersÃ©curitÃ© ou dÃ©veloppement full-stack. Contacte sur LinkedIn !' }
      : { text: 'Yes! Currently open to internships, research opportunities, and collaborations in cybersecurity or full-stack development. Reach out on LinkedIn!' };

  // â”€â”€ Easter egg
  if (/flag|hack me|secret|password|mot de passe/.test(i))
    return { text: 'Nice try, hacker ðŸ˜ FLAG{n0_fr33_fl4gs_h3r3} — but head to the Challenges page to earn real flags! ðŸ' };

  // â”€â”€ Resume / CV
  if (/resume|cv|curriculum/.test(i))
    return isFR
      ? { text: 'Mon CV est disponible en tÃ©lÃ©chargement sur la page About ! ðŸ“„\nOu contacte directement sur LinkedIn pour le recevoir.' }
      : { text: 'My resume is available for download on the About page! ðŸ“„\nOr reach out directly on LinkedIn.' };

  // â”€â”€ Help
  if (/help|what can|command|aide|menu/.test(i))
    return isFR
      ? { text: 'Je peux t\'informer sur :\n• Bio et parcours\n• CompÃ©tences et outils\n• Projets\n• Certifications\n• Stats TryHackMe / CTF\n• Comment contacter Aboubacar\n\nJe peux aussi naviguer ! Dis "montre-moi les projets" ðŸš€' }
      : { text: 'I can tell you about:\n• Bio & background\n• Skills & tools\n• Projects\n• Certifications\n• TryHackMe / CTF stats\n• How to get in touch\n\nI can also navigate! Say "show me the projects" ðŸš€' };

  return isFR
    ? { text: 'Je n\'ai pas de rÃ©ponse spÃ©cifique Ã  Ã§a. Explore les sections du portfolio, ou contacte directement sur LinkedIn ! ðŸ”' }
    : { text: "I don't have a specific answer for that. Check the portfolio sections, or reach out on LinkedIn for anything specific! ðŸ”" };
}

const QUICK_REPLIES_EN = ['Who are you?', 'Your skills?', 'Projects', 'CTF stats', 'Contact info'];
const QUICK_REPLIES_FR = ['Qui es-tu ?', 'Tes compÃ©tences ?', 'Projets', 'Stats CTF', 'Contact'];

export function ChatBot({ navigate }: { navigate: (p: Page) => void }) {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [lang, setLang]       = useState<'en' | 'fr'>('en');

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Build greeting on mount
  useEffect(() => {
    setMessages([{
      role: 'bot',
      text: `${getGreeting()}\n\nI'm ApolloBot ðŸ‘¾ — Aboubacar's portfolio assistant. Ask me anything or say "help".\n\nðŸ’¡ Je parle aussi franÃ§ais !`,
      time: new Date(),
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Detect language from input
    const isFR = /[Ã Ã©Ã¨ÃªÃ«Ã®Ã¯Ã´Ã¹Ã»Ã¼]|bonjour|salut|merci|oui|non|comment|qui\b|quoi\b|quel\b|projet|compÃ©ten|certif|contact|parle|disponib|oÃ¹\b|tu\b/.test(trimmed.toLowerCase());
    if (isFR) setLang('fr');

    setMessages(prev => [...prev, { role: 'user', text: trimmed, time: new Date() }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const result = getBotResponse(trimmed, userName, navigate);
      if (result.newName) setUserName(result.newName);
      setTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: result.text, time: new Date() }]);
    }, 550 + Math.random() * 350);
  }

  function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const quickReplies = lang === 'fr' ? QUICK_REPLIES_FR : QUICK_REPLIES_EN;

  return (
    <>
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
              style={{ width: 56, height: 56, background: '#070b10', border: '2px solid #00ff41' }}
              aria-label="Open chat"
            >
              <span className="absolute inset-0 rounded-full animate-ping"
                style={{ background: '#00ff4122', animationDuration: '1.8s' }} />
              <MessageSquare size={22} color="#00ff41" />
              {/* language badge */}
              <span className="absolute -top-1 -right-1 text-[9px] mono bg-[#070b10] border border-[#00ff4144] text-[#00ff41] rounded px-1">
                {lang.toUpperCase()}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="absolute bottom-0 right-0 w-80 rounded-2xl overflow-hidden flex flex-col"
              style={{ background: '#070b10', border: '1px solid #1a2332',
                boxShadow: '0 8px 40px #00ff4118', maxHeight: '540px' }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3"
                style={{ background: '#0d1117', borderBottom: '1px solid #1a2332' }}>
                <div className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 34, height: 34, background: '#0a1a0a', border: '1px solid #00ff4166' }}>
                  <Bot size={17} color="#00ff41" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono font-semibold" style={{ color: '#00ff41' }}>
                    ApolloBot v2.0
                  </div>
                  <div className="text-[10px] mono text-[#444]">
                    {userName ? `Chatting with ${userName}` : 'Ask me anything'}
                  </div>
                </div>
                {/* lang toggle */}
                <button
                  onClick={() => setLang(l => l === 'en' ? 'fr' : 'en')}
                  className="mono text-[10px] px-2 py-0.5 rounded border transition-colors"
                  style={{ borderColor: '#1a2332', color: '#555' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00ff41'; e.currentTarget.style.borderColor = '#00ff4144'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#1a2332'; }}
                  title="Toggle language"
                >
                  {lang === 'en' ? 'ðŸ‡«ðŸ‡· FR' : 'ðŸ‡ºðŸ‡¸ EN'}
                </button>
                <span className="rounded-full flex-shrink-0"
                  style={{ width: 8, height: 8, background: '#00ff41', boxShadow: '0 0 6px #00ff41' }} />
                <button onClick={() => setOpen(false)} className="ml-1 flex-shrink-0 rounded p-0.5 transition-colors"
                  style={{ color: '#555' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                  aria-label="Close">
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex flex-col gap-3 px-4 py-3 overflow-y-auto"
                style={{ height: 280, scrollbarWidth: 'thin', scrollbarColor: '#1a2332 transparent' }}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="rounded-lg px-3 py-2 text-xs font-mono max-w-[92%] whitespace-pre-wrap break-words"
                      style={msg.role === 'bot'
                        ? { background: '#0d1117', border: '1px solid #1a2332', color: '#ccc' }
                        : { background: '#00ff4122', border: '1px solid #00ff4133', color: '#00ff41' }}>
                      {msg.text}
                    </div>
                    <span className="font-mono mt-0.5" style={{ fontSize: 10, color: '#333' }}>
                      {formatTime(msg.time)}
                    </span>
                  </div>
                ))}
                {typing && (
                  <div className="flex items-start">
                    <div className="rounded-lg px-3 py-2.5 flex gap-1 items-center"
                      style={{ background: '#0d1117', border: '1px solid #1a2332' }}>
                      {[0,1,2].map(n => (
                        <span key={n} className="rounded-full"
                          style={{ width:6, height:6, background:'#00ff41', display:'inline-block',
                            animation:`botBounce 1s infinite ${n * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick replies */}
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {quickReplies.map(chip => (
                  <button key={chip} onClick={() => sendMessage(chip)}
                    className="text-xs font-mono px-2 py-0.5 rounded-full transition-all"
                    style={{ border: '1px solid #1a2332', color: '#555', background: 'transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#00ff4166'; e.currentTarget.style.color='#00ff41'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='#1a2332'; e.currentTarget.style.color='#555'; }}>
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-3 pb-3"
                style={{ borderTop: '1px solid #1a2332', paddingTop: 8 }}>
                <span className="font-mono text-xs flex-shrink-0" style={{ color: '#00ff41' }}>$</span>
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder={lang === 'fr' ? 'Pose une question...' : 'Ask me anything...'}
                  className="flex-1 bg-transparent text-xs font-mono outline-none placeholder:text-[#333]"
                  style={{ color: '#00ff41', minWidth: 0 }} autoComplete="off" />
                <button onClick={() => sendMessage(input)} disabled={!input.trim()}
                  className="flex-shrink-0 rounded p-1 transition-all"
                  style={{ color: input.trim() ? '#00ff41' : '#333' }} aria-label="Send">
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes botBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}

