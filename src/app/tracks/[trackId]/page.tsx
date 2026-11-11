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
  Unlock
} from "lucide-react";

export default function TrackDetailPage() {
  const params = useParams();
  const trackId = params?.trackId as string;
  const { tracks, openPaymentModal, currentUser } = useApp();

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
    <div className="w-full min-h-screen bg-white text-[#091540] pb-28">
      
      {/* Top Breadcrumb Nav */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/#tracks"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#091540] hover:text-[#1B2CC1] transition-colors bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#091540]" />
          <span>Back to All Courses</span>
        </Link>

        {isAdmin && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>Admin Master Access Active</span>
          </span>
        )}
      </div>

      {/* Hero Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-slate-200 shadow-sm">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-[#091540] text-white">
                {track.badge}
              </span>
              <span className="text-xs text-[#1B2CC1] font-mono font-bold">
                {track.modules.length} Modules Included
              </span>
              {isAdmin && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Unlock className="w-3 h-3" />
                  <span>Full Admin Access</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#091540] tracking-tight leading-tight">
              {track.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {track.fullDesc || track.shortDesc}
            </p>

            {/* Average Graduate Earnings */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-bold block">Average Graduate Income</span>
                <span className="text-base sm:text-lg font-black text-[#091540] font-mono">{track.averageEarnings}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase font-bold block">Community Access</span>
                <span className="text-xs sm:text-sm font-bold text-[#1B2CC1]">VIP WhatsApp Circles</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Card (DARK BUTTONS) */}
          <div className="w-full lg:w-80 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-lg text-[#091540] space-y-5 flex-shrink-0">
            {isAdmin ? (
              <>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Admin Master Control</span>
                  </div>
                  <h3 className="text-lg font-black text-[#091540] mt-1">
                    All Access Granted
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    As Super Admin, you have unrestricted access to all modules, materials, and WhatsApp circles.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Curriculum & Updates Unlocked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Direct WhatsApp Group Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Client Templates Pack Downloadable</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={scrollToCurriculum}
                    className="w-full py-3.5 px-6 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Jump to Course Curriculum</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  {isAdmin && (
                    <Link
                      href="/admin/courses"
                      className="w-full py-2.5 px-6 rounded-full border border-slate-200 hover:bg-slate-50 text-[#091540] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#1B2CC1]" />
                      <span>Manage in Course Studio</span>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Course Fee (One-Time)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-[#091540] tracking-tight font-mono">
                      ₹999
                    </span>
                    <span className="text-xs text-slate-400 line-through font-mono font-bold">
                      ₹8,999
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Lifetime membership • Zero recurring charges
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-200 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Complete Curriculum & Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Direct WhatsApp Group Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Client Hunting Templates Pack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B2CC1]" />
                    <span>Post Wins on Wall of Fame</span>
                  </div>
                </div>

                <button
                  onClick={() => openPaymentModal(track)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Enroll In This Course (₹999)</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
                  <span>Instant WhatsApp verification ~15 mins</span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown */}
      <section id="curriculum-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#091540] tracking-tight">
              Course Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Step-by-step masterclass modules designed to get you paying clients.
            </p>
          </div>
          <span className="text-xs font-bold font-mono px-3.5 py-1.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
            {track.modules.length} Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {track.modules.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B2CC1]">
                  Module {idx + 1}
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-[#1B2CC1]" />
                  {m.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#091540]">
                {m.title}
              </h3>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                {m.lessons.map((lesson, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B2CC1] mt-1.5 flex-shrink-0"></span>
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
              <div className="p-2.5 rounded-2xl bg-slate-100 text-[#091540] border border-slate-200">
                <DownloadCloud className="w-5 h-5 text-[#1B2CC1]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#091540] tracking-tight">
                  Included Templates & Client Pitch Assets
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
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
                  <span className="text-xs font-bold text-[#091540] truncate pr-2">
                    {d}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-white flex-shrink-0 px-2 py-0.5 rounded-full bg-[#091540]">
                    {isAdmin ? "Admin Unlocked" : "Unlocked in VIP"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Bottom CTA (DARK CAPSULE BUTTON) */}
      <div className="fixed bottom-6 inset-x-0 z-40 max-w-xl mx-auto px-4">
        <div className="p-3 sm:p-4 rounded-full bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-xl">
          <div className="pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              {isAdmin ? "Super Admin Access" : "1 Student = 1 Course"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#091540] truncate block">
              {track.title.split("&")[0].split("(")[0].trim()}
            </span>
          </div>

          {hasAccess ? (
            <button
              onClick={scrollToCurriculum}
              className="px-6 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-md transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enrolled • View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          ) : (
            <button
              onClick={() => openPaymentModal(track)}
              className="px-6 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-md transition-all"
            >
              <span>Join VIP (₹999)</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
