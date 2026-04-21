// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
interface GlitchTextProps {
  children: string;
  color?: string;
  className?: string;
}

/** Drop-in replacement for a colored <span> in headings â€” adds cyan/red glitch overlay */
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

