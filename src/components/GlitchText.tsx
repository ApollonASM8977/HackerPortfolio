// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
interface GlitchTextProps {
  children: string;
  color?: string;
  className?: string;
}

/** Drop-in replacement for a colored <span> in headings — adds cyan/red glitch overlay */
export function GlitchText({ children, color = '#00ff41', className = '' }: GlitchTextProps) {
  return (
    <span
      className={`glitch-wrap ${className}`}
      data-text={children}
      style={{ color }}
    >
      {children}
    </span>
  );
}
