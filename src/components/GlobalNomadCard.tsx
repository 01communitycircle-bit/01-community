"use client";

import React from "react";
import { Globe, DollarSign, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function GlobalNomadCard() {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      
      {/* Ambient Emerald Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-600/20 via-teal-500/20 to-transparent blur-2xl pointer-events-none" />

      {/* Main Glass Metric Studio */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0c100e]/95 border border-emerald-500/30 shadow-2xl backdrop-blur-xl text-white space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">Global Deal Leverage</span>
              <span className="text-[11px] text-slate-400">International Freelancing & High-Ticket Invoicing</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300">
            Active Alpha
          </span>
        </div>

        {/* Global Currency & Client Retainers Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>United States 🇺🇸</span>
              <span className="font-mono text-emerald-400 font-bold">$1,500/mo</span>
            </div>
            <div className="text-base font-black text-white">Agency Retainer</div>
            <span className="text-[11px] text-slate-400">Video Editing & Short Form Flow</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Dubai / UAE 🇦🇪</span>
              <span className="font-mono text-emerald-400 font-bold">12,000 AED</span>
            </div>
            <div className="text-base font-black text-white">Full-Stack SaaS</div>
            <span className="text-[11px] text-slate-400">Landing Page & Next.js Web App</span>
          </div>
        </div>

        {/* Live Guild Transfer Audit Mockup */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Direct Wire / Stripe Settlement</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Verified Guild Milestone Transfer</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-emerald-400 font-mono">+₹1,24,500</span>
            <span className="text-[10px] text-slate-500 block font-mono">Today</span>
          </div>
        </div>

      </div>

    </div>
  );
}
