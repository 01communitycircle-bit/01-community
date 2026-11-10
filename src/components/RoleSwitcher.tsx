"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { UserRole } from "../lib/types";
import { ChevronUp, Sparkles, User, ShieldAlert, X } from "lucide-react";

export default function RoleSwitcher() {
  const { currentUser, switchRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Strictly NO MENTOR roles
  const roles: { role: UserRole; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      role: "guest",
      label: "Guest Visitor",
      desc: "Browsing, locked dashboard, UPI checkout prompt",
      icon: User
    },
    {
      role: "student_unpaid",
      label: "Student (Unpaid)",
      desc: "Signed up free, dashboard locked, ₹999 pay CTA",
      icon: User
    },
    {
      role: "student_pro",
      label: "Student (Pro ₹999)",
      desc: "Unlocked member hub, results publisher, WhatsApp VIP active",
      icon: Sparkles
    },
    {
      role: "admin",
      label: "Admin / Owner",
      desc: "Revenue metrics, student triage, course studio, password gate",
      icon: ShieldAlert
    }
  ];

  const currentRoleInfo = roles.find(r => r.role === currentUser.role) || roles[0];

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-[999999] px-3.5 py-2 rounded-full bg-white border border-slate-200 text-[#091540] hover:border-[#1B2CC1] shadow-lg text-xs font-bold flex items-center gap-1.5 transition-all"
        title="Open Simulation Role Switcher"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#1B2CC1]" />
        <span className="text-[11px]">Test Mode</span>
      </button>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="fixed bottom-4 right-4 z-[999999] pointer-events-auto"
    >
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl mb-2 flex flex-col gap-1 text-[#091540]">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Switch Simulation Mode
            </span>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              title="Minimize"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {roles.map(item => {
            const Icon = item.icon;
            const isActive = currentUser.role === item.role;

            return (
              <button
                key={item.role}
                onClick={(e) => {
                  e.stopPropagation();
                  switchRole(item.role);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                  isActive
                    ? "bg-slate-100 border border-slate-200"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className={`p-1.5 rounded-lg mt-0.5 ${
                  isActive ? "bg-[#091540] text-white" : "bg-slate-100 text-[#091540]"
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#091540]">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-[#091540] text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Pill Trigger Button (CAPSULE BUTTON) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#091540] shadow-lg hover:shadow-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
        <span className="text-slate-500 font-medium text-[11px]">Role:</span>
        <span className="font-bold text-[#091540]">{currentRoleInfo.label}</span>
        <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
