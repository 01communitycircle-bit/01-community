import React from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, ArrowUpRight, Flame, PhoneCall, AlertTriangle } from "lucide-react";
import {
  TOTAL_SLOTS_LIMIT,
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  INCOME_DISCLAIMER
} from "../lib/constants";

export default function Footer() {
  return (
    <footer className="w-full border-t border-emerald-500/20 bg-[#050706] text-slate-300 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Realism Legal Notice Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block uppercase tracking-wider text-[11px]">
              Compliance & Earnings Realism Notice:
            </span>
            <p className="leading-relaxed text-slate-300 text-[11px]">
              {INCOME_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/50 bg-black flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt="0.1% Community Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-black text-white text-base">0.1% Community</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              India&apos;s practical digital guild for high-ticket video editors, global freelancers, web builders, and software engineers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Strict Cap: Exactly {TOTAL_SLOTS_LIMIT} Total Seats</span>
            </div>
          </div>

          {/* Skill Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Skill Programs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/#tracks" className="hover:text-emerald-400 transition-colors">
                  Viral Video Editing & Pacing
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-emerald-400 transition-colors">
                  High-Ticket Global Freelancing
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-emerald-400 transition-colors">
                  Full-Stack Web Development
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-emerald-400 transition-colors">
                  App Development & Mobile MVPs
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-emerald-400 transition-colors">
                  High-CTR Thumbnail Designing
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Community & Plans
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/results" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Student Wall of Fame</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-emerald-400 transition-colors">
                  Pro Plan (₹{LIFETIME_PRO_PRICE} Lifetime)
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>VIP Hotline Plan (₹{LIFETIME_VIP_PRICE})</span>
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Member Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Guild Access & Founder Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Guild Access & Founder
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Every student is individually verified and manually onboarded into private WhatsApp groups. VIP members unlock direct on-demand founder phone calls.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Founder Verification</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 0.1% Community Club. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/admin" className="hover:text-emerald-400 font-semibold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
