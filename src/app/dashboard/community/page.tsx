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
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900">
      
      {/* SINGLE MASTER COMMUNITY BANNER (CLEAN EMERALD & WHITE) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Banner Top Badge & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                isAdmin
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : isAccepted
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : isPending
                  ? "bg-amber-50 text-amber-800 border-amber-300 animate-pulse"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}>
                {isAdmin
                  ? "Super Admin Master Access"
                  : isAccepted
                  ? "✓ VIP Access Approved"
                  : isPending
                  ? "🕒 15 Minutes Under The Roof"
                  : "🔒 VIP Guild Access Locked"}
              </span>

              <span className="text-xs text-slate-500 font-mono">
                Official 0.1% Circle
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              0.1% Community — Master VIP WhatsApp Guild
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              One master encrypted circle bringing together members across all skill programs for direct feedback, deal flow, and client outreach alpha.
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-emerald-600 shadow-xs">
            <MessageCircle className="w-7 h-7 text-emerald-600" />
          </div>
        </div>

        {/* STATE 1: MASTER ADMIN */}
        {isAdmin && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Director Administrative Controls</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                You have permanent administrative access to the official 0.1% WhatsApp community. You can join the group, copy the invitation link, or manage pending student admissions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={MASTER_WHATSAPP_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="solid-btn-primary px-7 py-3.5 rounded-full text-xs font-black flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Open WhatsApp Community</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>

              <button
                onClick={handleCopyLink}
                className="px-5 py-3.5 rounded-full border border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? "Link Copied!" : "Copy Invite Link"}</span>
              </button>

              <Link
                href="/admin/whatsapp-bridge"
                className="px-5 py-3.5 rounded-full border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Open Student Approval Desk</span>
              </Link>
            </div>
          </div>
        )}

        {/* STATE 2: ACCEPTED STUDENT (ACCESS GRANTED) */}
        {!isAdmin && isAccepted && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Your Community Access Is Officially Approved!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Welcome to the 0.1% Guild! Your payment has been verified by the Director and your seat is unlocked. Click below to enter the private WhatsApp community and introduce yourself.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={MASTER_WHATSAPP_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="solid-btn-primary px-7 py-4 rounded-full text-sm font-black flex items-center gap-2.5 shadow-md shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Join WhatsApp Community</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>

              <button
                onClick={handleCopyLink}
                className="px-5 py-4 rounded-full border border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? "Link Copied!" : "Copy WhatsApp Link"}</span>
              </button>
            </div>

            {/* Guild Principles */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Deal Feedback</span>
                </div>
                <p className="text-xs text-slate-600 font-normal">
                  Get prompt feedback on client proposals, cold email copy, and portfolio showcases.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cross-Niche Collabs</span>
                </div>
                <p className="text-xs text-slate-600 font-normal">
                  Web builders team up with video editors and designers to deliver high-ticket contracts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero Spam Guarantee</span>
                </div>
                <p className="text-xs text-slate-600 font-normal">
                  Strictly moderated. High signal-to-noise for serious digital builders only.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: PENDING STUDENT ("15 MINUTES UNDER THE ROOF") */}
        {!isAdmin && isPending && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                <span>You Are Just Being Invited — 15 Minutes Under The Roof</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                We have received your payment verification. The Director is currently verifying your payment details. You are just being invited: within <strong className="text-slate-900">15 minutes under the roof</strong>, our team will accept your profile and your official <strong className="text-slate-900">Join WhatsApp Community</strong> button will unlock right here on this banner.
              </p>
            </div>

            {/* 3 Step Visual Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>1. Payment Submitted</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Lifetime Access UTR recorded.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>2. Director Acceptance</span>
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                </div>
                <p className="text-xs text-amber-700 font-normal">
                  Under 15 minutes review in progress...
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>3. WhatsApp Button</span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Unlocks automatically right here once accepted.
                </p>
              </div>
            </div>

            {/* Refresh Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>No need to send manual WhatsApp messages. Your link displays automatically.</span>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-emerald-500 bg-white text-xs font-bold text-slate-800 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Checking Status..." : "Refresh Approval Status"}</span>
              </button>
            </div>
          </div>
        )}

        {/* STATE 4: UNPAID GUEST */}
        {isUnpaid && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Reserved for 0.1% Guild Members</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Access to the closed 0.1% WhatsApp community is restricted to enrolled students. Get lifetime access to high-income skill programs, direct client acquisition playbooks, and mentorship from ₹{LIFETIME_PRO_PRICE} one-time.
              </p>
            </div>

            <button
              onClick={() => openPaymentModal()}
              className="solid-btn-primary px-7 py-4 rounded-full text-sm font-black flex items-center gap-2.5 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <span>Unlock Master VIP WhatsApp (From ₹{LIFETIME_PRO_PRICE})</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

      </div>

      {/* Community Details / FAQ */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-slate-900">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>How Does WhatsApp Access Work?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Why a Single Master Community?</span>
            <p>
              Instead of scattering conversations across disconnected channels, all guild tracks are united under one roof. Video editors find software developers, designers find copywriters, and deals get closed faster.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">How Long Does Approval Take?</span>
            <p>
              Once you submit your UPI transaction, our Director verifies the payment within 15 minutes. Once accepted, your &quot;Join WhatsApp Community&quot; button lights up right on this page.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
