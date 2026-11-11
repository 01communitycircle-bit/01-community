"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface InteractiveMascotButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  badge?: string;
}

export default function InteractiveMascotButton({
  children,
  onClick,
  className = "",
  badge
}: InteractiveMascotButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-between gap-3 px-7 py-4 rounded-full overflow-hidden transition-all duration-300 cursor-pointer select-none group border ${
        isHovered
          ? "bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white border-red-400 shadow-[0_0_35px_rgba(239,68,68,0.7)]"
          : "bg-[#0e0e14] text-white border-red-500/30 hover:border-red-500/60 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      } ${className}`}
    >
      {/* Background ambient sweep on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-transparent transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Button Content */}
      <div className="relative z-10 flex items-center gap-2.5 font-black text-xs sm:text-sm tracking-wide">
        <Sparkles className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "scale-110 text-white animate-spin-slow" : "text-red-400"}`} />
        <span>{children}</span>
        {badge && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase transition-colors ${
            isHovered
              ? "bg-black/40 text-white"
              : "bg-red-950 text-red-400 border border-red-500/40"
          }`}>
            {badge}
          </span>
        )}
      </div>

      <div className="relative z-10 flex items-center">
        <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isHovered ? "translate-x-1 text-white" : "text-slate-400"}`} />
      </div>

      {/* ==========================================================
          PEEKING ANIMATED CAT MASCOT (Inspired by User's Reference)
          ========================================================== */}
      <motion.div
        animate={{
          y: isHovered ? -2 : 14,
          x: isHovered ? -2 : 4,
          rotate: isHovered ? [0, -3, 3, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 22,
        }}
        className="absolute bottom-0 right-2 w-14 h-14 pointer-events-none select-none z-20"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Animated Tail */}
          <motion.path
            d="M50 56 C56 50 60 42 58 35 C56 30 52 32 53 36 C54 40 50 46 46 50"
            stroke="#121217"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: isHovered ? [0, 8, -6, 4, 0] : [0, 2, 0],
            }}
            transition={{
              duration: isHovered ? 1.2 : 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "50px 54px" }}
          />

          {/* Cat Body */}
          <ellipse cx="38" cy="54" rx="14" ry="12" fill="#121217" />
          {/* Chest White/Gray Fur */}
          <ellipse cx="38" cy="56" rx="7" ry="8" fill="#3f3f46" />

          {/* Cat Head */}
          <ellipse cx="36" cy="38" rx="12" ry="10" fill="#121217" />

          {/* Left Ear */}
          <polygon points="27,33 24,20 33,28" fill="#121217" />
          <polygon points="28,32 25,23 32,29" fill={isHovered ? "#ef4444" : "#27272a"} />

          {/* Right Ear */}
          <polygon points="39,28 48,20 45,33" fill="#121217" />
          <polygon points="40,29 47,23 44,32" fill={isHovered ? "#ef4444" : "#27272a"} />

          {/* Big Glowing Eyes */}
          {/* Left Eye */}
          <circle cx="31" cy="37" r="3.2" fill={isHovered ? "#fbbf24" : "#eab308"} />
          <circle cx="31" cy="37" r="1.5" fill="#000000" />
          <circle cx="30" cy="36" r="0.6" fill="#ffffff" />

          {/* Right Eye */}
          <circle cx="41" cy="37" r="3.2" fill={isHovered ? "#fbbf24" : "#eab308"} />
          <circle cx="41" cy="37" r="1.5" fill="#000000" />
          <circle cx="40" cy="36" r="0.6" fill="#ffffff" />

          {/* Cute Nose & Mouth */}
          <polygon points="35.5,41.5 36.5,41.5 36,42.5" fill={isHovered ? "#f87171" : "#71717a"} />
          <path d="M34 43.5 Q36 45 38 43.5" stroke="#71717a" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Whiskers */}
          <line x1="26" y1="41" x2="20" y2="40" stroke="#71717a" strokeWidth="0.8" />
          <line x1="26" y1="43" x2="20" y2="44" stroke="#71717a" strokeWidth="0.8" />
          <line x1="46" y1="41" x2="52" y2="40" stroke="#71717a" strokeWidth="0.8" />
          <line x1="46" y1="43" x2="52" y2="44" stroke="#71717a" strokeWidth="0.8" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
