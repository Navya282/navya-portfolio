import { useMemo } from 'react';
import { SiGithub } from 'react-icons/si';
import { TbArrowRight, TbBrandLinkedin } from 'react-icons/tb';
import ProfilePhoto from './ProfilePhoto.jsx';
import ToolChip from './ToolChip.jsx';
import { useCountUp, useTypewriter } from '../effects.js';
import { tenure } from '../tenure.js';


function Stat({ target, decimals = 0, suffix = '', label }) {
  const value = useCountUp(target);
  return (
    <div>
      <dt>{value.toFixed(decimals)}{suffix}</dt>
      <dd>{label}</dd>
    </div>
  );
}

export default function Hero({ profile }) {
  const { contact, experience, education } = profile;

  // The typewriter cycles through the features from profile-seed.json
  const features = useMemo(() => experience.contributions.map((c) => c.title), [experience]);
  const typed = useTypewriter(features);

  // All numbers come from profile-seed.json, so they stay correct when the data changes.
  const cgpa = parseFloat(education[0]?.score);
  const stats = [
    (() => {
      const t = tenure(experience.startDate);
      return { target: t.months, suffix: t.exact ? '' : '+', label: `months at ${experience.company}` };
    })(),
    { target: experience.contributions.length, label: 'features shipped' },
    ...(Number.isFinite(cgpa) ? [{ target: cgpa, decimals: 2, label: 'CGPA in B.E.' }] : []),
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <p className="eyebrow"><span className="pulse" aria-hidden="true" />{profile.title}</p>
        <h1>Hi, I'm <span className="grad-text">{profile.name}</span>.</h1>
        <p className="typed" aria-label={`Built at ${experience.company}: ${features.join(', ')}`}>
          <span className="typed-prompt" aria-hidden="true">&gt;</span>
          <span className="typed-label" aria-hidden="true">built at {experience.company}:</span>
          <span className="typed-text" aria-hidden="true">{typed}</span>
          <span className="caret" aria-hidden="true" />
        </p>
        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">See my work <TbArrowRight aria-hidden="true" /></a>
          <a className="btn" href={contact.github} target="_blank" rel="noreferrer"><SiGithub aria-hidden="true" /> GitHub</a>
          <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer"><TbBrandLinkedin aria-hidden="true" /> LinkedIn</a>
        </div>

        <dl className="hero-stats">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </dl>
      </div>

      <div className="hero-visual">
        <ProfilePhoto name={profile.name} />
        {experience.stack.slice(0, 3).map((tool, i) => (
          <ToolChip key={tool} name={tool} className={`chip float-chip float-${i + 1}`} />
        ))}
      </div>

      <a href="#journey" className="scroll-cue" aria-label="Scroll down"><span /></a>
    </section>
  );
}
