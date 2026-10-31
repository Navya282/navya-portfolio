import { TbSchool, TbTrophy } from 'react-icons/tb';
import { achievementIcon, educationIcon } from '../icons.js';

export default function Education({ education, achievements }) {
  return (
    <section className="section" id="education">
      <h2 className="section-title">Education &amp; Achievements</h2>
      <div className="edu-layout">
        <div className="card">
          <h3 className="card-title tinted" style={{ '--tint': '#60a5fa' }}>
            <TbSchool aria-hidden="true" /> Education
          </h3>
          <ul className="edu-list">
            {education.map((e) => {
              const { Icon, tint } = educationIcon(e.degree);
              return (
                <li key={e.institution}>
                  <span className="icon-badge icon-badge-sm tinted" style={{ '--tint': tint }} aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="edu-main">
                    <h3>{e.degree}</h3>
                    <p className="muted">{e.institution}</p>
                  </div>
                  <div className="edu-right">
                    <span className="edu-score">{e.score}</span>
                    <span className="muted small">{e.year}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="card">
          <h3 className="card-title tinted" style={{ '--tint': '#f5b324' }}>
            <TbTrophy aria-hidden="true" /> Highlights
          </h3>
          <ul className="icon-list highlights">
            {achievements.map((a) => {
              const { Icon, tint } = achievementIcon(a);
              return (
                <li key={a} className="tinted" style={{ '--tint': tint }}>
                  <Icon className="icon-list-mark" aria-hidden="true" />{a}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
