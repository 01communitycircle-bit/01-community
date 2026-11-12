"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENTOR_STACKS = [
  {
    id: "tech-ai",
    src: "/images/mentor-tech.jpg",
    title: "AI & Tech Architecture",
  },
  {
    id: "private-jet",
    src: "/images/mentor-jet.jpg",
    title: "Global Freelance & High-Ticket Deals",
  },
];

export default function HeroBackgroundStacks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MENTOR_STACKS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const current = MENTOR_STACKS[currentIndex];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      
      {/* Background Image Layer with Clean Soft Fade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.12,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: "easeInOut" }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.title}
            className="w-full h-full object-cover object-center filter grayscale brightness-110"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Clean White Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-emerald-50/20 to-white pointer-events-none" />
      
      {/* Radial Soft Emerald Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[250px] sm:h-[350px] bg-emerald-400/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Subtle Light Grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
        }}
      />

    </div>
  );
}
