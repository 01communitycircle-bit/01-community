"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  DownloadCloud,
  MessageCircle,
  Settings,
  Unlock,
  PhoneCall,
  Flame,
  AlertTriangle,
  Check
} from "lucide-react";
import {
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  TOTAL_SLOTS_LIMIT,
  REMAINING_SLOTS,
  INCOME_DISCLAIMER
} from "../../../lib/constants";

export default function TrackDetailPage() {
  const params = useParams();
  const trackId = params?.trackId as string;
  const { tracks, openPaymentModal, currentUser, slotsRemaining } = useApp();

  const track = tracks.find(t => t.id === trackId) || tracks[0];
  const isAdmin = currentUser.role === "admin";
  const hasAccess = isAdmin || currentUser.enrolledTracks.includes(track.id);

  const scrollToCurriculum = () => {
    const el = document.getElementById("curriculum-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white pb-28">
      
      {/* Top Breadcrumb Nav */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/#tracks"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-[#0d0d12] hover:bg-black border border-red-500/30 px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-red-400" />
          <span>Back to All Courses</span>
        </Link>

        {isAdmin && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-bold text-red-400">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Admin Master Access Active</span>
          </span>
        )}
      </div>

      {/* Hero Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#0d0d12] p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-red-500/25 shadow-2xl">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-red-600 text-white shadow-md">
                {track.badge}
              </span>
              <span className="text-xs text-red-400 font-mono font-bold">
                Guild Framework Included
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Only {slotsRemaining} of {TOTAL_SLOTS_LIMIT} Slots Left
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {track.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {track.fullDesc || track.shortDesc}
            </p>

            {/* Average Graduate Earnings Reality */}
            <div className="p-4 rounded-2xl bg-black border border-red-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Realistic Scope</span>
                <span className="text-base sm:text-lg font-black text-red-400 font-mono">{track.averageEarnings}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Direct Mentor</span>
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1 justify-end">
                  <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                  VIP Calls
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="w-full lg:w-80 p-6 sm:p-7 rounded-3xl bg-black border border-red-500/40 shadow-2xl text-white space-y-5 flex-shrink-0">
            {isAdmin ? (
              <>
                <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    <span>Admin Master Control</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1">
                    All Access Granted
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    As Super Admin, you have unrestricted access to all materials, frameworks, and WhatsApp circles.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={scrollToCurriculum}
                    className="w-full py-3.5 px-6 rounded-full solid-btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer"
                  >
                    <span>Jump to Framework</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <Link
                    href="/admin/courses"
                    className="w-full py-2.5 px-6 rounded-full border border-white/15 hover:bg-white/5 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-red-400" />
                    <span>Manage in Course Studio</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Two Membership Options
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-white font-mono">
                      ₹{LIFETIME_PRO_PRICE}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">Pro /</span>
                    <span className="text-2xl font-black text-red-400 font-mono">
                      ₹{LIFETIME_VIP_PRICE}
                    </span>
                    <span className="text-xs text-red-400 font-bold">VIP</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    VIP Plan includes direct 1-on-1 calls with Tech Arush
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400" />
                    <span>Complete Practical Frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400" />
                    <span>Private Student WhatsApp Circle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400" />
                    <span>50GB+ Templates & Pitch Assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-red-400" />
                    <span>VIP: Direct 1-on-1 Calls with Founder</span>
                  </div>
                </div>

                <button
                  onClick={() => openPaymentModal(track)}
                  className="solid-btn-primary w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Enroll in Course (From ₹{LIFETIME_PRO_PRICE})</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Instant WhatsApp Onboarding</span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/25 flex items-start gap-2.5 text-xs text-slate-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {INCOME_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Framework Milestones Breakdown */}
      <section id="curriculum-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Skill Framework & Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Step-by-step practical frameworks designed to get you paying clients.
            </p>
          </div>
          <span className="text-xs font-bold font-mono px-3.5 py-1.5 rounded-full bg-red-950 text-red-400 border border-red-500/40">
            Practical Roadmaps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {track.modules.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#0d0d12] p-6 rounded-3xl border border-red-500/20 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                  Phase {idx + 1}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-red-400" />
                  {m.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                {m.title}
              </h3>

              <div className="pt-2 border-t border-white/10 space-y-1.5">
                {m.lessons.map((lesson, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables & Assets Pack */}
      {track.deliverables && track.deliverables.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#0d0d12] p-8 rounded-3xl border border-red-500/25 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-red-950 text-red-400 border border-red-500/40">
                <DownloadCloud className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Included Templates & Client Pitch Assets
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Pre-configured contracts, DM templates, and project starter kits included with enrollment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {track.deliverables.map((d, dIdx) => (
                <div
                  key={dIdx}
                  className="p-4 rounded-2xl bg-black border border-red-500/20 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-200 truncate pr-2">
                    {d}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-white flex-shrink-0 px-2.5 py-0.5 rounded-full bg-red-600">
                    {isAdmin ? "Admin Unlocked" : "Included"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Bottom CTA */}
      <div className="fixed bottom-6 inset-x-0 z-40 max-w-xl mx-auto px-4">
        <div className="p-3 sm:p-4 rounded-full bg-black/90 backdrop-blur-md border border-red-500/40 flex items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
          <div className="pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">
              {slotsRemaining} Slots Left
            </span>
            <span className="text-xs sm:text-sm font-bold text-white truncate block">
              {track.title.split("&")[0].split("(")[0].trim()}
            </span>
          </div>

          {hasAccess ? (
            <button
              onClick={scrollToCurriculum}
              className="px-6 py-2.5 rounded-full solid-btn-primary text-xs font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-md transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enrolled • View Modules</span>
            </button>
          ) : (
            <button
              onClick={() => openPaymentModal(track)}
              className="px-6 py-2.5 rounded-full solid-btn-primary text-xs font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all"
            >
              <span>Enroll (₹{LIFETIME_PRO_PRICE})</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
