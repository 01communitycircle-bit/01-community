"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import InteractiveMascotButton from "./InteractiveMascotButton";
import { useApp } from "../context/AppContext";
import { REMAINING_SLOTS, LIFETIME_PRO_PRICE } from "../lib/constants";

export default function InteractiveMotionStudio() {
  const { openPaymentModal, tracks } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrubberProgress, setScrubberProgress] = useState(35);
  const [activeProperty, setActiveProperty] = useState<"scale" | "glow" | "morph">("glow");

  // Auto scrub timeline
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setScrubberProgress(prev => (prev >= 100 ? 0 : prev + 1.2));
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#0f0f15] via-[#09090d] to-black border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden relative">
      
      {/* Background Subtle Cyber Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/40 inline-flex items-center gap-1.5 mb-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            LIVE MOTION CANVAS
          </span>
          <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Learn By Crafting Live, Not Passive Theory
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal max-w-xl">
            Interactive keyframe timelines, viral pacing cuts, and fullstack Next.js components. Scrub the live timeline below to see real-time vector transformations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:border-red-500 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-red-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? "Pause Timeline" : "Play Timeline"}</span>
          </button>
          <button
            onClick={() => setScrubberProgress(0)}
            className="p-2 rounded-full border border-white/15 bg-white/5 hover:border-red-500 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas & Character Display (Inspired by User's Reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Creative Stage with Animated Character & Geometric Shapes */}
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-black border border-red-500/25 overflow-hidden flex items-center justify-center p-4">
          
          {/* Subtle Grid Canvas Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.2) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}
          />

          {/* Floating Geometric Skill Canvas (Inspired by Reference) */}
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute right-4 sm:right-10 top-6 sm:top-8 w-24 sm:w-36 h-24 sm:h-36 rounded-2xl border-2 border-dashed border-red-500/50 p-2 shadow-[0_0_30px_rgba(239,68,68,0.25)] bg-[#0d0d14]/80 backdrop-blur-sm pointer-events-none"
          >
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1.5">
              <div className="rounded-full bg-gradient-to-tr from-red-600 to-amber-500 shadow-sm" />
              <div className="rounded-t-full bg-red-900/80 border border-red-500/40" />
              <div className="rounded-br-2xl bg-amber-500/80" />
              <div className="rounded-full bg-red-500/40 flex items-center justify-center">
                <span className="text-[10px] font-black text-white font-mono">&lt;/&gt;</span>
              </div>
            </div>
          </motion.div>

          {/* Morphing 3D Diamond Crystal (Direct Reference to User's Image) */}
          <motion.div
            animate={{
              scale: 0.9 + (scrubberProgress / 100) * 0.35,
              rotate: (scrubberProgress / 100) * 180,
              y: [-4, 4, -4],
            }}
            transition={{
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.1 },
              rotate: { duration: 0.1 },
            }}
            className="absolute right-12 sm:right-20 top-1/2 -translate-y-1/2 z-10 w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center pointer-events-none"
          >
            {/* Transform bounding box nodes */}
            <div className="absolute inset-0 border border-sky-400 rounded-lg pointer-events-none" />
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-sky-400 border border-white" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-sky-400 border border-white" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-sky-400 border border-white" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-sky-400 border border-white" />

            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]">
              {/* 3D Facets */}
              <polygon points="50,10 90,50 50,50" fill="#ef4444" fillOpacity="0.9" />
              <polygon points="50,10 10,50 50,50" fill="#dc2626" fillOpacity="0.8" />
              <polygon points="50,90 90,50 50,50" fill="#b91c1c" fillOpacity="0.9" />
              <polygon points="50,90 10,50 50,50" fill="#7f1d1d" fillOpacity="0.8" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
            </svg>
          </motion.div>

          {/* Creator at Laptop (Inspired by User's Vector Reference) */}
          <div className="absolute left-4 sm:left-10 bottom-0 z-10 w-44 sm:w-60 h-40 sm:h-52">
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-2xl">
              {/* Creator Torso & Dark Turtleneck */}
              <path d="M40 180 L40 100 C40 85 65 75 90 75 C115 75 140 85 140 100 L140 180 Z" fill="#0d0d12" stroke="#ef4444" strokeWidth="2" />
              
              {/* Neck & Head */}
              <rect x="83" y="60" width="16" height="18" fill="#fbcfe8" />
              <ellipse cx="91" cy="52" rx="18" ry="20" fill="#fbcfe8" stroke="#ef4444" strokeWidth="1.5" />
              
              {/* Stylish Blue/Crimson Hair */}
              <path
                d="M72 48 C70 30 85 24 105 26 C118 28 116 42 112 50 C105 38 92 38 82 42 C76 44 72 48 72 48 Z"
                fill="#38bdf8"
              />

              {/* Eyes & Glasses */}
              <circle cx="86" cy="50" r="2" fill="#000000" />
              <path d="M84 57 Q89 60 94 57" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Arms on Laptop */}
              <path d="M48 110 L100 150 L130 150 L85 105 Z" fill="#181820" stroke="#ef4444" strokeWidth="1.5" />
              <ellipse cx="118" cy="150" rx="9" ry="6" fill="#fbcfe8" />
              <ellipse cx="132" cy="150" rx="9" ry="6" fill="#fbcfe8" />

              {/* Sleek Laptop */}
              <path d="M90 155 L165 155 L175 160 L80 160 Z" fill="#71717a" stroke="#d4d4d8" strokeWidth="1.5" />
              <polygon points="105,115 160,115 155,155 100,155" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
              {/* Apple/Guild Logo on Lid */}
              <circle cx="130" cy="135" r="4" fill="#ffffff" fillOpacity="0.8" />
            </svg>
          </div>

          {/* Real-time Stat Callout */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono text-slate-300">
            FRAME: {Math.round((scrubberProgress / 100) * 120)} / 120 • 60 FPS
          </div>
        </div>

        {/* Right Side: Interactive Keyframe Scrubber Timeline (Exact User Reference Match) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
                Keyframe Motion Timeline
              </span>
              <span className="text-[10px] font-mono text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                {Math.round(scrubberProgress)}% SCRUBBED
              </span>
            </div>

            {/* Interactive Timeline Track 1: Position */}
            <div className="p-2.5 rounded-xl bg-[#0e0e14] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Position (X, Y)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">0.0s - 2.4s</span>
              </div>
              <div className="relative h-4 rounded-md bg-neutral-900 border border-white/5 flex items-center px-1 overflow-hidden">
                {/* Diamond Keyframe Markers */}
                <div className="absolute left-[15%] w-2.5 h-2.5 rotate-45 bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                <div className="absolute left-[50%] w-2.5 h-2.5 rotate-45 bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                <div className="absolute left-[85%] w-2.5 h-2.5 rotate-45 bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] transition-all duration-75"
                  style={{ left: `${scrubberProgress}%` }}
                />
              </div>
            </div>

            {/* Interactive Timeline Track 2: Scale */}
            <div className="p-2.5 rounded-xl bg-[#0e0e14] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Scale & Pacing
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Easing Out</span>
              </div>
              <div className="relative h-4 rounded-md bg-neutral-900 border border-white/5 flex items-center px-1 overflow-hidden">
                <div className="absolute left-[10%] w-2.5 h-2.5 rotate-45 bg-red-500 shadow-[0_0_6px_#ef4444]" />
                <div className="absolute left-[40%] w-2.5 h-2.5 rotate-45 bg-red-500 shadow-[0_0_6px_#ef4444]" />
                <div className="absolute left-[75%] w-2.5 h-2.5 rotate-45 bg-red-500 shadow-[0_0_6px_#ef4444]" />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] transition-all duration-75"
                  style={{ left: `${scrubberProgress}%` }}
                />
              </div>
            </div>

            {/* Interactive Timeline Track 3: Retention & Audio Morph */}
            <div className="p-2.5 rounded-xl bg-[#0e0e14] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Retention Hook Morph
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Sound SFX Sync</span>
              </div>
              <div className="relative h-4 rounded-md bg-neutral-900 border border-white/5 flex items-center px-1 overflow-hidden">
                <div className="absolute left-[25%] w-2.5 h-2.5 rotate-45 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <div className="absolute left-[60%] w-2.5 h-2.5 rotate-45 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <div className="absolute left-[90%] w-2.5 h-2.5 rotate-45 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] transition-all duration-75"
                  style={{ left: `${scrubberProgress}%` }}
                />
              </div>
            </div>

            {/* Manual Scrubber Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={scrubberProgress}
                onChange={(e) => {
                  setIsPlaying(false);
                  setScrubberProgress(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <span className="text-[10px] text-slate-500 block text-center mt-1">
                Drag slider to scrub through motion keyframes manually
              </span>
            </div>

          </div>

          {/* Interactive Mascot Button (Pops up on Hover) */}
          <div className="pt-2">
            <InteractiveMascotButton
              onClick={() => openPaymentModal(tracks[0])}
              className="w-full text-center justify-center"
              badge={`${REMAINING_SLOTS} Spots Left`}
            >
              Master This Skill • Join Guild (₹{LIFETIME_PRO_PRICE})
            </InteractiveMascotButton>
          </div>

        </div>

      </div>

    </div>
  );
}
