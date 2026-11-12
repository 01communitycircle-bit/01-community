"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import ResultsWall from "../components/ResultsWall";
import HeroBackgroundStacks from "../components/HeroBackgroundStacks";
import GuildPassCard from "../components/GuildPassCard";
import GlobalNomadCard from "../components/GlobalNomadCard";
import SkillsMatrixShowcase from "../components/SkillsMatrixShowcase";
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
  Clock,
  AlertTriangle,
  Zap,
  ChevronRight,
  Compass,
  Globe
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
        time: q.paidAt || "Recently",
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
    }, 4000);
    return () => clearInterval(timer);
  }, [liveActivities.length]);

  const filteredTracks = activeCategory === "all"
    ? (showAllTracks ? tracks : tracks.slice(0, 6))
    : tracks.filter(t => t.id === activeCategory);

  const currentActivity = liveActivities[tickerIndex];

  return (
    <div className="w-full flex flex-col items-center bg-white text-slate-900 relative overflow-hidden">
      
      {/* ==========================================================
          HERO SECTION (CLEAN EMERALD & CRISP WHITE GUILD)
          ========================================================== */}
      <section className="relative w-full pt-10 pb-16 md:pt-14 md:pb-24 border-b border-slate-200 overflow-hidden bg-white">
        
        {/* Dynamic 5-Second Background Image Stacks */}
        <HeroBackgroundStacks />

        {/* Subtle Ambient Emerald Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Live Ticker Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-xs font-semibold shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                LIVE GUILD FEED:
              </span>
              <span className="text-slate-700 text-[11px] truncate max-w-[220px] sm:max-w-md">
                <strong className="text-slate-900">{currentActivity.name}</strong> {currentActivity.action}
              </span>
              <span className="text-emerald-800 font-mono text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold">
                {currentActivity.time}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline, Scarcity & Action Buttons */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              
              {/* Scarcity Progress Bar (Strict 100 Slots) */}
              <div className="w-full max-w-md mb-6 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    STRICT GUILD CAP
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-[11px]">
                    {slotsClaimed} / {TOTAL_SLOTS_LIMIT} Seats ({slotsRemaining} Left)
                  </span>
                </div>
                {/* Animated Progress Track */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xs transition-all duration-1000 ease-out"
                    style={{ width: `${Math.max(2, (slotsClaimed / TOTAL_SLOTS_LIMIT) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 block text-center lg:text-left mt-1.5 font-medium">
                  ⚡ Once 100 slots are filled, public registration closes permanently.
                </span>
              </div>

              {/* Main Headline - CLEAN, HIGH-TICKET & PROPORTIONAL */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 max-w-2xl leading-[1.18] mb-4">
                Master High-Income Skills.
                <span className="block text-gradient-emerald mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-[44px]">
                  Join the Top 0.1% Guild.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed mb-8 font-normal">
                No boring theory. Practical masterclasses in <strong className="text-slate-900">Video Editing</strong>, <strong className="text-slate-900">Thumbnails</strong>, <strong className="text-slate-900">Web & App Dev</strong>, and <strong className="text-slate-900">Client Hunting</strong>. Choose between <strong className="text-emerald-700">Pro Plan (₹{LIFETIME_PRO_PRICE})</strong> or <strong className="text-emerald-700">VIP Hotline (₹{LIFETIME_VIP_PRICE})</strong> with direct founder phone calls.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                {currentUser.isPro ? (
                  <Link
                    href="/dashboard"
                    className="solid-btn-primary w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Open Member Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => openPaymentModal(tracks[0])}
                      className="solid-btn-primary w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/25"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Claim 1 of {slotsRemaining} Slots</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <a
                      href="#pricing"
                      className="solid-btn-secondary w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <span>VIP Hotline Plan (₹{LIFETIME_VIP_PRICE})</span>
                    </a>
                  </>
                )}

                <Link
                  href="/results"
                  className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Wall of Fame</span>
                </Link>
              </div>

              {/* Trust Guarantees */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
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
            <div className="lg:col-span-5 flex items-center justify-center">
              <GuildPassCard />
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          EARNINGS REALISM & COMPLIANCE BANNER
          ========================================================== */}
      <section className="w-full bg-emerald-50/70 border-b border-emerald-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-slate-700 leading-normal">
              <strong className="text-slate-900">Realistic Income Scope:</strong> Typical entry-level milestones in short niches (Video Editing, Thumbnails, Reels) realistically range <strong className="text-emerald-700">₹20,000 to ₹25,000/month</strong> with 2-3 consistent clients. We provide pure practical training — <span className="underline decoration-emerald-500/60 font-medium">we do not promise or guarantee fixed financial returns.</span>
            </p>
          </div>
          <Link
            href="/results"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
          >
            <span>See Audited Win Wall</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ==========================================================
          CURRICULUM ARCHITECTURE MATRIX (PRACTICAL SHOWCASE)
          ========================================================== */}
      <section className="w-full py-16 md:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsMatrixShowcase />
        </div>
      </section>

      {/* ==========================================================
          LOCATION INDEPENDENCE & GLOBAL CLIENT LEVERAGE
          ========================================================== */}
      <section className="w-full py-16 md:py-24 border-b border-slate-200 bg-slate-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Glass Nomad Matrix */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <GlobalNomadCard />
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                Digital Nomad Leverage
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Work From Anywhere. Close High-Ticket Deals Globally.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                When you master international freelancing, viral video pacing, and modern web apps, you don&apos;t trade hours for low-ticket local jobs. You build digital assets, invoice clients across the US, UK, and Dubai, and live on your own terms.
              </p>

              <div className="space-y-3 text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Direct International Client Invoicing (Wise, Stripe & PayPal setup)
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Asynchronous Remote Work (Zero micromanagement, 100% output-driven)
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Direct WhatsApp Inner Circle to troubleshoot foreign client calls
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => openPaymentModal(tracks[0])}
                  className="solid-btn-primary w-full sm:w-auto px-7 py-3 text-xs font-black rounded-full cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  Join 0.1% Guild • ₹{LIFETIME_PRO_PRICE}
                </button>

                <a
                  href="#founder"
                  className="px-5 py-3 text-xs font-bold text-slate-700 hover:text-emerald-700 border border-slate-300 rounded-full hover:border-emerald-500 hover:bg-white transition-all"
                >
                  Meet Lead Mentor
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          MEET YOUR FOUNDER & MENTOR (TECH ARUSH)
          ========================================================== */}
      <section id="founder" className="w-full py-16 md:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3 shadow-xs">
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
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg group">
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
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  &ldquo;I don&apos;t just sell you a video player. I pick up the phone when you are stuck.&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Most people fail online courses because they hit a wall—an editor gets confused by client feedback, a freelancer gets ghosted on a proposal, or a developer runs into an error. In the 0.1% Community, you aren&apos;t left alone.
                </p>
              </div>

              {/* 3 VIP Guarantees */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 mt-0.5">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Direct 1-on-1 Call Support (VIP Plan)</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Call Arush on his personal main line anytime for personalized troubleshooting, pricing strategy, and roadmap alignment.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">VIP Inner Circle WhatsApp Chat</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Instant direct chat line for daily asset requests, sample video reviews, and cold outreach pitch critiques.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Ethical Training & Zero False Hype</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      We train you to build real market value. We tell you the hard truth: making your first ₹20,000 - ₹25,000 requires consistent client pitches and clean execution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => openPaymentModal(tracks[0])}
                  className="solid-btn-primary w-full sm:w-auto px-6 py-3 text-xs font-black rounded-full text-center shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Join VIP Plan with 1-on-1 Calls (₹{LIFETIME_VIP_PRICE})
                </button>
                <a
                  href="#pricing"
                  className="px-5 py-3 text-xs font-bold text-emerald-700 hover:text-emerald-900 border border-emerald-300 rounded-full w-full sm:w-auto text-center hover:bg-emerald-50 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Compare ₹{LIFETIME_PRO_PRICE} & ₹{LIFETIME_VIP_PRICE} Plans</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          TWO-TIER PRICING SECTION (PRO ₹999 vs VIP ₹1,499)
          ========================================================== */}
      <section id="pricing" className="w-full py-16 md:py-24 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3 shadow-xs">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* TIER 1: PRO PLAN (₹999) */}
            <div className="rounded-3xl p-7 bg-white border border-slate-200 hover:border-emerald-400 transition-all shadow-md flex flex-col justify-between">
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
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">1 Skill Track Full Curriculum:</strong> Complete practical frameworks, project walkthroughs & roadmaps.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">50GB+ Resource Vault:</strong> Premiere presets, Figma UI kits, SFX library & cold pitch scripts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Student WhatsApp Community:</strong> Network with fellow high-income digital builders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Publish on Wall of Fame:</strong> Showcase your client receipts with verified badge.</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => openPaymentModal(tracks[0])}
                  className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer text-center shadow-sm"
                >
                  Join Pro Plan (₹{LIFETIME_PRO_PRICE})
                </button>
                <span className="text-[10px] text-slate-500 block text-center mt-2 font-mono">
                  Slot #{slotsClaimed + 1} of {TOTAL_SLOTS_LIMIT} Available
                </span>
              </div>
            </div>

            {/* TIER 2: VIP FOUNDER PLAN (₹1,499) - RECOMMENDED & HIGHLIGHTED */}
            <div className="relative rounded-3xl p-7 bg-white border-2 border-emerald-500 shadow-xl flex flex-col justify-between">
              
              {/* Highlight Pill */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
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
                    <PhoneCall className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Direct 1-on-1 Phone Hotline:</strong> Call Arush on his personal number anytime for emergency troubleshooting and project guidance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Private WhatsApp Chat Line:</strong> Direct text line for pitch reviews, contract terms, and client negotiations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Personalized Roadmap:</strong> Guidance on how to target and close your first ₹20,000 - ₹25,000 clients.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Everything in Pro Plan:</strong> All skill frameworks, 50GB asset pack & student guild.</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => openPaymentModal(tracks[0])}
                  className="solid-btn-primary w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Claim VIP Hotline Access (₹{LIFETIME_VIP_PRICE})</span>
                </button>
                <span className="text-[10px] text-emerald-800 block text-center mt-2 font-mono font-bold">
                  ⚠️ Only {slotsRemaining} of 100 VIP Seats Remaining
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          SKILL TRACKS SECTION (CLEAN WHITE CARDS)
          ========================================================== */}
      <section id="tracks" className="w-full py-16 md:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Practical Curriculums
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                High-Income Skill Tracks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal max-w-xl">
                Choose the high-demand skill you want to master. Each course includes practical client acquisition frameworks and direct WhatsApp guild access.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">
                Showing {filteredTracks.length} of {tracks.length} Programs
              </span>
            </div>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="solid-card rounded-3xl p-6 bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all group"
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
                      {track.averageEarnings}
                    </span>
                  </div>
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
                      className="solid-btn-primary flex-1 py-2.5 px-4 text-xs font-bold rounded-full text-center cursor-pointer shadow-sm"
                    >
                      Enroll Now
                    </button>
                    <Link
                      href={`/tracks/${track.id}`}
                      className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                      title="Access Guild Program"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle View All Tracks Button */}
          {tracks.length > 6 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllTracks(!showAllTracks)}
                className="px-6 py-3 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer"
              >
                {showAllTracks ? "Show Less Tracks" : `View All ${tracks.length} Skill Programs`}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ==========================================================
          WALL OF FAME PREVIEW (REAL STUDENT RESULTS & DISCLAIMER)
          ========================================================== */}
      <section className="w-full py-16 md:py-24 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Transparent Street Credibility
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Student Wall of Fame
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal max-w-xl">
                Every win here is verified. Anyone can email students directly through their displayed Gmail IDs to ask them questions and verify milestones.
              </p>
            </div>

            <Link
              href="/results"
              className="px-6 py-3 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:border-emerald-400 hover:bg-white transition-all flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Full Proof Feed ({results.length})</span>
            </Link>
          </div>

          <ResultsWall limit={3} showFilters={false} />

        </div>
      </section>

      {/* ==========================================================
          FINAL BOTTOM SCARCITY CALL TO ACTION
          ========================================================== */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white text-center relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <Flame className="w-4 h-4 text-emerald-600" />
            <span>Only {slotsRemaining} of {TOTAL_SLOTS_LIMIT} Slots Remaining</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to Enter the Top 0.1%?
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Stop learning in isolation. Join the private WhatsApp guild, get your skills reviewed, and unlock the ₹{LIFETIME_VIP_PRICE} VIP Hotline for direct founder calls.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openPaymentModal(tracks[0])}
              className="solid-btn-primary w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-black rounded-full flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Claim Your Guild Seat • ₹{LIFETIME_PRO_PRICE}</span>
            </button>

            <a
              href="#pricing"
              className="px-6 py-4 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 border border-emerald-300 rounded-full w-full sm:w-auto hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All 11 Programs & Plans</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
