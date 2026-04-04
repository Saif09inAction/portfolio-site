"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Snappy cursor: core dot follows instantly; outer ring uses a tight spring.
 * High z-index so it stays above modals. No mix-blend — stays visible on dark UIs.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 520, damping: 38, mass: 0.35 });
  const sy = useSpring(cy, { stiffness: 520, damping: 38, mass: 0.35 });

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ok = mqFine.matches && !mqReduce.matches;
    const raf = requestAnimationFrame(() => setEnabled(ok));
    if (!ok) return () => cancelAnimationFrame(raf);

    document.body.classList.add("custom-cursor-active");
    const move = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cx, cy]);

  if (!enabled) return null;

  return (
    <>
      {/* Core — instant, always visible */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[320]"
        style={{
          x: cx,
          y: cy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#39ff14]" />
      </motion.div>
      {/* Ring — follows with slight lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[310] h-12 w-12 rounded-full border border-[#39ff14]/40 shadow-[0_0_24px_rgba(57,255,20,0.25),inset_0_0_20px_rgba(57,255,20,0.08)]"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
