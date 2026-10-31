import { useEffect, useState } from 'react';
import { fetchProfile } from './api.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Journey from './components/Journey.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import { usePageEffects } from './effects.js';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    fetchProfile().then(setProfile).catch((e) => setError(e.message));
    // Free hosting puts the backend to sleep when idle; the first visit can take up to a minute
    const timer = setTimeout(() => setSlow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  usePageEffects(Boolean(profile));

  if (error) {
    return (
      <div className="status">
        <h2>Couldn't load the profile</h2>
        <p>{error}</p>
        <p className="muted">The server may still be starting. Please try again in a minute.</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="status">
        <div className="loader" aria-hidden="true" />
        <p className="muted">Loading…</p>
        {slow && <p className="muted small">Waking up the server. This can take up to a minute on the first visit.</p>}
      </div>
    );
  }

  return (
    <>
      <div className="bg-orbs" aria-hidden="true"><span /><span /></div>
      <Navbar name={profile.name} />
      <main>
        <Hero profile={profile} />
        <Journey steps={profile.journey} />
        <Experience experience={profile.experience} />
        <Skills groups={profile.skillGroups} />
        <Projects projects={profile.projects} />
        <Education education={profile.education} achievements={profile.achievements} />
        <Contact contact={profile.contact} />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · Built with Spring Boot, MongoDB &amp; React
      </footer>
    </>
  );
}
