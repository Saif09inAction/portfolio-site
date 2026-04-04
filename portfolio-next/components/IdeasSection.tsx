"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ideas } from "@/lib/data";
import { getStaggerContainer, getStaggerItem } from "@/components/motion/stagger-variants";
import { revealEase } from "@/lib/motion-presets";

const statusStyle = {
  Idea: "border-violet-500/45 bg-violet-500/12 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.12)]",
  "In Progress":
    "border-amber-500/45 bg-amber-500/12 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  Built: "border-emerald-500/45 bg-emerald-500/12 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.12)]",
} as const;

export function IdeasSection() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.1, margin: "0px 0px -12% 0px" });

  const headVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.68, ease: revealEase },
        },
      };

  const subVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: revealEase, delay: 0.08 } },
      };

  const gridContainer = getStaggerContainer(0.09, 0.14, !!reduce);
  const gridItem = getStaggerItem(!!reduce);

  return (
    <section
      id="ideas"
      className="section-mesh-bg relative border-t border-white/5 py-24 md:py-32"
    >
      <div ref={wrapRef} className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headVariants}
          className="text-center text-4xl font-bold md:text-5xl"
        >
          <span className="text-gradient">Ideas</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={subVariants}
          className="mx-auto mt-4 max-w-xl text-center text-zinc-500"
        >
          {ideas.subtitle}
        </motion.p>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={gridContainer}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 [perspective:1600px]"
        >
          {ideas.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={gridItem}
              whileHover={
                reduce
                  ? { y: -4 }
                  : {
                      y: -10,
                      rotateX: -6,
                      rotateY: 4,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 320, damping: 20 },
                    }
              }
              style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-6 shadow-[0_24px_56px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#39ff14]/0 via-[#bf5fff]/70 to-[#00f5d4]/0 opacity-80" />
              <span className="absolute right-4 top-4 font-mono text-[10px] text-zinc-600 opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${statusStyle[card.status]}`}
              >
                {card.status}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{card.problem}</p>
              <div className="pointer-events-none absolute -bottom-6 left-1/2 h-20 w-[80%] -translate-x-1/2 rounded-full bg-[#bf5fff]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
