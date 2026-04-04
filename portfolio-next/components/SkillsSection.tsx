"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  developerSkillCategories,
  editorSkillCategories,
} from "@/lib/data";
import { revealEase, revealDuration } from "@/lib/motion-presets";

function SkillCloud({
  title,
  categories,
  inView,
  categoryOffset,
}: {
  title: string;
  categories: typeof developerSkillCategories;
  inView: boolean;
  categoryOffset: number;
}) {
  const reduce = useReducedMotion();

  const catItem = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 22, scale: 0.97, filter: "blur(8px)" },
    visible: (delay: number) =>
      reduce
        ? { opacity: 1, transition: { duration: 0.35 } }
        : {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { delay, duration: revealDuration, ease: revealEase },
          },
  };

  return (
    <div>
      <h3 className="mb-6 text-center text-2xl font-bold text-zinc-200 md:text-left">{title}</h3>
      <div className="space-y-6">
        {categories.map((cat, ci) => {
          const baseDelay = categoryOffset + ci * 0.12;
          return (
            <motion.div
              key={cat.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={catItem}
              custom={baseDelay}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)]"
            >
              <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#39ff14]/8 blur-3xl" />
              <h4 className="relative text-sm font-semibold uppercase tracking-wider text-zinc-500">
                {cat.title}
              </h4>
              <div className="relative mt-4 flex flex-wrap gap-2">
                {cat.tags.map((tag, j) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.92 }
                    }
                    transition={{
                      delay: reduce ? 0 : baseDelay + 0.08 + j * 0.035,
                      duration: 0.4,
                      ease: revealEase,
                    }}
                    whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
                    className="cursor-default rounded-full border border-[#39ff14]/20 bg-[#39ff14]/[0.07] px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-[0_0_24px_rgba(57,255,20,0.06)] transition-colors hover:border-[#bf5fff]/35 hover:text-white"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.1, margin: "0px 0px -12% 0px" });

  const headVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
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
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: revealEase, delay: 0.08 } },
      };

  const devCount = developerSkillCategories.length;

  return (
    <section id="skills" className="border-t border-white/5 py-24 md:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headVariants}
          className="text-center text-4xl font-bold md:text-5xl"
        >
          <span className="text-gradient">Skills</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={subVariants}
          className="mx-auto mt-4 max-w-xl text-center text-sm text-zinc-500"
        >
          Stack clusters — tap-worthy chips, no filler bars.
        </motion.p>
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-12">
          <SkillCloud
            title="Developer"
            categories={developerSkillCategories}
            inView={inView}
            categoryOffset={0}
          />
          <SkillCloud
            title="Video & design"
            categories={editorSkillCategories}
            inView={inView}
            categoryOffset={devCount * 0.12 + 0.06}
          />
        </div>
      </div>
    </section>
  );
}
