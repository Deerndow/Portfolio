import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  age: number;
  color: string;
};

const COLORS = ["#d4ff00", "#ffc5d3", "#0033ff", "#eae6df", "#4e5a65"];
const MAX_POINTS = 52;
const COLOR_SPAN = 18;

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
};

const mixColor = (from: string, to: string, amount: number) => {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const t = amount * amount * (3 - 2 * amount);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const blue = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r}, ${g}, ${blue})`;
};

const paletteColorAt = (step: number) => {
  const phase = (step / COLOR_SPAN) % COLORS.length;
  const index = Math.floor(phase);
  const nextIndex = (index + 1) % COLORS.length;
  return mixColor(COLORS[index], COLORS[nextIndex], phase - index);
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const pointCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addPoint = (event: PointerEvent) => {
      const points = pointsRef.current;
      const last = points[points.length - 1];
      const dx = last ? event.clientX - last.x : 0;
      const dy = last ? event.clientY - last.y : 0;

      if (last && Math.hypot(dx, dy) < 3) return;

      pointCountRef.current += 1;

      points.push({
        x: event.clientX,
        y: event.clientY,
        age: 0,
        color: paletteColorAt(pointCountRef.current),
      });

      if (points.length > MAX_POINTS) points.shift();
    };

    const draw = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const points = pointsRef.current;
      for (const point of points) point.age += 1;
      pointsRef.current = points.filter((point) => point.age < 40);

      const fresh = pointsRef.current;
      for (let i = 1; i < fresh.length - 1; i += 1) {
        const prev = fresh[i - 1];
        const point = fresh[i];
        const next = fresh[i + 1];
        const opacity = Math.max(0, 1 - point.age / 40);
        const startX = (prev.x + point.x) / 2;
        const startY = (prev.y + point.y) / 2;
        const midX = (point.x + next.x) / 2;
        const midY = (point.y + next.y) / 2;
        const gradient = ctx.createLinearGradient(startX, startY, midX, midY);
        gradient.addColorStop(0, prev.color);
        gradient.addColorStop(0.5, point.color);
        gradient.addColorStop(1, next.color);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(point.x, point.y, midX, midY);
        ctx.strokeStyle = "rgba(234, 230, 223, 0.35)";
        ctx.globalAlpha = opacity * 0.22;
        ctx.lineWidth = Math.max(2, 8 * opacity);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(point.x, point.y, midX, midY);
        ctx.strokeStyle = gradient;
        ctx.globalAlpha = opacity * 0.54;
        ctx.lineWidth = Math.max(1, 4.2 * opacity);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        ctx.globalAlpha = opacity * 0.16;
        ctx.lineWidth = Math.max(0.6, 1.2 * opacity);
        ctx.strokeStyle = "#1d1e22";
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", addPoint, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", addPoint);
    };
  }, []);

  return <canvas ref={canvasRef} className="pencil-trail" aria-hidden="true" />;
}
