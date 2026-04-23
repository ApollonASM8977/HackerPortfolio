// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useEffect, useRef } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½ã‚¿ãƒãƒ„ãƒ†ãƒˆãƒŠãƒ‹ãƒŒãƒãƒŽABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()[]{}|<>/\\~`';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    // per-column "glitch" mode: 0=normal, 1=red-glitch, 2=yellow-alert
    const glitch: number[] = Array(columns).fill(0);
    const glitchTimer: number[] = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 11, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columns = Math.floor(canvas.width / fontSize);
      while (drops.length < columns)    { drops.push(Math.random() * -100); glitch.push(0); glitchTimer.push(0); }
      ctx.font = `${fontSize}px Fira Code, monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Randomly enter glitch mode
        if (glitch[i] === 0 && Math.random() < 0.0008) {
          glitch[i] = Math.random() < 0.5 ? 1 : 2;
          glitchTimer[i] = Math.floor(Math.random() * 12) + 4;
        }
        if (glitch[i] > 0) {
          glitchTimer[i]--;
          if (glitchTimer[i] <= 0) glitch[i] = 0;
        }

        // Color selection
        let color: string;
        if (glitch[i] === 1)          color = '#ff0040';        // red intrusion alert
        else if (glitch[i] === 2)     color = '#ffcc00';        // yellow warning
        else if (Math.random() > 0.98) color = '#ffffff';       // rare bright white
        else                          color = '#00ff41';        // standard green

        ctx.fillStyle = color;
        ctx.globalAlpha = glitch[i] ? 0.7 : 0.55;
        ctx.fillText(char, i * fontSize, y * fontSize);
        ctx.globalAlpha = 1;

        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 42);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} id="matrix-canvas" />;
}

