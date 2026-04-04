/** Shared easing — smooth ease-out feel */
export const revealEase = [0.22, 1, 0.36, 1] as const;

export const revealDuration = 0.65;

export const revealTransition = {
  duration: revealDuration,
  ease: revealEase,
} as const;
