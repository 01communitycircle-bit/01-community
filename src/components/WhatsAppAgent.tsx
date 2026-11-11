"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles, PhoneCall, ChevronUp, ChevronDown, ShieldCheck } from "lucide-react";
import { OFFICIAL_WHATSAPP_NUMBER, REMAINING_SLOTS, TOTAL_SLOTS_LIMIT, LIFETIME_VIP_PRICE, OFFICIAL_ADMIN_EMAIL } from "../lib/constants";
import { useApp } from "../context/AppContext";

export default function WhatsAppAgent() {
  const { currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  // As Arush / Admin, hide the WhatsApp agent completely
  if (currentUser?.role === "admin" || currentUser?.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase()) {
    return null;
  }

  const quickPrompts = [
    {
      label: `📞 VIP Plan ₹${LIFETIME_VIP_PRICE} (1-on-1 Calls)`,
      text: `Hello Arush Sir! I want to ask about the ₹${LIFETIME_VIP_PRICE} VIP Plan and how the 1-on-1 direct main line calls work.`
    },
    {
      label: `⚡ Slots Left (${REMAINING_SLOTS}/${TOTAL_SLOTS_LIMIT})`,
      text: `Hi Arush! Are there still slots available from the ${TOTAL_SLOTS_LIMIT} limit for this batch?`
    },
    {
      label: "💳 UPI Payment Verification",
      text: "Hi! I want to pay via UPI and need quick assistance to verify my enrollment."
    },
    {
      label: "🎯 Course Guidance",
      text: "Hello! Which high-income course (Video Editing, Web Dev, or Freelancing) is best for me as a beginner?"
    }
  ];

  const handleSend = (text: string) => {
    const cleanNum = OFFICIAL_WHATSAPP_NUMBER;
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(text.trim())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      
      {/* Expanded Interactive Chat Drawer */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] rounded-3xl bg-[#0c0c0f] border border-red-500/40 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-950/80 via-black to-[#0c0c0f] p-4 border-b border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/mentor-tech.jpg"
                  alt="Founder"
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-500 shadow-redGlowSm"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-white">Tech Arush</h4>
                  <span className="text-[10px] bg-red-600/30 text-red-400 font-bold px-1.5 py-0.2 rounded border border-red-500/40">
                    Founder
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active on WhatsApp (+91 91206 46330)
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5 text-xs text-neutral-200">
            <div className="bg-black/60 p-3 rounded-2xl border border-neutral-800/80 space-y-1">
              <p className="text-neutral-300 leading-relaxed">
                👋 Need help choosing a course, claiming 1 of the <strong className="text-red-400">100 slots</strong>, or activating the <strong className="text-red-400">₹{LIFETIME_VIP_PRICE} VIP Plan</strong>?
              </p>
              <p className="text-[10px] text-neutral-500 font-medium">
                Tap a quick prompt or write a question to message my personal WhatsApp line directly:
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-col gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p.text)}
                  className="text-left px-3 py-2 rounded-xl bg-neutral-900/90 hover:bg-red-950/40 border border-neutral-800 hover:border-red-500/50 text-[11px] text-neutral-200 font-medium transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate">{p.label}</span>
                  <Send className="w-3 h-3 text-red-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customMsg.trim()) {
                  handleSend(customMsg);
                  setCustomMsg("");
                }
              }}
              className="pt-1 flex items-center gap-2"
            >
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-black/80 border border-neutral-800 focus:border-red-500 px-3 py-2 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!customMsg.trim()}
                className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-redGlowSm cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-500 border-t border-neutral-900">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-red-400" />
                Direct Founder Access
              </span>
              <span>Only {REMAINING_SLOTS} slots left</span>
            </div>
          </div>

        </div>
      )}

      {/* Floating Trigger Pill */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-black text-white border border-red-500/60 shadow-redGlow hover:shadow-redGlowLg hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-ping" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-tight leading-none">
              Need help? 👋
            </div>
            <div className="text-[9px] text-red-200 font-medium leading-none mt-0.5">
              WhatsApp Agent
            </div>
          </div>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-300" />
          )}
        </button>
      </div>

    </div>
  );
}
