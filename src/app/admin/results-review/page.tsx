"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import {
  Award,
  Star,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Eye,
  X,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  Globe
} from "lucide-react";

export default function ResultsReviewPage() {
  const { results, handleToggleVerifyResult, handleToggleFeaturedResult, handleDeleteResult } = useApp();
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null | undefined>(null);

  const totalVerified = results.filter(r => r.verified).length;
  const totalFeatured = results.filter(r => r.featured).length;

  return (
    <div className="space-y-6 text-white">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c100e] border border-emerald-500/20 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-400 mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wall of Fame Moderation & Control</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Wall of Fame Achievements Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Inspect payout proofs, verify milestones, feature top earners on the public Wall of Fame, or remove inappropriate submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
            {results.length} Published Wins
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c100e] border border-emerald-500/20 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Achievements</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">{results.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0c100e] border border-emerald-500/30 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Verified Proofs</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">{totalVerified}</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0c100e] border border-amber-500/30 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Featured on Wall</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">{totalFeatured}</span>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0c100e] border border-emerald-500/20 space-y-2">
            <Award className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No Student Wins Published Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When approved students post their client milestones or payouts from their dashboard, they will appear here for verification and moderation.
            </p>
          </div>
        ) : (
          results.map(res => (
            <div
              key={res.id}
              className="bg-[#0c100e] p-6 rounded-3xl border border-emerald-500/20 hover:border-emerald-500/40 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all"
            >
              <div className="space-y-3 max-w-2xl flex-1">
                {/* Badges */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-lg font-black text-white font-mono">
                    {res.currencyLabel}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    {res.trackTitle}
                  </span>
                  {res.verified && (
                    <span className="text-[11px] font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified ✓</span>
                    </span>
                  )}
                  {res.featured && (
                    <span className="text-[11px] font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>Featured ★</span>
                    </span>
                  )}
                </div>

                {/* Title & Desc */}
                <h3 className="text-base font-bold text-white">
                  &ldquo;{res.title}&rdquo;
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {res.description}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 font-medium flex-wrap">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={res.studentAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
                      alt={res.studentName}
                      className="w-4 h-4 rounded-full object-cover ring-1 ring-emerald-500/50"
                    />
                    <span>{res.studentName}</span>
                    {res.studentEmail && (
                      <span className="text-slate-400 font-normal font-mono">({res.studentEmail})</span>
                    )}
                  </span>
                  <span>•</span>
                  <span>Platform: <strong className="text-slate-200">{res.sourcePlatform}</strong></span>
                  <span>•</span>
                  <span>Country: <strong className="text-slate-200">{res.clientCountry}</strong></span>
                  <span>•</span>
                  <span>Date: {res.createdAt}</span>
                </div>
              </div>

              {/* Actions & Proof Screenshot */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                {/* Proof Screenshot Thumbnail */}
                {res.proofImageUrl && (
                  <button
                    onClick={() => setPreviewScreenshot(res.proofImageUrl)}
                    className="relative group p-1.5 rounded-2xl border border-white/10 hover:border-emerald-500 bg-black/60 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    title="Click to view payment proof"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={res.proofImageUrl}
                      alt="Proof"
                      className="w-16 h-12 object-cover rounded-xl"
                    />
                    <div className="pr-2 text-left">
                      <span className="text-[10px] font-bold text-emerald-400 block flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>View Proof</span>
                      </span>
                      <span className="text-[9px] text-slate-500">Screenshot</span>
                    </div>
                  </button>
                )}

                {/* Verify / Feature / Delete buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVerifyResult(res.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      res.verified
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                        : "bg-black/60 hover:bg-neutral-900 text-slate-300 border border-white/15"
                    }`}
                  >
                    {res.verified ? "Verified ✓" : "Mark Verified"}
                  </button>

                  <button
                    onClick={() => handleToggleFeaturedResult(res.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      res.featured
                        ? "bg-amber-950/80 text-amber-400 border border-amber-500/40"
                        : "solid-btn-primary text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    }`}
                  >
                    {res.featured ? "Featured ★" : "Feature"}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete this achievement ("${res.title}") from the Wall of Fame? This cannot be undone.`)) {
                        handleDeleteResult(res.id);
                      }
                    }}
                    className="p-2 rounded-full border border-red-500/30 hover:bg-red-950 text-red-400 transition-all cursor-pointer"
                    title="Delete achievement permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Screenshot Lightbox Modal */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-[#0c100e] rounded-3xl p-5 border border-emerald-500/40 shadow-2xl space-y-3 text-white">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" />
                <span>Verified Client Payout Receipt</span>
              </span>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-2xl border border-white/10 bg-black flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewScreenshot}
                alt="Proof Full Size"
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}