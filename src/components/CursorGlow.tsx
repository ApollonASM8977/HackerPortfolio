// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved
import { useEffect, useRef } from 'react';

/** Subtle radial green glow that follows the cursor — pointer-events: none */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX - 240}px`;
      ref.current.style.top  = `${e.clientY - 240}px`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[99996]"
      style={{
        width: 480,
        height: 480,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #00ff410a 0%, #00ff4104 30%, transparent 70%)',
        transition: 'left 0.07s linear, top 0.07s linear',
        left: -500,
        top: -500,
      }}
    />
  );
}
