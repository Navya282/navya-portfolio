import { SiGithub } from 'react-icons/si';
import { TbArrowUpRight, TbCircleCheckFilled } from 'react-icons/tb';
import { projectIcon } from '../icons.js';
import ToolChip from './ToolChip.jsx';
import ProjectVisual from './ProjectVisual.jsx';

export default function Projects({ projects }) {
  return (
    <section className="section" id="projects">
      <h2 className="section-title">Personal projects</h2>
      <div className="projects-grid">
        {projects.map((p) => {
          const { Icon, tint } = projectIcon(p.name);
          return (
            <article key={p.name} className="card project tinted" style={{ '--tint': tint }}>
              <div className="project-head">
                <span className="icon-badge tinted" aria-hidden="true"><Icon /></span>
                <div>
                  <h3>{p.name}</h3>
                  <p className="muted">{p.description}</p>
                </div>
              </div>

              <ul className="icon-list">
                {p.points.map((pt) => (
                  <li key={pt}><TbCircleCheckFilled className="icon-list-mark" aria-hidden="true" />{pt}</li>
                ))}
              </ul>

              <ProjectVisual name={p.name} />

              <div className="project-foot">
                <div className="chips">
                  {p.tech.map((t) => <ToolChip key={t} name={t} />)}
                </div>
                {p.link && (
                  <a className="btn btn-small project-link" href={p.link} target="_blank" rel="noreferrer">
                    <SiGithub aria-hidden="true" /> Code <TbArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
