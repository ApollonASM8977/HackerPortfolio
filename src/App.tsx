// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import './index.css';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MatrixRain }          from './components/MatrixRain';
import { ChatBot }             from './components/ChatBot';
import { CursorGlow }          from './components/CursorGlow';
import { LoadingScreen }       from './components/LoadingScreen';
import { KeyboardShortcuts }   from './components/KeyboardShortcuts';
import { HomePage }            from './pages/HomePage';
import { AboutPage }           from './pages/AboutPage';
import { ChallengesPage }      from './pages/ChallengesPage';
import { ProjectsPage }        from './pages/ProjectsPage';
import { ContactPage }         from './pages/ContactPage';

export type Page = 'home' | 'about' | 'challenges' | 'projects' | 'contact';

const PAGE_ORDER: Record<Page, number> = {
  home: 0, about: 1, challenges: 2, projects: 3, contact: 4,
};

function getTransitionClasses(from: Page, to: Page) {
  const f = PAGE_ORDER[from], t = PAGE_ORDER[to];
  if (f === t) return { exit: 'page-exit',       enter: 'page-enter'       };
  if (t > f)   return { exit: 'page-exit-left',  enter: 'page-enter-right' };
               return { exit: 'page-exit-right', enter: 'page-enter-left'  };
}

/* â”€â”€ Konami overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function KonamiOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 4500); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6"
      style={{ background:'rgba(0,0,0,0.96)' }} onClick={onDone}>
      <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
        transition={{ type:'spring', stiffness:200, damping:15 }} className="text-center">
        <div className="mono text-[#ff0040] text-xs mb-3 tracking-widest animate-pulse">
          â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ SYSTEM BREACH DETECTED â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
        </div>
        <div className="mono font-bold text-[#00ff41] text-4xl sm:text-6xl glow-green mb-4">ROOT ACCESS</div>
        <div className="mono text-[#00ff41] text-xl glow-green mb-6">GRANTED</div>
        <pre className="mono text-[#00ff41] text-xs text-left inline-block opacity-70 leading-6">
{`[*] Exploiting CVE-2026-KONAMI...
[+] Privilege escalation: user â†’ root
[+] uid=0(root) gid=0(root)
[!] FLAG{k0n4m1_m4st3r_h4ck3r}`}
        </pre>
        <div className="mt-6 mono text-[#444] text-xs">â†‘â†‘â†“â†“â†â†’â†â†’BA â€” classic ðŸŽ®</div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  /* â”€â”€ Show loading screen once per session */
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('booted'));

  const [page, setPage]           = useState<Page>('home');
  const [animClass, setAnim]      = useState('page-enter');
  const [konamiOn, setKonamiOn]   = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const navigate = (to: Page) => {
    const { exit, enter } = getTransitionClasses(page, to);
    setAnim(exit);
    setTimeout(() => { setPage(to); setAnim(enter); }, 220);
  };

  const handleBootDone = () => {
    sessionStorage.setItem('booted', '1');
    setLoading(false);
  };

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  /* Konami code */
  useEffect(() => {
    let idx = 0;
    const h = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) { idx++; if (idx === KONAMI.length) { setKonamiOn(true); idx = 0; } }
      else { idx = e.key === KONAMI[0] ? 1 : 0; }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  /* ? key â†’ shortcuts modal */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.target as HTMLElement).tagName !== 'INPUT'
                        && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        setShortcutsOpen(s => !s);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const pageProps = { navigate };

  return (
    <>
      {/* Loading screen â€” rendered outside main div to cover everything */}
      <AnimatePresence>{loading && <LoadingScreen onDone={handleBootDone} />}</AnimatePresence>

      <div className={`scanlines hex-grid relative min-h-screen bg-[#070b10] ${loading ? 'overflow-hidden h-screen' : ''}`}>
        <MatrixRain />
        <CursorGlow />
        <ChatBot navigate={navigate} />

        <KeyboardShortcuts open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} navigate={navigate} />

        <AnimatePresence>{konamiOn && <KonamiOverlay onDone={() => setKonamiOn(false)} />}</AnimatePresence>

        {/* ? button hint */}
        {!loading && (
          <button
            onClick={() => setShortcutsOpen(s => !s)}
            className="fixed bottom-6 left-6 z-[9997] w-8 h-8 rounded-full border border-[#1a2332]
                       mono text-[#333] text-sm flex items-center justify-center
                       hover:border-[#00ff4166] hover:text-[#00ff41] transition-all"
            title="Keyboard shortcuts (?)"
          >?</button>
        )}

        <div className={animClass} key={page}>
          {page === 'home'       && <HomePage       {...pageProps} />}
          {page === 'about'      && <AboutPage      {...pageProps} />}
          {page === 'challenges' && <ChallengesPage {...pageProps} />}
          {page === 'projects'   && <ProjectsPage   {...pageProps} />}
          {page === 'contact'    && <ContactPage    {...pageProps} />}
        </div>
      </div>
    </>
  );
}

