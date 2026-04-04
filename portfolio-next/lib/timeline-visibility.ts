"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

/** Window scroll direction — one listener per page section that provides context. */
export function useScrollDirection() {
  const [dir, setDir] = useState<"up" | "down">("down");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY.current) {
        setDir(y > lastY.current ? "down" : "up");
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return dir;
}

/**
 * Scroll down: stay visible after the row has passed above the viewport.
 * Scroll up: only visible while intersecting (re-hides when leaving view).
 */
export function useTimelineItemVisible(
  ref: RefObject<HTMLElement | null>,
  scrollDir: "up" | "down"
) {
  const inView = useInView(ref, { amount: 0.2, margin: "0px 0px -12% 0px" });
  const [pastTop, setPastTop] = useState(false);

  useEffect(() => {
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      setPastTop(el.getBoundingClientRect().bottom < 0);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [ref]);

  if (scrollDir === "down") {
    return inView || pastTop;
  }
  return inView;
}
