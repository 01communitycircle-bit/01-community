"use client";

import React from "react";
import Link from "next/link";
import ResultsWall from "../../components/ResultsWall";
import { useApp } from "../../context/AppContext";
import { TrendingUp, Sparkles, PlusCircle, ArrowLeft, ShieldCheck, AlertTriangle } from "lucide-react";
import {
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  TOTAL_SLOTS_LIMIT,
  REMAINING_SLOTS,
  INCOME_DISCLAIMER
} from "../../lib/constants";

export default function ResultsPage() {
  const { results, currentUser, openPaymentModal, slotsRemaining } = useApp();

  const totalCalculatedRevenue = results.reduce((acc, curr) => acc + curr.amountINR, 0);

  return (
    <div className="w-full min-h-screen py-14 md:py-20 bg-[#050706] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors mb-8 bg-[#0c100e] border border-emerald-500/30 px-4 py-2 rounded-full shadow-sm hover:border-emerald-500"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10 pb-8 border-b border-emerald-500/20 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-xs font-bold text-emerald-400 mb-3 border border-emerald-500/40">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>0.1% Wall of Fame • Real Student Proof of Work</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Community Proof of Work
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl font-normal leading-relaxed">
              Real client earnings, freelance retainers, and YouTube payouts uploaded directly by 0.1% Community members. Transparent street credibility for everyone to see.
            </p>
          </div>

          {/* Quick Action */}
          <div className="w-full sm:w-auto flex justify-center md:justify-end">
            {currentUser.isPro ? (
              <Link
                href="/dashboard/submit-result"
                className="solid-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] w-full sm:w-auto"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Publish Your Wins</span>
              </Link>
            ) : (
              <button
                onClick={() => openPaymentModal()}
                className="solid-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-full cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)] w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Join to Share Wins (₹{LIFETIME_PRO_PRICE})</span>
              </button>
            )}
          </div>
        </div>

        {/* Earnings Realism Compliance Card */}
        <div className="mb-10 p-4 rounded-2xl bg-[#0c100e] border border-emerald-500/30 text-xs text-slate-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Notice Regarding Realistic Earnings:
            </span>
            <p className="leading-relaxed text-slate-300 text-[11px]">
              {INCOME_DISCLAIMER}
            </p>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="solid-card p-5 rounded-2xl bg-[#0c100e] border border-emerald-500/25">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Wins Logged</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
              {results.length}
            </span>
          </div>

          <div className="solid-card p-5 rounded-2xl bg-[#0c100e] border border-emerald-500/25">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Student Proofs</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block font-mono">
              {results.length === 0 ? "Fresh Cohort" : `₹${totalCalculatedRevenue.toLocaleString("en-IN")}`}
            </span>
          </div>

          <div className="solid-card p-5 rounded-2xl bg-[#0c100e] border border-emerald-500/25">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Cohort Slots</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block font-mono">
              {slotsRemaining} / {TOTAL_SLOTS_LIMIT}
            </span>
          </div>

          <div className="solid-card p-5 rounded-2xl bg-[#0c100e] border border-emerald-500/25">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Founder Hotline</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
              ₹{LIFETIME_VIP_PRICE}
            </span>
          </div>
        </div>

        {/* Wall Content */}
        <ResultsWall limit={undefined} showFilters={true} />

      </div>
    </div>
  );
}