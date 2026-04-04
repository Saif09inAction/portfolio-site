"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  achievements,
  developerOverview,
  developerTags,
  projects,
  siteImages,
} from "@/lib/data";
import { getFadeUpChild } from "@/lib/reveal-variants";
import { AchievementStrip } from "./AchievementStrip";
import { CodeTerminal } from "./CodeTerminal";
import { ProjectGrid } from "./project/ProjectGrid";

const devProjects = projects.filter((p) => p.type === "developer");
const devAchievements = achievements.filter((a) => a.type === "developer");

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
} as const;

export function SectionDeveloper() {
  const reduce = useReducedMotion();
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { amount: 0.12, margin: "0px 0px -14% 0px" });
  const child = getFadeUpChild(!!reduce);

  return (
    <section
      id="developer"
      className="section-mesh-bg relative border-t border-white/5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          ref={introRef}
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.h2 variants={child} className="text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl">
            <span className="text-gradient">Developer</span>
          </motion.h2>
          <motion.p
            variants={child}
            className="mx-auto mt-6 max-w-3xl text-center text-lg leading-snug text-zinc-300 md:mx-0 md:text-left"
          >
            {developerOverview}
          </motion.p>
          <motion.div variants={child} className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            {developerTags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/[0.06] px-3 py-1 text-xs font-medium text-zinc-200"
              >
                {t}
              </span>
            ))}
          </motion.div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <motion.div variants={child} className="relative">
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#39ff14]/10 via-transparent to-[#bf5fff]/10 blur-2xl" />
              <div className="relative aspect-[16/10] max-h-[min(380px,55vw)] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteImages.developerAtWork}
                  alt={siteImages.developerAtWorkAlt}
                  className="h-full w-full object-cover object-[center_20%]"
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
            <CodeTerminal inView={introInView} />
          </div>
        </motion.div>

        <div className="mt-16">
          <ProjectGrid title="Discover my work" projects={devProjects} />
        </div>

        <div className="mt-24">
          <AchievementStrip title="Achievements & hackathons" items={devAchievements} />
        </div>
      </div>
    </section>
  );
}
