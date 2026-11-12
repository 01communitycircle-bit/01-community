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
    <div className="space-y-8 text-slate-900">
      
      {/* 5 PRIMARY ADMIN METRICS CARDS (WHITE & EMERALD) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Registered Users - Interactive Link to User Directory */}
        <Link
          href="/admin/students"
          className="p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          title="Click to view all registered users and manage accounts"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-emerald-700 transition-colors">
              Total Registered Users
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {totalRegisteredUsers.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-between font-medium">
            <span className="text-emerald-700 font-bold">Platform Accounts</span>
            <span className="text-[10px] text-slate-400 group-hover:text-emerald-600 flex items-center gap-0.5">
              Manage →
            </span>
          </div>
        </Link>

        {/* Students Who Purchased */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Students Who Purchased</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {totalPurchasedStudents.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">Verified Guild</span>
            <span>enrolled members</span>
          </div>
        </div>

        {/* Total Revenue Generated */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Revenue Generated</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">{transactions.length} Buyers</span>
            <span>(₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE})</span>
          </div>
        </div>

        {/* WhatsApp VIP Approvals Required */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Approvals</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {pendingApprovalsCount}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className={pendingApprovalsCount > 0 ? "text-amber-600 font-bold" : "text-slate-500"}>
              {pendingApprovalsCount > 0 ? "Needs Verification" : "All Verified"}
            </span>
          </div>
        </div>

        {/* Total Website Courses / Batches */}
        <div className="p-5 rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Programs</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {tracks.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">Live on platform</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: PAID STUDENTS & 1-CLICK WHATSAPP APPROVAL DESK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Course Buyers & WhatsApp VIP Approval Desk
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Inspect 12-digit UTR receipts, verify Pro vs VIP plan tiers, and approve student dashboard access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
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
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                {/* Student Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm font-black text-slate-900">{item.studentName}</h3>

                    {/* Pro vs VIP Plan Badge */}
                    {item.planType === "vip" ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                        <Award className="w-3 h-3 text-white" />
                        VIP Plan (₹1,499)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-emerald-600" />
                        Pro Plan (₹999)
                      </span>
                    )}

                    <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.trackName.split("(")[0].trim()}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Paid: {item.paidAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-mono">
                    <span>{item.studentEmail}</span>
                  </div>

                  {/* UTR Reference & Payment Screenshot Pill */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {utr ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-900 shadow-2xs">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>UTR: {utr}</span>
                        <button
                          onClick={() => copyUtr(utr, item.id)}
                          className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Copy UTR"
                        >
                          {isUtrCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">
                        UTR: Not specified
                      </span>
                    )}

                    {/* Screenshot Modal Trigger */}
                    {item.screenshotUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewScreenshot(item.screenshotUrl || null)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold text-emerald-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3 h-3 text-emerald-600" />
                        <span>View Payment Proof Screenshot</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions & WhatsApp Web */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  
                  {/* Phone Copy Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 font-mono font-bold shadow-2xs">
                    <span>{item.studentPhone}</span>
                    <button
                      onClick={() => copyPhone(item.studentPhone, item.id)}
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Copy Number"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Primary 1-Click Accept Button */}
                  {item.status !== "joined" ? (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "joined")}
                      className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
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
                    href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(item.studentName)},%20welcome%20to%200.1%25%20Community!%20Your%20payment%20(UTR:%20${encodeURIComponent(utr || "Verified")})%20is%20approved.%20Here%20is%20your%20Master%20VIP%20WhatsApp%20Circle%20link:%20${encodeURIComponent(MASTER_WHATSAPP_INVITE_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-bold transition-all shadow-2xs"
                    title="Send WhatsApp message directly"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </a>

                  {/* Reject / Delete Request */}
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete and reject this enrollment request from ${item.studentName}?`)) {
                        handleDeleteEnrollment(item.id);
                      }
                    }}
                    className="p-2 rounded-full border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    title="Reject & Delete enrollment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Revert if needed */}
                  {item.status === "joined" && (
                    <button
                      onClick={() => handleUpdateWhatsAppStatus(item.id, "pending_add")}
                      className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-700 text-[10px] font-bold"
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
            <div className="py-8 text-center text-slate-400 text-xs">
              No students waiting for approval.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: LIVE WEBSITE PROGRAM & BATCH MANAGEMENT STUDIO */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Website Skill Programs & Batches
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Add new skill tracks or cohorts live to the platform, or remove outdated tracks.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCourseModalOpen(true)}
            className="px-5 py-2.5 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Add New Program / Batch</span>
          </button>
        </div>

        {/* Existing Courses Grid */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map(t => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {t.badge}
                  </span>
                  <span className="text-xs font-black text-emerald-700 font-mono">
                    ₹{t.price}
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 mt-2 line-clamp-1">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-normal">
                  {t.shortDesc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">
                  Guild Mentorship Track
                </span>

                <button
                  onClick={() => handleDeleteCourse(t.id)}
                  className="p-1.5 text-red-600 hover:text-red-700 rounded-lg transition-colors cursor-pointer font-bold flex items-center gap-1"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">
                  Add Program / Batch to Website
                </h3>
              </div>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCourseOrBatch} className="space-y-4 text-xs text-slate-600">
              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Program Name *
                </label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. AI Automation & Agents"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Batch Label
                </label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="e.g. Batch 1 - November 2026"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={newCourseBadge}
                  onChange={(e) => setNewCourseBadge(e.target.value)}
                  placeholder="e.g. High Demand, Trending"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Target Graduate Earnings (Realistic)
                </label>
                <input
                  type="text"
                  value={newCourseEarnings}
                  onChange={(e) => setNewCourseEarnings(e.target.value)}
                  placeholder="e.g. ₹20,000 - ₹25,000 / mo"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Program Description
                </label>
                <textarea
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  rows={2}
                  placeholder="What practical frameworks will students learn?"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-normal resize-none focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-900 transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">
                  Uploaded Payment Proof Screenshot
                </h3>
              </div>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[70vh] flex items-center justify-center bg-slate-50 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewScreenshot}
                alt="Payment proof screenshot"
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2">
              <span>Compare 12-digit UTR number with bank statement</span>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="px-4 py-1.5 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer"
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
