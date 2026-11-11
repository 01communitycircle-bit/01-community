"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Video,
  PenTool,
  TrendingUp,
  MessageCircle,
  PhoneCall,
  Sparkles,
  Layers,
  Zap,
  CheckCircle2
} from "lucide-react";
import { LIFETIME_VIP_PRICE, LIFETIME_PRO_PRICE } from "../lib/constants";

export default function FloatingCreatorIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center select-none pointer-events-auto">
      
      {/* Dynamic Crimson & Obsidian Fluid Blob Background */}
      <motion.div
        animate={{
          scale: [1, 1.05, 0.98, 1],
          rotate: [0, 4, -3, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[82%] h-[82%] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gradient-to-tr from-red-950/70 via-red-900/30 to-black border border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.25)] blur-[1px]"
      />

      {/* Ambient Pulsing Backlight */}
      <div className="absolute w-64 h-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none animate-pulse-slow" />

      {/* SVG Vector Creator Character */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-[68%] h-[68%] flex items-center justify-center"
      >
        <svg
          viewBox="0 0 360 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle Cyber Grid Lines inside blob */}
          <path d="M60 120 Q180 140 300 120" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M40 220 Q180 250 320 220" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* Creator Body Silhouette & Clothing */}
          {/* Legs & Shoes */}
          <path d="M150 260 L140 325 L125 345 L155 352 L165 330 L170 265 Z" fill="#0d0d12" stroke="#ef4444" strokeWidth="2" />
          <path d="M195 260 L205 315 L225 335 L200 345 L185 320 L180 265 Z" fill="#0d0d12" stroke="#ef4444" strokeWidth="2" />
          
          {/* Sneaker Highlights */}
          <rect x="120" y="340" width="38" height="12" rx="6" fill="#dc2626" />
          <rect x="195" y="333" width="36" height="12" rx="6" fill="#dc2626" />
          <circle cx="132" cy="346" r="2" fill="#ffffff" />
          <circle cx="210" cy="339" r="2" fill="#ffffff" />

          {/* Torso & Stylish Crimson Tech Hoodie */}
          <path
            d="M135 150 C135 150 115 175 110 220 C108 235 125 265 145 265 L200 265 C220 265 238 235 235 220 C230 175 210 150 210 150 Z"
            fill="url(#hoodieGradient)"
            stroke="#f87171"
            strokeWidth="2"
          />
          {/* Hoodie Pocket / Zipper */}
          <path d="M172 165 L172 260" stroke="#fca5a5" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M135 220 L160 250 L185 250 L210 220" stroke="#ef4444" strokeWidth="2" fill="none" />

          {/* Arms holding Smartphone / Tablet */}
          <path d="M112 185 L145 220 L160 210 L135 175 Z" fill="#13131a" stroke="#ef4444" strokeWidth="1.5" />
          <path d="M233 185 L200 220 L185 210 L210 175 Z" fill="#13131a" stroke="#ef4444" strokeWidth="1.5" />

          {/* Hands */}
          <circle cx="158" cy="216" r="9" fill="#fbcfe8" />
          <circle cx="187" cy="216" r="9" fill="#fbcfe8" />

          {/* Glowing Smartphone in hands */}
          <rect x="150" y="195" width="45" height="26" rx="4" fill="#000000" stroke="#ef4444" strokeWidth="2" />
          <rect x="154" y="199" width="37" height="18" rx="2" fill="#ef4444" fillOpacity="0.8" />
          {/* Screen glow icon */}
          <circle cx="172" cy="208" r="4" fill="#ffffff" />

          {/* Head & Neck */}
          <path d="M165 135 L165 155 L180 155 L180 135 Z" fill="#fbcfe8" />
          <circle cx="172" cy="118" r="28" fill="#fbcfe8" stroke="#ef4444" strokeWidth="2" />

          {/* Modern Stylish Haircut */}
          <path
            d="M148 112 C145 90 165 80 185 82 C202 84 205 98 202 110 C195 95 180 92 165 96 C155 98 150 106 148 112 Z"
            fill="#09090d"
          />

          {/* Glasses & Face Details */}
          <circle cx="163" cy="116" r="7" fill="none" stroke="#000000" strokeWidth="2" />
          <circle cx="181" cy="116" r="7" fill="none" stroke="#000000" strokeWidth="2" />
          <path d="M170 116 L174 116" stroke="#000000" strokeWidth="2" />
          <path d="M168 127 Q172 131 176 127" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="hoodieGradient" x1="120" y1="150" x2="220" y2="265" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#1f0a0e" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ==========================================================
          ORBITING FLOATING SKILL BADGES (INTERACTIVE & GLOWING)
          ========================================================== */}

      {/* Orbit 1: Top-Right -> Video Editing Payout Pill */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [4, -4, 4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
        className="absolute -top-2 right-0 sm:right-4 z-20 p-2.5 sm:p-3 rounded-2xl bg-black/90 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.35)] backdrop-blur-md flex items-center gap-2.5 hover:scale-105 transition-transform"
      >
        <div className="w-8 h-8 rounded-xl bg-red-950 flex items-center justify-center text-red-400 border border-red-500/40">
          <Video className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Video Editing
          </span>
          <span className="text-xs sm:text-sm font-black text-white font-mono flex items-center gap-1">
            <span>₹24,000</span>
            <span className="text-[10px] font-sans text-emerald-400 font-bold">/ retainer</span>
          </span>
        </div>
      </motion.div>

      {/* Orbit 2: Top-Left -> Code & App Dev Badge */}
      <motion.div
        animate={{
          y: [6, -7, 6],
          x: [-3, 3, -3],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
        className="absolute top-8 -left-2 sm:left-2 z-20 p-2.5 sm:p-3 rounded-2xl bg-black/90 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.35)] backdrop-blur-md flex items-center gap-2.5 hover:scale-105 transition-transform"
      >
        <div className="w-8 h-8 rounded-xl bg-red-950 flex items-center justify-center text-red-400 border border-red-500/40">
          <Code2 className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Full-Stack Next.js
          </span>
          <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
            <span className="text-red-400">&lt;/&gt;</span> Production MVP
          </span>
        </div>
      </motion.div>

      {/* Orbit 3: Middle-Right -> High-CTR Thumbnails */}
      <motion.div
        animate={{
          y: [-5, 7, -5],
          x: [5, -3, 5],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2
        }}
        className="absolute top-1/2 -right-4 sm:-right-2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-2xl bg-black/90 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.25)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <div className="w-7 h-7 rounded-lg bg-red-950/80 flex items-center justify-center text-red-400 border border-red-500/30">
          <PenTool className="w-3.5 h-3.5 text-red-400" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            CTR Packaging
          </span>
          <span className="text-xs font-black text-red-400 font-mono">
            15.8% CTR
          </span>
        </div>
      </motion.div>

      {/* Orbit 4: Bottom-Left -> Founder 1-on-1 Call Hotline Pill */}
      <motion.div
        animate={{
          y: [7, -6, 7],
          x: [-4, 4, -4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-6 -left-3 sm:left-4 z-20 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-red-950 via-black to-black border border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.45)] backdrop-blur-md flex items-center gap-2.5 hover:scale-105 transition-transform"
      >
        <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
          <PhoneCall className="w-4 h-4 text-white animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            VIP Plan (₹{LIFETIME_VIP_PRICE})
          </span>
          <span className="text-xs font-black text-white block">
            Direct 1-on-1 Calls
          </span>
        </div>
      </motion.div>

      {/* Orbit 5: Bottom-Right -> WhatsApp Guild Active */}
      <motion.div
        animate={{
          y: [-7, 6, -7],
          x: [3, -5, 3],
        }}
        transition={{
          duration: 4.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
        className="absolute -bottom-2 right-2 sm:right-8 z-20 p-2 sm:p-2.5 rounded-2xl bg-black/90 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.3)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-500/40">
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            WhatsApp Guild
          </span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Active Circles</span>
          </span>
        </div>
      </motion.div>

    </div>
  );
}
