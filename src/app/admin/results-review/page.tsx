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
    <div className="space-y-6 text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Wall of Fame Moderation & Control</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Wall of Fame Achievements Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Inspect payout proofs, verify milestones, feature top earners on the public Wall of Fame, or remove inappropriate submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {results.length} Published Wins
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Achievements</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{results.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Verified Proofs</span>
          <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">{totalVerified}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Featured on Wall</span>
          <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">{totalFeatured}</span>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900">No Student Wins Published Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              When approved students post their client milestones or payouts from their dashboard, they will appear here for verification and moderation.
            </p>
          </div>
        ) : (
          results.map(res => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all"
            >
              <div className="space-y-3 max-w-2xl flex-1">
                {/* Badges */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {res.currencyLabel}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {res.trackTitle}
                  </span>
                  {res.verified && (
                    <span className="text-[11px] font-bold text-emerald-700 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified ✓</span>
                    </span>
                  )}
                  {res.featured && (
                    <span className="text-[11px] font-bold text-amber-800 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Featured ★</span>
                    </span>
                  )}
                </div>

                {/* Title & Desc */}
                <h3 className="text-base font-bold text-slate-900">
                  &ldquo;{res.title}&rdquo;
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {res.description}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 font-medium flex-wrap">
                  <span className="flex items-center gap-1.5 text-slate-900 font-bold">
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
                  <span>Platform: <strong className="text-slate-700">{res.sourcePlatform}</strong></span>
                  <span>•</span>
                  <span>Country: <strong className="text-slate-700">{res.clientCountry}</strong></span>
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
                    className="relative group p-1.5 rounded-2xl border border-slate-200 hover:border-emerald-500 bg-slate-50 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                    title="Click to view payment proof"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={res.proofImageUrl}
                      alt="Proof"
                      className="w-16 h-12 object-cover rounded-xl border border-slate-200"
                    />
                    <div className="pr-2 text-left">
                      <span className="text-[10px] font-bold text-emerald-700 block flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>View Proof</span>
                      </span>
                      <span className="text-[9px] text-slate-400">Screenshot</span>
                    </div>
                  </button>
                )}

                {/* Verify / Feature / Delete buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVerifyResult(res.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      res.verified
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs"
                    }`}
                  >
                    {res.verified ? "Verified ✓" : "Mark Verified"}
                  </button>

                  <button
                    onClick={() => handleToggleFeaturedResult(res.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      res.featured
                        ? "bg-amber-50 text-amber-800 border border-amber-300"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
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
                    className="p-2 rounded-full border border-red-200 bg-white hover:bg-red-50 text-red-600 transition-all cursor-pointer shadow-2xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-3 text-slate-900">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Client Payout Receipt</span>
              </span>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
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
