"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Clock } from "lucide-react";

export default function ClockIntroLoader() {
  const [visible, setVisible] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [secondTick, setSecondTick] = useState(0);

  useEffect(() => {
    // Check if user has already seen the dramatic intro in this tab session
    const hasSeen = sessionStorage.getItem("01_intro_seen");
    if (hasSeen) {
      setVisible(false);
      return;
    }

    // Tick every 800ms to countdown 3.. 2.. 1.. in ~2.4 seconds
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            try {
              sessionStorage.setItem("01_intro_seen", "true");
            } catch {}
          }, 350);
          return 0;
        }
        return prev - 1;
      });
      setSecondTick(t => t + 1);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle Ambient Red Glow Behind Clock */}
          <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-red-700/30 via-red-600/20 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />

          {/* Futuristic Laser Grid Floor */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse at center, black, transparent 75%)"
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            
            {/* VIP Guild Badge */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-black tracking-widest uppercase mb-8 shadow-redGlowSm"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>INITIALIZING 0.1% PRIVATE GUILD</span>
            </motion.div>

            {/* Cinematic Luxury Analog / Digital Clock Dial */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
              
              {/* Outer Glowing Neon Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.15)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="1000"
                  strokeDashoffset={1000}
                  animate={{ strokeDashoffset: [1000, 300, 0] }}
                  transition={{ duration: 2.3, ease: "linear" }}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.8))"
                  }}
                />
              </svg>

              {/* Rotating Hour/Minute Tick Markers */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 border border-red-500/20 rounded-full"
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-red-500/40 rounded-full" />
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-red-500/40 rounded-full" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-red-500/40 rounded-full" />
              </motion.div>

              {/* Central Countdown Number & Clock Face */}
              <div className="flex flex-col items-center justify-center z-10">
                <motion.div
                  key={secondsLeft}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "backOut" }}
                  className="text-5xl sm:text-7xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]"
                >
                  {secondsLeft > 0 ? `0${secondsLeft}` : "00"}
                </motion.div>
                <div className="text-[10px] tracking-widest uppercase font-mono text-red-400/80 font-bold mt-1">
                  SEC SYNC
                </div>
              </div>
            </div>

            {/* Tagline Below Clock */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                0.1% Community
                <span className="text-red-500 ml-1.5">Elite Guild</span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono tracking-wide max-w-xs">
                Synchronizing Private Circles & Master Line Access...
              </p>
            </motion.div>

            {/* Skip Option Button */}
            <button
              onClick={() => {
                setVisible(false);
                try {
                  sessionStorage.setItem("01_intro_seen", "true");
                } catch {}
              }}
              className="mt-8 text-[11px] text-neutral-500 hover:text-red-400 underline underline-offset-4 tracking-wider uppercase transition-colors font-medium cursor-pointer"
            >
              Skip Intro →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
