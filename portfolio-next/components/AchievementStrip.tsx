"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Achievement } from "@/lib/data";
import { getStaggerContainer, getStaggerItem } from "@/components/motion/stagger-variants";
import { revealEase } from "@/lib/motion-presets";
import { AchievementDetailModal } from "./project/AchievementDetailModal";

function AchievementThumb({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="flex h-full min-h-[140px] w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-xs text-zinc-500">
        Image
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

const MARQUEE_PX_PER_SEC = 48;

export function AchievementStrip({
  title,
  items,
}: {
  title: string;
  items: Achievement[];
}) {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [mounted, setMounted] = useState(false);

  const stripInView = useInView(stripRef, { amount: 0.12, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (reduce || items.length === 0) return;
    const el = scrollerRef.current;
    if (!el) return;

    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!pausedRef.current) {
        el.scrollLeft += MARQUEE_PX_PER_SEC * dt;
        const half = el.scrollWidth / 2;
        if (half > 1 && el.scrollLeft >= half - 0.5) {
          el.scrollLeft -= half;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduce, items.length]);

  const loopItems = items.length === 0 ? [] : reduce ? items : [...items, ...items];

  const headVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.62, ease: revealEase },
        },
      };

  const cardContainer = getStaggerContainer(0.08, 0.1, !!reduce);
  const cardItem = getStaggerItem(!!reduce);

  return (
    <div
      ref={stripRef}
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
    >
      <motion.h3
        initial="hidden"
        animate={stripInView ? "visible" : "hidden"}
        variants={headVariants}
        className="mb-6 px-4 text-center text-xl font-semibold md:text-left md:px-0"
      >
        {(() => {
          const parts = title.split(" & ");
          if (parts.length > 1) {
            return (
              <>
                <span className="text-gradient">{parts[0]}</span>
                <span className="text-zinc-500"> & </span>
                <span className="text-zinc-300">{parts.slice(1).join(" & ")}</span>
              </>
            );
          }
          return <span className="text-gradient">{title}</span>;
        })()}
      </motion.h3>
      <motion.div
        ref={scrollerRef}
        className="carousel-scroll flex gap-4 overflow-x-auto px-4 pb-4 md:px-0"
        style={{ scrollBehavior: "auto" }}
        initial="hidden"
        animate={stripInView ? "visible" : "hidden"}
        variants={cardContainer}
      >
        {loopItems.map((a, i) => (
          <motion.article
            key={`${a.id}-${i}`}
            data-achievement-card
            variants={cardItem}
            whileHover={
              reduce
                ? { y: -4 }
                : { y: -8, rotateY: -3, rotateX: 3, transition: { type: "spring", stiffness: 320, damping: 22 } }
            }
            style={{ transformStyle: "preserve-3d" }}
            className="group relative flex w-[min(88vw,340px)] flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md transition-[box-shadow] duration-300 hover:border-[#39ff14]/25 hover:shadow-[0_24px_56px_-12px_rgba(57,255,20,0.12)]"
            onClick={() => setSelected(a)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected(a);
              }
            }}
          >
            <div className="pointer-events-none absolute inset-x-5 top-0 z-10 h-px rounded-full bg-gradient-to-r from-transparent via-[#00f5d4]/60 to-transparent" />
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-900 card-media-shine">
              <AchievementThumb src={a.thumbnail} alt={a.name} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#39ff14]/5 to-[#bf5fff]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h4 className="text-base font-semibold text-white">{a.name}</h4>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#00f5d4]/80">
                {a.platform}
              </p>
              <p className="mt-2 text-xs text-zinc-500">{a.year}</p>
              <p className="mt-3 line-clamp-2 text-sm leading-snug text-zinc-400">{a.hook}</p>
              <span className="mt-4 text-xs font-medium text-[#39ff14] transition group-hover:gap-2">
                Details →
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {mounted
        ? createPortal(
            <AnimatePresence mode="wait">
              {selected ? (
                <AchievementDetailModal key={selected.id} item={selected} onClose={() => setSelected(null)} />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
