export default function Journey({ steps }) {
  return (
    <section className="section" id="journey">
      <h2 className="section-title">My journey</h2>
      <p className="section-sub">From engineering college to building features on a live product.</p>
      <ol className="timeline">
        {steps.map((step, i) => (
          <li key={step.title} className={i === steps.length - 1 ? 'current' : ''}>
            <span className="timeline-period">{step.period}</span>
            <h3>{step.title}</h3>
            <p className="timeline-place">{step.place}</p>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
