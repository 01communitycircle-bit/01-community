"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { MASTER_WHATSAPP_INVITE_URL } from "../../../lib/constants";
import {
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Eye,
  X,
  FileCheck2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Trash2,
  Award,
  BookOpen,
  PhoneCall
} from "lucide-react";

export default function WhatsAppBridgePage() {
  const {
    whatsappQueue,
    handleUpdateWhatsAppStatus,
    handleDeleteEnrollment
  } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedUtrId, setCopiedUtrId] = useState<string | null>(null);
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);

  const copyPhone = (phone: string, id: string) => {
    try {
      navigator.clipboard.writeText(phone);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const copyUtr = (utr: string, id: string) => {
    try {
      navigator.clipboard.writeText(utr);
      setCopiedUtrId(id);
      setTimeout(() => setCopiedUtrId(null), 2000);
    } catch {}
  };

  const pendingCount = whatsappQueue.filter(q => q.status === "pending_add").length;
  const joinedCount = whatsappQueue.filter(q => q.status === "joined").length;

  return (
    <div className="space-y-8 text-white">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d12] border border-red-500/20 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-500/40 text-xs font-bold text-red-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
          <span>Student Approval & Verification Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Direct UPI Triage & VIP WhatsApp Access
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed font-medium">
          Verify 12-digit UPI UTR numbers against bank receipts. When you click <strong className="text-white">Accept Student & Grant Access</strong>, the student&apos;s dashboard automatically unlocks the Master WhatsApp Community join link. No manual messaging required.
        </p>
      </div>

      {/* 2 Status Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#0d0d12] p-6 rounded-3xl border border-red-500/20 shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Pending Acceptance (&quot;15 mins under roof&quot;)</span>
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {pendingCount}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Awaiting your one-click acceptance
          </p>
        </div>

        <div className="bg-[#0d0d12] p-6 rounded-3xl border border-red-500/20 shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accepted VIP Members</span>
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {joinedCount}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            WhatsApp link unlocked on their dashboard
          </p>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-[#0d0d12] p-6 sm:p-8 rounded-3xl border border-red-500/20 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-base font-black text-white">
            Student Verification Queue ({whatsappQueue.length} Total Enrolled)
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Fast Action Desk
          </span>
        </div>

        <div className="space-y-3">
          {whatsappQueue.map(item => {
            const isCopied = copiedId === item.id;
            const isUtrCopied = copiedUtrId === item.id;
            const cleanPhone = item.studentPhone.replace(/[^0-9]/g, "");
            const utr = item.utrNumber || (item.notes?.match(/\d{12}/)?.[0] || "");
            const isApproved = item.status === "joined";

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-black border border-white/10 hover:border-red-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">
                      {item.studentName}
                    </span>

                    {/* Pro vs VIP Plan Badge */}
                    {item.planType === "vip" ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)] flex items-center gap-1">
                        <Award className="w-3 h-3 text-white" />
                        VIP Plan (₹1,499) • 1-on-1 Calls
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800 text-slate-200 border border-white/20 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-red-400" />
                        Pro Plan (₹999)
                      </span>
                    )}

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-500/40">
                      {item.trackName.split("(")[0].trim()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Paid • {item.paidAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-mono">
                    {item.studentEmail}
                  </div>

                  {/* UTR & Screenshot */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {utr ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-white/15 text-xs font-mono font-bold text-white">
                        <FileCheck2 className="w-3.5 h-3.5 text-red-400" />
                        <span>UTR: {utr}</span>
                        <button
                          onClick={() => copyUtr(utr, item.id)}
                          className="p-0.5 text-slate-400 hover:text-white"
                          title="Copy UTR"
                        >
                          {isUtrCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-neutral-900 text-slate-500 font-mono">
                        UTR: Not specified
                      </span>
                    )}

                    {item.screenshotUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewScreenshot(item.screenshotUrl || null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-red-400" />
                        <span>View Screenshot</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* WhatsApp & Status Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-white/15 text-xs font-mono font-bold text-slate-200">
                    <span>{item.studentPhone}</span>
                    <button
                      onClick={() => copyPhone(item.studentPhone, item.id)}
                      className="p-0.5 text-slate-400 hover:text-white"
                      title="Copy phone"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Primary 1-Click Accept Button */}
                  {!isApproved ? (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "joined")}
                      className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Accept Student & Grant Access</span>
                    </button>
                  ) : (
                    <span className="px-4 py-2 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Access Granted (Active)</span>
                    </span>
                  )}

                  {/* Optional WhatsApp Link */}
                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(item.studentName)},%20welcome%20to%200.1%25%20Community!%20Your%20enrollment%20for%20${encodeURIComponent(item.trackName)}%20(UTR:%20${encodeURIComponent(utr || "Verified")})%20is%20approved.%20Here%20is%20your%20Master%20VIP%20WhatsApp%20Circle%20link:%20${encodeURIComponent(MASTER_WHATSAPP_INVITE_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/15 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all"
                    title="Send WhatsApp message directly"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {/* Reject / Delete Request Button */}
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete and reject this enrollment request from ${item.studentName}? This will permanently remove it from the database.`)) {
                        handleDeleteEnrollment(item.id);
                      }
                    }}
                    className="p-2 rounded-full border border-red-500/30 hover:bg-red-950 text-red-400 text-xs font-bold transition-all cursor-pointer"
                    title="Reject & Delete enrollment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Reset/Pending Toggle */}
                  {isApproved && (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "pending_add")}
                      className="px-3 py-1.5 rounded-full border border-white/10 text-slate-500 hover:text-slate-300 text-[10px] font-bold transition-all"
                      title="Revert to pending"
                    >
                      Revert
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {whatsappQueue.length === 0 && (
            <div className="py-8 text-center text-slate-500 text-xs">
              No students waiting for verification.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Screenshot */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#0d0d12] border border-red-500/40 p-6 rounded-3xl space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-black text-white">
                Payment Screenshot Receipt
              </h3>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-black rounded-2xl p-2 border border-white/10">
              <img
                src={previewScreenshot}
                alt="Payment proof screenshot"
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
