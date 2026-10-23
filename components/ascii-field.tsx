"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * A still ASCII field — the texture the template drew with WebGL, but
 * painted once on a canvas from deterministic noise. No three.js, no video,
 * and nothing animating: it renders on mount and on resize, then sits there.
 */

/** Only two marks: a dot for the quiet areas, a plus for the dense ones. */
const GLYPHS = [".", ".", ".", ".", "+", "+", "+", "+"];
const CELL = 11;

/** Stable value hash in [0,1). */
function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

/** Smoothed value noise. */
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

/** Layered noise, pushed into soft horizontal bands so it reads as waves. */
function field(x: number, y: number): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let octave = 0; octave < 4; octave++) {
    value += valueNoise(x * frequency, y * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2.1;
  }

  const bands = 0.5 + 0.5 * Math.sin(y * 2.4 + value * 5.5);
  return value * 0.55 + bands * 0.45;
}

export function AsciiField({
  className = "",
  mask,
  opacity = 0.5,
}: {
  className?: string;
  mask: string;
  opacity?: number;
}): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const draw = (): void => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${CELL}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const value = field(col * 0.07, row * 0.14);
          if (value < 0.3) continue;

          const level = Math.min(
            GLYPHS.length - 1,
            Math.floor(((value - 0.3) / 0.7) * GLYPHS.length)
          );
          const glyph = GLYPHS[level];
          if (glyph === undefined) continue;

          ctx.fillStyle = `rgba(255, 255, 255, ${(value - 0.3) * 0.9})`;
          ctx.fillText(glyph, col * CELL + CELL / 2, row * CELL + CELL / 2);
        }
      }
    };

    draw();

    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={
        { maskImage: mask, WebkitMaskImage: mask, opacity } as CSSProperties
      }
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
