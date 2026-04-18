// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { GitFork, Link, Shield, Mail } from 'lucide-react';

const LINKS = [
  {
    icon: <Link className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'Aboubacar Sidick Meite',
    sub: 'Professional network',
    href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276',
    color: '#0077b5',
  },
  {
    icon: <GitFork className="w-5 h-5" />,
    label: 'GitHub',
    value: '@ApollonIUGB77',
    sub: 'Open-source projects',
    href: 'https://github.com/ApollonIUGB77',
    color: '#e2e8f0',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: 'TryHackMe',
    value: 'exterminator',
    sub: '[0xA] WIZARD — Top 4%',
    href: 'https://tryhackme.com/p/exterminator',
    color: '#00d4ff',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'Via LinkedIn',
    sub: 'Send me a message',
    href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276',
    color: '#00ff41',
  },
];

export function ContactSection() {
  return (
    <div className="flex flex-col items-center w-full px-6 py-20 gap-16">

      {/* ── Title ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Get In <span className="text-[#00ff41]">Touch</span>
        </h2>
        <p className="text-[#555] text-sm leading-7 max-w-xs mx-auto">
          Open to internships, research opportunities, and collaborations.
        </p>
      </motion.div>

      {/* ── Links ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {LINKS.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="hacker-panel p-5 flex items-center gap-4 group cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-xl border border-[#1a2332] flex items-center
                          justify-center shrink-0 transition-colors"
              style={{ color: item.color, background: item.color + '15' }}
            >
              {item.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="mono text-[#444] text-xs mb-0.5">{item.label}</div>
              <div className="text-white text-sm font-medium">{item.value}</div>
              <div className="text-[#333] text-xs mt-0.5">{item.sub}</div>
            </div>

            <svg
              className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: item.color }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        ))}
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <a
          href="https://linkedin.com/in/aboubacar-sidick-meite-b5b309276"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 border border-[#00ff41]
                     text-[#00ff41] rounded-xl mono text-sm
                     hover:bg-[#00ff4111] transition-all"
        >
          Say Hello →
        </a>
      </motion.div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div className="w-full max-w-md pt-8 border-t border-[#0f1923] text-center">
        <p className="mono text-[#2a2a2a] text-xs">
          © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
        </p>
      </div>

    </div>
  );
}
