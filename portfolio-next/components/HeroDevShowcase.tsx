"use client";

import { motion, useReducedMotion } from "framer-motion";

const ORBIT_TAGS = ["React", "Next.js", "TypeScript", "Three.js", "Motion", "CSS"];

/**
 * CSS 3D orbit + perspective grid — reads “frontend craft” without extra WebGL canvases.
 */
export function HeroDevShowcase() {
  const reduce = useReducedMotion();
  const orbitTransition = reduce
    ? undefined
    : { duration: 32, repeat: Infinity, ease: "linear" as const };

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(46vh,520px)] overflow-hidden"
        aria-hidden
      >
        <div className="dev-grid-floor" />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-[14%] z-[1] hidden h-[200px] w-[200px] -translate-x-1/2 opacity-90 sm:top-[12%] sm:h-[220px] sm:w-[220px] lg:left-[18%] lg:top-[26%] lg:translate-x-0 xl:left-[14%]"
        aria-hidden
      >
        <div className="orbit-scene h-full w-full">
          <motion.div
            className="orbit-carousel"
            animate={reduce ? undefined : { rotateY: 360 }}
            transition={orbitTransition}
            style={{ transformStyle: "preserve-3d" }}
          >
            {ORBIT_TAGS.map((tag, i) => {
              const angle = (i / ORBIT_TAGS.length) * 360;
              return (
                <div
                  key={tag}
                  className="orbit-item"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(min(5.5rem, 16vw))`,
                  }}
                >
                  <motion.div
                    animate={reduce ? undefined : { rotateY: -360 }}
                    transition={orbitTransition}
                    className="glass-panel rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-300 shadow-[0_0_24px_rgba(57,255,20,0.08)] sm:text-xs"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                  >
                    {tag}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-[12%] left-[4%] z-[1] hidden xl:block"
        style={{ perspective: 900 }}
        aria-hidden
      >
        <motion.div
          className="relative h-[120px] w-[200px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={reduce ? undefined : { rotateY: [-6, 2, -6], rotateX: [2, -4, 2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="glass-panel absolute inset-0 rounded-2xl border border-[#39ff14]/20 opacity-50"
            style={{ transform: "translateZ(-28px) scale(0.92)" }}
          />
          <div
            className="glass-panel absolute inset-0 rounded-2xl border border-[#bf5fff]/25 opacity-70"
            style={{ transform: "translateZ(-14px) scale(0.96)" }}
          />
          <div
            className="glass-panel absolute inset-0 flex flex-col justify-end rounded-2xl border border-[#00f5d4]/30 p-4 shadow-[0_0_40px_rgba(0,245,212,0.06)]"
            style={{ transform: "translateZ(0)" }}
          >
            <span className="font-mono text-[10px] text-zinc-500">layer stack</span>
            <span className="mt-1 font-mono text-xs text-[#39ff14]/90">UI · motion · 3D</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
