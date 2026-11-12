"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import {
  TrendingUp,
  CheckCircle2,
  Heart,
  PlusCircle,
  Sparkles,
  Mail,
  Award,
  AlertTriangle,
  Star
} from "lucide-react";
import { INCOME_DISCLAIMER } from "../lib/constants";

interface ResultsWallProps {
  limit?: number;
  showFilters?: boolean;
}

export default function ResultsWall({ limit, showFilters = true }: ResultsWallProps) {
  const { results, currentUser, openPaymentModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { key: "all", label: "All Milestones" },
    { key: "video-editing", label: "Video Editing" },
    { key: "thumbnail-design", label: "Thumbnails" },
    { key: "web-dev", label: "Web Dev" },
    { key: "app-dev", label: "App Dev" },
    { key: "seo-growth", label: "SEO Growth" },
    { key: "youtube-growth", label: "YouTube Growth" },
    { key: "instagram-growth", label: "Instagram Growth" },
    { key: "client-hunting", label: "Client Hunting" },
    { key: "freelancing", label: "Freelancing" },
    { key: "software-dev", label: "Software & AI" },
    { key: "content-creation", label: "Content Creation" }
  ];

  const filtered = results.filter(item => {
    if (selectedCategory === "all") return true;
    const cat = (item.category || "").replace("_", "-");
    const target = selectedCategory.replace("_", "-");
    return cat === target || item.trackId === selectedCategory || item.trackId.replace("_", "-") === target;
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  const toggleLike = (id: string) => {
    setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full text-slate-900">
      
      {/* Category Pills & Action */}
      {showFilters && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-1 min-w-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.key
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center md:justify-end flex-shrink-0">
            {currentUser.isPro ? (
              <Link
                href="/dashboard/submit-result"
                className="solid-btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Post Your Milestone</span>
              </Link>
            ) : (
              <button
                onClick={() => openPaymentModal()}
                className="px-5 py-2.5 rounded-full border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Unlock to Share Payouts</span>
              </button>
            )}
          </div>
        </div>
      )}

      {displayed.length === 0 ? (
        /* Empty / Starting Out State */
        <div className="rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 bg-white border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Wall of Fame — Fresh Community Cohort
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            We are just starting out with our official community cohort! We have zero fake reviews. As newly enrolled students close client retainers and receive payouts, their verified receipts and direct Gmail addresses will appear here so anyone can confirm with them directly.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/submit-result"
              className="solid-btn-primary px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Publish Milestone or Review</span>
            </Link>
            <Link
              href="/#tracks"
              className="px-6 py-3 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:border-emerald-400 hover:bg-slate-50 transition-all"
            >
              <span>Explore Skill Programs</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map(item => {
            const isLiked = likedIds[item.id];
            const totalLikes = (item.likesCount || 0) + (isLiked ? 1 : 0);

            return (
              <div
                key={item.id}
                className="solid-card rounded-3xl p-6 flex flex-col justify-between overflow-hidden bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all"
              >
                <div>
                  {/* Student Info & Payout Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.studentAvatar}
                        alt={item.studentName}
                        className="w-11 h-11 rounded-full object-cover ring-1 ring-emerald-500/40"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {item.studentName}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          {item.trackTitle}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      {item.clientCountry || "Direct Deal"}
                    </span>
                  </div>

                  {/* Gmail Direct Contact Pill */}
                  {item.studentEmail && (
                    <div className="mb-3.5">
                      <a
                        href={`mailto:${item.studentEmail}?subject=Regarding%20your%200.1%25%20Community%20Milestone`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 hover:text-slate-900 transition-colors w-full justify-between"
                        title="Click to email this student directly to confirm their milestone"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{item.studentEmail}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-sans font-medium flex-shrink-0">
                          (Ask & Confirm)
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Community 5-Star Rating Pill */}
                  <div className="mb-3 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= (item.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-mono font-bold text-amber-900">
                        {(item.rating || 5).toFixed(1)}/5
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                      Guild Rating
                    </span>
                  </div>

                  {/* Milestone Amount Badge */}
                  <div className="mb-3.5 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-900">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Verified Payout
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5">
                      {item.currencyLabel}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                      Source: {item.sourcePlatform || "Direct Client"}
                    </span>
                  </div>

                  {/* Headline & Description */}
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {item.description}
                  </p>

                  {/* Proof Screenshot */}
                  {item.proofImageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-slate-100 relative aspect-video">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.proofImageUrl}
                        alt="Proof of work milestone"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-[9px] font-bold text-white shadow-xs">
                        Verified Proof
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Details: Date & Upvotes */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {item.createdAt}
                  </span>

                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                      isLiked
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white text-white" : "text-slate-400"}`} />
                    <span>{totalLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
