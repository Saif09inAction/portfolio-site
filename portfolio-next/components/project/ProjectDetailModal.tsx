"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "@/lib/data";
import { isReelProject } from "@/lib/project-display";
import { ProjectThumb } from "./project-media";

const sectionTitle = "text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500";
const body = "text-[15px] leading-relaxed text-zinc-300";

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const d = project.detail;
  const overview = d?.overview ?? project.description;
  const reel = isReelProject(project);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      key={project.id}
      className="fixed inset-0 z-[280] flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        aria-label="Close project"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal
        aria-labelledby="project-modal-title"
        className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-[#06060a]/95 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(57,255,20,0.06)] min-h-0"
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/30 px-4 py-3 backdrop-blur-md">
          <span className="font-mono text-[10px] text-zinc-500">
            {project.type === "developer" ? "case-study.tsx" : "reel.md"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-zinc-200 transition hover:border-[#39ff14]/50 hover:bg-white/10"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div
          data-lenis-prevent
          className="modal-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
        >
          <div
            className={`relative w-full shrink-0 overflow-hidden bg-zinc-900 ${
              reel
                ? "mx-auto aspect-[9/16] max-h-[min(78vh,820px)] max-w-[min(100%,420px)]"
                : "aspect-[21/9] sm:aspect-video"
            }`}
          >
            {project.videoSrc ? (
              <video
                key={project.id}
                className={`h-full w-full bg-black ${reel ? "object-contain" : "object-cover"}`}
                src={project.videoSrc}
                poster={project.thumbnail || undefined}
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <ProjectThumb src={project.thumbnail} alt={project.title} fit={reel ? "contain" : "cover"} />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent" />
          </div>

          <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
            <header>
              <p className="text-xs font-medium uppercase tracking-widest text-[#00f5d4]/90">
                {project.type === "developer" ? "Development" : "Video & media"}
              </p>
              <h2 id="project-modal-title" className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{project.date}</p>
              <p className="mt-3 text-sm font-medium text-zinc-400">{project.hook}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#bf5fff]/25 bg-[#bf5fff]/10 px-2.5 py-0.5 text-[11px] text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </header>

            <section>
              <h3 className={sectionTitle}>Overview</h3>
              <p className={`mt-3 ${body}`}>{overview}</p>
            </section>

            {(d?.problem || d?.solution || d?.impact) && (
              <section className="grid gap-6 sm:grid-cols-3">
                {d?.problem ? (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <h3 className={`${sectionTitle} !text-[#ff6b9d]/90`}>Problem</h3>
                    <p className={`mt-2 text-sm ${body}`}>{d.problem}</p>
                  </div>
                ) : null}
                {d?.solution ? (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <h3 className={`${sectionTitle} !text-[#00f5d4]/90`}>Solution</h3>
                    <p className={`mt-2 text-sm ${body}`}>{d.solution}</p>
                  </div>
                ) : null}
                {d?.impact ? (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <h3 className={`${sectionTitle} !text-[#39ff14]/90`}>Impact</h3>
                    <p className={`mt-2 text-sm ${body}`}>{d.impact}</p>
                  </div>
                ) : null}
              </section>
            )}

            {d?.features && d.features.length > 0 ? (
              <section>
                <h3 className={sectionTitle}>Features</h3>
                <ul className="mt-3 space-y-2">
                  {d.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-zinc-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#39ff14]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {d?.myRole ? (
              <section>
                <h3 className={sectionTitle}>My role</h3>
                <p className={`mt-3 ${body}`}>{d.myRole}</p>
              </section>
            ) : null}

            <section>
              <h3 className={sectionTitle}>Tech</h3>
              {d?.techNotes ? (
                <p className={`mt-3 ${body}`}>{d.techNotes}</p>
              ) : (
                <p className={`mt-3 text-sm text-zinc-500`}>
                  Stack: {project.technologies.join(" · ")}
                </p>
              )}
            </section>

            <div className="flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
              {project.siteUrl ? (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-r from-[#39ff14]/28 to-[#00f5d4]/22 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-[#39ff14]/35 transition hover:glow-green"
                >
                  {project.type === "editor" ? "View reel" : "Live demo"}
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
