"use client";

import React from "react";
import { useApp } from "../../../context/AppContext";
import {
  TrendingUp,
  Star,
  CheckCircle2
} from "lucide-react";

export default function ResultsReviewPage() {
  const { results, handleToggleVerifyResult, handleToggleFeaturedResult } = useApp();

  return (
    <div className="space-y-6 bg-white text-[#091540]">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-[#1B2CC1]" />
          <span>Wall of Fame Moderation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight">
          Earnings Proofs Moderation
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Review, verify, and feature real student earnings results to showcase on the public Wall of Fame.
        </p>
      </div>

      <div className="space-y-4">
        {results.map(res => (
          <div
            key={res.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-base font-black text-[#091540] font-mono">
                  {res.currencyLabel}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                  {res.trackTitle}
                </span>
                {res.verified && (
                  <span className="text-[11px] font-bold text-emerald-700 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
                {res.featured && (
                  <span className="text-[11px] font-bold text-amber-800 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-[#091540]">
                {res.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {res.description}
              </p>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 font-medium">
                <span>By: <strong className="text-[#091540]">{res.studentName}</strong></span>
                <span>•</span>
                <span>Platform: {res.sourcePlatform}</span>
                <span>•</span>
                <span>Country: {res.clientCountry}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleVerifyResult(res.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  res.verified
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-white hover:bg-slate-50 text-[#091540] border border-slate-200 shadow-sm"
                }`}
              >
                {res.verified ? "Verified ✓" : "Mark Verified"}
              </button>

              <button
                onClick={() => handleToggleFeaturedResult(res.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  res.featured
                    ? "bg-amber-100 text-amber-900 border border-amber-200"
                    : "bg-[#091540] hover:bg-[#1B2CC1] text-white shadow-sm"
                }`}
              >
                {res.featured ? "Featured ★" : "Feature on Wall"}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
