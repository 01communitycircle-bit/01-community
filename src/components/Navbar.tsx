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
  CURRENT_SLOTS_CLAIMED,
  REMAINING_SLOTS,
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE
} from "../lib/constants";

export default function Navbar() {
  const { currentUser, isAuthenticated, openAuthModal, openPaymentModal, handleSignOut } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-red-500/20 bg-black/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Scarcity Ticker Bar */}
      <div className="w-full bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60 border-b border-red-500/20 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1 text-red-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            Strict Limit:
          </span>
          <span className="text-white font-medium">
            Exactly <strong className="text-red-400 font-bold">{TOTAL_SLOTS_LIMIT} Lifetime Slots</strong> Allowed
          </span>
          <span className="text-red-500/60 hidden sm:inline">•</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-300">
            <Flame className="w-3 h-3 text-red-400" />
            {REMAINING_SLOTS} Slots Remaining ({CURRENT_SLOTS_CLAIMED}/{TOTAL_SLOTS_LIMIT} Claimed)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-red-500/40 bg-black flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:border-red-400 transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="0.1% Community Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              0.1% Community
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-600/50 shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                VIP
              </span>
            </span>
            <span className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
              <span>The Elite Digital Guild</span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] text-slate-400 font-mono">{REMAINING_SLOTS} Spots Left</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold whitespace-nowrap">
          <Link
            href="/#tracks"
            className={`transition-colors duration-150 hover:text-red-400 whitespace-nowrap ${
              pathname.includes("tracks") ? "text-red-400 font-bold" : "text-slate-300"
            }`}
          >
            Skill Programs
          </Link>
          <Link
            href="/results"
            className={`transition-colors duration-150 hover:text-red-400 flex items-center gap-1.5 whitespace-nowrap ${
              isLinkActive("/results") ? "text-red-400 font-bold" : "text-slate-300"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="whitespace-nowrap">Wall of Fame</span>
          </Link>
          <Link
            href="/#pricing"
            className="text-slate-300 hover:text-red-400 transition-colors duration-150 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Plans (₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE})</span>
          </Link>
          <Link
            href="/#founder"
            className="text-slate-300 hover:text-red-400 transition-colors duration-150 whitespace-nowrap flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-500" />
            <span>VIP Hotline</span>
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-150 border whitespace-nowrap ${
              pathname.startsWith("/dashboard")
                ? "bg-red-950/80 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                : "text-slate-300 border-white/10 hover:border-red-500/50 hover:bg-red-950/30"
            }`}
          >
            {currentUser.isPro ? (
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>Member Hub</span>
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-3 whitespace-nowrap">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-red-500/50 transition-all text-xs font-bold text-white shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-red-500/50"
                />
                <span className="truncate max-w-[120px]">{currentUser.name}</span>
                {currentUser.isPro && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-red-600 text-white">
                    PRO
                  </span>
                )}
              </Link>

              <button
                onClick={handleSignOut}
                className="p-2 rounded-full border border-white/15 text-slate-400 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => openAuthModal("login")}
                className="px-4 py-2 text-xs font-bold rounded-full text-slate-300 hover:text-white transition-all cursor-pointer border border-transparent hover:border-white/15"
              >
                Sign In
              </button>
              <button
                onClick={() => openPaymentModal()}
                className="solid-btn-primary px-5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.5)]"
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
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-red-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Red & Black) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-red-500/30 bg-black/98 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="p-3 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs flex items-center justify-between">
            <span className="text-red-300 font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Strict Cap: 100 Seats
            </span>
            <span className="text-white font-mono font-bold bg-red-600 px-2 py-0.5 rounded-full text-[10px]">
              {REMAINING_SLOTS} Slots Left
            </span>
          </div>

          <Link
            href="/#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-red-400 rounded-lg hover:bg-white/5"
          >
            Skill Programs
          </Link>
          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-red-400 rounded-lg hover:bg-white/5"
          >
            Wall of Fame
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-red-400 rounded-lg hover:bg-white/5"
          >
            Plans (₹{LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE})
          </Link>
          <Link
            href="/#founder"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-red-400 rounded-lg hover:bg-white/5"
          >
            VIP Founder Hotline
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-red-400 rounded-lg hover:bg-white/5"
          >
            Member Hub
          </Link>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-xs font-bold rounded-full border border-red-500/30 text-red-400 hover:bg-red-950/30"
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
                  className="w-full py-2.5 px-4 text-xs font-bold rounded-full border border-white/20 text-white hover:bg-white/5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openPaymentModal();
                    setMobileMenuOpen(false);
                  }}
                  className="solid-btn-primary w-full py-2.5 px-4 text-xs font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)]"
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
