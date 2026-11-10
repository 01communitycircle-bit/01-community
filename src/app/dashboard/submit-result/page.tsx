"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

export default function SubmitResultPage() {
  const { handlePublishResult, tracks } = useApp();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amountINR, setAmountINR] = useState<number>(75000);
  const [currencyLabel, setCurrencyLabel] = useState("₹75,000 / month ($900)");
  const [category, setCategory] = useState<string>("video-editing");
  const [description, setDescription] = useState("");
  const [proofImageUrl, setProofImageUrl] = useState("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80");
  const [clientCountry, setClientCountry] = useState("United States 🇺🇸");
  const [sourcePlatform, setSourcePlatform] = useState<"Upwork" | "Fiverr" | "Direct Client" | "YouTube" | "Remote Job" | "X / Twitter">("Direct Client");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentTrack = tracks.find(t => t.id === category) || tracks[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/results");
      }, 1500);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 bg-white text-[#091540]">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
          <Award className="w-3.5 h-3.5 text-[#1B2CC1]" />
          <span>Wall of Fame Milestone Publisher</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#091540] tracking-tight">
          Publish Your Client Wins & Payout Proof
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-medium">
          Upload your earnings milestone, screenshot receipt, and client country. Once posted, it appears directly on the public Wall of Fame to showcase your street credibility.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#091540] tracking-tight">
            Proof of Work Published!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
            Your earnings milestone is live on the public Wall of Fame. Redirecting you to the showcase feed...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
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

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              4. How Did You Close This Deal? *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Explain the strategy: cold email template, WhatsApp feedback, portfolio presentation, or pricing negotiation..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1] resize-none"
            />
          </div>

          {/* Screenshot Proof */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              5. Payout Screenshot Proof (URL or Image Link) *
            </label>
            <input
              type="url"
              required
              value={proofImageUrl}
              onChange={e => setProofImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium font-mono text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1B2CC1]" />
              <span>Visible on Wall of Fame</span>
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all"
            >
              <span>{isSubmitting ? "Publishing..." : "Publish Payout Proof"}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
