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
  LogOut
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { whatsappQueue } = useApp();
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
      badgeColor: "bg-[#091540] text-white"
    },
    {
      label: "Course & Batch Studio",
      href: "/admin/courses",
      icon: BookOpen,
      active: pathname === "/admin/courses",
      badge: "Live Control",
      badgeColor: "bg-[#f0f7ff] text-[#1B2CC1]"
    },
    {
      label: "Student Directory",
      href: "/admin/students",
      icon: Users,
      active: pathname === "/admin/students"
    }
  ];

  if (isLoadingAuth) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#091540] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // PASSCODE WALL GATING SCREEN (PURE WHITE)
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-white text-[#091540] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-xl">
          
          <div className="w-14 h-14 rounded-2xl bg-[#f0f7ff] border border-[#cce4fc] text-[#1B2CC1] mx-auto flex items-center justify-center mb-5 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
            Administrative Protection Wall
          </span>

          <h2 className="text-2xl font-black text-[#091540] mt-3 tracking-tight">
            Owner Access Gate
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
            This area manages student WhatsApp approvals, revenue, and live courses. Enter the master admin passcode to continue.
          </p>

          {authError && (
            <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#091540] mb-1.5">
                Master Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin01)"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-[#091540] text-xs font-mono tracking-wider focus:outline-none focus:border-[#1B2CC1]"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="solid-btn-primary w-full py-3.5 text-xs font-bold rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            <span>Passcode hint: <code className="text-[#091540] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">admin01</code></span>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED AUTHENTICATED ADMIN LAYOUT (PURE WHITE)
  return (
    <div className="w-full min-h-screen bg-white text-[#091540]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Admin Header */}
        <div className="p-6 sm:p-8 rounded-3xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#091540] flex items-center justify-center text-white shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight">
                  0.1% Community Administration
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
                  Live Backend
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                Protected administrative desk for revenue audits, WhatsApp student onboarding, and course management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLockAdmin}
              className="solid-btn-secondary px-4 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#091540]" />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs (CAPSULE BUTTONS) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto no-scrollbar">
          {adminNav.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  item.active
                    ? "bg-[#091540] text-white border-[#091540] shadow-xs"
                    : "bg-[#f8fbff] border-slate-200 text-slate-700 hover:text-[#091540] hover:border-slate-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-2 py-0.2 rounded-full font-bold ${
                    item.badgeColor || (item.active ? "bg-white text-[#091540]" : "bg-[#f0f7ff] text-[#1B2CC1]")
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Main Admin Content */}
        {children}

      </div>
    </div>
  );
}
