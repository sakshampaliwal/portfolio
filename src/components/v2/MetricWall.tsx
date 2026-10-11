import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

const COLS = 22;
const ROWS = 12;

type Cell = { value: number; opacity: number; empty: boolean };

/** A wall of two-digit "metrics" that drift like live dashboard readings. */
export const MetricWall = ({ active }: { active: boolean }) => {
  const reduceMotion = useReducedMotion();
  const initial = useMemo<Cell[]>(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        // values fall off from left to right, like the reference
        const base = 95 - col * 4 + (Math.floor(i / COLS) % 3) * 2;
        return {
          value: Math.max(5, Math.min(99, Math.round(base + (Math.random() - 0.5) * 8))),
          opacity: 0.25 + Math.random() * 0.55,
          empty: Math.random() < 0.18,
        };
      }),
    []
  );
  const [cells, setCells] = useState(initial);

  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = setInterval(() => {
      setCells((prev) => {
        const next = prev.slice();
        for (let k = 0; k < 18; k++) {
          const i = Math.floor(Math.random() * next.length);
          const c = next[i];
          next[i] = {
            value: Math.max(1, Math.min(99, c.value + Math.round((Math.random() - 0.5) * 6))),
            opacity: Math.random() < 0.25 ? 0.15 + Math.random() * 0.7 : c.opacity,
            empty: Math.random() < 0.06 ? !c.empty : c.empty,
          };
        }
        return next;
      });
    }, 140);
    return () => clearInterval(id);
  }, [active, reduceMotion]);

  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-[62%] grid grid-cols-[repeat(14,minmax(0,1fr))] md:grid-cols-[repeat(22,minmax(0,1fr))] gap-y-2 px-4 pt-24 font-mono text-white text-sm sm:text-base md:text-lg tabular-nums select-none [mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
    >
      {cells.map((c, i) => (
        <span
          key={i}
          className={`text-center transition-opacity duration-500 ${i % COLS > 13 ? "hidden md:block" : ""}`}
          style={{ opacity: c.empty ? 0 : c.opacity }}
        >
          {c.value}
        </span>
      ))}
    </div>
  );
};
