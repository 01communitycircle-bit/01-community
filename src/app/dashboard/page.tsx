"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { MASTER_WHATSAPP_INVITE_URL } from "../../lib/constants";
import {
  MessageCircle,
  ExternalLink,
  Clock,
  PlusCircle,
  Award,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Settings,
  Layers,
  ArrowRight,
  PhoneCall,
  Flame,
  AlertTriangle
} from "lucide-react";
import {
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE
} from "../../lib/constants";

export default function DashboardOverviewPage() {
  const {
    currentUser,
    tracks,
    results,
    openPaymentModal,
    daysRemaining,
    urgencyNotice
  } = useApp();
  const isAdmin = currentUser.role === "admin";

  const userResults = results.filter(r => r.studentId === currentUser.id);

  // For students: their specific course (1 Student = 1 Course). For admin: all tracks.
  const enrolledTrack = tracks.find(t =>
    currentUser.enrolledTracks.includes(t.id)
  ) || tracks[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-900">
      
      {/* COURSE / BATCH ACCESS SECTION */}
      {isAdmin ? (
        /* SUPER ADMIN ALL BATCHES ACCESS */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin Master Access • All Batches Unlocked</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                All Active Skill Batches & Cohorts ({tracks.length})
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                You have master access to every skill roadmap, client framework, and deliverable vault across the entire platform.
              </p>
            </div>

            <Link
              href="/admin/courses"
              className="px-5 py-2.5 rounded-full border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-emerald-600" />
              <span>Manage Batches in Studio</span>
            </Link>
          </div>

          {/* Grid of all batches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map(t => (
              <div
                key={t.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {t.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Admin Unlocked</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 tracking-tight">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-normal">
                    {t.shortDesc}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500">Guild Vault: Active</span>
                    <span className="font-mono text-emerald-700 font-bold">Scope: {t.averageEarnings}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <Link
                    href={`/tracks/${t.id}`}
                    className="solid-btn-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Access Guild Program</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </Link>

                  <Link
                    href="/dashboard/community"
                    className="px-3.5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:border-emerald-300 hover:bg-white flex items-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp VIP</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* REGULAR STUDENT: STRICT 1 STUDENT = 1 COURSE */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Your Enrolled Program (1 Student = 1 Course)
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {enrolledTrack.title}
                </h3>
              </div>
            </div>

            <Link
              href={`/tracks/${enrolledTrack.id}`}
              className="solid-btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <span>Access Guild Program</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase block">Realistic Scope</span>
              <span className="text-base font-bold text-emerald-700 font-mono mt-1 block">{enrolledTrack.averageEarnings}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase block">Access Status</span>
              <span className="text-base font-bold text-slate-900 mt-1 block">
                30-Day Guild Pass • {daysRemaining} Days Left
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase block">Community VIP Circle</span>
              <span className="text-base font-bold text-emerald-700 mt-1 block">
                {currentUser.whatsappStatus === "joined" ? "Active Member ✓" : "Pending (~15m)"}
              </span>
            </div>
          </div>

          {/* 30-Day Guild Pass Live Countdown & Expiration System */}
          <div className={`mt-6 p-5 sm:p-6 rounded-2xl border transition-all ${
            urgencyNotice.isUrgent
              ? urgencyNotice.level === "critical" || urgencyNotice.level === "expired"
                ? "bg-red-50/70 border-red-300"
                : "bg-amber-50/70 border-amber-300"
              : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
                    urgencyNotice.level === "critical" || urgencyNotice.level === "expired"
                      ? "bg-red-600 text-white"
                      : urgencyNotice.isUrgent
                      ? "bg-amber-600 text-white"
                      : "bg-emerald-600 text-white"
                  }`}>
                    {urgencyNotice.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    Live Cycle: Day {Math.min(30, Math.max(1, 30 - daysRemaining + 1))} of 30
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {urgencyNotice.message}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 font-normal">
                  {daysRemaining > 0
                    ? `Your 30-day guild pass is actively running (${daysRemaining} days left). Re-enrollment unlocks specifically after 30 days once your pass expires.`
                    : "Your 30-day pass has expired. You can now re-enroll and buy the course again to regain access."}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {daysRemaining > 0 ? (
                  <div className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 flex items-center gap-2 shadow-xs cursor-default">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Plan Active ({daysRemaining}d Left)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => openPaymentModal(enrolledTrack)}
                    className="px-6 py-2.5 rounded-full text-xs font-black bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/25 flex items-center gap-2 cursor-pointer transition-all animate-pulse"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Pass Expired • Buy Course Again ({currentUser.planType === "vip" ? "₹1,499" : "₹999"})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar (30 Days Cycle) */}
            <div className="mt-4 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  daysRemaining <= 3
                    ? "bg-red-600"
                    : daysRemaining <= 10
                    ? "bg-amber-500"
                    : "bg-emerald-600"
                }`}
                style={{ width: `${Math.min(100, Math.max(0, ((30 - daysRemaining) / 30) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. "GET FAMOUS" & PUBLISH RESULTS SPOTLIGHT */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Public Street Credibility • Wall of Fame</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Get Known & Publish Your Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal max-w-xl">
              Whenever you close a client, receive a payout, or scale a channel, publish your proof on the public Wall of Fame to build your reputation.
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Link
              href="/dashboard/submit-result"
              className="solid-btn-primary w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm flex-shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Publish New Result / Payout</span>
            </Link>
          </div>
        </div>

        {/* Existing results list */}
        <div className="pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Your Published Milestones ({userResults.length})
          </h4>

          {userResults.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-normal">
                No results published yet. Tap the button above to upload your first payout receipt.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userResults.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-emerald-700 font-mono">{r.currencyLabel}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{r.createdAt}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 mt-1">{r.title}</h5>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
