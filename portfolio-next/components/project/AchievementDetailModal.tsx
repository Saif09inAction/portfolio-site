"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { Achievement } from "@/lib/data";

export function AchievementDetailModal({
  item,
  onClose,
}: {
  item: Achievement;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[290] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/82 backdrop-blur-lg"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#07070c] p-6 shadow-2xl"
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-3 py-1 text-sm text-zinc-300 hover:bg-white/5"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <h2 className="mt-2 text-xl font-semibold text-white">{item.name}</h2>
        <p className="mt-1 text-sm text-[#00f5d4]/90">
          {item.platform} · {item.year}
        </p>
        {item.position ? (
          <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500">{item.position}</p>
        ) : null}
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">{item.description}</p>
        {item.linkedinUrl ? (
          <a
            href={item.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-medium text-[#bf5fff] hover:underline"
          >
            LinkedIn →
          </a>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
