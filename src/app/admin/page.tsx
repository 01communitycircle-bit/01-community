"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { SkillTrack } from "../../lib/types";
import { MASTER_WHATSAPP_INVITE_URL, LIFETIME_PRO_PRICE, LIFETIME_VIP_PRICE } from "../../lib/constants";
import {
  Users,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Copy,
  Check,
  CheckCircle2,
  Trash2,
  BookOpen,
  PlusCircle,
  X,
  FileCheck2,
  Image as ImageIcon,
  Eye,
  Award
} from "lucide-react";

export default function AdminPage() {
  const {
    whatsappQueue,
    transactions,
    tracks,
    handleUpdateWhatsAppStatus,
    handleDeleteEnrollment,
    handleAddCourse,
    handleDeleteCourse,
    totalRegisteredUsers,
    totalPurchasedStudents
  } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedUtrId, setCopiedUtrId] = useState<string | null>(null);

  // Modal State for adding course
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseBadge, setNewCourseBadge] = useState("High Demand");
  const [newCourseEarnings, setNewCourseEarnings] = useState("₹20,000 - ₹25,000 / mo");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newBatchName, setNewBatchName] = useState("");

  // Modal State for Viewing Payment Screenshot
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);

  // Revenue calculation based on transactions
  const totalRevenue = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const pendingApprovalsCount = whatsappQueue.filter(q => q.status !== "joined").length;

  const copyPhone = (phone: string, id: string) => {
    try {
      const clean = phone.replace(/[^0-9]/g, "");
      navigator.clipboard.writeText(clean);
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

  const handleCreateCourseOrBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const baseSlug = newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const courseId = newBatchName
      ? `${baseSlug}-batch-${Date.now().toString().slice(-4)}`
      : baseSlug || `track-${Date.now()}`;

    const newCourse: SkillTrack = {
      id: courseId,
      title: newBatchName ? `${newCourseTitle} (${newBatchName})` : newCourseTitle,
      shortDesc: newCourseDesc || "Comprehensive step-by-step masterclasses, templates, and closed VIP WhatsApp access.",
      fullDesc: newCourseDesc || "Comprehensive practical curriculum designed for digital client acquisition.",
      badge: newCourseBadge || "Trending",
      price: LIFETIME_PRO_PRICE,
      currency: "INR",
      averageEarnings: newCourseEarnings || "₹20,000 - ₹25,000 / mo",
      modulesCount: 4,
      studentsCount: 0,
      tags: ["High-Income", "VIP WhatsApp", "Mentorship"],
      modules: [
        {
          title: "Module 1: Foundations & Architecture",
          duration: "2h 30m",
          lessons: ["System setup", "Core tooling", "Standard workflow"]
        },
        {
          title: "Module 2: Client Acquisition & Proposals",
          duration: "2h 00m",
          lessons: ["Finding clients", "Pitch templates", "Pricing retainers"]
        }
      ],
      deliverables: ["Curriculum Framework", "Cold Outreach Email Scripts", "Production Starter Kit"]
    };

    await handleAddCourse(newCourse);
    setIsCourseModalOpen(false);
    setNewCourseTitle("");
    setNewBatchName("");
    setNewCourseDesc("");
  };

  return (
    <div className="space-y-10 text-white">
      
      {/* 5 PRIMARY ADMIN METRICS CARDS (EMERALD & OBSIDIAN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Registered Users - Interactive Link to User Directory */}
        <Link
          href="/admin/students"
          className="p-5 rounded-3xl relative overflow-hidden bg-[#0c100e] border border-emerald-500/20 hover:border-emerald-500 shadow-2xl transition-all cursor-pointer group"
          title="Click to view all registered users and manage accounts"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
              Total Registered Users
            </span>
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {totalRegisteredUsers.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between font-medium">
            <span className="text-emerald-400 font-bold">Platform Accounts</span>
            <span className="text-[10px] text-slate-400 group-hover:text-white flex items-center gap-0.5">
              Manage →
            </span>
          </div>
        </Link>

        {/* Students Who Purchased */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Students Who Purchased</span>
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {totalPurchasedStudents.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-400 font-bold">Verified Guild</span>
            <span>enrolled members</span>
          </div>
        </div>

        {/* Total Revenue Generated */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Revenue Generated</span>
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-400 font-bold">{transactions.length} Buyers</span>
            <span>(₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE})</span>
          </div>
        </div>

        {/* WhatsApp VIP Approvals Required */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Approvals</span>
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {pendingApprovalsCount}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className={pendingApprovalsCount > 0 ? "text-amber-400 font-bold" : "text-slate-400"}>
              {pendingApprovalsCount > 0 ? "Needs Verification" : "All Verified"}
            </span>
          </div>
        </div>

        {/* Total Website Courses / Batches */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Programs</span>
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {tracks.length}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-400 font-bold">Live on platform</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: PAID STUDENTS & 1-CLICK WHATSAPP APPROVAL DESK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Course Buyers & WhatsApp VIP Approval Desk
              </h2>
              <p className="text-xs text-slate-400 font-normal">
                Inspect 12-digit UTR receipts, verify Pro vs VIP plan tiers, and approve student dashboard access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
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
                className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                {/* Student Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm font-black text-white">{item.studentName}</h3>

                    {/* Pro vs VIP Plan Badge */}
                    {item.planType === "vip" ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.7)] flex items-center gap-1">
                        <Award className="w-3 h-3 text-white" />
                        VIP Plan (₹1,499)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800 text-slate-200 border border-white/20 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-emerald-400" />
                        Pro Plan (₹999)
                      </span>
                    )}

                    <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      {item.trackName.split("(")[0].trim()}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Paid: {item.paidAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-mono">
                    <span>{item.studentEmail}</span>
                  </div>

                  {/* UTR Reference & Payment Screenshot Pill */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {utr ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/15 text-xs font-mono font-bold text-white">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
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
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-slate-500 font-mono">
                        UTR: Not specified
                      </span>
                    )}

                    {/* Screenshot Modal Trigger */}
                    {item.screenshotUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewScreenshot(item.screenshotUrl || null)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-slate-200 border border-white/15 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-emerald-400" />
                        <span>View Payment Proof Screenshot</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions & WhatsApp Web */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  
                  {/* Phone Copy Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-white/15 text-xs text-slate-200 font-mono font-bold">
                    <span>{item.studentPhone}</span>
                    <button
                      onClick={() => copyPhone(item.studentPhone, item.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy Number"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Primary 1-Click Accept Button */}
                  {item.status !== "joined" ? (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "joined")}
                      className="px-5 py-2 rounded-full solid-btn-primary text-white text-xs font-black flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Accept Student</span>
                    </button>
                  ) : (
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Access Granted ✓</span>
                    </span>
                  )}

                  {/* Optional Direct WhatsApp Chat */}
                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(item.studentName)},%20welcome%20to%200.1%25%20Community!%20Your%20payment%20(UTR:%20${encodeURIComponent(utr || "Verified")})%20is%20approved.%20Here%20is%20your%20Master%20VIP%20WhatsApp%20Circle%20link:%20${encodeURIComponent(MASTER_WHATSAPP_INVITE_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/15 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all"
                    title="Send WhatsApp message directly"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </a>

                  {/* Reject / Delete Request */}
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete and reject this enrollment request from ${item.studentName}?`)) {
                        handleDeleteEnrollment(item.id);
                      }
                    }}
                    className="p-2 rounded-full border border-red-500/30 hover:bg-red-950 text-red-400 text-xs font-bold transition-all cursor-pointer"
                    title="Reject & Delete enrollment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Revert if needed */}
                  {item.status === "joined" && (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "pending_add")}
                      className="px-2.5 py-1 rounded-full border border-white/10 text-slate-500 hover:text-slate-300 text-[10px] font-bold"
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
              No students waiting for approval.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: LIVE WEBSITE PROGRAM & BATCH MANAGEMENT STUDIO */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Website Skill Programs & Batches
              </h2>
              <p className="text-xs text-slate-400 font-normal">
                Add new skill tracks or cohorts live to the platform, or remove outdated tracks.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCourseModalOpen(true)}
            className="solid-btn-primary px-5 py-2.5 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Add New Program / Batch</span>
          </button>
        </div>

        {/* Existing Courses Grid (Obsidian Emerald Cards) */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map(t => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-emerald-500/50 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    {t.badge}
                  </span>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    ₹{t.price}
                  </span>
                </div>

                <h3 className="text-sm font-black text-white mt-2 line-clamp-1">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal">
                  {t.shortDesc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <span className="text-slate-400 font-medium">
                  Guild Mentorship Track
                </span>

                <button
                  onClick={() => handleDeleteCourse(t.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer font-bold flex items-center gap-1"
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

      {/* POPUP: ADD COURSE / BATCH MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0c100e] border border-emerald-500/40 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-black text-white">
                  Add Program / Batch to Website
                </h3>
              </div>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCourseOrBatch} className="space-y-4 text-xs text-slate-300">
              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Program Name *
                </label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. AI Automation & Agents"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Batch Label
                </label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="e.g. Batch 1 - November 2026"
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={newCourseBadge}
                  onChange={(e) => setNewCourseBadge(e.target.value)}
                  placeholder="e.g. High Demand, Trending"
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Target Graduate Earnings (Realistic)
                </label>
                <input
                  type="text"
                  value={newCourseEarnings}
                  onChange={(e) => setNewCourseEarnings(e.target.value)}
                  placeholder="e.g. ₹20,000 - ₹25,000 / mo"
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Program Description
                </label>
                <textarea
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  rows={2}
                  placeholder="What practical frameworks will students learn?"
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs font-normal resize-none focus:outline-none focus:border-emerald-500 text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="solid-btn-primary px-5 py-2.5 text-xs font-bold rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-pointer"
                >
                  Publish to Platform
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP: PAYMENT SCREENSHOT LIGHTBOX */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#0c100e] border border-emerald-500/40 p-6 rounded-3xl space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-black text-white">
                  Uploaded Payment Proof Screenshot
                </h3>
              </div>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[70vh] flex items-center justify-center bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewScreenshot}
                alt="Payment proof screenshot"
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-2">
              <span>Compare 12-digit UTR number with bank statement</span>
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