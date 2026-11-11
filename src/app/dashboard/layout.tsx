"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../../context/AppContext";
import {
  Lock,
  Sparkles,
  MessageCircle,
  PlusCircle,
  User,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  PhoneCall,
  Flame,
  Award,
  Check
} from "lucide-react";
import {
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  TOTAL_SLOTS_LIMIT,
  REMAINING_SLOTS,
  OFFICIAL_ADMIN_EMAIL
} from "../../lib/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isAuthenticated, openAuthModal, openPaymentModal, tracks, slotsRemaining } = useApp();
  const pathname = usePathname();
  const [selectedPlanTier, setSelectedPlanTier] = useState<"pro" | "vip">("vip");

  const isAdmin = currentUser?.role === "admin" || currentUser?.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();

  // If user is not authenticated, prompt to sign in with Google
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-black text-white">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#0d0d12] border border-red-500/30 shadow-2xl text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Lock className="w-7 h-7 text-red-400" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/40">
            Authentication Required
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
            Sign In to Member Portal
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed max-w-sm mx-auto font-normal">
            Please sign in with your Google account to access your courses, roadmaps, and community circles.
          </p>

          <div className="mt-6">
            <button
              onClick={() => openAuthModal("login")}
              className="solid-btn-primary w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer"
            >
              <span>Sign In with Google</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user is signed in but not Pro, show Locked Gating Screen with Dual Plan Selection (999 and 1499)
  if (!currentUser.isPro && !isAdmin) {
    const currentPrice = selectedPlanTier === "vip" ? LIFETIME_VIP_PRICE : LIFETIME_PRO_PRICE;

    return (
      <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-black text-white">
        <div className="max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-[#0d0d12] border border-red-500/30 shadow-2xl text-center relative overflow-hidden">
          
          <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Lock className="w-7 h-7 text-red-400" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/40">
            Members Only Portal
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
            VIP Dashboard Locked
          </h2>

          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-400 font-medium">Logged in:</span>
            <span className="font-mono font-bold text-white">{currentUser.email}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed max-w-md mx-auto font-normal">
            Select your membership plan below to unlock your dashboard, curated roadmaps, and community access.
          </p>

          {/* TWO PLAN SELECTOR (1499 VIP vs 999 PRO) */}
          <div className="mt-5 text-left space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Choose Your Membership Plan:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* VIP Plan */}
              <div
                onClick={() => setSelectedPlanTier("vip")}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  selectedPlanTier === "vip"
                    ? "bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] ring-1 ring-red-500"
                    : "bg-black border-white/10 hover:border-white/20 opacity-80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-black text-white">VIP Plan</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-600 text-white">
                    BEST
                  </span>
                </div>
                <div className="text-xl font-black text-white font-mono">
                  ₹{LIFETIME_VIP_PRICE}
                </div>
                <p className="text-[10px] text-red-300 mt-1 leading-snug">
                  Direct 1-on-1 Calls with Arush + VIP Hotline + Full Guild
                </p>
              </div>

              {/* Pro Plan */}
              <div
                onClick={() => setSelectedPlanTier("pro")}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  selectedPlanTier === "pro"
                    ? "bg-neutral-900 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)] ring-1 ring-red-500/80"
                    : "bg-black border-white/10 hover:border-white/20 opacity-80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-black text-white">Pro Plan</span>
                </div>
                <div className="text-xl font-black text-white font-mono">
                  ₹{LIFETIME_PRO_PRICE}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  Complete Curriculum & Community WhatsApp Access
                </p>
              </div>
            </div>
          </div>

          {/* Value Checklist */}
          <div className="my-5 p-4 rounded-2xl bg-black border border-red-500/20 text-left space-y-2 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span><strong className="text-white">Instant Access:</strong> Curated roadmaps, templates & contracts for your chosen course</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span><strong className="text-white">WhatsApp VIP Circle:</strong> Manually verified & added within ~15 mins</span>
            </div>
            {selectedPlanTier === "vip" && (
              <div className="flex items-center gap-2.5 text-red-300">
                <PhoneCall className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span><strong className="text-white">VIP Hotline (₹1,499):</strong> Direct 1-on-1 phone calls with Tech Arush</span>
              </div>
            )}
          </div>

          {/* Course Selection Area */}
          <div className="mb-6 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Which 1 Course You Wish to Enroll In ({selectedPlanTier === "vip" ? `₹${LIFETIME_VIP_PRICE}` : `₹${LIFETIME_PRO_PRICE}`}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tracks.slice(0, 4).map(t => (
                <button
                  key={t.id}
                  onClick={() => openPaymentModal(t)}
                  className="p-3 rounded-2xl border border-white/10 hover:border-red-500 bg-black hover:bg-red-950/20 transition-all text-left flex items-center justify-between cursor-pointer group shadow-sm"
                >
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate pr-2">
                    {t.title.split("&")[0].split("(")[0].trim()}
                  </span>
                  <span className="text-xs font-black text-red-400 font-mono">₹{currentPrice}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => openPaymentModal(tracks[0])}
            className="solid-btn-primary w-full py-3.5 px-6 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Unlock {selectedPlanTier === "vip" ? "VIP Plan (₹1,499)" : "Pro Plan (₹999)"}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Strictly limited to 100 students total ({slotsRemaining} slots remaining)</span>
          </p>
        </div>
      </div>
    );
  }

  // Unlocked Pro/VIP/Admin Member Layout
  const navItems = [
    {
      label: "VIP Hub & Status",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard"
    },
    {
      label: "Publish Results",
      href: "/dashboard/submit-result",
      icon: PlusCircle,
      active: pathname === "/dashboard/submit-result",
      badge: "Social Proof"
    },
    {
      label: "WhatsApp Community",
      href: "/dashboard/community",
      icon: MessageCircle,
      active: pathname === "/dashboard/community",
      badge: isAdmin ? "Master Access" : currentUser.whatsappStatus === "joined" ? "Active" : "Pending (~15m)"
    },
    {
      label: "My Public Profile",
      href: "/dashboard/profile",
      icon: User,
      active: pathname === "/dashboard/profile"
    }
  ];

  if (isAdmin) {
    navItems.push({
      label: "Admin Command Center",
      href: "/admin",
      icon: ShieldCheck,
      active: pathname.startsWith("/admin"),
      badge: "Director"
    });
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Member Header Banner */}
        <div className="bg-[#0d0d12] p-6 sm:p-8 rounded-3xl mb-8 flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-5 border border-red-500/25 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-red-500/40 shadow-sm flex-shrink-0"
            />
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                <h1 className="text-xl sm:text-xl font-black text-white tracking-tight whitespace-nowrap">
                  {currentUser.name}
                </h1>
                {isAdmin ? (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-pulse">
                    SUPER ADMIN // MASTER ACCESS
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-500/50 flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {currentUser.planType === "vip" ? "0.1% VIP MEMBER" : "0.1% PRO MEMBER"}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1 max-w-sm sm:max-w-none">
                {currentUser.bio || "Member of the 0.1% exclusive digital community"}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
            {isAdmin ? (
              <Link
                href="/admin"
                className="solid-btn-primary w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)] whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Open Admin Command Center</span>
              </Link>
            ) : (
              <>
                {currentUser.planType === "vip" ? (
                  <a
                    href="tel:+919120646330"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-red-500/40 text-red-400 hover:bg-red-950/30 text-xs font-bold flex items-center justify-center gap-1.5"
                    title="Direct 1-on-1 calls with mentor (+91 91206 46330)"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>VIP Direct Call Line</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => openPaymentModal()}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-red-500/50 bg-red-950/50 hover:bg-red-900/60 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  >
                    <Award className="w-3.5 h-3.5 text-red-400" />
                    <span>Upgrade to VIP (₹1,499)</span>
                  </button>
                )}
                <Link
                  href="/dashboard/submit-result"
                  className="solid-btn-primary w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)] whitespace-nowrap"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-white" />
                  <span>Publish Wins</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  item.active
                    ? "bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    : "bg-[#0d0d12] border-white/10 text-slate-300 hover:text-white hover:border-red-500/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    item.active ? "bg-white/20 text-white" : "bg-black text-red-400 border border-red-500/30"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Main Dashboard Child Content */}
        {children}

      </div>
    </div>
  );
}
