"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { SkillTrack } from "../../lib/types";
import { MASTER_WHATSAPP_INVITE_URL } from "../../lib/constants";
import {
  CreditCard,
  Users,
  MessageCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PlusCircle,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Eye,
  X,
  FileCheck2,
  ImageIcon,
  BookOpen
} from "lucide-react";

export default function AdminOverviewPage() {
  const {
    transactions,
    whatsappQueue,
    tracks,
    totalRegisteredUsers,
    totalPurchasedStudents,
    handleAddCourse,
    handleDeleteCourse,
    handleUpdateWhatsAppStatus
  } = useApp();

  // Modal states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedUtrId, setCopiedUtrId] = useState<string | null>(null);
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // New Course / Batch Form State
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newBatchName, setNewBatchName] = useState("Cohort 2026");
  const [newCourseBadge, setNewCourseBadge] = useState("High Demand");
  const [newCourseEarnings, setNewCourseEarnings] = useState("₹60,000 - ₹2,00,000 / mo");
  const [newCourseDesc, setNewCourseDesc] = useState("");

  const totalRevenue = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const totalRegisteredStudents = transactions.length;
  const pendingApprovalsCount = whatsappQueue.filter(q => q.status === "pending_add").length;

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

  const handleCreateCourseOrBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const slug = newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const trackItem: SkillTrack = {
      id: slug || `track-${Date.now()}`,
      title: `${newCourseTitle} (${newBatchName})`,
      price: 999,
      currency: "INR",
      shortDesc: newCourseDesc || "Comprehensive step-by-step masterclasses, templates, and closed VIP WhatsApp access.",
      fullDesc: newCourseDesc || "Learn production-level skills with high-converting client outreach frameworks.",
      badge: newCourseBadge,
      averageEarnings: newCourseEarnings,
      modulesCount: 4,
      studentsCount: 1,
      tags: ["High-Income", "Community", "Templates"],
      modules: [
        { title: "Module 1: Skill Foundations & Setup", duration: "2h 00m", lessons: ["Core principles", "Workflow setup"] },
        { title: "Module 2: Client Outreach & Portfolio", duration: "2h 30m", lessons: ["Pitch templates", "Landing first deal"] },
      ],
      deliverables: ["Curated Resource Kit", "Client Contract SLA Agreement", "Pitch DM Templates"]
    };

    handleAddCourse(trackItem);
    setIsCourseModalOpen(false);
    setNewCourseTitle("");
    setNewCourseDesc("");
  };

  return (
    <div className="space-y-10 text-[#091540] bg-white">
      
      {/* 5 PRIMARY ADMIN METRICS CARDS (PURE WHITE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Registered Users */}
        <div className="solid-card p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Registered Users</span>
            <div className="p-2 rounded-xl bg-[#091540] text-white">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#091540]">
            {totalRegisteredUsers.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-[#1B2CC1] font-bold">Platform</span>
            <span>registered accounts</span>
          </div>
        </div>

        {/* Students Who Purchased */}
        <div className="solid-card p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Students Who Purchased</span>
            <div className="p-2 rounded-xl bg-[#091540] text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#091540]">
            {totalPurchasedStudents.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">₹999 VIP Plan</span>
            <span>verified members</span>
          </div>
        </div>

        {/* Total Revenue Generated */}
        <div className="solid-card p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Revenue Generated</span>
            <div className="p-2 rounded-xl bg-[#091540] text-white">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#091540] font-mono">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-[#091540] font-bold">{transactions.length} Buyers</span>
            <span>(₹999 fee)</span>
          </div>
        </div>

        {/* WhatsApp VIP Approvals Required */}
        <div className="solid-card p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Approvals</span>
            <div className="p-2 rounded-xl bg-[#091540] text-white">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#091540]">
            {pendingApprovalsCount}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span>Awaiting UTR verification</span>
          </div>
        </div>

        {/* Total Website Courses / Batches */}
        <div className="solid-card p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Batches</span>
            <div className="p-2 rounded-xl bg-[#091540] text-white">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#091540]">
            {tracks.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-[#091540] font-bold">Live on website</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: PAID STUDENTS & 1-CLICK WHATSAPP APPROVAL DESK */}
      <div className="solid-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#091540] text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091540]">
                Course Buyers & WhatsApp VIP Approval Desk
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Inspect 12-digit UTR receipts, copy WhatsApp numbers, and approve VIP community addition.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
              {whatsappQueue.length} Total Enrolled
            </span>
          </div>
        </div>

        {/* Queue Items */}
        <div className="pt-6 space-y-4">
          {whatsappQueue.map(item => {
            const isCopied = copiedId === item.id;
            const isUtrCopied = copiedUtrId === item.id;
            const cleanPhone = item.studentPhone.replace(/[^0-9]/g, "");
            const utr = item.utrNumber || (item.notes?.match(/\d{12}/)?.[0] || "");

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#f8fbff] border border-slate-200 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                {/* Student Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm font-black text-[#091540]">{item.studentName}</h3>
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
                      {item.trackName.split("(")[0].trim()}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Paid: {item.paidAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span>{item.studentEmail}</span>
                  </div>

                  {/* UTR Reference & Payment Screenshot Pill */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {utr ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-mono font-bold text-[#091540]">
                        <FileCheck2 className="w-3.5 h-3.5 text-[#1B2CC1]" />
                        <span>UTR: {utr}</span>
                        <button
                          onClick={() => copyUtr(utr, item.id)}
                          className="p-0.5 text-slate-400 hover:text-[#091540]"
                          title="Copy UTR"
                        >
                          {isUtrCopied ? <Check className="w-3 h-3 text-[#1B2CC1]" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-400 font-mono">
                        UTR: Not specified
                      </span>
                    )}

                    {/* Screenshot Modal Trigger */}
                    {item.screenshotUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewScreenshot(item.screenshotUrl || null)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold text-[#091540] border border-slate-300 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#1B2CC1]" />
                        <span>View Payment Screenshot</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions & WhatsApp Web (CAPSULE BUTTONS) */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  
                  {/* Phone Copy Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 text-xs text-[#091540] font-mono font-bold">
                    <span>{item.studentPhone}</span>
                    <button
                      onClick={() => copyPhone(item.studentPhone, item.id)}
                      className="p-1 text-slate-400 hover:text-[#091540] transition-colors"
                      title="Copy Number"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-[#1B2CC1]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Primary 1-Click Accept Button */}
                  {item.status !== "joined" ? (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "joined")}
                      className="px-5 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Accept Student</span>
                    </button>
                  ) : (
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Access Granted ✓</span>
                    </span>
                  )}

                  {/* Optional Direct WhatsApp Chat */}
                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(item.studentName)},%20welcome%20to%200.1%25%20Community!%20Your%20%E2%82%B9999%20payment%20(UTR:%20${encodeURIComponent(utr || "Verified")})%20is%20approved.%20Here%20is%20your%20Master%20VIP%20WhatsApp%20Circle%20link:%20${encodeURIComponent(MASTER_WHATSAPP_INVITE_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-[#091540] text-xs font-bold transition-all"
                    title="Send WhatsApp message directly"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>

                  {/* Revert if needed */}
                  {item.status === "joined" && (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "pending_add")}
                      className="px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 text-[10px] font-bold"
                      title="Revert to pending"
                    >
                      Revert
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: LIVE WEBSITE COURSE & BATCH MANAGEMENT STUDIO (PURE WHITE) */}
      <div className="solid-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#091540] text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091540]">
                Website Course & Batch Studio
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Add new skill masterclasses or batches live to the website, or delete outdated batches.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCourseModalOpen(true)}
            className="solid-btn-primary px-5 py-2.5 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Add New Course / Batch</span>
          </button>
        </div>

        {/* Existing Courses Grid (PURE WHITE CARDS) */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map(t => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-[#f8fbff] border border-slate-200 hover:border-[#1B2CC1] transition-all space-y-3 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
                    {t.badge}
                  </span>
                  <span className="text-xs font-black text-[#091540] font-mono">
                    ₹{t.price}
                  </span>
                </div>

                <h3 className="text-sm font-black text-[#091540] mt-2 line-clamp-1">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-normal">
                  {t.shortDesc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">
                  {t.modules.length} Modules
                </span>

                <button
                  onClick={() => handleDeleteCourse(t.id)}
                  className="p-1.5 text-rose-600 hover:text-rose-800 rounded-lg transition-colors cursor-pointer font-bold flex items-center gap-1"
                  title="Delete Course from Website"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP: ADD COURSE / BATCH MODAL (PURE WHITE) */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1B2CC1]" />
                <h3 className="text-base font-black text-[#091540]">
                  Add Course / Batch to Website
                </h3>
              </div>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#091540] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCourseOrBatch} className="space-y-4 text-xs text-[#091540]">
              <div>
                <label className="block font-bold mb-1 text-[#091540]">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. AI Automation & Agents"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#091540] focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#091540]">
                  Batch Label
                </label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="e.g. Batch 1 - November 2026"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#091540] focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#091540]">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={newCourseBadge}
                  onChange={(e) => setNewCourseBadge(e.target.value)}
                  placeholder="e.g. High Demand, Trending"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#091540] focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#091540]">
                  Target Graduate Earnings
                </label>
                <input
                  type="text"
                  value={newCourseEarnings}
                  onChange={(e) => setNewCourseEarnings(e.target.value)}
                  placeholder="e.g. ₹70,000 - ₹2,50,000 / mo"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#091540] focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-[#091540]">
                  Course Description
                </label>
                <textarea
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  rows={2}
                  placeholder="What will students learn in this course?"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-normal resize-none focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="solid-btn-primary px-5 py-2.5 text-xs font-bold rounded-full shadow-md cursor-pointer"
                >
                  Publish Course to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP: PAYMENT SCREENSHOT LIGHTBOX (PURE WHITE) */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#1B2CC1]" />
                <h3 className="text-sm font-black text-[#091540]">
                  Uploaded Payment Proof Screenshot
                </h3>
              </div>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-[#091540] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[70vh] flex items-center justify-center bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewScreenshot}
                alt="Payment proof screenshot"
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2">
              <span>Compare UTR number with bank statement</span>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="solid-btn-primary px-4 py-1.5 text-xs font-bold rounded-full"
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
