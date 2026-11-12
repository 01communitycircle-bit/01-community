"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import ResultsWall from "../components/ResultsWall";
import HeroBackgroundStacks from "../components/HeroBackgroundStacks";
import GuildPassCard from "../components/GuildPassCard";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  TrendingUp,
  MessageCircle,
  Star,
  Lock,
  Unlock,
  Check,
  Award,
  BookOpen,
  PhoneCall,
  Flame,
  AlertTriangle,
  Zap,
  Globe,
  Layers
} from "lucide-react";
import {
  TOTAL_SLOTS_LIMIT,
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  INCOME_DISCLAIMER
} from "../lib/constants";

export default function HomePage() {
  const { tracks, openPaymentModal, currentUser, results, whatsappQueue, slotsClaimed, slotsRemaining } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAllTracks, setShowAllTracks] = useState<boolean>(false);

  // Live Activity Feed dynamically populated from real admissions or active guild status
  const [tickerIndex, setTickerIndex] = useState(0);
  const liveActivities = whatsappQueue.length > 0
    ? whatsappQueue.slice(0, 5).map(q => ({
        name: q.studentName,
        action: `enrolled in ${q.trackName.split("(")[0].trim()}`,
        time: q.paidAt ? q.paidAt.split(",")[0] : "Recently",
        plan: q.planType === "vip" ? "VIP" : "PRO"
      }))
    : [
        { name: "0.1% Community Guild", action: "Strict 100 Lifetime Seats Admissions Open", time: "Live", plan: "GUILD" },
        { name: "VIP Founder Line", action: "Direct 1-on-1 Call Mentorship Active", time: "Active", plan: "VIP" },
        { name: "Verified Wall of Fame", action: "Real payout proofs & client win audits", time: "Audited", plan: "WIN" }
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [liveActivities.length]);

  // Priority order: Put flagship courses as top 3 (Video Editing, Web Dev, Thumbnail Design)
  const sortedTracks = [...tracks].sort((a, b) => {
    const priority = ["video-editing", "web-dev", "thumbnail-design", "app-dev", "client-hunting", "freelancing"];
    const aIdx = priority.indexOf(a.id);
    const bIdx = priority.indexOf(b.id);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  const filteredTracks = activeCategory === "all"
    ? sortedTracks
    : sortedTracks.filter(t => {
        if (activeCategory === "video") return t.id.includes("video") || t.id.includes("youtube") || t.id.includes("thumbnail");
        if (activeCategory === "web") return t.id.includes("web") || t.id.includes("saas") || t.id.includes("ai");
        if (activeCategory === "client") return t.id.includes("freelance") || t.id.includes("agency") || t.id.includes("client") || t.id.includes("cold");
        return true;
      });

  const visibleTracks = showAllTracks ? filteredTracks : filteredTracks.slice(0, 2);

  const currentActivity = liveActivities[tickerIndex] || liveActivities[0];

  const getEntryScope = (track: any) => {
    const id = (track?.id || "").toLowerCase();
    if (id === "web-dev" || id === "app-dev" || id === "software-dev") {
      return "It depends";
    }
    return "₹20,000 / mo";
  };

  return (
    <div className="w-full flex flex-col items-center bg-white text-slate-900 relative overflow-hidden">
      
      {/* ==========================================================
          HERO SECTION (CLEAN EMERALD & CRISP WHITE GUILD)
          ========================================================== */}
      <section className="relative w-full pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 border-b border-slate-200 overflow-hidden bg-white">
        
        {/* Clean Subtle Gradient Background (No floating Stack badges) */}
        <HeroBackgroundStacks />

        {/* Subtle Ambient Emerald Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[500px] bg-emerald-400/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Live Ticker Pill (Mobile-Optimized: Single-line, No Overflow) */}
          <div className="flex justify-center mb-5 sm:mb-6 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold shadow-xs max-w-full overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0 inline-block" />
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] shrink-0">
                LIVE FEED:
              </span>
              <span className="text-slate-800 text-[11px] truncate max-w-[200px] sm:max-w-md">
                <strong className="text-slate-900">{currentActivity.name}</strong> {currentActivity.action}
              </span>
              <span className="hidden sm:inline-block text-emerald-800 font-mono text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold shrink-0">
                {currentActivity.time}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headline, Scarcity & Action Buttons */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              
              {/* Scarcity Progress Bar (Strict 100 Slots) */}
              <div className="w-full max-w-md mb-5 sm:mb-6 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Flame className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    STRICT GUILD CAP
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-[10px] sm:text-[11px]">
                    {slotsClaimed} / {TOTAL_SLOTS_LIMIT} Seats ({slotsRemaining} Left)
                  </span>
                </div>
                {/* Animated Progress Track */}
                <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 transition-all duration-1000 ease-out"
                    style={{ width: `${Math.max(2, (slotsClaimed / TOTAL_SLOTS_LIMIT) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 block text-center lg:text-left mt-1.5 font-medium">
                  ⚡ Once 100 slots are filled, public registration closes permanently.
                </span>
              </div>

              {/* Main Headline - Responsive Mobile Formatting */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-slate-900 max-w-2xl leading-[1.2] mb-3 sm:mb-4">
                Master High-Income Skills.
                <span className="block text-gradient-emerald mt-1">
                  Join the Top 0.1% Guild.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed mb-6 sm:mb-8 font-normal">
                No boring theory. Practical masterclasses in <strong className="text-slate-900">Video Editing</strong>, <strong className="text-slate-900">Thumbnails</strong>, <strong className="text-slate-900">Web & App Dev</strong>, and <strong className="text-slate-900">Client Hunting</strong>. Choose between <strong className="text-emerald-700">Pro Plan (₹{LIFETIME_PRO_PRICE})</strong> or <strong className="text-emerald-700">VIP Hotline (₹{LIFETIME_VIP_PRICE})</strong> with direct founder phone calls.
              </p>

              {/* Action Buttons - Fully Responsive on Mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {currentUser.isPro ? (
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Open Member Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => openPaymentModal(tracks[0])}
                      className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-md shadow-emerald-600/25 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Claim 1 of {slotsRemaining} Slots</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <a
                      href="#pricing"
                      className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold rounded-full flex items-center justify-center gap-2 border border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/50 text-slate-800 transition-all shadow-xs"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <span>VIP Hotline Plan (₹{LIFETIME_VIP_PRICE})</span>
                    </a>
                  </>
                )}

                <Link
                  href="/results"
                  className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Wall of Fame</span>
                </Link>
              </div>

              {/* Trust Guarantees */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Direct Business UPI
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  1-on-1 Calls in VIP
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  100 Capped Seats Only
                </span>
              </div>

            </div>

            {/* Right Column: Premium VIP Guild Pass Card */}
            <div className="lg:col-span-5 flex items-center justify-center w-full mt-4 lg:mt-0">
              <GuildPassCard />
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          EARNINGS REALISM & COMPLIANCE BANNER
          ========================================================== */}
      <section className="w-full bg-emerald-50/70 border-b border-emerald-100 py-3.5 sm:py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="text-xs text-slate-700 leading-normal">
              <strong className="text-slate-900">Realistic Income Scope:</strong> Typical entry-level milestones in short niches (Video Editing, Thumbnails, Reels) realistically range <strong className="text-emerald-700">₹20,000 to ₹25,000/month</strong> with 2-3 consistent clients. We provide pure practical training — <span className="underline decoration-emerald-500/60 font-medium">we do not promise or guarantee fixed financial returns.</span>
            </p>
          </div>
          <Link
            href="/results"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 shrink-0 whitespace-nowrap"
          >
            <span>See Audited Win Wall</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ==========================================================
          REPLACING PRACTICAL FRAMEWORK WITH THE COURSES DIRECTLY
          HIGH-INCOME SKILL TRACKS & LIVE CURRICULUMS (TOP 3 OR ALL)
          ========================================================== */}
      <section id="tracks" className="w-full py-12 sm:py-16 md:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Production Masterclasses</span>
                </span>

                {/* Small bubble right in the header */}
                <button
                  onClick={() => setShowAllTracks(!showAllTracks)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{showAllTracks ? "Show Top 2 Only" : `Explore All ${tracks.length} Courses`}</span>
                  <ArrowRight className={`w-3.5 h-3.5 text-emerald-600 transition-transform ${showAllTracks ? "-rotate-90" : ""}`} />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {showAllTracks ? `All Skill Programs (${tracks.length})` : "Top 2 Featured Programs"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal max-w-xl leading-relaxed">
                Every track is built around real client contracts and production workflows. One lifetime enrollment unlocks access to the full ecosystem, assets vault, and the VIP WhatsApp circle.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200 overflow-x-auto max-w-full">
              <button
                onClick={() => { setActiveCategory("all"); setShowAllTracks(true); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Tracks ({tracks.length})
              </button>
              <button
                onClick={() => { setActiveCategory("video"); setShowAllTracks(true); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === "video"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Video & Media
              </button>
              <button
                onClick={() => { setActiveCategory("web"); setShowAllTracks(true); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === "web"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Web & SaaS Dev
              </button>
              <button
                onClick={() => { setActiveCategory("client"); setShowAllTracks(true); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === "client"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Client Acquisition
              </button>
            </div>
          </div>

          {/* Tracks Grid: Top 3 initially or all when expanded */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleTracks.map((track) => (
              <div
                key={track.id}
                className="rounded-3xl p-6 bg-white border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {track.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Guild Framework
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {track.shortDesc}
                  </p>

                  {/* Realistic Graduate Income Scope */}
                  <div className="mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Realistic Entry Scope:
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 block mt-0.5">
                      {getEntryScope(track)}
                    </span>
                  </div>

                  {/* Deliverables snippet */}
                  {track.deliverables && track.deliverables.length > 0 && (
                    <div className="space-y-1.5 mb-4 text-[11px] text-slate-600">
                      {track.deliverables.slice(0, 2).map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Pro / VIP Pricing:</span>
                      <span className="font-mono font-bold text-slate-900">
                        ₹{LIFETIME_PRO_PRICE} / <span className="text-emerald-700">₹{LIFETIME_VIP_PRICE}</span>
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {track.studentsCount} Enrolled
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openPaymentModal(track)}
                      className="flex-1 py-2.5 px-4 text-xs font-bold rounded-full text-center cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all"
                    >
                      Enroll in Program
                    </button>
                    <Link
                      href={`/tracks/${track.id}`}
                      className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 transition-all shadow-2xs"
                      title="View Track Syllabus"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Bubble: Explore All Programs */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAllTracks(!showAllTracks)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 hover:border-emerald-500 text-emerald-900 text-xs sm:text-sm font-black shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>
                {showAllTracks
                  ? "Collapse to Top 2 Programs"
                  : `Explore All ${tracks.length} Skill Programs & Curriculums`}
              </span>
              <ArrowRight className={`w-4 h-4 text-emerald-600 transition-transform ${showAllTracks ? "-rotate-90" : "group-hover:translate-x-1"}`} />
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================================
          MEET YOUR FOUNDER & MENTOR (TECH ARUSH)
          ========================================================== */}
      <section id="founder" className="w-full py-12 sm:py-16 md:py-20 border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              Direct Founder Access
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Meet Your Lead Mentor: Tech Arush
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
              No faceless courses or outsourced coaches. In the 0.1% VIP Plan, you get Arush&apos;s direct line for 1-on-1 calls whenever you need guidance or get stuck.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Visual Stacks Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md group">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/founder-jet.jpg"
                    alt="Arush Founder"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-center shadow-xs">
                    <span className="text-[10px] font-bold text-slate-900 block">Global Freelancer & Strategist</span>
                  </div>
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/founder-tech.jpg"
                    alt="Tech Arush AI"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-center shadow-xs">
                    <span className="text-[10px] font-bold text-emerald-800 block font-mono">Tech Arush AI Architect</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">Arush</h4>
                  <span className="text-[11px] text-slate-500">Founder & Chief Mentor, 0.1% Community</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                  On-Demand Call Line
                </span>
              </div>
            </div>

            {/* Mentor Value Proposition */}
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  &ldquo;I don&apos;t just sell you a video player. I pick up the phone when you are stuck.&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Most people fail online courses because they hit a wall—an editor gets confused by client feedback, a freelancer gets ghosted on a proposal, or a developer runs into an error. In the 0.1% Community, you aren&apos;t left alone.
                </p>
              </div>

              {/* 3 VIP Guarantees */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 mt-0.5">
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Direct 1-on-1 Call Support (VIP Plan)</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Call Arush on his personal main line anytime for personalized troubleshooting, pricing strategy, and roadmap alignment.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">VIP Inner Circle WhatsApp Chat</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Instant direct chat line for daily asset requests, sample video reviews, and cold outreach pitch critiques.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Ethical Training & Zero False Hype</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      We train you to build real market value. We tell you the hard truth: making your first ₹20,000 - ₹25,000 requires consistent client pitches and clean execution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => openPaymentModal(tracks[0])}
                  className="px-6 py-3 text-xs font-black rounded-full text-center bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                >
                  Join VIP Plan with 1-on-1 Calls (₹{LIFETIME_VIP_PRICE})
                </button>
                <a
                  href="#pricing"
                  className="px-5 py-3 text-xs font-bold text-emerald-700 hover:text-emerald-900 border border-emerald-300 rounded-full text-center hover:bg-emerald-50 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Compare Plans</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          TWO-TIER PRICING SECTION (PRO ₹999 vs VIP ₹1,499)
          ========================================================== */}
      <section id="pricing" className="w-full py-12 sm:py-16 md:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              Exactly 100 Lifetime Slots
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Choose Your Membership Level
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
              Pay once via UPI with zero gateway fees. Lifetime updates, private WhatsApp circle invite, and instant member dashboard unlock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            
            {/* TIER 1: PRO PLAN (₹999) */}
            <div className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                    Pro Plan
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-bold">
                    Lifetime Access
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                      ₹{LIFETIME_PRO_PRICE}
                    </span>
                    <span className="text-xs text-slate-400 line-through">₹4,999</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      SAVE 80%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1 font-medium">
                    One-time fee • No subscriptions • Capped at 100 students
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">1 Skill Track Full Curriculum:</strong> Complete practical frameworks, project walkthroughs & roadmaps.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">50GB+ Resource Vault:</strong> Premiere presets, Figma UI kits, SFX library & cold pitch scripts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Student WhatsApp Community:</strong> Network with fellow high-income digital builders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Publish on Wall of Fame:</strong> Showcase your client receipts with verified badge.</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => openPaymentModal(tracks[0])}
                  className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer text-center shadow-xs"
                >
                  Join Pro Plan (₹{LIFETIME_PRO_PRICE})
                </button>
                <span className="text-[10px] text-slate-500 block text-center mt-2 font-mono">
                  Combined Limit: Only {slotsRemaining} of {TOTAL_SLOTS_LIMIT} Total Seats Remaining
                </span>
              </div>
            </div>

            {/* TIER 2: VIP FOUNDER PLAN (₹1,499) - RECOMMENDED & HIGHLIGHTED */}
            <div className="relative rounded-3xl p-6 sm:p-7 bg-white border-2 border-emerald-500 shadow-lg flex flex-col justify-between">
              
              {/* Highlight Pill */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>MOST RECOMMENDED • VIP HOTLINE</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
                    VIP Founder Plan
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" />
                    Calls Included
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-950 font-mono">
                      ₹{LIFETIME_VIP_PRICE}
                    </span>
                    <span className="text-xs text-slate-400 line-through">₹9,999</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      BEST VALUE
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-800 block mt-1 font-medium">
                    Everything in Pro + Direct 1-on-1 Calls with Arush
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 mb-8">
                  <li className="flex items-start gap-2.5">
                    <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Direct 1-on-1 Phone Hotline:</strong> Call Arush on his personal number anytime for emergency troubleshooting and project guidance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Private WhatsApp Chat Line:</strong> Direct text line for pitch reviews, contract terms, and client negotiations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Personalized Roadmap:</strong> Guidance on how to target and close your first ₹20,000 - ₹25,000 clients.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Everything in Pro Plan:</strong> All skill frameworks, 50GB asset pack & student guild.</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => openPaymentModal(tracks[0])}
                  className="w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Claim VIP Hotline Access (₹{LIFETIME_VIP_PRICE})</span>
                </button>
                <span className="text-[10px] text-emerald-800 block text-center mt-2 font-mono font-bold">
                  ⚠️ Combined Limit: Only {slotsRemaining} of {TOTAL_SLOTS_LIMIT} Total Seats Remaining
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          WALL OF FAME (REAL STUDENT RESULTS & PROOFS)
          ========================================================== */}
      <section className="w-full py-12 sm:py-16 md:py-20 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Transparent Street Credibility
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Student Wall of Fame
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal max-w-xl">
                Every win here is verified with payment receipts and screenshots. Anyone can email students directly through their displayed Gmail IDs.
              </p>
            </div>

            <Link
              href="/results"
              className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:border-emerald-400 hover:bg-white transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Full Proof Feed ({results.length})</span>
            </Link>
          </div>

          <ResultsWall limit={3} showFilters={false} />

        </div>
      </section>

    </div>
  );
}
