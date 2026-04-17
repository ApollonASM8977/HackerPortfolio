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
    value: 'Available via LinkedIn',
    sub: 'Send me a message',
    href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276',
    color: '#00ff41',
  },
];

export function ContactSection() {
  return (
    <section className="relative z-10 w-full px-6 py-20">
      <div className="max-w-2xl mx-auto flex flex-col gap-16">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-[#00ff41]">Touch</span>
          </h2>
          <p className="text-[#555] text-sm leading-7 max-w-sm mx-auto">
            Currently pursuing my M.S. in Cybersecurity.
            Open to internships, research, and collaborations.
          </p>
        </motion.div>

        {/* ── Links ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {LINKS.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              whileHover={{ x: 6 }}
              className="hacker-panel p-5 flex items-center gap-5 group transition-all"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl border border-[#1a2332] flex items-center
                            justify-center shrink-0 group-hover:border-opacity-60 transition-colors"
                style={{ color: item.color, background: item.color + '11' }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-[#444] text-xs mono mb-0.5">{item.label}</div>
                <div className="text-white text-sm font-medium group-hover:text-white transition-colors truncate">
                  {item.value}
                </div>
                <div className="text-[#444] text-xs mt-0.5">{item.sub}</div>
              </div>

              {/* Arrow */}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <a
            href="https://linkedin.com/in/aboubacar-sidick-meite-b5b309276"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#00ff41]
                       text-[#00ff41] rounded-xl mono text-sm
                       hover:bg-[#00ff4111] transition-all"
          >
            Say Hello →
          </a>
        </motion.div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div className="pt-8 border-t border-[#0f1923] text-center">
          <p className="text-[#2a2a2a] text-xs mono">
            © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
          </p>
        </div>

      </div>
    </section>
  );
}
