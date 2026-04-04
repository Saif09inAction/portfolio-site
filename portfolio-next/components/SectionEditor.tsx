"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { editorOverview, editorTags, projects } from "@/lib/data";
import { getFadeUpChild } from "@/lib/reveal-variants";
import { ProjectGrid } from "./project/ProjectGrid";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
} as const;

export function SectionEditor() {
  const reduce = useReducedMotion();
  const editProjects = useMemo(() => projects.filter((p) => p.type === "editor"), []);
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { amount: 0.15, margin: "0px 0px -12% 0px" });
  const child = getFadeUpChild(!!reduce);

  return (
    <section
      id="editor"
      className="section-mesh-bg border-t border-white/5 bg-[#050508] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          ref={introRef}
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.h2
            variants={child}
            className="text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl"
          >
            Video <span className="text-gradient">Editor</span>
          </motion.h2>

          <div className="mx-auto mt-8 max-w-4xl md:mx-0">
            <motion.p variants={child} className="text-center text-lg text-zinc-300 md:text-left">
              {editorOverview}
            </motion.p>
            <motion.div
              variants={child}
              className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start"
            >
              {editorTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#bf5fff]/25 bg-[#bf5fff]/10 px-3 py-1 text-xs font-medium text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-14">
          <ProjectGrid title="Editing projects" projects={editProjects} />
        </div>
      </div>
    </section>
  );
}
