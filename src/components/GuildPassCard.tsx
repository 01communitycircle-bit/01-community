"use client";

import React from "react";
import { ShieldCheck, Award, MessageCircle, PhoneCall, Sparkles, CheckCircle2, Flame, Users } from "lucide-react";
import { TOTAL_SLOTS_LIMIT, LIFETIME_VIP_PRICE, LIFETIME_PRO_PRICE } from "../lib/constants";
import { useApp } from "../context/AppContext";

export default function GuildPassCard() {
  const { slotsRemaining, slotsClaimed, openPaymentModal, tracks } = useApp();

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      
      {/* Ambient Emerald Glow Behind Card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-600/30 via-teal-500/20 to-emerald-700/30 blur-2xl opacity-75 pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-[#0c100e]/95 border border-emerald-500/30 shadow-2xl backdrop-blur-xl text-white space-y-6">
        
        {/* Top Header: Guild Badge & Live Status */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-tight">0.1% Community</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  VIP GUILD
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">The Elite High-Income Ecosystem</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admissions Live</span>
          </div>
        </div>

        {/* Pricing Tiers Preview Pill */}
        <div className="grid grid-cols-2 gap-2.5 p-1 rounded-2xl bg-black/60 border border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pro Tier</span>
            <div className="text-lg font-black text-white font-mono mt-0.5">₹{LIFETIME_PRO_PRICE}</div>
            <span className="text-[10px] text-slate-400">All 11 Programs</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-left relative overflow-hidden">
            <div className="absolute top-1 right-2 text-[9px] font-black uppercase text-emerald-300 bg-emerald-900/80 px-1.5 py-0.2 rounded-full border border-emerald-500/40">
              Top Tier
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">VIP Hotline</span>
            <div className="text-lg font-black text-emerald-300 font-mono mt-0.5">₹{LIFETIME_VIP_PRICE}</div>
            <span className="text-[10px] text-emerald-200/80">1-on-1 Calls</span>
          </div>
        </div>

        {/* Core Guild Deliverables */}
        <div className="space-y-2.5 text-xs text-slate-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Full 11 Course Curriculum:</strong> Video, Dev, Content & Outreach</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Master VIP WhatsApp Circle:</strong> Direct feedback & private deal flow</span>
          </div>
          <div className="flex items-center gap-2.5 text-emerald-300 font-semibold">
            <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>1-on-1 Founder Hotline:</strong> Direct phone call mentorship with Tech Arush</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Wall of Fame Verified:</strong> Transparent payout & milestone proof audits</span>
          </div>
        </div>

        {/* Dynamic Slot Scarcity Footer */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Flame className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{slotsRemaining} of {TOTAL_SLOTS_LIMIT} Slots Left</span>
          </div>
          <button
            onClick={() => openPaymentModal(tracks[0])}
            className="text-[11px] font-bold text-emerald-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            Claim Spot →
          </button>
        </div>

      </div>

    </div>
  );
}
