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
  PhoneCall
} from "lucide-react";
import {
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE
} from "../../lib/constants";

export default function DashboardOverviewPage() {
  const { currentUser, tracks, results } = useApp();
  const isAdmin = currentUser.role === "admin";

  const userResults = results.filter(r => r.studentId === currentUser.id);

  // For students: their specific course (1 Student = 1 Course). For admin: all tracks.
  const enrolledTrack = tracks.find(t =>
    currentUser.enrolledTracks.includes(t.id)
  ) || tracks[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto bg-[#050706] text-white">
      
      {/* COURSE / BATCH ACCESS SECTION */}
      {isAdmin ? (
        /* SUPER ADMIN ALL BATCHES ACCESS */
        <div className="bg-[#0c100e] p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Master Access • All Batches Unlocked</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                All Active Skill Batches & Cohorts ({tracks.length})
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
                You have master access to every skill roadmap, client framework, and deliverable vault across the entire platform.
              </p>
            </div>

            <Link
              href="/admin/courses"
              className="px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-emerald-400" />
              <span>Manage Batches in Studio</span>
            </Link>
          </div>

          {/* Grid of all batches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map(t => (
              <div
                key={t.id}
                className="p-5 sm:p-6 rounded-2xl border border-emerald-500/20 bg-black/60 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      {t.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Admin Unlocked</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal">
                    {t.shortDesc}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-400">Guild Vault: Active</span>
                    <span className="font-mono text-emerald-400 font-bold">Scope: {t.averageEarnings}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/tracks/${t.id}`}
                    className="solid-btn-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Access Guild Program</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </Link>

                  <Link
                    href="/dashboard/community"
                    className="px-3.5 py-2 rounded-full border border-white/15 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp VIP</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* REGULAR STUDENT: STRICT 1 STUDENT = 1 COURSE */
        <div className="bg-[#0c100e] p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex-shrink-0">
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Your Enrolled Program (1 Student = 1 Course)
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {enrolledTrack.title}
                </h3>
              </div>
            </div>

            <Link
              href={`/tracks/${enrolledTrack.id}`}
              className="solid-btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2"
            >
              <span>Access Guild Program</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/20">
              <span className="text-xs text-slate-400 font-bold uppercase block">Realistic Scope</span>
              <span className="text-base font-bold text-emerald-400 font-mono mt-1 block">{enrolledTrack.averageEarnings}</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/20">
              <span className="text-xs text-slate-400 font-bold uppercase block">Access Status</span>
              <span className="text-base font-bold text-white mt-1 block">Pro Member • Lifetime</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/20">
              <span className="text-xs text-slate-400 font-bold uppercase block">Community VIP Circle</span>
              <span className="text-base font-bold text-emerald-400 mt-1 block">
                {currentUser.whatsappStatus === "joined" ? "Active Member ✓" : "Pending (~15m)"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. "GET FAMOUS" & PUBLISH RESULTS SPOTLIGHT */}
      <div className="bg-[#0c100e] p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-400 mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Public Street Credibility • Wall of Fame</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Get Known & Publish Your Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal max-w-xl">
              Whenever you close a client, receive a payout, or scale a channel, publish your proof on the public Wall of Fame to build your reputation.
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Link
              href="/dashboard/submit-result"
              className="solid-btn-primary w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex-shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Publish New Result / Payout</span>
            </Link>
          </div>
        </div>

        {/* Existing results list */}
        <div className="pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Your Published Milestones ({userResults.length})
          </h4>

          {userResults.length === 0 ? (
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center">
              <p className="text-xs text-slate-400 font-normal">
                No results published yet. Tap the button above to upload your first payout receipt.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userResults.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-black/60 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-emerald-400 font-mono">{r.currencyLabel}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{r.createdAt}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mt-1">{r.title}</h5>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}