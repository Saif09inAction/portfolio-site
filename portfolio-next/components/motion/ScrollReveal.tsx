"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { revealEase, revealDuration } from "@/lib/motion-presets";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Extra delay (e.g. after heading) */
  delay?: number;
};

/**
 * Scroll-driven reveal: animates in when entering viewport, resets when leaving
 * (re-triggers on scroll back). Respects reduced motion.
 */
export function ScrollReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.12,
    margin: "0px 0px -10% 0px",
  });
  const reduce = useReducedMotion();

  const variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 40,
          scale: 0.95,
          filter: "blur(10px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: reduce ? 0.35 : revealDuration,
        ease: revealEase,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
