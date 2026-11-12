"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../../context/AppContext";
import {
  ShieldAlert,
  Users,
  MessageCircle,
  CreditCard,
  BookOpen,
  Lock,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  LogOut,
  Award
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { whatsappQueue, results } = useApp();
  const pathname = usePathname();

  // Admin Password Security Wall State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [adminPasscode, setAdminPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem("0.1_admin_session_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch {}
    setIsLoadingAuth(false);
  }, []);

  const handleUnlockAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: adminPasscode })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("0.1_admin_session_auth", "true");
      } else {
        setAuthError(data.error || "Invalid Admin Passcode. Access denied.");
      }
    } catch {
      setAuthError("Network authorization error. Please try again.");
    }
  };

  const handleLockAdmin = async () => {
    setIsAuthenticated(false);
    setAdminPasscode("");
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      sessionStorage.removeItem("0.1_admin_session_auth");
    } catch {}
  };

  const pendingWhatsAppCount = whatsappQueue.filter(q => q.status === "pending_add").length;

  const adminNav = [
    {
      label: "Command Center & Approvals",
      href: "/admin",
      icon: CreditCard,
      active: pathname === "/admin",
      badge: pendingWhatsAppCount > 0 ? `${pendingWhatsAppCount} Need Add` : undefined,
      badgeColor: "bg-emerald-600 text-white"
    },
    {
      label: "Course & Batch Studio",
      href: "/admin/courses",
      icon: BookOpen,
      active: pathname === "/admin/courses",
      badge: "Live Control",
      badgeColor: "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
    },
    {
      label: "Student Approval Desk",
      href: "/admin/whatsapp-bridge",
      icon: ShieldCheck,
      active: pathname === "/admin/whatsapp-bridge",
      badge: pendingWhatsAppCount > 0 ? `${pendingWhatsAppCount} Pending` : undefined,
      badgeColor: "bg-amber-600 text-white"
    },
    {
      label: "Student Directory",
      href: "/admin/students",
      icon: Users,
      active: pathname === "/admin/students",
      badge: undefined,
      badgeColor: ""
    },
    {
      label: "Wall of Fame Manager",
      href: "/admin/results-review",
      icon: Award,
      active: pathname === "/admin/results-review",
      badge: `${results.length} Proofs`,
      badgeColor: "bg-neutral-800 text-slate-300 border border-white/10"
    }
  ];

  if (isLoadingAuth) {
    return (
      <div className="w-full min-h-screen bg-[#050706] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // PASSCODE WALL GATING SCREEN (UNIFIED EMERALD & OBSIDIAN)
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#050706] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#0c100e] border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
          
          <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Lock className="w-7 h-7 text-emerald-400" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            Administrative Protection Wall
          </span>

          <h2 className="text-2xl font-black text-white mt-3 tracking-tight">
            Owner Access Gate
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-normal">
            This area manages student WhatsApp approvals, revenue, and live courses. Enter the master admin passcode to continue.
          </p>

          {authError && (
            <div className="mt-4 p-3 rounded-2xl bg-red-950/80 border border-red-500/50 text-xs text-red-300 font-semibold flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Master Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter master passcode"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/20 text-white text-xs font-mono tracking-wider focus:outline-none focus:border-emerald-500"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="solid-btn-primary w-full py-3.5 text-xs font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // UNLOCKED AUTHENTICATED ADMIN LAYOUT (SEAMLESS EMERALD & OBSIDIAN THEME)
  return (
    <div className="w-full min-h-screen bg-[#050706] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Admin Header */}
        <div className="p-6 sm:p-8 rounded-3xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-[#0c100e] border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <ShieldAlert className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  0.1% Community Administration
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  Live Backend
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-normal">
                Protected administrative desk for revenue audits, WhatsApp student onboarding, and course management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLockAdmin}
              className="px-4 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer bg-neutral-900 border border-white/15 text-slate-300 hover:text-white hover:border-emerald-500 transition-all"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Emerald & Obsidian) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  item.active
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "bg-[#0c100e] text-slate-300 border-white/10 hover:border-emerald-500/50 hover:text-white hover:bg-emerald-950/20"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.active ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          {children}
        </div>

      </div>
    </div>
  );
}