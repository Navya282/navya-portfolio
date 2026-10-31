import { TOOL_ICONS } from '../icons.js';

// A chip with the tool's logo in front, when we have one.
export default function ToolChip({ name, className = 'chip' }) {
  const brand = TOOL_ICONS[name];
  return (
    <span className={`${className} chip-tool`}>
      {brand && <brand.Icon className="chip-icon" style={brand.color ? { color: brand.color } : undefined} aria-hidden="true" />}
      {name}
    </span>
  );
}
