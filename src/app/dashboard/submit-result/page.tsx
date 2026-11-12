"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import { ResultItem } from "../../../lib/types";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  UploadCloud,
  Trash2,
  AlertCircle,
  FileImage,
  Edit3,
  Eye,
  X,
  FileCheck2,
  ExternalLink,
  Sparkles,
  Save,
  Lock,
  Clock
} from "lucide-react";
import { OFFICIAL_ADMIN_EMAIL } from "../../../lib/constants";

export default function SubmitResultPage() {
  const { results, currentUser, handlePublishResult, handleUpdateResult, handleDeleteResult, tracks } = useApp();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = currentUser.role === "admin" || currentUser.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();
  const isApprovedMember = isAdmin || (currentUser.isPro && currentUser.whatsappStatus === "joined");

  // Filter student's own achievements (by UUID or Google email)
  const myResults = results.filter(r =>
    (r.studentId && r.studentId === currentUser.id) ||
    (r.studentEmail && currentUser.email && r.studentEmail.toLowerCase() === currentUser.email.toLowerCase())
  );

  // New Result Form State
  const [title, setTitle] = useState("");
  const [amountINR, setAmountINR] = useState<number>(25000);
  const [currencyLabel, setCurrencyLabel] = useState("₹25,000 ($300)");
  const [category, setCategory] = useState<string>(tracks[0]?.id || "video-editing");
  const [description, setDescription] = useState("");
  const [proofImageUrl, setProofImageUrl] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedFileSize, setUploadedFileSize] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [clientCountry, setClientCountry] = useState("United States 🇺🇸");
  const [sourcePlatform, setSourcePlatform] = useState<"Upwork" | "Fiverr" | "Direct Client" | "YouTube" | "Remote Job" | "X / Twitter">("Direct Client");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Edit Result Modal State
  const [editingResult, setEditingResult] = useState<ResultItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmountINR, setEditAmountINR] = useState<number>(0);
  const [editCurrencyLabel, setEditCurrencyLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTrackId, setEditTrackId] = useState("");
  const [editClientCountry, setEditClientCountry] = useState("");
  const [editSourcePlatform, setEditSourcePlatform] = useState<any>("Direct Client");
  const [editProofImageUrl, setEditProofImageUrl] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Lightbox Preview State
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null | undefined>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5MB");
      return;
    }

    setUploadError("");
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProofImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProofImageUrl("");
    setUploadedFileName("");
    setUploadedFileSize("");
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setEditProofImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApprovedMember) {
      alert("Only approved members can publish results.");
      return;
    }
    if (!title.trim() || !description.trim() || !proofImageUrl) {
      alert("Please fill all required fields and upload your proof receipt screenshot.");
      return;
    }

    setIsSubmitting(true);
    const selectedTrack = tracks.find(t => t.id === category) || tracks[0];

    setTimeout(async () => {
      await handlePublishResult({
        title: title.trim(),
        amountINR: Number(amountINR) || 0,
        currencyLabel: currencyLabel || `₹${Number(amountINR).toLocaleString("en-IN")}`,
        trackId: selectedTrack.id,
        trackTitle: selectedTrack.title,
        category: selectedTrack.id,
        description: description.trim(),
        proofImageUrl,
        clientCountry,
        sourcePlatform,
        featured: false
      });

      setIsSubmitting(false);
      setTitle("");
      setDescription("");
      setProofImageUrl("");
      setUploadedFileName("");
      setUploadedFileSize("");
      setSuccessBanner("Proof of Work successfully published to the public Wall of Fame!");

      setTimeout(() => {
        setSuccessBanner(null);
      }, 5000);
    }, 600);
  };

  const openEditModal = (res: ResultItem) => {
    setEditingResult(res);
    setEditTitle(res.title);
    setEditAmountINR(res.amountINR);
    setEditCurrencyLabel(res.currencyLabel);
    setEditDescription(res.description);
    setEditTrackId(res.trackId);
    setEditClientCountry(res.clientCountry || "India 🇮🇳");
    setEditSourcePlatform(res.sourcePlatform || "Direct Client");
    setEditProofImageUrl(res.proofImageUrl || "");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult) return;

    setIsSavingEdit(true);
    const selectedTrack = tracks.find(t => t.id === editTrackId) || tracks[0];

    await handleUpdateResult(editingResult.id, {
      title: editTitle,
      amountINR: Number(editAmountINR) || 0,
      currencyLabel: editCurrencyLabel,
      description: editDescription,
      trackId: selectedTrack.id,
      trackTitle: selectedTrack.title,
      category: selectedTrack.id,
      clientCountry: editClientCountry,
      sourcePlatform: editSourcePlatform,
      proofImageUrl: editProofImageUrl
    });

    setIsSavingEdit(false);
    setEditingResult(null);
    setSuccessBanner("Your achievement edits have been saved!");
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 text-white pb-12">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c100e] border border-emerald-500/20 shadow-2xl flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-400 mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wall of Fame Milestone Publisher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Publish Your Wins & Payout Proof
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed font-normal">
            Post your client milestones, screenshot proofs, and earnings. All approved submissions appear publicly on the Wall of Fame.
          </p>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Link
            href="/results"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/15 hover:border-emerald-500 bg-neutral-900 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm shrink-0"
          >
            <span>View Public Wall of Fame</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Success Banner */}
      {successBanner && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="p-1 text-emerald-400 hover:bg-emerald-900 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* GATING GUARD: ONLY ALLOW WHEN APPROVED */}
      {!isApprovedMember ? (
        <div className="bg-[#0c100e] p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            Approval Required
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Result Publishing Locked
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-normal">
            {currentUser.isPro
              ? "Your enrollment is currently pending verification under '15 Minutes Under The Roof'. You can publish client wins and payout proofs on the Wall of Fame once your payment has been approved and verified by the Director."
              : "You must be an active, verified member of the 0.1% Community Guild to publish client wins, earnings, and payout proof on the public Wall of Fame."}
          </p>

          <div className="pt-2">
            <Link
              href="/dashboard/community"
              className="solid-btn-primary px-7 py-3 rounded-full text-xs font-black inline-flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
            >
              <span>View Approval Status</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      ) : (
        /* 1. PUBLISH FORM (WHEN APPROVED) */
        <div className="bg-[#0c100e] p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-black text-white">
              Submit a New Achievement
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Fill in the payout details and upload your transaction receipt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Milestone Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                1. Milestone Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Closed ₹25,000 project for international client"
                className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Amount and Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  2. Numeric Value in INR (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={amountINR}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setAmountINR(val);
                    setCurrencyLabel(`₹${val.toLocaleString("en-IN")}`);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-mono font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Display Currency Label *
                </label>
                <input
                  type="text"
                  required
                  value={currencyLabel}
                  onChange={e => setCurrencyLabel(e.target.value)}
                  placeholder="e.g. ₹25,000"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-mono font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Track Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                3. Associated Skill Track *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-bold text-white bg-black/80 cursor-pointer focus:outline-none focus:border-emerald-500"
              >
                {tracks.map(t => (
                  <option key={t.id} value={t.id} className="bg-black text-white">
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform and Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  4. Client Source Platform *
                </label>
                <select
                  value={sourcePlatform}
                  onChange={e => setSourcePlatform(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-bold text-white bg-black/80 cursor-pointer focus:outline-none focus:border-emerald-500"
                >
                  <option value="Direct Client" className="bg-black text-white">Direct Client (Cold Email / Inbound)</option>
                  <option value="Upwork" className="bg-black text-white">Upwork</option>
                  <option value="Fiverr" className="bg-black text-white">Fiverr</option>
                  <option value="X / Twitter" className="bg-black text-white">X / Twitter DM</option>
                  <option value="YouTube" className="bg-black text-white">YouTube Sponsorship</option>
                  <option value="Remote Job" className="bg-black text-white">Remote Job Payout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  5. Client Country *
                </label>
                <input
                  type="text"
                  required
                  value={clientCountry}
                  onChange={e => setClientCountry(e.target.value)}
                  placeholder="e.g. United States 🇺🇸, India 🇮🇳, UK 🇬🇧"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                6. How Did You Close This Deal? *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explain the strategy: cold outreach template, WhatsApp community feedback, portfolio presentation, or pricing negotiation..."
                className="w-full px-4 py-3 rounded-xl border border-white/15 text-xs sm:text-sm font-normal text-white bg-black/60 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Screenshot Proof File Upload */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  7. Payout Screenshot Proof *
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  PNG, JPG, WEBP (Max 5MB)
                </span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {!proofImageUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/15 hover:border-emerald-500 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-black/60 hover:bg-emerald-950/20 flex flex-col items-center justify-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/15 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500 flex items-center justify-center transition-colors shadow-xs">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-white">
                    Click to select payment receipt / screenshot
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal">
                    Direct client bank deposit, Upwork payout, Stripe transfer, or PayPal confirmation
                  </p>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="mt-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all border border-white/15"
                  >
                    Choose Image File
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-white/15 bg-black/60 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileImage className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs font-bold text-white truncate">
                        {uploadedFileName || "Payout Screenshot"}
                      </span>
                      {uploadedFileSize && (
                        <span className="text-[11px] text-slate-500 font-mono">
                          ({uploadedFileSize})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 rounded-full border border-white/15 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-slate-200 transition-colors"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="p-1 rounded-full text-emerald-400 hover:bg-emerald-950 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full max-h-64 rounded-xl overflow-hidden border border-white/10 bg-neutral-950 flex items-center justify-center">
                    <img
                      src={proofImageUrl}
                      alt="Payout proof preview"
                      className="max-h-64 w-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Submitted directly to Wall of Fame</span>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="solid-btn-primary w-full sm:w-auto px-7 py-3 rounded-full text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)] disabled:opacity-50"
              >
                <span>{isSubmitting ? "Publishing..." : "Publish Payout Proof"}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. PREVIOUSLY PUBLISHED WINS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Your Published Achievements ({myResults.length})
            </h2>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Review and edit your past milestones or update proof screenshots.
            </p>
          </div>
        </div>

        {myResults.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-[#0c100e] border border-emerald-500/20 shadow-xl space-y-2">
            <Award className="w-8 h-8 text-slate-600 mx-auto mb-1" />
            <h3 className="text-sm font-bold text-white">No achievements published under your ID yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Use the form above to post your first client win. Once published, you can edit or update it anytime from this section.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myResults.map(res => (
              <div
                key={res.id}
                className="bg-[#0c100e] p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-base font-black text-white font-mono">
                      {res.currencyLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                        {res.trackTitle.split("&")[0].split("(")[0].trim()}
                      </span>
                      {res.verified ? (
                        <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                          Verified ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-full bg-neutral-900 border border-white/10">
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2">
                    &ldquo;{res.title}&rdquo;
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
                    {res.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono pt-1">
                    <span>{res.sourcePlatform}</span>
                    <span>•</span>
                    <span>{res.clientCountry}</span>
                    <span>•</span>
                    <span>{res.createdAt}</span>
                  </div>

                  {/* Proof Screenshot Thumbnail */}
                  {res.proofImageUrl && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setPreviewScreenshot(res.proofImageUrl)}
                        className="inline-flex items-center gap-2 p-1.5 rounded-xl border border-white/15 hover:border-emerald-500 bg-black/60 text-xs font-bold text-emerald-400 transition-all cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={res.proofImageUrl}
                          alt="Proof"
                          className="w-10 h-8 object-cover rounded-lg"
                        />
                        <span className="flex items-center gap-1 pr-1.5 text-[11px]">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Receipt</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(res)}
                    className="px-4 py-2 rounded-full border border-white/15 hover:border-emerald-500 bg-neutral-900 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Edit Milestone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${res.title}" from the Wall of Fame?`)) {
                        handleDeleteResult(res.id);
                      }
                    }}
                    className="p-2 rounded-full text-emerald-400 hover:bg-emerald-950 transition-colors cursor-pointer"
                    title="Delete achievement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. EDIT ACHIEVEMENT MODAL */}
      {editingResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0c100e] border border-emerald-500/40 shadow-2xl text-white max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Edit Milestone</h3>
                  <span className="text-[10px] text-slate-400 font-normal">Update details or change proof receipt</span>
                </div>
              </div>
              <button
                onClick={() => setEditingResult(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Amount INR (₹)</label>
                  <input
                    type="number"
                    required
                    value={editAmountINR}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setEditAmountINR(val);
                      setEditCurrencyLabel(`₹${val.toLocaleString("en-IN")}`);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-mono font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Display Label</label>
                  <input
                    type="text"
                    required
                    value={editCurrencyLabel}
                    onChange={e => setEditCurrencyLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-mono font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Guild Track</label>
                <select
                  value={editTrackId}
                  onChange={e => setEditTrackId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-bold text-white bg-black/80 cursor-pointer focus:outline-none focus:border-emerald-500"
                >
                  {tracks.map(t => (
                    <option key={t.id} value={t.id} className="bg-black text-white">{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Platform</label>
                  <select
                    value={editSourcePlatform}
                    onChange={e => setEditSourcePlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-bold text-white bg-black/80 cursor-pointer focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Direct Client" className="bg-black text-white">Direct Client</option>
                    <option value="Upwork" className="bg-black text-white">Upwork</option>
                    <option value="Fiverr" className="bg-black text-white">Fiverr</option>
                    <option value="X / Twitter" className="bg-black text-white">X / Twitter</option>
                    <option value="YouTube" className="bg-black text-white">YouTube</option>
                    <option value="Remote Job" className="bg-black text-white">Remote Job</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Client Country</label>
                  <input
                    type="text"
                    required
                    value={editClientCountry}
                    onChange={e => setEditClientCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black/60 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deal Strategy & Description</label>
                <textarea
                  required
                  rows={3}
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-normal text-white bg-black/60 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Proof Image Change */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Proof Screenshot</label>
                <input
                  type="file"
                  ref={editFileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleEditImageFileChange}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  {editProofImageUrl && (
                    <img
                      src={editProofImageUrl}
                      alt="Current Proof"
                      className="w-14 h-12 object-cover rounded-xl border border-white/15"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-full border border-white/15 hover:border-emerald-500 bg-neutral-900 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                  >
                    Replace Image
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2.5 rounded-full border border-white/15 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="solid-btn-primary px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>{isSavingEdit ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. LIGHTBOX PREVIEW MODAL */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-[#0c100e] rounded-3xl p-5 border border-emerald-500/40 shadow-2xl space-y-3 text-white">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" />
                <span>Client Payout Receipt Screenshot</span>
              </span>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-2xl border border-white/10 bg-black flex items-center justify-center p-2">
              <img
                src={previewScreenshot}
                alt="Proof Full Size"
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}