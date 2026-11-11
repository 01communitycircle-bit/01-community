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
  Save
} from "lucide-react";

export default function SubmitResultPage() {
  const { results, currentUser, handlePublishResult, handleUpdateResult, handleDeleteResult, tracks } = useApp();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Filter student's own achievements (by UUID or Google email)
  const myResults = results.filter(r =>
    (r.studentId && r.studentId === currentUser.id) ||
    (r.studentEmail && currentUser.email && r.studentEmail.toLowerCase() === currentUser.email.toLowerCase())
  );

  // New Result Form State
  const [title, setTitle] = useState("");
  const [amountINR, setAmountINR] = useState<number>(75000);
  const [currencyLabel, setCurrencyLabel] = useState("₹75,000 ($900)");
  const [category, setCategory] = useState<string>("video-editing");
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

  const currentTrack = tracks.find(t => t.id === category) || tracks[0];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!proofImageUrl) {
      setUploadError("Please upload a payout screenshot proof before publishing.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      handlePublishResult({
        trackId: currentTrack.id,
        trackTitle: currentTrack.title,
        title: title || "New Student Client Payout",
        amountINR: Number(amountINR) || 50000,
        currencyLabel: currencyLabel || `₹${amountINR.toLocaleString("en-IN")}`,
        description: description || "Achieved this milestone through 0.1% Community outreach frameworks and peer feedback.",
        category,
        proofImageUrl,
        clientCountry,
        sourcePlatform,
        featured: false
      });

      setIsSubmitting(false);
      setSuccessBanner("Your achievement has been published to the Wall of Fame!");
      
      // Reset form fields
      setTitle("");
      setDescription("");
      setProofImageUrl("");
      setUploadedFileName("");
      setUploadedFileSize("");

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
    <div className="max-w-4xl mx-auto space-y-10 bg-white text-[#091540] pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
            <Award className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>Wall of Fame Milestone Publisher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#091540] tracking-tight">
            Publish Your Wins & Payout Proof
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Post your client milestones, screenshot proofs, and earnings. All submissions appear publicly on the Wall of Fame.
          </p>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Link
            href="/results"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#091540] flex items-center justify-center gap-2 transition-all shadow-xs shrink-0"
          >
            <span>View Public Wall of Fame</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Success Banner */}
      {successBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. PUBLISH FORM */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-[#091540]">
            Submit a New Achievement
          </h2>
          <p className="text-xs text-slate-500 font-medium">
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
              placeholder="e.g. Closed $1,200/mo retainer for US tech agency"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
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
                  setCurrencyLabel(`₹${val.toLocaleString("en-IN")} ($${Math.round(val / 83)})`);
                }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
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
                placeholder="e.g. ₹95,000 ($1,150)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
              />
            </div>
          </div>

          {/* Track Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              3. Associated Skill Course *
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-[#091540] bg-white cursor-pointer focus:outline-none focus:border-[#1B2CC1]"
            >
              {tracks.map(t => (
                <option key={t.id} value={t.id}>
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-[#091540] bg-white cursor-pointer focus:outline-none focus:border-[#1B2CC1]"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1] resize-none"
            />
          </div>

          {/* Screenshot Proof File Upload */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                7. Payout Screenshot Proof *
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
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
                className="w-full border-2 border-dashed border-slate-200 hover:border-[#1B2CC1] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-500 group-hover:text-[#1B2CC1] group-hover:border-[#1B2CC1] flex items-center justify-center transition-colors shadow-xs">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#091540]">
                  Click to select payment receipt / screenshot
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Direct client bank deposit, Upwork payout, Stripe transfer, or PayPal confirmation
                </p>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-2 px-4 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold shadow-xs transition-all"
                >
                  Choose Image File
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileImage className="w-4 h-4 text-[#1B2CC1] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#091540] truncate">
                      {uploadedFileName || "Payout Screenshot"}
                    </span>
                    {uploadedFileSize && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({uploadedFileSize})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-1 rounded-full text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full max-h-64 rounded-xl overflow-hidden border border-slate-200 bg-black/5 flex items-center justify-center">
                  <img
                    src={proofImageUrl}
                    alt="Payout proof preview"
                    className="max-h-64 w-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            )}

            {uploadError && (
              <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1B2CC1]" />
              <span>Visible on Wall of Fame</span>
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? "Publishing..." : "Publish Payout Proof"}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </div>

      {/* 2. PREVIOUSLY PUBLISHED WINS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#091540] tracking-tight">
              Your Published Achievements ({myResults.length})
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Review and edit your past milestones or update proof screenshots.
            </p>
          </div>
        </div>

        {myResults.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <Award className="w-8 h-8 text-slate-400 mx-auto mb-1" />
            <h3 className="text-sm font-bold text-[#091540]">No achievements published under your ID yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Use the form above to post your first client win. Once published, you can edit or update it anytime from this section.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myResults.map(res => (
              <div
                key={res.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-base font-black text-[#091540] font-mono">
                      {res.currencyLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                        {res.trackTitle.split("&")[0].split("(")[0].trim()}
                      </span>
                      {res.verified ? (
                        <span className="text-[10px] font-bold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                          Verified ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100">
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#091540] line-clamp-2">
                    &ldquo;{res.title}&rdquo;
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {res.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
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
                        className="inline-flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-[#1B2CC1] bg-slate-50 text-xs font-bold text-[#1B2CC1] transition-all cursor-pointer"
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
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(res)}
                    className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#091540] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#1B2CC1]" />
                    <span>Edit Milestone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${res.title}" from the Wall of Fame?`)) {
                        handleDeleteResult(res.id);
                      }
                    }}
                    className="p-2 rounded-full text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
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
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-[#091540] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-100 text-[#091540]">
                  <Edit3 className="w-4 h-4 text-[#1B2CC1]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#091540]">Edit Milestone</h3>
                  <span className="text-[10px] text-slate-500 font-medium">Update details or change proof receipt</span>
                </div>
              </div>
              <button
                onClick={() => setEditingResult(null)}
                className="p-1 rounded-full text-slate-400 hover:text-[#091540] hover:bg-slate-100 transition-colors cursor-pointer"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
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
                      setEditCurrencyLabel(`₹${val.toLocaleString("en-IN")} ($${Math.round(val / 83)})`);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Label</label>
                  <input
                    type="text"
                    required
                    value={editCurrencyLabel}
                    onChange={e => setEditCurrencyLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Track</label>
                <select
                  value={editTrackId}
                  onChange={e => setEditTrackId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#091540] bg-white cursor-pointer focus:outline-none focus:border-[#1B2CC1]"
                >
                  {tracks.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Platform</label>
                  <select
                    value={editSourcePlatform}
                    onChange={e => setEditSourcePlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#091540] bg-white cursor-pointer focus:outline-none focus:border-[#1B2CC1]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1] resize-none"
                />
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
                    className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#091540] transition-all cursor-pointer"
                  >
                    Replace Image
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#091540]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-6 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl p-4 border border-slate-200 shadow-2xl space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-[#091540] flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#1B2CC1]" />
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
