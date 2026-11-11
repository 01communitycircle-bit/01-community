"use client";

import React from "react";
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
  LayoutDashboard
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isAuthenticated, openAuthModal, openPaymentModal, tracks } = useApp();
  const pathname = usePathname();

  // If user is not authenticated, prompt to sign in with Google
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-white text-[#091540]">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#f0f7ff] border border-[#cce4fc] text-[#1B2CC1] mx-auto flex items-center justify-center mb-5 shadow-xs">
            <Lock className="w-7 h-7 text-[#1B2CC1]" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
            Authentication Required
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-[#091540] mt-3 tracking-tight">
            Sign In to Member Portal
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto font-medium">
            Please sign in with your Google account to access your courses, roadmaps, and community circles.
          </p>

          <div className="mt-6">
            <button
              onClick={() => openAuthModal("login")}
              className="w-full py-3.5 px-6 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Sign In with Google</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user is signed in but not Pro, show Locked Gating Screen with Course Selection
  if (!currentUser.isPro) {
    return (
      <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-white text-[#091540]">
        <div className="max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center relative overflow-hidden">
          
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-[#091540] mx-auto flex items-center justify-center mb-5 shadow-sm">
            <Lock className="w-7 h-7 text-[#1B2CC1]" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
            Members Only Portal
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-[#091540] mt-3 tracking-tight">
            VIP Dashboard Locked
          </h2>

          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 font-medium">Logged in:</span>
            <span className="font-mono font-bold text-[#091540]">{currentUser.email}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-md mx-auto font-medium">
            This private portal is exclusively accessible to students who have purchased their specific <strong className="text-[#091540]">0.1% Skill Course (₹999 Lifetime)</strong>.
          </p>

          {/* Value Checklist */}
          <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs text-[#091540] font-medium">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#1B2CC1] flex-shrink-0" />
              <span><strong>Instant Access:</strong> Curated roadmaps, templates & contracts for your chosen course</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#1B2CC1] flex-shrink-0" />
              <span><strong>WhatsApp VIP Circle:</strong> Manually verified & added within ~15 mins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-[#1B2CC1] flex-shrink-0" />
              <span><strong>Get Famous:</strong> Publish your client earnings on the public Wall of Fame</span>
            </div>
          </div>

          {/* Course Selection Area */}
          <div className="mb-6 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Select Which 1 Course You Wish to Enroll In:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tracks.slice(0, 4).map(t => (
                <button
                  key={t.id}
                  onClick={() => openPaymentModal(t)}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-[#1B2CC1] bg-white hover:bg-slate-50 transition-all text-left flex items-center justify-between cursor-pointer group shadow-sm"
                >
                  <span className="text-xs font-bold text-[#091540] truncate pr-2">
                    {t.title.split("&")[0].split("(")[0].trim()}
                  </span>
                  <span className="text-xs font-black text-[#1B2CC1] font-mono">₹999</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Button (DARK CAPSULE BUTTON) */}
          <button
            onClick={() => openPaymentModal(tracks[0])}
            className="w-full py-3.5 px-6 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Unlock Instant Access • Pay ₹999</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>One student is tied to one specific course in the database</span>
          </p>
        </div>
      </div>
    );
  }

  // Unlocked Pro Member Layout
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
      badge: currentUser.whatsappStatus === "joined" ? "Active" : "Pending (~15m)"
    },
    {
      label: "My Public Profile",
      href: "/dashboard/profile",
      icon: User,
      active: pathname === "/dashboard/profile"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-[#091540]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Member Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl mb-8 flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-5 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-slate-200 shadow-sm flex-shrink-0"
            />
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                <h1 className="text-xl sm:text-xl font-black text-[#091540] tracking-tight whitespace-nowrap">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#091540] text-white flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  0.1% PRO MEMBER
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1 max-w-sm sm:max-w-none">
                {currentUser.bio || "Member of the 0.1% exclusive digital community"}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <Link
              href="/dashboard/submit-result"
              className="w-full sm:w-auto px-6 py-3 sm:px-5 sm:py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-white" />
              <span>Publish Wins</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs (CAPSULE BUTTONS) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  item.active
                    ? "bg-[#091540] text-white border-[#091540] shadow-sm"
                    : "bg-white border-slate-200 text-[#091540] hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    item.active ? "bg-white/20 text-white" : "bg-slate-100 text-[#091540]"
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
