"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Compass, Sparkles, Globe, ShieldCheck } from "lucide-react";

export default function JetLifestyleIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center select-none">
      
      {/* Background Soft Glow */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-red-950/40 via-red-900/20 to-black blur-2xl pointer-events-none" />

      {/* Main Vector Frame */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
        >
          {/* Subtle Outer Jet Interior Wall (Soft Obsidian & Gray) */}
          <path
            d="M60 40 C140 20 360 20 440 60 C470 120 480 280 440 340 C360 370 140 370 60 340 C20 280 20 120 60 40 Z"
            fill="#0a0a0f"
            stroke="rgba(239, 68, 68, 0.25)"
            strokeWidth="2"
          />

          {/* Airplane Window Frame (Oval with Perspective) */}
          <ellipse cx="170" cy="180" rx="90" ry="110" fill="#14141c" stroke="#262633" strokeWidth="6" />
          <ellipse cx="170" cy="180" rx="80" ry="100" fill="#0d1b2a" stroke="rgba(239,68,68,0.3)" strokeWidth="2" />

          {/* Sky Gradient inside Window */}
          <defs>
            <linearGradient id="skyGrad" x1="170" y1="80" x2="170" y2="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
            </linearGradient>
            <clipPath id="windowClip">
              <ellipse cx="170" cy="180" rx="78" ry="98" />
            </clipPath>
          </defs>

          {/* Sky & Drifting Clouds (Clipped to Window) */}
          <g clipPath="url(#windowClip)">
            <rect x="70" y="70" width="200" height="220" fill="url(#skyGrad)" />
            
            {/* Sun / Horizon Glow */}
            <circle cx="170" cy="200" r="35" fill="#f59e0b" fillOpacity="0.3" filter="blur(6px)" />

            {/* Drifting Clouds */}
            <motion.g
              animate={{ x: [-40, 40, -40] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="140" cy="160" rx="35" ry="12" fill="#ffffff" fillOpacity="0.25" />
              <ellipse cx="155" cy="155" rx="20" ry="14" fill="#ffffff" fillOpacity="0.25" />
              <ellipse cx="200" cy="210" rx="45" ry="14" fill="#ffffff" fillOpacity="0.3" />
              <ellipse cx="215" cy="205" rx="25" ry="15" fill="#ffffff" fillOpacity="0.3" />
            </motion.g>

            {/* Airplane Wing Tip visible in distance */}
            <path d="M120 220 L190 235 L195 240 L120 225 Z" fill="#ffffff" fillOpacity="0.4" />
          </g>

          {/* Window Glass Reflection Highlight */}
          <path
            d="M130 110 Q160 140 180 250"
            stroke="#ffffff"
            strokeWidth="3"
            strokeOpacity="0.15"
            strokeLinecap="round"
          />

          {/* Luxury Executive Jet Armchair / Headrest */}
          <path
            d="M260 90 C260 70 340 70 350 90 L360 280 C360 310 270 310 260 280 Z"
            fill="#16161e"
            stroke="#2e2e3d"
            strokeWidth="3"
          />
          <ellipse cx="305" cy="110" rx="40" ry="25" fill="#1f1f2a" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" />

          {/* Relaxed Creator Character in Jet Seat (Inspired by User's Reference) */}
          {/* Lower Body / Pants */}
          <path d="M210 280 C210 280 250 290 320 290 L340 350 L200 350 Z" fill="#050508" stroke="#1f1f28" strokeWidth="2" />

          {/* Emerald / Crimson Tech Sweater with Oversized Arm Silhouette */}
          {/* Back Shoulder */}
          <path
            d="M260 180 C270 140 340 140 350 180 L355 270 C340 280 280 280 260 270 Z"
            fill="#0f291e"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Big Relaxed Left Sleeve resting on armrest */}
          <path
            d="M165 240 C140 240 120 260 120 275 C120 290 140 300 220 300 C240 300 245 285 245 270 C245 255 220 240 165 240 Z"
            fill="#10b981"
            stroke="#34d399"
            strokeWidth="2.5"
          />
          {/* Arm Accent White Stripe */}
          <path d="M140 268 C170 268 215 272 235 272" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Relaxed Left Hand resting on window ledge */}
          <path
            d="M125 275 C115 270 95 270 90 280 C88 288 95 292 105 292 C115 292 120 285 125 275 Z"
            fill="#fbcfe8"
            stroke="#0a0a0f"
            strokeWidth="2"
          />
          {/* Hand Fingers */}
          <path d="M92 282 C98 285 105 285 112 282" stroke="#0a0a0f" strokeWidth="1.5" />
          <path d="M95 288 C100 290 108 290 115 286" stroke="#0a0a0f" strokeWidth="1.5" />

          {/* Right Arm Holding Glass */}
          <path
            d="M270 210 C240 225 210 240 210 265 C210 285 245 295 285 285 C295 275 290 230 270 210 Z"
            fill="#10b981"
            stroke="#34d399"
            strokeWidth="2.5"
          />

          {/* Hand fingers wrapped around drink glass stem */}
          <ellipse cx="202" cy="245" rx="8" ry="6" fill="#fbcfe8" stroke="#0a0a0f" strokeWidth="1.5" />
          <ellipse cx="200" cy="255" rx="9" ry="6" fill="#fbcfe8" stroke="#0a0a0f" strokeWidth="1.5" />
          <ellipse cx="204" cy="265" rx="8" ry="6" fill="#fbcfe8" stroke="#0a0a0f" strokeWidth="1.5" />

          {/* Cocktail / Champagne Martini Glass */}
          <path d="M165 205 L235 205 L200 240 Z" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="2" />
          {/* Red drink liquid inside */}
          <path d="M173 214 L227 214 L200 238 Z" fill="#ef4444" fillOpacity="0.85" />
          {/* Glass Stem & Base */}
          <line x1="200" y1="240" x2="200" y2="280" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="185" y1="280" x2="215" y2="280" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Turtle-neck Collar */}
          <path
            d="M275 185 C275 170 310 170 310 185 L310 205 C310 210 275 210 275 205 Z"
            fill="#0f291e"
            stroke="#34d399"
            strokeWidth="2"
          />

          {/* Head & Stylish Bob Haircut */}
          <ellipse cx="295" cy="155" rx="16" ry="18" fill="#fbcfe8" stroke="#0a0a0f" strokeWidth="2" />
          
          {/* Dark Hair (Matching Reference) */}
          <path
            d="M280 155 C275 130 300 115 320 125 C335 135 330 165 335 185 C320 190 310 175 305 165 C295 168 285 168 280 155 Z"
            fill="#0d1117"
          />
          {/* Cute Top Hair Knot / Wisp */}
          <path d="M296 122 C295 112 298 110 299 114" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" />

          {/* Eyes Looking Out Window */}
          <circle cx="288" cy="154" r="2.5" fill="#000000" />
          <circle cx="298" cy="154" r="2" fill="#000000" />
          <path d="M289 160 Q292 163 295 160" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        </svg>
      </motion.div>

      {/* Floating Status Badges */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-2 sm:left-6 z-20 px-3.5 py-1.5 rounded-full bg-black/90 border border-red-500/40 text-xs font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] backdrop-blur-md flex items-center gap-2"
      >
        <Plane className="w-3.5 h-3.5 text-red-400" />
        <span>Location Independence</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-4 right-2 sm:right-6 z-20 px-3.5 py-1.5 rounded-full bg-black/90 border border-emerald-500/40 text-xs font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur-md flex items-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>Freedom in the 0.1%</span>
      </motion.div>

    </div>
  );
}
