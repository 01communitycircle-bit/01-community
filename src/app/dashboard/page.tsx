"use client";

import React, { useState } from "react";
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
  ArrowRight
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { currentUser, tracks, results } = useApp();
  const isAdmin = currentUser.role === "admin";

  const userResults = results.filter(r => r.studentId === currentUser.id);

  // For students: their specific course (1 Student = 1 Course). For admin: all tracks.
  const enrolledTrack = tracks.find(t =>
    currentUser.enrolledTracks.includes(t.id)
  ) || tracks[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto bg-white text-[#091540]">
      
      {/* COURSE / BATCH ACCESS SECTION */}
      {isAdmin ? (
        /* SUPER ADMIN ALL BATCHES ACCESS */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
                <span>Admin Master Access • All Batches Unlocked</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight">
                All Active Skill Batches & Cohorts ({tracks.length})
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                You have master access to every course syllabus, module roadmap, and deliverable vault across the entire platform.
              </p>
            </div>

            <Link
              href="/admin/courses"
              className="px-5 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-white" />
              <span>Manage Batches in Studio</span>
            </Link>
          </div>

          {/* Grid of all batches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map(t => (
              <div
                key={t.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#1B2CC1] transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                      {t.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Admin Unlocked</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#091540] tracking-tight">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium">
                    {t.shortDesc}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500">Modules: {t.modules.length}</span>
                    <span className="font-mono text-[#091540] font-bold">Target: {t.averageEarnings.split("/")[0]}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/tracks/${t.id}`}
                    className="px-4 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Open Syllabus</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </Link>

                  <a
                    href="https://chat.whatsapp.com/0point1percent-vip-invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-full border border-slate-200 text-xs font-bold text-[#091540] hover:bg-slate-50 flex items-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp VIP</span>
                  </a>
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
              <div className="p-2.5 rounded-2xl bg-slate-100 text-[#091540] border border-slate-200 flex-shrink-0">
                <BookOpen className="w-5 h-5 text-[#1B2CC1]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Your Enrolled Program (1 Student = 1 Course)
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#091540] tracking-tight">
                  {enrolledTrack.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase block">Target Income</span>
              <span className="text-base font-bold text-[#091540] font-mono mt-1 block">{enrolledTrack.averageEarnings}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase block">Access Tier</span>
              <span className="text-base font-bold text-[#091540] mt-1 block">₹999 Lifetime</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase block">Community VIP Circle</span>
              <span className="text-base font-bold text-[#1B2CC1] mt-1 block">
                {currentUser.whatsappStatus === "joined" ? "Active Member ✓" : "Pending (~15m)"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. "GET FAMOUS" & PUBLISH RESULTS SPOTLIGHT */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
              <Award className="w-3.5 h-3.5 text-[#1B2CC1]" />
              <span>Public Street Credibility • Wall of Fame</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight">
              Get Known & Publish Your Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium max-w-xl">
              Whenever you close a client, receive a payout, or scale a channel, publish your proof on the public Wall of Fame to build your reputation.
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Link
              href="/dashboard/submit-result"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow flex-shrink-0 transition-all"
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
              <p className="text-xs text-slate-500 font-medium">
                No results published yet. Tap the button above to upload your first payout receipt.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userResults.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#091540] font-mono">{r.currencyLabel}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{r.createdAt}</span>
                  </div>
                  <h5 className="text-xs font-bold text-[#091540] mt-1">{r.title}</h5>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
