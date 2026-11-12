"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Users, Search, MessageCircle, Copy, Check, Trash2, AlertTriangle, ShieldCheck, Mail, Phone, Calendar, Award, BookOpen } from "lucide-react";
import { OFFICIAL_ADMIN_EMAIL } from "../../../lib/constants";

export default function StudentsDirectoryPage() {
  const { allProfiles, whatsappQueue, tracks, handleAdminDeleteUserAccount } = useApp();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "enrolled">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<{ id: string; email: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const copyText = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  // Deduplicate profiles by lowercase email
  const uniqueProfiles = Array.from(
    allProfiles.reduce((map, p) => {
      const email = (p.email || "").toLowerCase().trim();
      if (!email) return map;
      const existing = map.get(email);
      if (!existing || (p.phone && !existing.phone) || (p.is_pro && !existing.is_pro)) {
        map.set(email, p);
      }
      return map;
    }, new Map<string, any>()).values()
  );

  // Build unified registered accounts list
  const unifiedUsers = uniqueProfiles.length > 0 ? (uniqueProfiles as any[]).map((p: any) => {
    const enrollment = whatsappQueue.find(q =>
      (q.studentId && q.studentId === p.id) ||
      (q.studentEmail && p.email && q.studentEmail.toLowerCase() === p.email.toLowerCase())
    );
    const isAdmin = p.email?.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase() || p.role === "admin";

    return {
      id: p.id,
      name: isAdmin ? "Aarush" : (p.name || p.full_name || p.email?.split("@")[0] || "Registered User"),
      email: p.email || "",
      phone: p.phone || enrollment?.studentPhone || "Not Provided",
      role: isAdmin ? "admin" : enrollment ? (enrollment.status === "joined" ? "vip_enrolled" : "pending_verification") : (p.role || "registered"),
      enrolledTrack: enrollment?.trackName || "None (Exploring Platform)",
      planType: isAdmin ? "vip" : enrollment?.planType,
      joinedDate: p.created_at ? new Date(p.created_at).toLocaleDateString() : "Recently",
      isEnrolled: Boolean(enrollment),
      status: enrollment?.status || "registered"
    };
  }) : [
    // Live Fallback matching platform users
    {
      id: "usr-admin",
      name: "Aarush (Founder & Admin)",
      email: "0.1community.circle@gmail.com",
      phone: "+91 91206 46330",
      role: "admin",
      enrolledTrack: "Master Access (All Tracks)",
      planType: "vip" as const,
      joinedDate: "Founding Date",
      isEnrolled: true,
      status: "joined"
    },
    ...whatsappQueue.map(q => ({
      id: q.studentId || q.id,
      name: q.studentName,
      email: q.studentEmail,
      phone: q.studentPhone,
      role: q.status === "joined" ? "vip_enrolled" : "pending_verification",
      enrolledTrack: q.trackName,
      planType: q.planType,
      joinedDate: q.paidAt || "Recently",
      isEnrolled: true,
      status: q.status
    }))
  ];

  const filtered = unifiedUsers.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);
    const matchesTab = tab === "all" || (tab === "enrolled" && item.isEnrolled);
    return matchesSearch && matchesTab;
  });

  const confirmDelete = async () => {
    if (!userToDelete) return;
    const targetId = userToDelete.id;
    const targetEmail = userToDelete.email;
    setUserToDelete(null); // Close modal IMMEDIATELY for 0ms lag
    try {
      await handleAdminDeleteUserAccount(targetId, targetEmail);
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Platform User Directory & Account Controls</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Registered Users & Students ({unifiedUsers.length})
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            View all registered accounts on 0.1% Community, inspect course access, or delete user accounts permanently.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Tab Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setTab("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === "all"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Users ({unifiedUsers.length})
            </button>
            <button
              onClick={() => setTab("enrolled")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === "enrolled"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Buyers ({whatsappQueue.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search user name, email, phone..."
              className="w-full pl-9 pr-3.5 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-4 px-6">User / Student Details</th>
                <th className="py-4 px-6">Course Access</th>
                <th className="py-4 px-6">Phone / WhatsApp</th>
                <th className="py-4 px-6">Status / Role</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-right">Account Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(item => {
                const isCopied = copiedId === item.id;
                const isAdmin = item.email.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase() || item.role === "admin";
                const isVip = item.planType === "vip" || (item.role === "admin");

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{item.name}</span>
                        {isAdmin && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{item.email}</span>
                      </div>
                    </td>

                    {/* Course Access & Plan */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          item.isEnrolled
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {item.enrolledTrack.split("(")[0].trim()}
                        </span>
                        {item.isEnrolled && (
                          <div>
                            {isVip ? (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs inline-flex items-center gap-1">
                                <Award className="w-2.5 h-2.5" />
                                VIP Plan
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                                <BookOpen className="w-2.5 h-2.5 text-emerald-600" />
                                Pro Plan
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-800 font-bold">{item.phone}</span>
                        {item.phone !== "Not Provided" && (
                          <button
                            onClick={() => copyText(item.phone, item.id)}
                            className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Copy Phone Number"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Role / Status */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isAdmin
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : item.status === "joined"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.status === "pending_add"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isAdmin
                            ? "bg-emerald-600"
                            : item.status === "joined"
                            ? "bg-emerald-500"
                            : item.status === "pending_add"
                            ? "bg-amber-500 animate-ping"
                            : "bg-slate-400"
                        }`} />
                        <span>
                          {isAdmin
                            ? "Founder / Director"
                            : item.status === "joined"
                            ? "VIP Active Member"
                            : item.status === "pending_add"
                            ? "Pending UTR Review"
                            : "Platform Registered"}
                        </span>
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 font-mono text-slate-500">
                      {item.joinedDate}
                    </td>

                    {/* Delete Account Action */}
                    <td className="py-4 px-6 text-right">
                      {isAdmin ? (
                        <span className="text-[10px] text-slate-400 font-mono italic">
                          Protected Account
                        </span>
                      ) : (
                        <button
                          onClick={() => setUserToDelete({ id: item.id, email: item.email, name: item.name })}
                          className="px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer shadow-2xs"
                          title="Delete User Account"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600" />
                          <span>Delete Account</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No registered platform accounts found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal to Delete User Account */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-2xs">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                Delete User Account?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete the account for{" "}
                <strong className="text-slate-900 font-mono">{userToDelete.email}</strong> ({userToDelete.name})?
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <p>• Removes user from registered profiles</p>
              <p>• Revokes course enrollments & WhatsApp community approvals</p>
              <p>• Deletes any submitted results from the Wall of Fame</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="w-1/2 py-2.5 px-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-1/2 py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isDeleting ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
