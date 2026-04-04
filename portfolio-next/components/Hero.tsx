"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { hero, siteImages } from "@/lib/data";
import { HeroBackground } from "./HeroBackground";
import { HeroDevShowcase } from "./HeroDevShowcase";
import { MagneticButton } from "./ui/MagneticButton";

function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 28, rotateX: -35 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.045,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block [transform-origin:center_bottom]"
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 32]);
  const parallaxImg = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -22]);
  const parallaxBg = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 56]);

  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const onMove = (e: MouseEvent) => {
      const r = rect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotateY.set(px * 10);
      rotateX.set(-py * 8);
    };
    const reset = () => {
      rotateX.set(0);
      rotateY.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [rotateX, rotateY]);

  const glowOpacity = useTransform(rotateX, [-8, 8], [0.45, 0.95]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-y-visible pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: parallaxBg }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(57,255,20,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(191,95,255,0.08),transparent),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(0,245,212,0.06),transparent)]" />
        <HeroBackground />
      </motion.div>
      <HeroDevShowcase />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-8 overflow-visible px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-center lg:gap-8 lg:px-8 xl:gap-10">
        <motion.div
          className="order-1 min-w-0 text-center lg:py-6 lg:text-left"
          style={{ perspective: "1400px", y: parallaxText }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#39ff14]/90 sm:text-xs">
              {hero.eyebrow}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:inline" aria-hidden />
            <span className="text-[11px] text-zinc-500 sm:text-xs">{hero.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {hero.badges.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 380, damping: 24 }}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
                className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/[0.07] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-200 shadow-[0_0_20px_rgba(57,255,20,0.08)] backdrop-blur-sm"
              >
                {b}
              </motion.span>
            ))}
          </motion.div>

          <h1 className="font-semibold leading-[1.08] tracking-tight">
            <span className="headline-glow block text-[clamp(1.65rem,4.5vw,3.15rem)] text-white">
              {reduceMotion ? (
                hero.headline
              ) : (
                <WordReveal text={hero.headline} delay={0.25} />
              )}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.95, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 block bg-gradient-to-r from-[#00f5d4] via-[#39ff14] to-[#bf5fff] bg-clip-text text-2xl text-transparent sm:text-3xl md:text-4xl"
            >
              {hero.role}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <MagneticButton
              href="#developer"
              className="rounded-full bg-gradient-to-r from-[#39ff14]/25 to-[#00f5d4]/20 px-8 py-3 text-sm font-semibold text-white ring-1 ring-[#39ff14]/40 transition hover:glow-green"
            >
              View work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="rounded-full glass-panel px-8 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
            >
              Contact
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          ref={portraitRef}
          className="relative order-2 flex min-h-[min(48vh,440px)] w-full items-end justify-center lg:min-h-[min(80vh,720px)] lg:justify-end lg:pl-2 lg:pr-0
            lg:-mr-[max(1rem,calc((100vw-1280px)/2+2rem))] lg:w-[calc(100%+max(0rem,calc((100vw-1280px)/2+2rem)))]"
          style={{
            y: parallaxImg,
            transformStyle: "preserve-3d",
            perspective: 1200,
          }}
        >
          <motion.div
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute bottom-[8%] left-[8%] right-0 top-[18%] rounded-[40%] bg-gradient-to-br from-[#39ff14]/22 via-[#bf5fff]/18 to-[#00f5d4]/12 blur-3xl"
          />
          <motion.div
            className="relative ml-auto w-full max-w-[min(100%,440px)] sm:max-w-[480px] lg:mr-0 lg:max-w-[min(640px,calc(52vw+max(0px,calc((100vw-1280px)/2))))] xl:max-w-[min(700px,calc(54vw+max(0px,calc((100vw-1280px)/2))))]"
            initial={{ scale: reduceMotion ? 1 : 0.94 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteImages.heroPortrait}
              alt={siteImages.heroAlt}
              className="avatar-float h-auto w-full object-contain object-right-bottom drop-shadow-[0_0_56px_rgba(57,255,20,0.18)]"
              width={900}
              height={1200}
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
