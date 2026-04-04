import { revealEase, revealDuration } from "@/lib/motion-presets";

/** Slide columns — used when section leaves viewport (reset). */
export function getColumnReveal(axis: "left" | "right", reduce: boolean) {
  const x = axis === "left" ? -36 : 36;
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    };
  }
  return {
    hidden: { opacity: 0, x, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: revealEase },
    },
  };
}

export const fadeUpStaggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
} as const;

export function getFadeUpChild(reduce: boolean) {
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.35 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: revealDuration, ease: revealEase },
    },
  };
}
