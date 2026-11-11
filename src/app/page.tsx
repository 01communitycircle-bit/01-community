"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import ResultsWall from "../components/ResultsWall";
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
  BookOpen
} from "lucide-react";

export default function HomePage() {
  const { tracks, openPaymentModal, currentUser, results, transactions } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAllTracks, setShowAllTracks] = useState<boolean>(false);

  const totalVerifiedEarnings = results.reduce((sum, r) => sum + (r.amountINR || 0), 0);

  const filteredTracks = activeCategory === "all"
    ? (showAllTracks ? tracks : tracks.slice(0, 4))
    : tracks.filter(t => t.id === activeCategory);

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#091540]">
      
      {/* HERO SECTION (PURE WHITE BACKGROUND, SOLID DARK TEXT & BUTTONS) */}
      <section className="w-full pt-16 pb-24 md:pt-24 md:pb-32 bg-white border-b border-slate-200">
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Trust Banner with Official Logo */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#f8fbff] border border-slate-200 text-[#091540] text-xs font-semibold mb-8 shadow-xs">
            <div className="w-6 h-6 rounded-md overflow-hidden bg-[#091540] flex-shrink-0 border border-slate-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="w-2 h-2 rounded-full bg-[#1B2CC1]"></span>
            <span className="font-bold text-[#091540]">The 0.1% Community Guild</span>
            <span className="text-white bg-[#091540] px-2.5 py-0.5 rounded-full font-bold text-[11px]">
              Private WhatsApp Community
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#091540] max-w-4xl leading-[1.12] mb-6">
            Master High-Income Skills.
            <span className="block text-[#1B2CC1] mt-1 sm:mt-2">Join the Top 0.1% Circle.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-10 font-medium">
            Step-by-step practical courses in <strong className="text-[#091540]">Web & App Dev</strong>, <strong className="text-[#091540]">Video Editing & Motion</strong>, <strong className="text-[#091540]">Growth Systems</strong>, and <strong className="text-[#091540]">Client Hunting</strong>. Pay ₹999 once, get unlocked into private WhatsApp circles, and publish your client wins.
          </p>

          {/* Action CTAs (SOLID DARK BUTTONS) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {currentUser.isPro ? (
              <Link
                href="/dashboard"
                className="solid-btn-primary w-full sm:w-auto px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Go to Member Dashboard</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            ) : (
              <button
                onClick={() => openPaymentModal(tracks[0])}
                className="solid-btn-primary w-full sm:w-auto px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#ABD2FA]" />
                <span>Join Pro Membership (₹999)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            )}

            <Link
              href="/results"
              className="solid-btn-secondary w-full sm:w-auto px-7 py-4 text-sm font-bold flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-[#1B2CC1]" />
              <span>View Wall of Fame</span>
            </Link>
          </div>

          {/* Direct UPI Note */}
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#1B2CC1]" />
            <span>Direct Business UPI • Zero Gateway Cut • Instant Dashboard Unlock</span>
          </div>

          {/* Live Trust Metrics Bar */}
          <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl w-full">
            <div className="solid-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#091540]">100%</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">Direct UPI Verification</div>
            </div>

            <div className="solid-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#091540]">₹999</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">One-Time Lifetime Access</div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS: 4 SIMPLE STEPS */}
      <section className="w-full py-20 bg-[#f8fbff] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#1B2CC1] bg-[#f0f7ff] px-3.5 py-1 rounded-full border border-[#cce4fc]">
              4-Step Guild Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#091540] mt-3 tracking-tight">
              How the 0.1% Community Works
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Fast, transparent, and verified directly inside private WhatsApp circles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="solid-card p-6 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-white flex items-center justify-center font-black text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-[#091540] mb-1.5">Pick Your Craft</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Choose between Video Editing, Global Freelancing, Web Development, or Content Creation.
              </p>
            </div>

            <div className="solid-card p-6 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-white flex items-center justify-center font-black text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-[#091540] mb-1.5">Pay ₹999 via UPI</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Scan QR and provide your genuine WhatsApp number, 12-digit UTR, and payment screenshot proof.
              </p>
            </div>

            <div className="solid-card p-6 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-white flex items-center justify-center font-black text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-[#091540] mb-1.5">WhatsApp VIP Addition</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Verified within ~15 minutes by the community director and added directly to your WhatsApp VIP circle.
              </p>
            </div>

            <div className="solid-card p-6 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-white flex items-center justify-center font-black text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-[#091540] mb-1.5">Publish Wins</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                When you close clients or earn payouts, publish your proof on the public Wall of Fame!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SKILL PROGRAMS EXPLORER (#tracks) */}
      <section id="tracks" className="w-full py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0f7ff] border border-[#cce4fc] text-xs font-bold text-[#1B2CC1]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>High-Income Practical Courses</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#091540] mt-4 tracking-tight">
              Explore Available Courses
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto font-medium">
              Every course comes with step-by-step practical modules, downloadable templates, and direct WhatsApp VIP Community access for ₹999.
            </p>
          </div>

          {/* Clean Filter Pills Bar */}
          <div className="w-full flex justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#f8fbff] border border-slate-200 max-w-full overflow-x-auto no-scrollbar shadow-2xs">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-[#091540] text-white"
                    : "text-slate-600 hover:text-[#091540]"
                }`}
              >
                All Programs ({tracks.length})
              </button>
              {tracks.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveCategory(t.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === t.id
                      ? "bg-[#091540] text-white"
                      : "text-slate-600 hover:text-[#091540]"
                  }`}
                >
                  {t.title.split("&")[0].split("(")[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredTracks.map(track => (
              <div
                key={track.id}
                className="solid-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
                      {track.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-medium">
                      {(track.modules?.length || track.modulesCount || 4)} Modules Included
                    </span>
                  </div>

                  {/* Program Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#091540] mb-2 leading-tight">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {track.shortDesc}
                  </p>

                  {/* Earnings Potential Pill */}
                  <div className="p-3.5 rounded-2xl bg-[#f8fbff] border border-slate-200 flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-500 font-medium">Average Graduate Earnings:</span>
                    <strong className="text-xs sm:text-sm font-bold text-[#091540] font-mono">{track.averageEarnings}</strong>
                  </div>

                  {/* Private WhatsApp VIP Circle Badge */}
                  <div className="p-3.5 rounded-2xl bg-[#f8fbff] border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#091540] text-white flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#091540]">Private VIP WhatsApp Guild</div>
                      <p className="text-[11px] text-slate-500 font-normal">Direct feedback & daily community discussion</p>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button (SOLID DARK BUTTON) */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Lifetime Access</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-[#091540]">₹999</span>
                        <span className="text-xs text-slate-400 line-through font-medium">₹4,999</span>
                        <span className="text-[10px] font-bold text-[#1B2CC1] bg-[#f0f7ff] px-2 py-0.5 rounded-full border border-[#cce4fc]">
                          80% OFF
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">One-time payment</span>
                  </div>

                  {currentUser.isPro && (currentUser.enrolledTracks.includes(track.id) || currentUser.role === "admin") ? (
                    <Link
                      href={`/tracks/${track.id}`}
                      className="w-full py-3.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-emerald-100 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Enrolled ✓ • Access Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => openPaymentModal(track)}
                      className="solid-btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ABD2FA]" />
                      <span>Enroll Now • Pay ₹999 via UPI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <Link
                    href={`/tracks/${track.id}`}
                    className="w-full py-2.5 rounded-full text-slate-600 hover:text-[#091540] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Syllabus & Program Details</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All Courses Button */}
          {activeCategory === "all" && tracks.length > 4 && (
            <div className="mt-12 text-center flex flex-col items-center gap-3">
              <button
                onClick={() => setShowAllTracks(!showAllTracks)}
                className="solid-btn-primary px-8 py-4 text-xs font-black flex items-center gap-2.5 cursor-pointer shadow-md rounded-full"
              >
                <span>{showAllTracks ? "Show Fewer Courses" : `View All ${tracks.length} Courses`}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAllTracks ? "-rotate-90" : "rotate-90"}`} />
              </button>
              <span className="text-[11px] text-slate-500 font-medium">
                {showAllTracks ? `Showing all ${tracks.length} courses` : `Showing 4 of ${tracks.length} courses • Click to expand`}
              </span>
            </div>
          )}

        </div>
      </section>

      {/* WALL OF FAME */}
      <section id="results" className="w-full py-20 sm:py-24 bg-[#f8fbff] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#1B2CC1] bg-[#f0f7ff] px-3.5 py-1 rounded-full border border-[#cce4fc]">
              Real Milestones
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#091540] mt-3 tracking-tight">
              0.1% Community Wall of Fame
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Every client deal, monthly retainer, and YouTube payout uploaded directly by members.
            </p>
          </div>

          <ResultsWall limit={6} showFilters={true} />

          <div className="mt-12 text-center">
            <Link
              href="/results"
              className="solid-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold shadow-sm"
            >
              <span>Explore All Verified Community Results</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>

        </div>
      </section>

      {/* TRANSPARENT PRICING SECTION (#pricing) */}
      <section id="pricing" className="w-full py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#1B2CC1] bg-[#f0f7ff] px-3.5 py-1 rounded-full border border-[#cce4fc]">
              Membership
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#091540] mt-3 tracking-tight">
              One Lifetime Investment. ₹999.
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              No subscription traps. Pay once via UPI and get lifetime access to the member hub and WhatsApp circles.
            </p>
          </div>

          {/* Pricing Box */}
          <div className="solid-card p-8 sm:p-12 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-[#1B2CC1] uppercase tracking-wider">
                0.1% Pro Access Plan
              </span>
              <div className="flex items-baseline gap-3 mt-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-[#091540]">₹999</span>
                <span className="text-base text-slate-400 line-through font-medium">₹4,999</span>
                <span className="text-[10px] font-bold text-[#1B2CC1] bg-[#f0f7ff] px-2 py-0.5 rounded-full border border-[#cce4fc]">
                  80% OFF
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Direct connection with track peers in WhatsApp, all downloadable toolkits, and the right to publish your wins on the Wall of Fame.
              </p>

              {currentUser.isPro ? (
                <div>
                  <div className="mb-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You already have lifetime VIP membership under <strong>{currentUser.email}</strong>.</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="solid-btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Go to Member Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => openPaymentModal(tracks[0])}
                  className="solid-btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ABD2FA]" />
                  <span>Join Pro Membership (₹999)</span>
                </button>
              )}
              
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
                <span>Direct UPI QR • Instant Unlock • WhatsApp Verification</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-[#f8fbff] border border-slate-200 space-y-3.5 text-xs text-[#091540]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1B2CC1] flex-shrink-0 mt-0.5" />
                <span><strong>Instant Member Dashboard:</strong> All roadmaps, presets & contracts unlocked</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1B2CC1] flex-shrink-0 mt-0.5" />
                <span><strong>Locked WhatsApp Circles:</strong> Direct feedback and community advice</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1B2CC1] flex-shrink-0 mt-0.5" />
                <span><strong>Public Wall of Fame:</strong> Publish your earnings receipts to build your name</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1B2CC1] flex-shrink-0 mt-0.5" />
                <span><strong>Client Outreach Toolkits:</strong> High-converting scripts, proposal templates</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
