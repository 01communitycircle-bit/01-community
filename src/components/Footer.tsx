import React from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-[#091540] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-slate-200 bg-[#091540] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt="0.1% Community Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-black text-[#091540] text-base">0.1% Community</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              India&apos;s practical digital guild for high-ticket video editors, global freelancers, web builders, and software engineers.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#1B2CC1] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#1B2CC1]" />
              <span>Invite-Only WhatsApp Circles</span>
            </div>
          </div>

          {/* Skill Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#091540]">
              Skill Programs
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/#tracks" className="hover:text-[#1B2CC1] transition-colors">
                  Viral Video Editing & Pacing
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-[#1B2CC1] transition-colors">
                  High-Ticket Global Freelancing
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-[#1B2CC1] transition-colors">
                  Full-Stack Web Development
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-[#1B2CC1] transition-colors">
                  Software & AI Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#091540]">
              Community
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/results" className="hover:text-[#1B2CC1] transition-colors flex items-center gap-1">
                  <span>Student Wall of Fame</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#1B2CC1] transition-colors">
                  Member Hub
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#1B2CC1] transition-colors">
                  Pro Plan (₹999 Lifetime)
                </Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#091540]">
              Guild Access
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Every ₹999 enrolled student is individually verified and manually added to WhatsApp groups to preserve high signal-to-noise.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#091540] font-semibold pt-1">
              <MessageCircle className="w-4 h-4 text-[#1B2CC1]" />
              <span>Direct WhatsApp Community Access</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 0.1% Community Club. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-[#1B2CC1] font-semibold transition-colors">
              Admin Portal
            </Link>
            <span className="text-slate-300">•</span>
            <span>Verified UPI Direct Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
