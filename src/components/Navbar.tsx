"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import {
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  Menu,
  X,
  TrendingUp,
  ArrowRight,
  LogOut
} from "lucide-react";

export default function Navbar() {
  const { currentUser, openAuthModal, openPaymentModal, handleSignOut } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-[#091540] flex-shrink-0 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="0.1% Community Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#091540] flex items-center gap-2">
              0.1% Community
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
                VIP
              </span>
            </span>
            <span className="text-[11px] text-[#1B2CC1] font-semibold">The Elite Digital Guild</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link
            href="/#tracks"
            className={`transition-colors duration-150 hover:text-[#1B2CC1] ${
              pathname.includes("tracks") ? "text-[#1B2CC1] font-bold" : "text-[#091540]"
            }`}
          >
            Skill Programs
          </Link>
          <Link
            href="/results"
            className={`transition-colors duration-150 hover:text-[#1B2CC1] flex items-center gap-1.5 ${
              isLinkActive("/results") ? "text-[#1B2CC1] font-bold" : "text-[#091540]"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#1B2CC1]" />
            <span>Wall of Fame</span>
          </Link>
          <Link
            href="/#pricing"
            className="text-[#091540] hover:text-[#1B2CC1] transition-colors duration-150"
          >
            Pricing (₹999)
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-150 border ${
              pathname.startsWith("/dashboard")
                ? "bg-[#091540] text-white border-[#091540]"
                : "text-[#091540] border-slate-200 hover:border-[#1B2CC1] hover:bg-[#f8fbff]"
            }`}
          >
            {currentUser.isPro ? (
              <Unlock className="w-3.5 h-3.5 text-[#1B2CC1]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#64748b]" />
            )}
            <span>Member Hub</span>
            {currentUser.isPro && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B2CC1]"></span>
            )}
          </Link>
        </nav>

        {/* Right CTA Actions (SOLID DARK BUTTONS) */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser.role === "admin" && (
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1B2CC1] bg-[#f0f7ff] border border-[#cce4fc] hover:bg-[#e0efff] transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          )}

          {currentUser.role === "guest" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal()}
                className="px-4 py-2 text-xs font-bold text-[#091540] hover:text-[#1B2CC1] transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openPaymentModal()}
                className="solid-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ABD2FA]" />
                <span>Join VIP Circle (₹999)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-[#f8fbff] border border-slate-200 hover:border-[#1B2CC1] transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs font-bold text-[#091540] max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                {currentUser.isPro && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#091540] text-white">
                    PRO
                  </span>
                )}
              </Link>
              <button
                onClick={() => handleSignOut()}
                className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#091540] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-white border-t border-slate-200 shadow-lg">
          <Link
            href="/#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-[#091540] rounded-xl hover:bg-slate-50"
          >
            Skill Programs
          </Link>
          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-[#091540] rounded-xl hover:bg-slate-50"
          >
            Wall of Fame
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-[#091540] rounded-xl hover:bg-slate-50"
          >
            Pricing (₹999)
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-[#091540] rounded-xl hover:bg-slate-50"
          >
            Member Hub
          </Link>
          {currentUser.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#091540] rounded-xl hover:bg-slate-50"
            >
              Admin Portal
            </Link>
          )}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {currentUser.role === "guest" ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full py-2.5 rounded-full border border-slate-300 text-xs font-bold text-[#091540]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openPaymentModal();
                  }}
                  className="solid-btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Pro Membership (₹999)</span>
                </button>
              </>
            ) : (
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-full bg-[#091540] text-white text-xs font-bold"
              >
                Go to Profile ({currentUser.name})
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
