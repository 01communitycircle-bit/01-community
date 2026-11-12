"use client";

import React, { useState } from "react";
import { Video, Code2, Briefcase, CheckCircle2, ArrowRight, Sparkles, Terminal, FileCheck, Layers, Award } from "lucide-react";
import { useApp } from "../context/AppContext";
import { LIFETIME_VIP_PRICE, LIFETIME_PRO_PRICE } from "../lib/constants";

export default function SkillsMatrixShowcase() {
  const { openPaymentModal, tracks, slotsRemaining } = useApp();
  const [activeTab, setActiveTab] = useState<"video" | "dev" | "freelance">("video");

  const pillars = {
    video: {
      title: "Viral Video Architecture & High-Retention Editing",
      subtitle: "Master pacing, SFX, typography, and color grading that top creators and tech brands pay thousands for.",
      icon: Video,
      highlights: [
        "Premiere Pro & After Effects project file templates",
        "150+ royalty-free SFX packs & kinetic typography presets",
        "Hook psychology & viral 3-second retention frameworks",
        "Pacing breakdowns of MrBeast, Ali Abdaal & tech agency ads"
      ],
      deliverable: "Ready-to-pitch 3-video portfolio + Client acquisition script",
      potential: "₹25,000 - ₹60,000/mo with 2-3 agency clients"
    },
    dev: {
      title: "Full-Stack Web Architecture & Next.js Ecosystem",
      subtitle: "Build modern, animated production web apps, landing pages, and SaaS dashboards with Next.js, Supabase & Tailwind.",
      icon: Code2,
      highlights: [
        "Next.js 14 App Router, Server Actions & Supabase Auth",
        "Tailwind CSS, Framer Motion & modern clean aesthetic styling",
        "Stripe & UPI payment gateway integration workflows",
        "Vercel production deployments & custom domain DNS mastery"
      ],
      deliverable: "Live deployed SaaS/Agency client website on your portfolio",
      potential: "₹50,000 - ₹1,50,000 per custom landing page / SaaS contract"
    },
    freelance: {
      title: "High-Ticket Client Acquisition & International Invoicing",
      subtitle: "Direct outreach frameworks to sign high-paying clients across the United States, UK, Europe, and Dubai.",
      icon: Briefcase,
      highlights: [
        "Cold email & Twitter DM pitch scripts with 38%+ reply rate",
        "Legally binding international freelance contract templates",
        "Stripe, Wise & direct wire invoice automation guides",
        "Negotiation frameworks to quote retainers instead of hourly rates"
      ],
      deliverable: "Plug-and-play client outreach funnel & proposal templates",
      potential: "$1,000 - $3,000/mo remote retainer contracts"
    }
  };

  const active = pillars[activeTab];
  const IconComponent = active.icon;

  return (
    <div className="w-full space-y-8 select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Elite Curriculum Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Practical Frameworks. Zero Fluff.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Every program is reverse-engineered from real client contracts and agency workflows. Select a track below to explore deliverables.
        </p>
      </div>

      {/* Modern Pillar Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto p-1.5 rounded-full bg-slate-100 border border-slate-200">
        <button
          onClick={() => setActiveTab("video")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "video"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Video Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab("dev")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "dev"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Full-Stack Web</span>
        </button>

        <button
          onClick={() => setActiveTab("freelance")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "freelance"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Client Acquisition</span>
        </button>
      </div>

      {/* Main Feature Display Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <IconComponent className="w-3.5 h-3.5" />
              <span>Core Specialization</span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {active.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {active.subtitle}
            </p>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2">
              {active.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Deliverable & Earning Scope */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Deliverable</span>
                <span className="text-slate-900 font-bold mt-0.5 block">{active.deliverable}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Realistic Scope</span>
                <span className="text-emerald-900 font-bold mt-0.5 block">{active.potential}</span>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 p-0.5 mx-auto flex items-center justify-center text-white shadow-sm">
              <Layers className="w-6 h-6" />
            </div>

            <h4 className="text-lg font-black text-slate-900">
              Enroll In All 11 Programs
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              One lifetime enrollment gives you instant access to Video Editing, Full-Stack Dev, Freelancing, and our Master WhatsApp Circle.
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => openPaymentModal(tracks[0])}
                className="solid-btn-primary w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>Unlock All Tracks • ₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <span className="text-[11px] text-slate-500 block font-mono">
                ⚡ {slotsRemaining} Slots Remaining for this batch
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
