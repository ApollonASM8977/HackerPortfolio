// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import './index.css';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MatrixRain }    from './components/MatrixRain';
import { ChatBot }       from './components/ChatBot';
import { HomePage }      from './pages/HomePage';
import { AboutPage }     from './pages/AboutPage';
import { ChallengesPage} from './pages/ChallengesPage';
import { ProjectsPage }  from './pages/ProjectsPage';
import { ContactPage }   from './pages/ContactPage';

export type Page = 'home' | 'about' | 'challenges' | 'projects' | 'contact';

const PAGE_ORDER: Record<Page, number> = {
  home: 0, about: 1, challenges: 2, projects: 3, contact: 4,
};

function getTransitionClasses(from: Page, to: Page): { exit: string; enter: string } {
  const f = PAGE_ORDER[from];
  const t = PAGE_ORDER[to];
  if (f === t) return { exit: 'page-exit', enter: 'page-enter' };
  if (t > f)   return { exit: 'page-exit-left',  enter: 'page-enter-right' };
               return { exit: 'page-exit-right', enter: 'page-enter-left'  };
}

/* ── Konami overlay ──────────────────────────────────── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function KonamiOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 4500); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6"
      style={{ background: 'rgba(0,0,0,0.96)' }}
      onClick={onDone}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-center"
      >
        <div className="mono text-[#ff0040] text-xs mb-3 tracking-widest animate-pulse">
          ██████ SYSTEM BREACH DETECTED ██████
        </div>
        <div className="mono font-bold text-[#00ff41] text-4xl sm:text-6xl glow-green mb-4">
          ROOT ACCESS
        </div>
        <div className="mono text-[#00ff41] text-xl glow-green mb-6">GRANTED</div>
        <pre className="mono text-[#00ff41] text-xs text-left inline-block opacity-70 leading-6">
{`[*] Exploiting CVE-2026-KONAMI...
[+] Privilege escalation: user → root
[+] uid=0(root) gid=0(root)
[!] FLAG{k0n4m1_m4st3r_h4ck3r}`}
        </pre>
        <div className="mt-6 mono text-[#444] text-xs">
          ↑↑↓↓←→←→BA — classic
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [page, setPage]         = useState<Page>('home');
  const [animClass, setAnim]    = useState('page-enter');
  const [konamiOn, setKonamiOn] = useState(false);

  const navigate = (to: Page) => {
    const { exit, enter } = getTransitionClasses(page, to);
    setAnim(exit);
    setTimeout(() => { setPage(to); setAnim(enter); }, 220);
  };

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  // Konami code listener
  useEffect(() => {
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) { setKonamiOn(true); idx = 0; }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const pageProps = { navigate };

  return (
    <div className="scanlines relative min-h-screen bg-[#070b10]">
      <MatrixRain />
      <ChatBot navigate={navigate} />

      <AnimatePresence>
        {konamiOn && <KonamiOverlay onDone={() => setKonamiOn(false)} />}
      </AnimatePresence>

      <div className={animClass} key={page}>
        {page === 'home'       && <HomePage       {...pageProps} />}
        {page === 'about'      && <AboutPage      {...pageProps} />}
        {page === 'challenges' && <ChallengesPage {...pageProps} />}
        {page === 'projects'   && <ProjectsPage   {...pageProps} />}
        {page === 'contact'    && <ContactPage    {...pageProps} />}
      </div>
    </div>
  );
}
