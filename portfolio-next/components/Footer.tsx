"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, margin: "0px 0px -5% 0px" });

  return (
    <footer className="relative border-t border-white/5 py-12 text-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/25 to-transparent" />
        <p className="font-mono text-xs text-zinc-600">
          <span className="text-zinc-500">© {new Date().getFullYear()}</span>{" "}
          <span className="text-zinc-400">Saif Salmani</span>
          <span className="text-zinc-600"> — built with Next.js · Motion · Three.js</span>
        </p>
      </motion.div>
    </footer>
  );
}
