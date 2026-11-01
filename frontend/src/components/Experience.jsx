import ContributionVisual from './ContributionVisual.jsx';
import ToolChip from './ToolChip.jsx';
import { tenure } from '../tenure.js';

function formatStart(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Experience({ experience }) {
  const { months, label } = tenure(experience.startDate);

  return (
    <section className="section" id="work">
      <h2 className="section-title">What I've built at {experience.company}</h2>

      <div className="exp-header card">
        <div>
          <h3>{experience.role}</h3>
          <p className="muted">{experience.company} · {experience.companyType}</p>
          <p className="exp-summary">{experience.summary}</p>
        </div>
        <div className="exp-meta">
          <span className="exp-badge">Since {formatStart(experience.startDate)}</span>
          {months > 0 && <span className="muted small">{label} month{label === '1' ? '' : 's'} and counting</span>}
          <div className="chips">
            {experience.stack.map((s) => <ToolChip key={s} name={s} className="chip chip-accent" />)}
          </div>
        </div>
      </div>

      <div className="contrib-grid">
        {experience.contributions.map((c, i) => {
          // Cards in an incomplete last row (of 3) are made wide so the row has no empty gap
          const total = experience.contributions.length;
          const leftover = total % 3;
          const wide = leftover !== 0 && i >= total - leftover;
          const className = ['card', 'contrib', wide && `contrib-wide contrib-span-${leftover === 2 ? 'half' : 'full'}`]
            .filter(Boolean).join(' ');

          return (
            <article key={c.title} className={className}>
              <div className="contrib-main">
                <div className="contrib-top">
                  <span className="contrib-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="contrib-cat">{c.category}</span>
                </div>
                <h3>{c.title}</h3>
                <p className="contrib-desc">{c.description}</p>
              </div>
              {c.visual && <ContributionVisual type={c.visual} />}
              <div className="contrib-foot">
                {c.highlight && <p className="contrib-highlight">{c.highlight}</p>}
                <div className="chips">
                  {c.tools.map((t) => <ToolChip key={t} name={t} />)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
