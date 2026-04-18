// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import './index.css';
import { useState, useEffect } from 'react';
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

export default function App() {
  const [page, setPage]       = useState<Page>('home');
  const [animClass, setAnim]  = useState('page-enter');

  const navigate = (to: Page) => {
    const { exit, enter } = getTransitionClasses(page, to);
    setAnim(exit);
    setTimeout(() => { setPage(to); setAnim(enter); }, 220);
  };

  // Reset scroll on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const pageProps = { navigate };

  return (
    <div className="scanlines relative min-h-screen bg-[#070b10]">
      <MatrixRain />
      <ChatBot />
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
