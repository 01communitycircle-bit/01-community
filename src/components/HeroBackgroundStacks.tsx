"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENTOR_STACKS = [
  {
    id: "tech-ai",
    src: "/images/mentor-tech.jpg",
    title: "AI & Tech Architecture",
    subtitle: "Founder & Lead Architect",
  },
  {
    id: "private-jet",
    src: "/images/mentor-jet.jpg",
    title: "Global Freelance & High-Ticket Deals",
    subtitle: "Direct 1-on-1 Guidance",
  },
];

export default function HeroBackgroundStacks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MENTOR_STACKS.length);
    }, 5000); // exactly every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const current = MENTOR_STACKS[currentIndex];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      
      {/* Dynamic Image Stacks Layer with 5-Second Animated Transitions */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: 0.18,
            scale: 1.0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: { duration: 1.0, ease: "easeInOut" }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.title}
            className="w-full h-full object-cover object-center filter grayscale brightness-110 contrast-95"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Clean White Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-emerald-50/30 to-white pointer-events-none" />
      
      {/* Radial Soft Emerald Glow Core */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Futuristic Subtle Grid Overlay in Light Emerald */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
        }}
      />

      {/* Live 5-Second Stack Progress Bars (Top Right Floating Badge) */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 flex items-center gap-2 pointer-events-auto bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-700">
          STACK {currentIndex + 1}/2
        </span>
        <div className="flex gap-1.5 ml-1">
          {MENTOR_STACKS.map((stack, idx) => (
            <div
              key={stack.id}
              onClick={() => setCurrentIndex(idx)}
              className="w-8 h-1 rounded-full bg-slate-200 overflow-hidden cursor-pointer relative"
              title={stack.title}
            >
              {idx === currentIndex && (
                <motion.div
                  key={`progress-${idx}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-emerald-500 rounded-full shadow-xs"
                />
              )}
              {idx < currentIndex && (
                <div className="w-full h-full bg-emerald-600 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
