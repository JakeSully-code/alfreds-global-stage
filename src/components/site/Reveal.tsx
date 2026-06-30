import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const MotionComp = motion(As as React.ElementType);
  return (
    <MotionComp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionComp>
  );
}
