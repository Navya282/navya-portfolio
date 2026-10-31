// Small illustrations of features — sample data only, not real product numbers.
import { TbApi, TbArrowNarrowRight, TbBrandAndroid, TbBug, TbCircleCheckFilled, TbTrash } from 'react-icons/tb';
import { VscAzureDevops } from 'react-icons/vsc';
import { TOOL_ICONS } from '../icons.js';

// Bug raised on our platform -> REST call -> work item in Azure DevOps
function DefectFlow() {
  const steps = [
    { Icon: TbBug, tint: '#fb7185', title: 'Bug raised', sub: 'Fireflink' },
    { Icon: TbApi, tint: '#8b85ff', title: 'REST call', sub: 'Spring Boot' },
    { Icon: VscAzureDevops, tint: '#2B88D8', title: 'Work item', sub: 'Azure DevOps' },
  ];
  return (
    <div className="visual">
      <p className="visual-label">How it works</p>
      <div className="flow">
        {steps.map(({ Icon, tint, title, sub }, i) => (
          <div key={title} className="flow-step">
            {i > 0 && <TbArrowNarrowRight className="flow-arrow" aria-hidden="true" />}
            <div className="flow-node">
              <span className="flow-icon tinted" style={{ '--tint': tint }} aria-hidden="true"><Icon /></span>
              <strong>{title}</strong>
              <small>{sub}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// One delete on our platform removes the app from every cloud device platform
function CloudDelete() {
  const platforms = [
    ['Fireflink', 'Fireflink Device Farm'],
    ['BrowserStack', 'BrowserStack'],
    ['Sauce Labs', 'Sauce Labs'],
    ['LambdaTest', 'LambdaTest'],
  ];
  return (
    <div className="visual">
      <p className="visual-label">Delete once, removed everywhere</p>
      <div className="del-file">
        <TbBrandAndroid className="del-file-icon" aria-hidden="true" />
        <span className="del-file-name">app-release.apk</span>
        <span className="del-tag"><TbTrash aria-hidden="true" /> Deleted</span>
      </div>
      <ul className="del-list">
        {platforms.map(([label, toolKey]) => {
          const brand = TOOL_ICONS[toolKey];
          return (
            <li key={label}>
              {brand && <brand.Icon style={brand.color ? { color: brand.color } : undefined} aria-hidden="true" />}
              <span>{label}</span>
              <TbCircleCheckFilled className="del-check" aria-label="removed" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Charts() {
  return (
    <div className="visual visual-charts" aria-label="Bar, pie and stacked bar chart examples">
      <figure>
        <svg viewBox="0 0 60 44">
          <rect x="4" y="22" width="10" height="20" rx="1.5" className="v1" />
          <rect x="18" y="10" width="10" height="32" rx="1.5" className="v1" />
          <rect x="32" y="16" width="10" height="26" rx="1.5" className="v1" />
          <rect x="46" y="4" width="10" height="38" rx="1.5" className="v1" />
        </svg>
        <figcaption>Bar</figcaption>
      </figure>
      <figure>
        <svg viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="19" className="v3" />
          <path d="M22 22 L22 3 A19 19 0 0 1 40.1 27.9 Z" className="v1" />
          <path d="M22 22 L40.1 27.9 A19 19 0 0 1 12 38.2 Z" className="v2" />
        </svg>
        <figcaption>Pie</figcaption>
      </figure>
      <figure>
        <svg viewBox="0 0 60 44">
          {[[4, 14, 10], [18, 8, 14], [32, 18, 8], [46, 6, 12]].map(([x, a, b]) => (
            <g key={x}>
              <rect x={x} y={42 - a - b - 10} width="10" height="10" className="v3" />
              <rect x={x} y={42 - a - b} width="10" height={b} className="v2" />
              <rect x={x} y={42 - a} width="10" height={a} className="v1" />
            </g>
          ))}
        </svg>
        <figcaption>Stacked bar</figcaption>
      </figure>
    </div>
  );
}

function ResultTable() {
  const rows = [
    ['Passed', 42, 'pass'],
    ['Failed', 3, 'fail'],
    ['Warning', 5, 'warn'],
    ['Terminated', 1, 'term'],
  ];
  return (
    <div className="visual">
      <p className="visual-label">Sample result sent to the tool</p>
      <table className="result-table">
        <tbody>
          {rows.map(([label, count, cls]) => (
            <tr key={label}>
              <td><span className={`dot ${cls}`} />{label}</td>
              <td className="num">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NlpSteps() {
  return (
    <div className="visual">
      <p className="visual-label">Example script steps</p>
      <ol className="nlp-steps">
        <li>Open browser and navigate to <em>login page</em></li>
        <li>Enter <em>username</em> into the email field</li>
        <li>Click on <em>Sign in</em> button</li>
        <li>Verify that <em>Dashboard</em> is displayed</li>
      </ol>
    </div>
  );
}

export default function ContributionVisual({ type }) {
  if (type === 'charts') return <Charts />;
  if (type === 'result-table') return <ResultTable />;
  if (type === 'nlp') return <NlpSteps />;
  if (type === 'defect-flow') return <DefectFlow />;
  if (type === 'cloud-delete') return <CloudDelete />;
  return null;
}
