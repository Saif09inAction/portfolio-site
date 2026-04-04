"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { contact } from "@/lib/data";
import { getStaggerContainer, getStaggerItem } from "@/components/motion/stagger-variants";
import { revealEase } from "@/lib/motion-presets";

const icons = {
  github: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  mail: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

export function ContactSection() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.15, margin: "0px 0px -12% 0px" });

  const headVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.96, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.68, ease: revealEase },
        },
      };

  const subVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.62, ease: revealEase, delay: 0.1 },
        },
      };

  const linkContainer = getStaggerContainer(0.08, 0.18, !!reduce);
  const linkItem = getStaggerItem(!!reduce);

  return (
    <section
      id="contact"
      className="section-mesh-bg relative border-t border-white/5 py-24 md:py-32"
    >
      <div ref={wrapRef} className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headVariants}
          className="text-4xl font-bold md:text-5xl"
        >
          <span className="text-gradient">Contact</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={subVariants}
          className="mt-4 text-zinc-500"
        >
          {contact.subtitle}
        </motion.p>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={linkContainer}
          className="mt-12 flex flex-wrap justify-center gap-4 [perspective:1000px]"
        >
          {contact.links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              variants={linkItem}
              whileHover={
                reduce
                  ? { scale: 1.04 }
                  : {
                      scale: 1.06,
                      rotateX: -8,
                      y: -4,
                      boxShadow: "0 20px 40px -12px rgba(57,255,20,0.2)",
                    }
              }
              whileTap={{ scale: 0.97 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/[0.1] bg-gradient-to-b from-white/[0.1] to-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-200 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:border-[#39ff14]/35 hover:text-white"
            >
              <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="text-[#39ff14] transition group-hover:text-[#00f5d4]">
                {icons[link.icon]}
              </span>
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
