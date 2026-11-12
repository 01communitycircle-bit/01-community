"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import { X, Sparkles, MessageCircle, ExternalLink } from "lucide-react";
import { OFFICIAL_ADMIN_EMAIL } from "../lib/constants";

export default function NotificationToast() {
  const { notifications, dismissNotification, currentUser } = useApp();

  const isAdmin = currentUser.role === "admin" || currentUser.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();

  // Filter: non-admin students MUST NEVER see payment alerts or admin desk URLs
  const visibleNotifs = notifications.filter(n => {
    if (!isAdmin) {
      if (n.type === "payment") return false;
      if (n.actionUrl?.startsWith("/admin")) return false;
    }
    return true;
  });

  const activeNotifs = visibleNotifs.slice(0, 2);

  // Auto-dismiss notifications after 6 seconds
  useEffect(() => {
    if (activeNotifs.length > 0) {
      const firstId = activeNotifs[0].id;
      const timer = setTimeout(() => {
        dismissNotification(firstId);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeNotifs, dismissNotification]);

  if (activeNotifs.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-auto">
      {activeNotifs.map(n => (
        <div
          key={n.id}
          className="p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl flex items-start gap-3 relative animate-in slide-in-from-top-2 duration-200"
        >
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 mt-0.5 flex-shrink-0 border border-emerald-200">
            {n.type === "payment" ? <Sparkles className="w-4 h-4 text-emerald-600" /> : <MessageCircle className="w-4 h-4 text-emerald-600" />}
          </div>
          
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                {n.title}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-normal">
              {n.message}
            </p>
            {n.actionUrl && (
              <Link
                href={n.actionUrl}
                onClick={() => dismissNotification(n.id)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline mt-2"
              >
                <span>View Details</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => dismissNotification(n.id)}
            className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
