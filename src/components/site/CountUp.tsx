import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
};

export function CountUp({ to, duration = 1.6, prefix = "", suffix = "", format }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const display = format ? format(n) : n.toLocaleString();
  return (
    <span ref={ref} className="font-mono tabular-nums text-[var(--emerald)]">
      {prefix}{display}{suffix}
    </span>
  );
}
