"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import { isReelProject } from "@/lib/project-display";

export function ProjectThumb({
  src,
  alt,
  fit = "cover",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-xs text-zinc-500">
        Preview
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
      onError={() => setBroken(true)}
      loading="lazy"
      decoding="async"
    />
  );
}

type MediaProps = {
  project: Project;
  alt: string;
  /** When true, 9:16 safe — letterboxed instead of cropped. */
  reel?: boolean;
};

export function ProjectMedia({ project, alt, reel }: MediaProps) {
  const isReel = reel ?? isReelProject(project);
  const fit = isReel ? "contain" : "cover";
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  if (project.videoSrc) {
    return (
      <video
        className={`absolute inset-0 h-full w-full ${fitClass} bg-black`}
        src={project.videoSrc}
        poster={project.thumbnail || undefined}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={alt}
      />
    );
  }
  return <ProjectThumb src={project.thumbnail} alt={alt} fit={fit} />;
}
