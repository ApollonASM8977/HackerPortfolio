// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { motion } from 'framer-motion';
import { GitFork, Link, Shield, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 max-w-5xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#666] text-sm">04.</span>
          <h2 className="text-[#00ff41] text-2xl font-bold tracking-wide">{'<Contact />'}</h2>
          <div className="flex-1 h-px bg-[#1a2332]" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hacker-panel p-6"
        >
          <div className="text-xs text-[#666] mb-4">$ cat contact.txt</div>
          <div className="space-y-3">
            {[
              { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'Aboubacarmeite@ymail.com', href: 'mailto:Aboubacarmeite@ymail.com' },
              { icon: <Link className="w-4 h-4 text-[#0077b5]" />, label: 'LinkedIn', value: 'Aboubacar Sidick Meite', href: 'https://linkedin.com/in/aboubacar-sidick-meite-b5b309276' },
              { icon: <GitFork className="w-4 h-4" />, label: 'GitHub', value: '@ApollonIUGB77', href: 'https://github.com/ApollonIUGB77' },
              { icon: <Shield className="w-4 h-4 text-[#212C42]" />, label: 'TryHackMe', value: 'exterminator — [0xA] WIZARD', href: 'https://tryhackme.com/p/exterminator' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded border border-[#1a2332] hover:border-[#00ff4144] transition-all group"
              >
                <span className="text-[#00ff41] group-hover:scale-110 transition-transform">{item.icon}</span>
                <div>
                  <div className="text-[#666] text-xs">{item.label}</div>
                  <div className="text-white text-sm group-hover:text-[#00ff41] transition-colors">{item.value}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <div className="text-[#00ff41] text-4xl font-bold glow-green">Let's Connect</div>
          <p className="text-[#666] text-sm leading-6">
            I'm currently pursuing my M.S. in Cybersecurity at Montclair State University
            and open to internships, research opportunities, and collaborations.
          </p>
          <div className="hacker-panel p-4 text-left text-xs">
            <span className="text-[#ffcc00]">$ </span>
            <span className="text-[#00ff41]">echo </span>
            <span className="text-white">"Open to work from any location"</span>
            <br />
            <span className="text-[#ccc]">Open to work from any location</span>
          </div>
          <p className="text-[#444] text-xs italic">
            "First, solve the problem. Then, write the code."
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 pt-8 border-t border-[#1a2332] text-center"
      >
        <p className="text-[#333] text-xs">
          © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
        </p>
      </motion.div>
    </section>
  );
}
