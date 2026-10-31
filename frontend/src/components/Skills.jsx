const LEVEL_LABEL = {
  confident: 'Confident',
  working: 'Working knowledge',
  learning: 'Currently learning',
};

// Badge color per place (JSpiders uses the default purple)
const SOURCE_CLASS = {
  Fireflink: 'chip-src-ff',
  College: 'chip-src-col',
};

export default function Skills({ groups }) {
  return (
    <section className="section" id="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {groups.map((group) => (
          <div key={group.name} className="card">
            <h3>{group.name}</h3>
            <ul className="skill-list">
              {group.skills.map((s) => (
                <li key={s.name}>
                  <span className="skill-name">{s.name}</span>
                  {/* Second line: level on the left, where it was learned on the right (side by side) */}
                  <div className="skill-meta">
                    <span className={`skill-level lvl-${s.level}`}>{LEVEL_LABEL[s.level]}</span>
                    {/* learnedAt can list several places, e.g. "JSpiders, Fireflink" */}
                    <span className="skill-src">
                    {s.learnedAt.split(',').map((place) => place.trim()).map((place) => (
                      <span key={place} className={`chip chip-src ${SOURCE_CLASS[place] ?? ''}`}>
                        {place}
                      </span>
                    ))}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
