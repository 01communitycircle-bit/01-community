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
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 pb-28">
      
      {/* Top Breadcrumb Nav */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/#tracks"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-xs hover:border-emerald-400"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>Back to All Courses</span>
        </Link>

        {isAdmin && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin Master Access Active</span>
          </span>
        )}
      </div>

      {/* Hero Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-slate-200/90 shadow-sm">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                {track.badge}
              </span>
              <span className="text-xs text-emerald-700 font-mono font-bold">
                Guild Framework Included
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Only {slotsRemaining} of {TOTAL_SLOTS_LIMIT} Slots Left
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {track.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {track.fullDesc || track.shortDesc}
            </p>

            {/* Average Graduate Earnings Reality */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Realistic Scope</span>
                <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">{track.averageEarnings}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Direct Mentor</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1 justify-end">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  VIP Calls
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="w-full lg:w-80 p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm text-slate-900 space-y-5 flex-shrink-0">
            {isAdmin ? (
              <>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Admin Master Control</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    All Access Granted
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    As Super Admin, you have unrestricted access to all materials, frameworks, and WhatsApp circles.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={scrollToCurriculum}
                    className="w-full py-3.5 px-6 rounded-full solid-btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Jump to Framework</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <Link
                    href="/admin/courses"
                    className="w-full py-2.5 px-6 rounded-full border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Manage in Course Studio</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Two Membership Options
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-900 font-mono">
                      ₹{LIFETIME_PRO_PRICE}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">Pro /</span>
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      ₹{LIFETIME_VIP_PRICE}
                    </span>
                    <span className="text-xs text-emerald-700 font-bold">VIP</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    VIP Plan includes direct 1-on-1 calls with Tech Arush
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Complete Practical Frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Private Student WhatsApp Circle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>50GB+ Templates & Pitch Assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>VIP: Direct 1-on-1 Calls with Founder</span>
                  </div>
                </div>

                <button
                  onClick={() => openPaymentModal(track)}
                  className="solid-btn-primary w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Enroll in Course (From ₹{LIFETIME_PRO_PRICE})</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant WhatsApp Onboarding</span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-slate-700">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {INCOME_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Framework Milestones Breakdown */}
      <section id="curriculum-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Skill Framework & Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Step-by-step practical frameworks designed to get you paying clients.
            </p>
          </div>
          <span className="text-xs font-bold font-mono px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Practical Roadmaps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {track.modules.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Phase {idx + 1}
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  {m.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {m.title}
              </h3>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                {m.lessons.map((lesson, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
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
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <DownloadCloud className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Included Templates & Client Pitch Assets
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Pre-configured contracts, DM templates, and project starter kits included with enrollment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {track.deliverables.map((d, dIdx) => (
                <div
                  key={dIdx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800 truncate pr-2">
                    {d}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-white flex-shrink-0 px-2.5 py-0.5 rounded-full bg-emerald-600">
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
        <div className="p-3 sm:p-4 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between gap-4 shadow-xl">
          <div className="pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
              {slotsRemaining} Slots Left
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
              {track.title.split("&")[0].split("(")[0].trim()}
            </span>
          </div>

          {hasAccess ? (
            <button
              onClick={scrollToCurriculum}
              className="px-6 py-2.5 rounded-full solid-btn-primary text-xs font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-sm transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Enrolled • View Modules</span>
            </button>
          ) : (
            <button
              onClick={() => openPaymentModal(track)}
              className="px-6 py-2.5 rounded-full solid-btn-primary text-xs font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-md shadow-emerald-500/20 transition-all"
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
