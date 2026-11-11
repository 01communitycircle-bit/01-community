"use client";

import React from "react";
import Link from "next/link";
import ResultsWall from "../../components/ResultsWall";
import { useApp } from "../../context/AppContext";
import { TrendingUp, Sparkles, PlusCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ResultsPage() {
  const { results, currentUser, openPaymentModal } = useApp();

  const totalCalculatedRevenue = results.reduce((acc, curr) => acc + curr.amountINR, 0);

  return (
    <div className="w-full min-h-screen py-14 md:py-20 bg-white text-[#091540]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link (Capsule) */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#091540] hover:text-[#1B2CC1] transition-colors mb-8 bg-[#f8fbff] border border-slate-200 px-4 py-2 rounded-full shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#091540]" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-200 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] text-xs font-bold text-[#1B2CC1] mb-3 border border-[#cce4fc]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>0.1% Wall of Fame • Real Student Proof of Work</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#091540] tracking-tight">
              Community Proof of Work
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl font-normal leading-relaxed">
              Real client earnings, freelance retainers, and YouTube payouts uploaded directly by 0.1% Community members. Transparent street credibility for everyone to see.
            </p>
          </div>

          {/* Quick Action (Capsule Button) */}
          <div className="w-full sm:w-auto flex justify-center md:justify-end">
            {currentUser.isPro ? (
              <Link
                href="/dashboard/submit-result"
                className="solid-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-full shadow-sm w-full sm:w-auto"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Publish Your Wins</span>
              </Link>
            ) : (
              <button
                onClick={() => openPaymentModal()}
                className="solid-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-full cursor-pointer shadow-sm w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-[#ABD2FA]" />
                <span>Join to Share Wins (₹999)</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="solid-card p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Wins Logged</span>
            <span className="text-2xl sm:text-3xl font-black text-[#091540] mt-1 block">
              {results.length}
            </span>
          </div>

          <div className="solid-card p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Student Proofs</span>
            <span className="text-2xl sm:text-3xl font-black text-[#091540] mt-1 block">
              {results.length === 0 ? "Starting Out" : `₹${totalCalculatedRevenue.toLocaleString("en-IN")}`}
            </span>
          </div>

          <div className="solid-card p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Direct Verification</span>
            <span className="text-2xl sm:text-3xl font-black text-[#091540] mt-1 block">
              Via Gmail
            </span>
          </div>

          <div className="solid-card p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Direct WhatsApp Access</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1B2CC1] mt-1 block">
              100% Verified
            </span>
          </div>
        </div>

        {/* Results Wall Feed */}
        <ResultsWall limit={0} showFilters={true} />

      </div>
    </div>
  );
}
