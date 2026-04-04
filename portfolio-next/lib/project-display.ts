import type { Project } from "@/lib/data";

/** Reel / portrait (9:16) vs landscape preview — avoids cropping vertical social videos. */
export function isReelProject(project: Project): boolean {
  if (project.mediaAspect === "reel") return true;
  if (project.mediaAspect === "landscape") return false;
  return Boolean(project.videoSrc && project.type === "editor");
}
