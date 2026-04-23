// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#about',      label: '01. About' },
  { href: '#challenges', label: '02. Challenges' },
  { href: '#projects',   label: '03. Projects' },
  { href: '#contact',    label: '04. Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0aee] backdrop-blur-sm border-b border-[#1a2332]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-sm font-bold text-[#00ff41] glow-green glitch">
          ApollonASM8977<span className="animate-blink">_</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="nav-link hover:text-[#00ff41] transition-colors text-xs">
              {l.label}
            </a>
          ))}
          <a
            href="https://linkedin.com/in/aboubacar-sidick-meite-b5b309276"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#00ff41] text-[#00ff41] text-xs rounded hover:bg-[#00ff4111] transition-all"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-[#00ff41]" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0d1117] border-b border-[#1a2332] px-4 py-4 space-y-3"
        >
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
               onClick={() => setOpen(false)}
               className="block text-[#666] hover:text-[#00ff41] text-sm transition-colors">
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

