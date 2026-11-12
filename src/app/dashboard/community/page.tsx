"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../../context/AppContext";
import { MASTER_WHATSAPP_INVITE_URL, LIFETIME_PRO_PRICE, LIFETIME_VIP_PRICE, OFFICIAL_ADMIN_EMAIL } from "../../../lib/constants";
import {
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Lock,
  ArrowRight,
  RefreshCw,
  Users,
  Zap,
  HelpCircle
} from "lucide-react";

export default function WhatsAppCommunityPage() {
  const {
    currentUser,
    openPaymentModal
  } = useApp();
  const isAdmin = currentUser.role === "admin" || currentUser.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();
  const isAccepted = currentUser.isPro && (currentUser.whatsappStatus === "joined" || isAdmin);
  const isPending = currentUser.isPro && currentUser.whatsappStatus !== "joined" && !isAdmin;
  const isUnpaid = !currentUser.isPro && !isAdmin;

  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(MASTER_WHATSAPP_INVITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-white">
      
      {/* SINGLE MASTER COMMUNITY BANNER (EMERALD & OBSIDIAN LUXURY) */}
      <div className="bg-[#0c100e] rounded-3xl border border-emerald-500/20 p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Banner Top Badge & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                isAdmin
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
                  : isAccepted
                  ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/40"
                  : isPending
                  ? "bg-amber-950/80 text-amber-400 border-amber-500/40 animate-pulse"
                  : "bg-neutral-900 text-slate-400 border-white/10"
              }`}>
                {isAdmin
                  ? "Super Admin Master Access"
                  : isAccepted
                  ? "✓ VIP Access Approved"
                  : isPending
                  ? "🕒 15 Minutes Under The Roof"
                  : "🔒 VIP Guild Access Locked"}
              </span>

              <span className="text-xs text-slate-400 font-mono">
                Official 0.1% Circle
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              0.1% Community — Master VIP WhatsApp Guild
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              One master encrypted circle bringing together members across all skill programs for direct feedback, deal flow, and client outreach alpha.
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <MessageCircle className="w-7 h-7 text-emerald-400" />
          </div>
        </div>

        {/* STATE 1: MASTER ADMIN */}
        {isAdmin && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Director Administrative Controls</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                You have permanent administrative access to the official 0.1% WhatsApp community. You can join the group, copy the invitation link, or manage pending student admissions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={MASTER_WHATSAPP_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="solid-btn-primary px-7 py-3.5 rounded-full text-xs font-black flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Open WhatsApp Community</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>

              <button
                onClick={handleCopyLink}
                className="px-5 py-3.5 rounded-full border border-white/15 hover:border-emerald-500 bg-neutral-900 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? "Link Copied!" : "Copy Invite Link"}</span>
              </button>

              <Link
                href="/admin/whatsapp-bridge"
                className="px-5 py-3.5 rounded-full border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Open Student Approval Desk</span>
              </Link>
            </div>
          </div>
        )}

        {/* STATE 2: ACCEPTED STUDENT (ACCESS GRANTED) */}
        {!isAdmin && isAccepted && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Your Community Access Is Officially Approved!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Welcome to the 0.1% Guild! Your payment has been verified by the Director and your seat is unlocked. Click below to enter the private WhatsApp community and introduce yourself.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={MASTER_WHATSAPP_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="solid-btn-primary px-7 py-4 rounded-full text-sm font-black flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Join WhatsApp Community</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>

              <button
                onClick={handleCopyLink}
                className="px-5 py-4 rounded-full border border-white/15 hover:border-emerald-500 bg-neutral-900 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? "Link Copied!" : "Copy WhatsApp Link"}</span>
              </button>
            </div>

            {/* Guild Principles */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Deal Feedback</span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  Get prompt feedback on client proposals, cold email copy, and portfolio showcases.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cross-Niche Collabs</span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  Web builders team up with video editors and designers to deliver high-ticket contracts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Spam Guarantee</span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  Strictly moderated. High signal-to-noise for serious digital builders only.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: PENDING STUDENT ("15 MINUTES UNDER THE ROOF") */}
        {!isAdmin && isPending && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>You Are Just Being Invited — 15 Minutes Under The Roof</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                We have received your payment verification. The Director is currently verifying your payment details. You are just being invited: within <strong className="text-white">15 minutes under the roof</strong>, our team will accept your profile and your official <strong className="text-white">Join WhatsApp Community</strong> button will unlock right here on this banner.
              </p>
            </div>

            {/* 3 Step Visual Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>1. Payment Submitted</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  Lifetime Access UTR recorded.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>2. Director Acceptance</span>
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                </div>
                <p className="text-xs text-amber-200 font-normal">
                  Under 15 minutes review in progress...
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>3. WhatsApp Button</span>
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Unlocks automatically right here once accepted.
                </p>
              </div>
            </div>

            {/* Refresh Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No need to send manual WhatsApp messages. Your link displays automatically.</span>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-5 py-2.5 rounded-full border border-white/15 hover:border-emerald-500 bg-neutral-900 text-xs font-bold text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Checking Status..." : "Refresh Approval Status"}</span>
              </button>
            </div>
          </div>
        )}

        {/* STATE 4: UNPAID GUEST */}
        {isUnpaid && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Reserved for 0.1% Guild Members</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Access to the closed 0.1% WhatsApp community is restricted to enrolled students. Get lifetime access to high-income skill programs, direct client acquisition playbooks, and mentorship from ₹{LIFETIME_PRO_PRICE} one-time.
              </p>
            </div>

            <button
              onClick={() => openPaymentModal()}
              className="solid-btn-primary px-7 py-4 rounded-full text-sm font-black flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
            >
              <span>Unlock Master VIP WhatsApp (From ₹{LIFETIME_PRO_PRICE})</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

      </div>

      {/* Community Details / FAQ */}
      <div className="bg-[#0c100e] rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-white">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>How Does WhatsApp Access Work?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
            <span className="font-bold text-white block">Why a Single Master Community?</span>
            <p>
              Instead of scattering conversations across disconnected channels, all guild tracks are united under one roof. Video editors find software developers, designers find copywriters, and deals get closed faster.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
            <span className="font-bold text-white block">How Long Does Approval Take?</span>
            <p>
              Once you submit your UPI transaction, our Director verifies the payment within 15 minutes. Once accepted, your &quot;Join WhatsApp Community&quot; button lights up right on this page.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}