// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, Link, Shield, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const LINKS = [
  { icon: <Link className="w-5 h-5" />,    label: 'LinkedIn',   value: 'Aboubacar Sidick Meite', sub: 'Professional network', href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276', color: '#0077b5' },
  { icon: <GitFork className="w-5 h-5" />, label: 'GitHub',     value: '@ApollonASM8977',          sub: 'Open-source projects',  href: 'https://github.com/ApollonASM8977',                          color: '#e2e8f0' },
  { icon: <Shield className="w-5 h-5" />, label: 'TryHackMe',  value: 'exterminator',            sub: '[0xA] WIZARD â€” Top 4%', href: 'https://tryhackme.com/p/exterminator',                      color: '#00d4ff' },
  { icon: <Mail className="w-5 h-5" />,   label: 'Email',       value: 'Via LinkedIn',            sub: 'Send me a message',    href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276', color: '#00ff41' },
];

type FormStatus = 'idle' | 'sending' | 'ok' | 'err';

// â”€â”€ Contact form â€” posts to Formspree (sign up at formspree.io and replace the ID below)
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // â† replace with your Formspree form ID

export function ContactSection() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus('ok');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputCls = `w-full bg-transparent border border-[#1a2332] rounded-lg px-4 py-3
                    mono text-xs text-[#e2e8f0] outline-none placeholder:text-[#333]
                    focus:border-[#00ff4155] transition-colors`;

  return (
    <div className="flex flex-col items-center w-full px-6 pt-16 pb-32 gap-16">

      {/* â”€â”€ Title */}
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }} className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Get In <span className="text-[#00ff41]">Touch</span>
        </h2>
        <p className="text-[#555] text-sm leading-7 max-w-xs mx-auto">
          Open to internships, research opportunities, and collaborations.
        </p>
      </motion.div>

      {/* â”€â”€ Two-column layout */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left â€” Links */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.15 }} className="flex flex-col gap-3">
          <p className="mono text-[#333] text-xs mb-1">$ cat links.txt</p>
          {LINKS.map((item, i) => (
            <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.2 + i * 0.08 }} whileHover={{ scale:1.02 }}
              className="hacker-panel p-4 flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl border border-[#1a2332] flex items-center
                              justify-center shrink-0 transition-colors"
                style={{ color: item.color, background: item.color + '15' }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mono text-[#444] text-xs mb-0.5">{item.label}</div>
                <div className="text-white text-sm font-medium">{item.value}</div>
                <div className="text-[#333] text-xs mt-0.5">{item.sub}</div>
              </div>
              <svg className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: item.color }} fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          ))}

          {/* CV download */}
          <motion.a href="/resume.pdf" download
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
            className="mt-2 flex items-center justify-center gap-2 py-3 border border-[#00ff4155]
                       rounded-lg mono text-xs text-[#00ff41] hover:bg-[#00ff4111] transition-all">
            â†“ Download Resume (PDF)
          </motion.a>
        </motion.div>

        {/* Right â€” Form */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.2 }} className="flex flex-col gap-4">
          <p className="mono text-[#333] text-xs mb-1">$ send_message.sh</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="mono text-[#444] text-xs block mb-1">Name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name" className={inputCls} required />
            </div>
            <div>
              <label className="mono text-[#444] text-xs block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" className={inputCls} required />
            </div>
            <div>
              <label className="mono text-[#444] text-xs block mb-1">Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                placeholder="What's on your mind?" rows={5}
                className={inputCls + ' resize-none'} required />
            </div>

            <AnimatePresence mode="wait">
              {status === 'ok' ? (
                <motion.div key="ok" initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0 }} className="flex items-center gap-2 text-[#00ff41] mono text-xs">
                  <CheckCircle className="w-4 h-4" />
                  Message sent! I'll get back to you soon.
                </motion.div>
              ) : status === 'err' ? (
                <motion.div key="err" initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0 }} className="flex items-center gap-2 text-[#ff4444] mono text-xs">
                  <AlertCircle className="w-4 h-4" />
                  Something went wrong â€” try LinkedIn instead.
                </motion.div>
              ) : (
                <motion.button key="btn" type="submit" disabled={status === 'sending'}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3 border border-[#00ff4155]
                             rounded-lg mono text-xs text-[#00ff41] hover:bg-[#00ff4111]
                             transition-all disabled:opacity-50">
                  {status === 'sending'
                    ? <><span className="animate-pulse">Sending</span><span className="blink">â–Œ</span></>
                    : <><Send className="w-3.5 h-3.5" /> Send Message</>}
                </motion.button>
              )}
            </AnimatePresence>

            {FORMSPREE_ID === 'YOUR_FORMSPREE_ID' && (
              <p className="mono text-[#333] text-[10px]">
                âš  Configure Formspree: replace FORMSPREE_ID in ContactSection.tsx
              </p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-3xl pt-8 border-t border-[#0f1923] text-center">
        <p className="mono text-[#2a2a2a] text-xs">
          Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
        </p>
      </div>
    </div>
  );
}

