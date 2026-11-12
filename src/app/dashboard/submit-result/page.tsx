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
  Clock,
  Star
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
  const [communityRating, setCommunityRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
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
  const [editRating, setEditRating] = useState<number>(5);
  const [editHoverRating, setEditHoverRating] = useState<number | null>(null);
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
        rating: communityRating,
        featured: false
      });

      setIsSubmitting(false);
      setTitle("");
      setDescription("");
      setProofImageUrl("");
      setUploadedFileName("");
      setUploadedFileSize("");
      setCommunityRating(5);
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
    setEditRating(res.rating || 5);
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
      proofImageUrl: editProofImageUrl,
      rating: editRating
    });

    setIsSavingEdit(false);
    setEditingResult(null);
    setSuccessBanner("Your achievement edits have been saved!");
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900 pb-12">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Wall of Fame Milestone Publisher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Publish Your Wins & Payout Proof
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-normal">
            Post your client milestones, screenshot proofs, and earnings. All approved submissions appear publicly on the Wall of Fame.
          </p>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Link
            href="/results"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 hover:border-emerald-500 bg-slate-50 text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center justify-center gap-2 transition-all shadow-xs shrink-0"
          >
            <span>View Public Wall of Fame</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </div>

      {/* Success Banner */}
      {successBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="p-1 text-emerald-700 hover:bg-emerald-100 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* GATING GUARD: ONLY ALLOW WHEN APPROVED */}
      {!isApprovedMember ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
            <Lock className="w-8 h-8 text-emerald-600" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Approval Required
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Result Publishing Locked
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-normal">
            {currentUser.isPro
              ? "Your enrollment is currently pending verification under '15 Minutes Under The Roof'. You can publish client wins and payout proofs on the Wall of Fame once your payment has been approved and verified by the Director."
              : "You must be an active, verified member of the 0.1% Community Guild to publish client wins, earnings, and payout proof on the public Wall of Fame."}
          </p>

          <div className="pt-2">
            <Link
              href="/dashboard/community"
              className="px-7 py-3 rounded-full text-xs font-black inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              <span>View Approval Status</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      ) : (
        /* 1. PUBLISH FORM (WHEN APPROVED) */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900">
              Submit a New Achievement
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Fill in the payout details and upload your transaction receipt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Milestone Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                1. Milestone Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Closed ₹25,000 project for international client"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Amount and Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-medium text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Display Currency Label *
                </label>
                <input
                  type="text"
                  required
                  value={currencyLabel}
                  onChange={e => setCurrencyLabel(e.target.value)}
                  placeholder="e.g. ₹25,000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-medium text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Track Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. Associated Skill Track *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-white cursor-pointer focus:outline-none focus:border-emerald-500"
              >
                {tracks.map(t => (
                  <option key={t.id} value={t.id} className="text-slate-900">
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform and Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  4. Client Source Platform *
                </label>
                <select
                  value={sourcePlatform}
                  onChange={e => setSourcePlatform(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-white cursor-pointer focus:outline-none focus:border-emerald-500"
                >
                  <option value="Direct Client">Direct Client (Cold Email / Inbound)</option>
                  <option value="Upwork">Upwork</option>
                  <option value="Fiverr">Fiverr</option>
                  <option value="X / Twitter">X / Twitter DM</option>
                  <option value="YouTube">YouTube Sponsorship</option>
                  <option value="Remote Job">Remote Job Payout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  5. Client Country *
                </label>
                <input
                  type="text"
                  required
                  value={clientCountry}
                  onChange={e => setClientCountry(e.target.value)}
                  placeholder="e.g. United States 🇺🇸, India 🇮🇳, UK 🇬🇧"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                6. How Did You Close This Deal? *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explain the strategy: cold outreach template, WhatsApp community feedback, portfolio presentation, or pricing negotiation..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-normal text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 resize-none transition-colors"
              />
            </div>

            {/* 7. Community Star Rating (Out of 5 Stars with Cool Animation) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/90 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <label className="block text-xs font-black text-slate-900">
                    7. Rate 0.1% Community Guild & Mentorship (Out of 5 Stars) *
                  </label>
                  <p className="text-[11px] text-slate-600 font-normal">
                    Give your honest rating for the guild frameworks, assets, and mentorship.
                  </p>
                </div>
                <span className="text-xs font-mono font-black text-amber-900 bg-white px-2.5 py-1 rounded-full border border-amber-200 shadow-xs self-start sm:self-auto">
                  {communityRating}.0 / 5.0 Rating
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating !== null ? hoverRating : communityRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setCommunityRating(star)}
                      className="p-1 rounded-xl transition-all duration-200 transform hover:scale-125 active:scale-95 focus:outline-none cursor-pointer"
                      title={`${star} Star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`w-8 h-8 sm:w-9 sm:h-9 transition-all duration-150 ${
                          isFilled
                            ? "fill-amber-400 text-amber-400 drop-shadow-md scale-105"
                            : "text-slate-300 hover:text-amber-300 fill-slate-100"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-bold text-amber-900 bg-white/70 py-1.5 px-3 rounded-lg border border-amber-200/60">
                {communityRating === 5 && "★★★★★ 5.0 / 5 — Outstanding Mentorship & Production Frameworks"}
                {communityRating === 4 && "★★★★☆ 4.0 / 5 — Very Good Experience & Real Client Results"}
                {communityRating === 3 && "★★★☆☆ 3.0 / 5 — Good Curriculum & Helpful Resources"}
                {communityRating === 2 && "★★☆☆☆ 2.0 / 5 — Average Experience, Needs More Direct Calls"}
                {communityRating === 1 && "★☆☆☆☆ 1.0 / 5 — Needs Significant Improvement"}
              </div>
            </div>

            {/* Screenshot Proof File Upload */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  8. Payout Screenshot Proof *
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
                  className="w-full border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-slate-50/60 hover:bg-emerald-50/30 flex flex-col items-center justify-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-500 group-hover:text-emerald-600 group-hover:border-emerald-400 flex items-center justify-center transition-colors shadow-xs">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    Click to select payment receipt / screenshot
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Direct client bank deposit, Upwork payout, Stripe transfer, or PayPal confirmation
                  </p>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="mt-2 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-xs"
                  >
                    Choose Image File
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileImage className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-bold text-slate-900 truncate">
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
                        className="px-3 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-xs"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full max-h-64 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                    <img
                      src={proofImageUrl}
                      alt="Payout proof preview"
                      className="max-h-64 w-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="mt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Submitted directly to Wall of Fame</span>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-black flex items-center justify-center gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 disabled:opacity-50 transition-all"
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Your Published Achievements ({myResults.length})
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Review and edit your past milestones or update proof screenshots.
            </p>
          </div>
        </div>

        {myResults.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <Award className="w-8 h-8 text-slate-400 mx-auto mb-1" />
            <h3 className="text-sm font-bold text-slate-900">No achievements published under your ID yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Use the form above to post your first client win. Once published, you can edit or update it anytime from this section.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myResults.map(res => (
              <div
                key={res.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {res.currencyLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {res.trackTitle.split("&")[0].split("(")[0].trim()}
                      </span>
                      {res.verified ? (
                        <span className="text-[10px] font-bold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                          Verified ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                    &ldquo;{res.title}&rdquo;
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {res.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
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
                        className="inline-flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 text-xs font-bold text-emerald-700 transition-all cursor-pointer shadow-2xs"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={res.proofImageUrl}
                          alt="Proof"
                          className="w-10 h-8 object-cover rounded-lg border border-slate-200"
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
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(res)}
                    className="px-4 py-2 rounded-full border border-slate-200 hover:border-emerald-500 bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:text-emerald-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Edit Milestone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${res.title}" from the Wall of Fame?`)) {
                        handleDeleteResult(res.id);
                      }
                    }}
                    className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Edit3 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Edit Milestone</h3>
                  <span className="text-[10px] text-slate-500 font-normal">Update details or change proof receipt</span>
                </div>
              </div>
              <button
                onClick={() => setEditingResult(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount INR (₹)</label>
                  <input
                    type="number"
                    required
                    value={editAmountINR}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setEditAmountINR(val);
                      setEditCurrencyLabel(`₹${val.toLocaleString("en-IN")}`);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Label</label>
                  <input
                    type="text"
                    required
                    value={editCurrencyLabel}
                    onChange={e => setEditCurrencyLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Guild Track</label>
                <select
                  value={editTrackId}
                  onChange={e => setEditTrackId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white cursor-pointer focus:outline-none focus:border-emerald-500"
                >
                  {tracks.map(t => (
                    <option key={t.id} value={t.id} className="text-slate-900">{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Platform</label>
                  <select
                    value={editSourcePlatform}
                    onChange={e => setEditSourcePlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white cursor-pointer focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Direct Client">Direct Client</option>
                    <option value="Upwork">Upwork</option>
                    <option value="Fiverr">Fiverr</option>
                    <option value="X / Twitter">X / Twitter</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Remote Job">Remote Job</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client Country</label>
                  <input
                    type="text"
                    required
                    value={editClientCountry}
                    onChange={e => setEditClientCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deal Strategy & Description</label>
                <textarea
                  required
                  rows={3}
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-normal text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Star Rating in Edit */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">Community Guild Rating</label>
                  <span className="text-xs font-mono font-bold text-amber-900">{editRating}.0 / 5.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (editHoverRating !== null ? editHoverRating : editRating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setEditHoverRating(star)}
                        onMouseLeave={() => setEditHoverRating(null)}
                        onClick={() => setEditRating(star)}
                        className="p-1 rounded-lg transition-all duration-150 transform hover:scale-125 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors duration-150 ${
                            isFilled
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 fill-slate-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Proof Image Change */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proof Screenshot</label>
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
                      className="w-14 h-12 object-cover rounded-xl border border-slate-200"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-full border border-slate-200 hover:border-emerald-500 bg-white text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-xs"
                  >
                    Replace Image
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-3 text-slate-900">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Client Payout Receipt Screenshot</span>
              </span>
              <button
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
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
