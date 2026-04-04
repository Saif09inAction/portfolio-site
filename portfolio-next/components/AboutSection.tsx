"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { about, resumeUrl, siteImages } from "@/lib/data";
import { getFadeUpChild, getColumnReveal } from "@/lib/reveal-variants";
import { revealEase } from "@/lib/motion-presets";

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
} as const;

export function AboutSection() {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { amount: 0.12, margin: "0px 0px -12% 0px" });

  const leftV = getColumnReveal("left", !!reduce);
  const rightV = getColumnReveal("right", !!reduce);
  const childV = getFadeUpChild(!!reduce);

  const listItem = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 16 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: revealEase } },
      };

  return (
    <section
      id="about"
      className="section-mesh-bg relative border-t border-white/5 bg-[#050508] py-24 md:py-32"
    >
      <div ref={gridRef} className="mx-auto grid max-w-7xl gap-16 px-4 md:grid-cols-2 md:px-8 md:gap-20">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={leftV}
          className="relative [perspective:1400px]"
        >
          <motion.div
            className="glass-panel relative mx-auto w-full max-w-[min(100%,440px)] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.7)]"
            whileHover={reduce ? undefined : { rotateY: 4, rotateX: -3 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative flex w-full items-center justify-center overflow-hidden"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteImages.aboutPortrait}
                alt={siteImages.aboutAlt}
                className="h-auto w-full max-h-[min(85vh,720px)] object-contain object-center"
                width={800}
                height={1200}
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#050508]/85 via-transparent to-[#00f5d4]/5" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent" />
          </motion.div>
          <div className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full bg-[#39ff14]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[#bf5fff]/20 blur-3xl" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={rightV}
          className="space-y-8"
        >
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={listStagger}>
            <motion.h2 variants={childV} className="text-4xl font-bold md:text-5xl">
              <span className="text-gradient">About</span>
            </motion.h2>
            <motion.div variants={childV} className="flex flex-wrap gap-2">
              {about.focusTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={childV} className="text-lg leading-relaxed text-zinc-300">
                {p}
              </motion.p>
            ))}
            <motion.div
              variants={childV}
              whileHover={reduce ? undefined : { scale: 1.015, y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#00f5d4]/15 blur-2xl" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#00f5d4]">
                Education
              </h3>
              <h4 className="mt-3 text-xl font-semibold text-white">{about.education.title}</h4>
              <p className="mt-1 text-zinc-500">📍 {about.education.place}</p>
              <p className="mt-1 text-sm text-zinc-600">📅 {about.education.period}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{about.education.body}</p>
            </motion.div>
            <motion.div variants={childV}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Highlights
              </h3>
              <motion.ul
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={listStagger}
                className="mt-4 space-y-3"
              >
                {about.keyAchievements.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={listItem}
                    whileHover={reduce ? undefined : { x: 4 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-4 pr-3 text-sm text-zinc-300 shadow-sm transition-colors hover:border-[#39ff14]/25 hover:text-white"
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.a
              variants={childV}
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? { scale: 1.02 } : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#39ff14]/28 to-[#bf5fff]/22 px-8 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:ring-[#39ff14]/45 hover:shadow-[0_0_32px_rgba(57,255,20,0.15)]"
            >
              Download resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
