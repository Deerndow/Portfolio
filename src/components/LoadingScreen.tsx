import { useEffect, useRef } from "react";

// SVG coordinate space (matches the logo's ~1.943:1 aspect so the mask aligns)
const W = 1000;
const H = 514;
const DURATION = 2000; // slime finishes just before the route swaps

const LIME = "#d4ff00";
const BLUE = "#0033ff";

export default function LoadingScreen() {
  const slime = useRef<SVGGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dropA = useRef<SVGCircleElement>(null);
  const dropB = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    // localized downward bulge -> a "drip"/tongue at x = cx
    const drip = (x: number, cx: number, depth: number, w: number, t: number) => {
      const d = (x - cx) / w;
      return Math.exp(-d * d) * depth * (0.8 + 0.2 * Math.sin(t * 1.6 + cx));
    };

    // wavy + dripping top edge of the slime, sampled left -> right
    const edge = (t: number) => {
      const pts: [number, number][] = [];
      const N = 44;
      for (let i = 0; i <= N; i++) {
        const x = -80 + (W + 160) * (i / N);
        let y =
          Math.sin(x * 0.01 + t * 0.9) * 11 + Math.sin(x * 0.026 - t * 1.3) * 6;
        y += drip(x, 820, 70, 70, t); // heavy drip on the right "Λ"
        y += drip(x, 560, 30, 60, t); // small drip mid
        y += drip(x, 200, 26, 70, t); // small drip on the "3"
        pts.push([x, y]);
      }
      return pts;
    };

    // Catmull-Rom -> cubic bézier for a smooth, gooey curve
    const smooth = (pts: [number, number][]) => {
      let d = "";
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += `C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]} `;
      }
      return d;
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const base = Math.min(1, (now - start) / DURATION);
      const progress = base * base * (3 - 2 * base); // smoothstep ease

      // fill level tied to progress: above the logo -> below the logo
      const surfaceY = -120 + progress * (H + 240);

      const e = edge(t);
      const rev = e.slice().reverse();
      const d =
        `M -80 -700 L ${W + 80} -700 L ${rev[0][0]} ${rev[0][1]} ` +
        smooth(rev) +
        ` L -80 ${e[0][1]} Z`;

      path.current?.setAttribute("d", d);
      slime.current?.setAttribute("transform", `translate(0 ${surfaceY})`);

      const lead = surfaceY + 60 + Math.sin(t * 3) * 14;
      dropA.current?.setAttribute("cy", String(lead + drip(820, 820, 36, 70, t)));
      dropB.current?.setAttribute("cy", String(lead - 28 + Math.sin(t * 2.2) * 10));

      if (now - start < DURATION + 400) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="loader" role="status" aria-label="Loading">
      <div className="logo">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <filter id="goo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>

          {/* lime base — the whole logo */}
          <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={LIME} />

          {/* rising blue slime */}
          <g ref={slime} fill={BLUE} filter="url(#goo)">
            <path ref={path} d="" />
            <circle ref={dropA} cx={820} cy={-200} r={24} />
            <circle ref={dropB} cx={560} cy={-200} r={15} />
          </g>
        </svg>
      </div>
    </div>
  );
}
