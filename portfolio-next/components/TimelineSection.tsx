"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createContext, useContext, useRef } from "react";
import { about, achievements } from "@/lib/data";
import { revealEase } from "@/lib/motion-presets";
import { useScrollDirection, useTimelineItemVisible } from "@/lib/timeline-visibility";

const ScrollDirContext = createContext<"up" | "down">("down");

function TimelineRow({
  item,
  i,
}: {
  item: {
    id: string;
    year: string;
    title: string;
    body: string;
    kind: "experience" | "achievement";
  };
  i: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const scrollDir = useContext(ScrollDirContext);
  const visible = useTimelineItemVisible(ref, scrollDir);

  const variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -28 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { delay: i * 0.06, type: "spring" as const, stiffness: 200, damping: 24 },
        },
      };

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={variants}
      className="relative pl-10 md:pl-12"
    >
      <span
        className={`absolute left-0 top-4 z-10 flex h-3 w-3 rounded-full ring-2 ring-[#050508] transition-[box-shadow,transform] duration-500 md:top-5 md:h-3.5 md:w-3.5 ${
          item.kind === "achievement"
            ? "bg-[#bf5fff] shadow-[0_0_14px_rgba(191,95,255,0.55)]"
            : visible
              ? "bg-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.85),0_0_40px_rgba(57,255,20,0.35)]"
              : "timeline-node-pulse bg-[#39ff14]"
        }`}
      />
      <motion.div
        whileHover={reduce ? undefined : { x: 6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`rounded-2xl border p-5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors ${
          visible
            ? "border-[#39ff14]/20 bg-gradient-to-br from-[#39ff14]/[0.07] to-white/[0.03]"
            : "border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02]"
        }`}
      >
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            item.kind === "experience" ? "text-[#00f5d4]" : "text-[#bf5fff]"
          }`}
        >
          {item.year}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.body}</p>
      </motion.div>
    </motion.li>
  );
}

/** Internships + condensed achievement milestones for a vertical timeline. */
export function TimelineSection() {
  const devAchievements = achievements.filter((a) => a.type === "developer");
  const timelineItems = [
    ...about.internships.map((x, i) => ({
      id: `int-${i}`,
      year: x.period,
      title: x.title,
      body: x.body,
      kind: "experience" as const,
    })),
    ...devAchievements.slice(0, 6).map((a) => ({
      id: a.id,
      year: a.year,
      title: a.name,
      body: a.description,
      kind: "achievement" as const,
    })),
  ];

  const scrollDir = useScrollDirection();
  const railRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const railVisible = useTimelineItemVisible(railRef, scrollDir);
  const headVisible = useTimelineItemVisible(headRef, scrollDir);

  return (
    <ScrollDirContext.Provider value={scrollDir}>
      <section className="section-mesh-bg relative border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div ref={headRef}>
            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={
                headVisible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, filter: "blur(8px)" }
              }
              transition={{ duration: 0.65, ease: revealEase }}
              className="text-center text-4xl font-bold md:text-5xl"
            >
              <span className="text-gradient">Experience</span>
              <span className="text-zinc-500"> & </span>
              <span className="text-zinc-200">highlights</span>
            </motion.h2>
          </div>
          <div ref={railRef} className="relative mt-16">
            <div className="absolute bottom-2 left-[11px] top-2 w-px overflow-hidden md:left-[15px]">
              <div className="h-full w-full bg-gradient-to-b from-[#39ff14] via-[#bf5fff] to-[#00f5d4] opacity-60" />
              <motion.div
                className="absolute left-0 top-0 w-full bg-gradient-to-b from-white/40 to-transparent"
                initial={{ height: "0%" }}
                animate={railVisible ? { height: "100%" } : { height: "0%" }}
                transition={{ duration: 1.15, ease: revealEase }}
              />
            </div>
            <ul className="space-y-8">
              {timelineItems.map((item, i) => (
                <TimelineRow key={item.id} item={item} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ScrollDirContext.Provider>
  );
}
