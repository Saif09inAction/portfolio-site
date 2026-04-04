"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Project } from "@/lib/data";
import { isReelProject } from "@/lib/project-display";
import { ProjectMedia } from "./project-media";

const TAG_THEMES = [
  "border-[#00f5d4]/35 bg-[#00f5d4]/[0.08] text-[#7ffbf0]",
  "border-[#39ff14]/35 bg-[#39ff14]/[0.08] text-[#b8ff9e]",
  "border-[#bf5fff]/35 bg-[#bf5fff]/[0.08] text-[#e4c4ff]",
  "border-amber-400/35 bg-amber-400/[0.08] text-amber-100/90",
] as const;

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const reel = isReelProject(project);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sMx = useSpring(mx, { stiffness: 280, damping: 24 });
  const sMy = useSpring(my, { stiffness: 280, damping: 24 });
  const rotateX = useTransform(sMy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sMx, [-0.5, 0.5], [-9, 9]);

  const filePath = useMemo(() => {
    const ext = project.type === "developer" ? "tsx" : "prproj";
    return `~/src/projects/${project.id}.${ext}`;
  }, [project.id, project.type]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      data-proj-card
      style={{ perspective: 1100, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ z: 20 }}
      className="group relative w-full cursor-pointer"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#06060a] shadow-[0_24px_56px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md transition-[border-color,box-shadow] duration-300
          before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:p-px before:opacity-0 before:transition-opacity before:duration-300
          before:bg-[linear-gradient(135deg,rgba(57,255,20,0.5),rgba(0,245,212,0.25),rgba(191,95,255,0.45))]
          before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:xor] before:[-webkit-mask-composite:xor]
          group-hover:border-[#39ff14]/20 group-hover:shadow-[0_28px_72px_-18px_rgba(57,255,20,0.18),0_0_0_1px_rgba(57,255,20,0.08)]
          group-hover:before:opacity-100"
      >
        {/* IDE title bar */}
        <div className="relative z-[5] flex items-center gap-2 border-b border-white/[0.08] bg-[#0a0a10] px-3 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#ff5f56]/90 ring-1 ring-black/20" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/90 ring-1 ring-black/20" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/90 ring-1 ring-black/20" />
          </div>
          <div className="min-w-0 flex-1 font-mono text-[10px] leading-none tracking-wide text-zinc-500 sm:text-[11px]">
            <span className="text-zinc-600">const </span>
            <span className="text-[#bf5fff]/90">preview</span>
            <span className="text-zinc-600"> = </span>
            <span className="truncate text-[#00f5d4]/85">&apos;{filePath}&apos;</span>
          </div>
          <span
            className="hidden shrink-0 font-mono text-[10px] text-zinc-600 sm:inline"
            aria-hidden
          >
            UTF-8
          </span>
        </div>

        <div
          className={`relative overflow-hidden bg-zinc-950 card-media-shine ${
            reel
              ? "flex justify-center px-3 py-4 sm:px-6"
              : ""
          }`}
        >
          <div
            className={`relative w-full overflow-hidden ${
              reel
                ? "aspect-[9/16] max-h-[min(72vh,720px)] max-w-[min(100%,380px)] sm:max-w-[420px]"
                : "aspect-[4/3]"
            }`}
          >
            {/* Code grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
              style={{
                backgroundImage: `
                linear-gradient(rgba(57, 255, 20, 0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 212, 0.2) 1px, transparent 1px)
              `,
                backgroundSize: "18px 18px",
              }}
              aria-hidden
            />
            {!reduceMotion ? <div className="project-card-scanline" aria-hidden /> : null}

            <ProjectMedia project={project} alt={project.title} reel={reel} />

            <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#030306]/95 via-[#030306]/35 to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-br from-[#39ff14]/[0.07] via-transparent to-[#bf5fff]/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Corner brackets */}
            <div
              className="pointer-events-none absolute left-2 top-2 z-[4] font-mono text-[10px] leading-none text-[#39ff14]/50"
              aria-hidden
            >
              {"<Preview>"}
            </div>
            <div
              className="pointer-events-none absolute bottom-2 right-2 z-[4] font-mono text-[10px] leading-none text-[#00f5d4]/40"
              aria-hidden
            >
              {"</Preview>"}
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-[4]">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                {project.type === "developer" ? "module" : reel ? "reel · 9:16" : "timeline"}
              </p>
              <h3 className="mt-0.5 text-base font-semibold tracking-tight text-white drop-shadow-md sm:text-lg">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        {/* “Editor” body */}
        <div className="relative space-y-3 border-t border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,16,0.98)_0%,rgba(6,6,10,1)_100%)] p-4">
          <div className="absolute left-0 top-0 h-full w-8 select-none border-r border-white/[0.06] bg-black/20 font-mono text-[10px] leading-[1.65] text-zinc-600">
            <div className="px-2 pt-4 text-right">1</div>
            <div className="px-2 text-right">2</div>
            <div className="px-2 text-right">3</div>
          </div>
          <div className="pl-7">
            <p className="line-clamp-2 font-mono text-[12px] leading-relaxed text-zinc-400">
              <span className="text-zinc-600">// </span>
              {project.hook}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={tech}
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${TAG_THEMES[i % TAG_THEMES.length]}`}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 ? (
                <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                  +{project.technologies.length - 5}
                </span>
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-dashed border-white/[0.08] pt-3">
              <span className="font-mono text-[10px] text-zinc-600">
                <span className="text-[#39ff14]/70">$</span> npm run build
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[#39ff14] transition group-hover:gap-2.5">
                <span className="text-zinc-500">&gt;</span>
                <span className="text-[#00f5d4]/90">
                  {project.videoSrc ? "playReel()" : "openDetails()"}
                </span>
                <span
                  className="project-card-cursor inline-block h-3.5 w-[2px] translate-y-px bg-[#39ff14]"
                  aria-hidden
                />
                <span aria-hidden className="text-[#39ff14]">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
