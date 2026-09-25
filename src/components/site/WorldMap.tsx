import { motion } from "framer-motion";
import { useMemo } from "react";

// Approximate equirectangular projection of selected cities.
// Coords as [lon, lat] -> projected to 0..1 within [-180..180, -60..75]
const CITIES: Record<string, [number, number]> = {
  Nigeria: [8.6753, 9.082],
  "United States": [-95.7129, 38.0],
  China: [104.1954, 35.8617],
  "South Africa": [22.9375, -30.5595],
  Rwanda: [29.8739, -1.9403],
  Poland: [19.1451, 51.9194],
  Kenya: [37.9062, -0.0236],
  Brazil: [-51.9253, -14.235],
  Switzerland: [8.2275, 46.8182],
};

function project(lon: number, lat: number, w: number, h: number) {
  const x = ((lon + 180) / 360) * w;
  const y = ((75 - lat) / (75 + 60)) * h;
  return [x, y] as const;
}

export function WorldMap() {
  const W = 1200;
  const H = 600;

  // Dotted grid representing landmasses approximately — purely decorative.
  // Uses a deterministic hash of (x, y) instead of Math.random() so the SSR
  // markup matches the client and React doesn't throw a hydration mismatch.
  const dots = useMemo(() => {
    // Deterministic pseudo-random in [0, 1) from two ints (GLSL-style hash).
    const hash = (x: number, y: number) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    const arr: { x: number; y: number }[] = [];
    const step = 14;
    for (let y = 40; y < H - 40; y += step) {
      for (let x = 40; x < W - 40; x += step) {
        // crude land mask using sin/cos noise — decorative only
        const n =
          Math.sin(x * 0.013) * Math.cos(y * 0.017) +
          Math.sin((x + y) * 0.008) * 0.6;
        if (n > 0.15 && hash(x, y) > 0.25) arr.push({ x, y });
      }
    }
    return arr;
  }, []);

  const cityPoints = Object.entries(CITIES).map(([name, [lon, lat]]) => {
    const [x, y] = project(lon, lat, W, H);
    return { name, x, y };
  });

  // arcs from Nigeria hub to all other cities
  const hub = cityPoints.find((c) => c.name === "Nigeria")!;
  const arcs = cityPoints
    .filter((c) => c.name !== "Nigeria")
    .map((c) => {
      const mx = (hub.x + c.x) / 2;
      const my = (hub.y + c.y) / 2 - Math.abs(c.x - hub.x) * 0.25;
      return { from: hub, to: c, d: `M ${hub.x} ${hub.y} Q ${mx} ${my} ${c.x} ${c.y}` };
    });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="node-glow" r="50%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.1" fill="var(--ink)" opacity="0.18" />
      ))}

      {arcs.map((a, i) => (
        <motion.path
          key={i}
          d={a.d}
          fill="none"
          stroke="#16a34a"
          strokeWidth="1"
          strokeOpacity="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.2, delay: 0.3 + i * 0.18, ease: "easeOut" }}
        />
      ))}

      {cityPoints.map((c, i) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r="18" fill="url(#node-glow)">
            <animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </circle>
          <circle cx={c.x} cy={c.y} r="3" fill="#16a34a" />
        </g>
      ))}
    </svg>
  );
}
