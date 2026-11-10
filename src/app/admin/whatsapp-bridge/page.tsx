"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import {
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Eye,
  X,
  FileCheck2
} from "lucide-react";

export default function WhatsAppBridgePage() {
  const {
    whatsappQueue,
    handleUpdateWhatsAppStatus
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
  const inviteSentCount = whatsappQueue.filter(q => q.status === "invite_sent").length;
  const joinedCount = whatsappQueue.filter(q => q.status === "joined").length;

  return (
    <div className="space-y-8 bg-white text-[#091540]">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
          <MessageCircle className="w-3.5 h-3.5 text-[#1B2CC1]" />
          <span>Manual WhatsApp VIP Onboarding Bridge</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#091540] tracking-tight">
          Direct UPI Triage & VIP Verification Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed font-medium">
          Verify 12-digit UPI UTR numbers against bank notifications. Click one button to open direct WhatsApp web pre-filled with the student&apos;s VIP group invite link.
        </p>
      </div>

      {/* 3 Status Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Pending Addition
          </div>
          <div className="text-3xl font-black text-[#091540] mt-1">
            {pendingCount}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Awaiting manual UTR confirmation
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Invite Sent (In Transit)
          </div>
          <div className="text-3xl font-black text-[#091540] mt-1">
            {inviteSentCount}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Invite link dispatched to phone
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Joined WhatsApp Circle
          </div>
          <div className="text-3xl font-black text-[#091540] mt-1">
            {joinedCount}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Fully active VIP students
          </p>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-base font-black text-[#091540]">
            Verification & Approval Queue ({whatsappQueue.length} Total Enrolled)
          </h2>
          <span className="text-xs text-slate-500 font-medium font-mono">
            Fast Action Desk
          </span>
        </div>

        <div className="space-y-3">
          {whatsappQueue.map(item => {
            const isCopied = copiedId === item.id;
            const isUtrCopied = copiedUtrId === item.id;
            const cleanPhone = item.studentPhone.replace(/[^0-9]/g, "");
            const utr = item.utrNumber || (item.notes?.match(/\d{12}/)?.[0] || "");

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-bold text-[#091540]">
                      {item.studentName}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                      {item.trackName.split("(")[0].trim()}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ₹999 Paid • {item.paidAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    {item.studentEmail}
                  </div>

                  {/* UTR & Screenshot */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {utr ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-[#091540]">
                        <FileCheck2 className="w-3.5 h-3.5 text-[#1B2CC1]" />
                        <span>UTR: {utr}</span>
                        <button
                          onClick={() => copyUtr(utr, item.id)}
                          className="p-0.5 text-slate-400 hover:text-[#091540]"
                          title="Copy UTR"
                        >
                          {isUtrCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-50 text-slate-400 font-mono">
                        UTR: Not specified
                      </span>
                    )}

                    {item.screenshotUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewScreenshot(item.screenshotUrl || null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-[#091540] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#1B2CC1]" />
                        <span>View Screenshot</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* WhatsApp & Status Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-[#091540]">
                    <span>{item.studentPhone}</span>
                    <button
                      onClick={() => copyPhone(item.studentPhone, item.id)}
                      className="p-0.5 text-slate-400 hover:text-[#091540]"
                      title="Copy phone"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(item.studentName)},%20welcome%20to%200.1%25%20Community!%20Your%20%E2%82%B9999%20enrollment%20for%20${encodeURIComponent(item.trackName)}%20(UTR:%20${encodeURIComponent(utr || "Verified")})%20is%20approved.%20Here%20is%20your%20private%20VIP%20WhatsApp%20Circle%20link:%20https://chat.whatsapp.com/0point1percent-vip-invite`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (item.status === "pending_add") {
                        handleUpdateWhatsAppStatus(item.id, "invite_sent");
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span>Send WhatsApp Invite</span>
                    <ExternalLink className="w-3 h-3 text-white" />
                  </a>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "pending_add")}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        item.status === "pending_add"
                          ? "bg-white text-[#091540] shadow-sm font-black"
                          : "text-slate-500 hover:text-[#091540]"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "invite_sent")}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        item.status === "invite_sent"
                          ? "bg-amber-100 text-amber-800 font-black shadow-sm"
                          : "text-slate-500 hover:text-[#091540]"
                      }`}
                    >
                      Sent
                    </button>
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "joined")}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        item.status === "joined"
                          ? "bg-emerald-100 text-emerald-800 font-black shadow-sm"
                          : "text-slate-500 hover:text-[#091540]"
                      }`}
                    >
                      Joined ✓
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Screenshot */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-none flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-2xl text-[#091540]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-black text-[#091540]">
                Payment Screenshot Receipt
              </h3>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[65vh] flex items-center justify-center bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewScreenshot}
                alt="Payment proof screenshot"
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="px-5 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold shadow-sm"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
