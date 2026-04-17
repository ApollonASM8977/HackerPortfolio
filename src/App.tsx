// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import './index.css';
import { useState, useEffect } from 'react';
import { MatrixRain }    from './components/MatrixRain';
import { HomePage }      from './pages/HomePage';
import { AboutPage }     from './pages/AboutPage';
import { ChallengesPage} from './pages/ChallengesPage';
import { ProjectsPage }  from './pages/ProjectsPage';
import { ContactPage }   from './pages/ContactPage';

export type Page = 'home' | 'about' | 'challenges' | 'projects' | 'contact';

export default function App() {
  const [page, setPage]       = useState<Page>('home');
  const [animClass, setAnim]  = useState('page-enter');

  const navigate = (to: Page) => {
    setAnim('page-exit');
    setTimeout(() => { setPage(to); setAnim('page-enter'); }, 200);
  };

  // Reset scroll on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const pageProps = { navigate };

  return (
    <div className="scanlines relative min-h-screen bg-[#070b10]">
      <MatrixRain />
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
