"use client";

import React from "react";
import { Globe, DollarSign, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function GlobalNomadCard() {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      
      {/* Ambient Emerald Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent blur-xl pointer-events-none" />

      {/* Main Metric Studio */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl text-slate-900 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 block">Global Deal Leverage</span>
              <span className="text-[11px] text-slate-500">International Freelancing & High-Ticket Invoicing</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
            Active Alpha
          </span>
        </div>

        {/* Global Currency & Client Retainers Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>United States 🇺🇸</span>
              <span className="font-mono text-emerald-700 font-bold">$1,500/mo</span>
            </div>
            <div className="text-base font-black text-slate-900">Agency Retainer</div>
            <span className="text-[11px] text-slate-500">Video Editing & Short Form Flow</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Dubai / UAE 🇦🇪</span>
              <span className="font-mono text-emerald-700 font-bold">12,000 AED</span>
            </div>
            <div className="text-base font-black text-slate-900">Full-Stack SaaS</div>
            <span className="text-[11px] text-slate-500">Landing Page & Next.js Web App</span>
          </div>
        </div>

        {/* Live Guild Transfer Audit Mockup */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Direct Wire / Stripe Settlement</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Verified Guild Milestone Transfer</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-emerald-700 font-mono">+₹1,24,500</span>
            <span className="text-[10px] text-slate-400 block font-mono">Today</span>
          </div>
        </div>

      </div>

    </div>
  );
}
