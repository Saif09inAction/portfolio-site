"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { revealEase, revealDuration } from "@/lib/motion-presets";

const lines = [
  { prefix: "saif@portfolio", cmd: " ~ ", rest: "npm run build" },
  { prefix: "", cmd: "", rest: "> next build" },
  { prefix: "", cmd: "", rest: "✓ Compiled successfully" },
  { prefix: "", cmd: "", rest: "○ Static prerender — /" },
  { prefix: "saif@portfolio", cmd: " ~ ", rest: "git push origin main" },
  { prefix: "", cmd: "", rest: "→ main · production ready" },
];

type Props = {
  /** When set, syncs reveal with parent section (e.g. developer intro block). */
  inView?: boolean;
};

export function CodeTerminal({ inView: inViewProp }: Props = {}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const selfInView = useInView(ref, { amount: 0.2, margin: "0px 0px -12% 0px" });
  const inView = inViewProp !== undefined ? inViewProp : selfInView;

  const shellVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: revealEase },
        },
      };

  const lineParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
  } as const;

  const lineChild = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -8 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: revealEase } },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={shellVariants}
      className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a10] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        <span className="ml-2 font-mono text-[10px] text-zinc-500">terminal — zsh</span>
      </div>
      <motion.div
        className="p-4 font-mono text-[11px] leading-relaxed sm:text-xs"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={lineParent}
      >
        {lines.map((line, i) => (
          <motion.div key={i} variants={lineChild} className="flex flex-wrap gap-x-1">
            {line.prefix ? (
              <span className="text-[#39ff14]/90">{line.prefix}</span>
            ) : null}
            {line.cmd ? <span className="text-[#bf5fff]/80">{line.cmd}</span> : null}
            <span
              className={
                line.rest.startsWith("✓")
                  ? "text-[#39ff14]/90"
                  : line.rest.startsWith("○")
                    ? "text-[#00f5d4]/85"
                    : line.rest.startsWith("→")
                      ? "text-zinc-400"
                      : "text-zinc-300"
              }
            >
              {line.rest}
            </span>
          </motion.div>
        ))}
        <motion.span
          className="mt-2 inline-block h-3 w-1.5 animate-pulse bg-[#39ff14]/80"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reduce ? 0 : 0.45, duration: revealDuration }}
          aria-hidden
        />
      </motion.div>
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#39ff14]/10 blur-3xl" />
    </motion.div>
  );
}
