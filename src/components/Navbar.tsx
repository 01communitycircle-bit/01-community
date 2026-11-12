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
  LogOut,
  Flame,
  PhoneCall
} from "lucide-react";
import {
  TOTAL_SLOTS_LIMIT,
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  OFFICIAL_ADMIN_EMAIL
} from "../lib/constants";

export default function Navbar() {
  const { currentUser, isAuthenticated, openAuthModal, openPaymentModal, handleSignOut, slotsClaimed, slotsRemaining } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname === path;
  const isAdmin = currentUser?.role === "admin" || currentUser?.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Scarcity Ticker Bar (Emerald Green & Crisp White) */}
      <div className="w-full bg-emerald-50/90 border-b border-emerald-100 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            Strict Limit:
          </span>
          <span className="text-slate-900 font-medium whitespace-nowrap">
            Exactly <strong className="text-emerald-700 font-bold">{TOTAL_SLOTS_LIMIT} Lifetime Slots</strong> Allowed
          </span>
          <span className="text-emerald-300 hidden sm:inline">•</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-emerald-300 text-[10px] font-mono text-emerald-800 font-bold whitespace-nowrap shadow-xs">
            <Flame className="w-3 h-3 text-emerald-600" />
            {slotsRemaining} Slots Remaining ({slotsClaimed}/{TOTAL_SLOTS_LIMIT} Claimed)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-200 bg-white flex-shrink-0 shadow-sm group-hover:border-emerald-500 transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="0.1% Community Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2 whitespace-nowrap">
              0.1% Community
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                VIP
              </span>
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <span>The Elite Digital Guild</span>
              <span className="text-slate-400">•</span>
              <span className="text-[10px] text-slate-500 font-mono font-medium">{slotsRemaining} Spots Left</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 text-xs xl:text-sm font-semibold whitespace-nowrap">
          <Link
            href="/#tracks"
            className={`transition-colors duration-150 hover:text-emerald-600 whitespace-nowrap ${
              pathname.includes("tracks") ? "text-emerald-700 font-bold" : "text-slate-600"
            }`}
          >
            Skill Programs
          </Link>
          <Link
            href="/results"
            className={`transition-colors duration-150 hover:text-emerald-600 flex items-center gap-1.5 whitespace-nowrap ${
              isLinkActive("/results") ? "text-emerald-700 font-bold" : "text-slate-600"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="whitespace-nowrap">Wall of Fame</span>
          </Link>
          <Link
            href="/#pricing"
            className="text-slate-600 hover:text-emerald-600 transition-colors duration-150 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Plans (₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE})</span>
          </Link>
          <Link
            href="/#founder"
            className="text-slate-600 hover:text-emerald-600 transition-colors duration-150 whitespace-nowrap flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>VIP Hotline</span>
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-150 border whitespace-nowrap ${
              pathname.startsWith("/dashboard")
                ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-sm font-bold"
                : "text-slate-600 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50"
            }`}
          >
            {currentUser.isPro ? (
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>Member Hub</span>
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5 whitespace-nowrap shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 shrink-0">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 transition-all shadow-xs shrink-0"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Admin Panel</span>
                </Link>
              )}

              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white transition-all text-xs font-bold text-slate-800 shadow-xs shrink-0 min-w-max"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500/50 shrink-0"
                />
                <span className="whitespace-nowrap font-bold text-xs shrink-0">{currentUser.name}</span>
                {isAdmin ? (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white shrink-0 shadow-xs">
                    ADMIN
                  </span>
                ) : currentUser.isPro ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white shrink-0">
                    PRO
                  </span>
                ) : null}
              </Link>

              <button
                onClick={handleSignOut}
                className="p-2 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-100 transition-all cursor-pointer shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => openAuthModal("login")}
                className="px-4 py-2 text-xs font-bold rounded-full text-slate-700 hover:text-emerald-700 transition-all cursor-pointer border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
              >
                Sign In
              </button>
              <button
                onClick={() => openPaymentModal()}
                className="solid-btn-primary px-5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Claim 1 of 100 Slots</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Emerald & White) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
            <span className="text-emerald-800 font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-emerald-600" />
              Strict Cap: 100 Seats
            </span>
            <span className="text-white font-mono font-bold bg-emerald-600 px-2 py-0.5 rounded-full text-[10px]">
              {slotsRemaining} Slots Left
            </span>
          </div>

          <Link
            href="/#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50"
          >
            Skill Programs
          </Link>
          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50"
          >
            Wall of Fame
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50"
          >
            Plans (₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE})
          </Link>
          <Link
            href="/#founder"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50"
          >
            VIP Founder Hotline
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50"
          >
            Member Hub
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Command Center</span>
            </Link>
          )}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-xs font-bold rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Sign Out ({currentUser.name})
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 text-xs font-bold rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openPaymentModal();
                    setMobileMenuOpen(false);
                  }}
                  className="solid-btn-primary w-full py-2.5 px-4 text-xs font-bold rounded-full shadow-md shadow-emerald-500/20"
                >
                  Claim 1 of 100 Slots (₹{LIFETIME_PRO_PRICE})
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
