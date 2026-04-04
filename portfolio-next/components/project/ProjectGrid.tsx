"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/data";
import { getStaggerContainer, getStaggerItem } from "@/components/motion/stagger-variants";
import { revealEase } from "@/lib/motion-presets";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ProjectCard } from "./ProjectCard";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  projects: Project[];
};

function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {project ? <ProjectDetailModal key={project.id} project={project} onClose={onClose} /> : null}
    </AnimatePresence>,
    document.body
  );
}

const STAGGER = 0.12;
const HEAD_DELAY = 0.12;

export function ProjectGrid({ id, title, subtitle, projects }: Props) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { amount: 0.2, margin: "0px 0px -12% 0px" });
  const listInView = useInView(listRef, { amount: 0.06, margin: "0px 0px -8% 0px" });

  const headerVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: revealEase },
        },
      };

  const subVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: revealEase, delay: HEAD_DELAY },
        },
      };

  const containerVariants = getStaggerContainer(STAGGER, 0.08, !!reduce);
  const itemVariants = getStaggerItem(!!reduce);

  return (
    <div id={id} className="relative">
      <div ref={headerRef} className="mb-8 px-4 text-center md:px-8 md:text-left">
        <motion.h2
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-3xl font-bold tracking-tight md:text-5xl"
        >
          <span className="text-gradient">{title}</span>
        </motion.h2>
        {subtitle ? (
          <motion.p
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={subVariants}
            className="mt-3 max-w-2xl text-zinc-500"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>

      {/* Single row — scroll horizontally (left ↔ right) */}
      <div className="w-full">
        <motion.div
          ref={listRef}
          className="carousel-scroll flex flex-row flex-nowrap gap-5 overflow-x-auto overflow-y-hidden pb-4 pt-1 [-webkit-overflow-scrolling:touch] snap-x snap-proximity scroll-pl-4 scroll-pr-4 md:gap-7 md:scroll-pl-8 md:scroll-pr-8"
          initial="hidden"
          animate={listInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              className="w-[min(88vw,420px)] min-w-[min(88vw,420px)] max-w-[420px] shrink-0 snap-start"
            >
              <ProjectCard project={p} onOpen={() => setSelected(p)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectOverlay project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
