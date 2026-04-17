// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { GitFork, Link, Shield, Mail } from 'lucide-react';

const LINKS = [
  {
    icon: <Link className="w-4 h-4" />,
    label: 'LinkedIn',
    value: 'Aboubacar Sidick Meite',
    href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276',
    color: '#0077b5',
  },
  {
    icon: <GitFork className="w-4 h-4" />,
    label: 'GitHub',
    value: '@ApollonIUGB77',
    href: 'https://github.com/ApollonIUGB77',
    color: '#fff',
  },
  {
    icon: <Shield className="w-4 h-4" />,
    label: 'TryHackMe',
    value: 'exterminator — [0xA] WIZARD',
    href: 'https://tryhackme.com/p/exterminator',
    color: '#00d4ff',
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: 'Email',
    value: 'Available on LinkedIn',
    href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276',
    color: '#00ff41',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-24">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Get In <span className="text-[#00ff41]">Touch</span>
        </h2>
        <p className="text-[#555] text-sm max-w-md mx-auto">
          Open to internships, research, and collaborations.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center space-y-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#aaa] text-sm leading-7 max-w-xl mx-auto">
            I'm currently pursuing my M.S. in Cybersecurity at Montclair State University
            and open to internships, research opportunities, and collaborations.
            Feel free to reach out.
          </p>
        </motion.div>

        {/* Links grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
        >
          {LINKS.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="hacker-panel p-4 flex items-center gap-4 group hover:border-opacity-60 transition-all"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-[#1a2332] group-hover:border-opacity-50 transition-colors"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-[#555] text-xs font-mono">{item.label}</div>
                <div className="text-[#ddd] text-sm group-hover:text-white transition-colors">{item.value}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <a
            href="https://linkedin.com/in/aboubacar-sidick-meite-b5b309276"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#00ff41] text-[#00ff41] rounded-lg font-mono text-sm hover:bg-[#00ff4111] transition-all"
          >
            Say Hello →
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 pt-8 border-t border-[#0f1923] text-center"
      >
        <p className="text-[#2a2a2a] text-xs font-mono">
          © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
        </p>
      </motion.div>
    </section>
  );
}
