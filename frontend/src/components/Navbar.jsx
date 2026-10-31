import { useEffect, useState } from 'react';

const LINKS = [
  ['journey', 'Journey'],
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Track how far down the page we are and which section is currently on screen
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      setProgress(maxScroll > 0 ? doc.scrollTop / maxScroll : 0);
      setScrolled(doc.scrollTop > 10);

      let current = '';
      for (const [id] of LINKS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 140) current = id;
      }
      // At the very bottom, the last section may never reach the top of the screen
      if (maxScroll > 0 && doc.scrollTop >= maxScroll - 4) current = LINKS[LINKS.length - 1][0];
      setActive(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand">{name}</a>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : undefined}
              aria-current={active === id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
