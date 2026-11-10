"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../../context/AppContext";
import {
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Users
} from "lucide-react";

export default function WhatsAppCommunityPage() {
  const { currentUser, tracks, whatsappQueue, handleUpdateWhatsAppStatus } = useApp();
  const isAdmin = currentUser.role === "admin";
  const [copiedBatch, setCopiedBatch] = useState<string | null>(null);

  const copyInvite = (trackTitle: string) => {
    try {
      navigator.clipboard.writeText("https://chat.whatsapp.com/0point1percent-vip-invite");
      setCopiedBatch(trackTitle);
      setTimeout(() => setCopiedBatch(null), 2000);
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white text-[#091540]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>{isAdmin ? "Super Admin Guild Hub" : "Locked VIP WhatsApp Community"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#091540] tracking-tight">
            {isAdmin ? "VIP WhatsApp Circles — All Batches Unlocked" : "Private VIP WhatsApp Circles"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-medium max-w-2xl">
            {isAdmin
              ? `You have master admin access to the private WhatsApp circles across all ${tracks.length} course batches. Manage student entries and open any circle directly.`
              : "Every 0.1% member is manually added to closed WhatsApp groups. Here you receive live feedback on client pitches, sample reviews, and direct doubts solving."}
          </p>
        </div>

        {isAdmin && (
          <Link
            href="/admin/whatsapp-bridge"
            className="px-5 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow transition-all flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>VIP Triage & Verification Desk</span>
          </Link>
        )}
      </div>

      {isAdmin ? (
        /* SUPER ADMIN ALL-BATCHES WHATSAPP MASTER GATEWAY */
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#091540]">
                  All Active Course WhatsApp VIP Circles ({tracks.length})
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Direct group entry links and invite dispatcher for each skill program.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                All Circles Active ✓
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map(t => {
                const isCopied = copiedBatch === t.id;
                const enrolledCount = whatsappQueue.filter(q => q.trackId === t.id).length || t.studentsCount || 40;

                return (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#1B2CC1] transition-all flex flex-col justify-between space-y-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                          {t.badge}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#1B2CC1]" />
                          {enrolledCount} VIP Members
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#091540]">
                        {t.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                        Target: {t.averageEarnings}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href="https://chat.whatsapp.com/0point1percent-vip-invite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                        <span>Launch Group</span>
                        <ExternalLink className="w-3 h-3 text-white" />
                      </a>

                      <button
                        onClick={() => copyInvite(t.id)}
                        className="px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        title="Copy Invite Link"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? "Copied" : "Copy Link"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* REGULAR STUDENT WHATSAPP CARD */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Your WhatsApp Onboarding Status
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-lg sm:text-xl font-black text-[#091540] font-mono">
                  {currentUser.phone || "+91 98765 00000"}
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  currentUser.whatsappStatus === "joined"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : currentUser.whatsappStatus === "invite_sent"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}>
                  {currentUser.whatsappStatus === "joined"
                    ? "✓ Verified Member in Group"
                    : currentUser.whatsappStatus === "invite_sent"
                    ? "Invite Sent via WhatsApp"
                    : "Pending Manual Addition by Admin"}
                </span>
              </div>
            </div>

            {/* Quick Simulation Button for user testing */}
            <div className="flex items-center gap-2">
              {currentUser.whatsappStatus !== "joined" && (
                <button
                  onClick={() => {
                    handleUpdateWhatsAppStatus(currentUser.id, "joined");
                  }}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                >
                  Simulate Admin Add to WhatsApp
                </button>
              )}
            </div>
          </div>

          {/* 3 Step Onboarding Flow */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#091540]">
                <span>Step 1: ₹999 Payment</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Payment confirmed. Instant trigger dispatched to community administration.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#091540]">
                <span>Step 2: Phone Verification</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Phone linked: {currentUser.phone || "Required"}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#091540]">
                <span>Step 3: Direct Guild Access</span>
                {currentUser.whatsappStatus === "joined" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {currentUser.whatsappStatus === "joined"
                  ? "Active in private WhatsApp circle."
                  : "Admin adding your number (~15 mins)."}
              </p>
            </div>
          </div>

          {/* WhatsApp Group CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#1B2CC1]" />
              <span>Encrypted WhatsApp group link reserved exclusively for verified members.</span>
            </div>

            {currentUser.whatsappStatus === "joined" ? (
              <a
                href="https://chat.whatsapp.com/0point1percent-vip-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Launch WhatsApp Group</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>
            ) : (
              <a
                href={`https://wa.me/919811122334?text=Hi%20Director,%20I%20am%20${encodeURIComponent(currentUser.name)}%20(${encodeURIComponent(currentUser.phone || "")}).%20Please%20approve%20my%20VIP%20WhatsApp%20access.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-[#091540] hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all"
              >
                <Clock className="w-3.5 h-3.5 text-[#1B2CC1]" />
                <span>Expedite via Director</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#1B2CC1]" />
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
