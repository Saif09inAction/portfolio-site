import { revealEase, revealDuration } from "@/lib/motion-presets";

/** Parent: only orchestrates stagger; children carry motion. */
export function getStaggerContainer(staggerChildren: number, delayChildren: number, reduce: boolean) {
  if (reduce) {
    return {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.04, delayChildren: delayChildren * 0.4 },
      },
    };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

export function getStaggerItem(reduce: boolean) {
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: revealDuration, ease: revealEase },
    },
  };
}
