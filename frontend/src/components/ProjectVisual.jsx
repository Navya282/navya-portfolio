// Small illustrations for personal projects — sample data only, chosen by words in the project name.

function Endpoints() {
  const rows = [
    ['GET', '/api/flights/search'],
    ['POST', '/api/bookings'],
    ['POST', '/api/payments'],
  ];
  return (
    <div className="visual">
      <p className="visual-label">Sample endpoints</p>
      <ul className="endpoints">
        {rows.map(([method, path]) => (
          <li key={path}>
            <span className={`method method-${method.toLowerCase()}`}>{method}</span>
            <code>{path}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Forecast() {
  const actual = [[0, 58], [25, 52], [50, 60], [75, 46], [100, 50], [125, 40], [150, 44], [175, 32], [200, 36]];
  const predicted = [[200, 36], [225, 27], [250, 31], [275, 20], [300, 23]];
  const toPoints = (pts) => pts.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `M${toPoints(actual).replaceAll(' ', ' L')} L200,80 L0,80 Z`;

  return (
    <div className="visual">
      <div className="visual-head">
        <p className="visual-label">Sample forecast</p>
        <span className="legend">
          <i className="lg lg-actual" /> Actual
          <i className="lg lg-pred" /> Predicted
        </span>
      </div>
      <svg className="spark" viewBox="0 0 300 80" preserveAspectRatio="none" aria-label="Sample chart of actual and predicted stock prices">
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent)', stopOpacity: 0.35 }} />
            <stop offset="1" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#spark-fill)" />
        <polyline points={toPoints(actual)} className="spark-actual" vectorEffect="non-scaling-stroke" />
        <polyline points={toPoints(predicted)} className="spark-pred" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export default function ProjectVisual({ name }) {
  if (/flight|booking/i.test(name)) return <Endpoints />;
  if (/stock|price|forecast/i.test(name)) return <Forecast />;
  return null;
}
