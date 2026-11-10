"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Users, Search, MessageCircle, Copy, Check } from "lucide-react";

export default function StudentsDirectoryPage() {
  const { whatsappQueue, tracks } = useApp();
  const [search, setSearch] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyPhone = (phone: string, id: string) => {
    try {
      navigator.clipboard.writeText(phone);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const filtered = whatsappQueue.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      item.studentPhone.includes(search);
    const matchesTrack = filterTrack === "all" || item.trackId === filterTrack;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="space-y-6 bg-white text-[#091540]">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
            <Users className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>Student Registry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight">
            Enrolled Students Directory
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Verified course buyers, registered WhatsApp contacts, and VIP access status.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-full pl-9 pr-3.5 py-2 rounded-full border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
            />
          </div>

          {/* Filter by Course */}
          <select
            value={filterTrack}
            onChange={e => setFilterTrack(e.target.value)}
            className="px-3.5 py-2 rounded-full border border-slate-200 text-xs font-bold text-[#091540] bg-white cursor-pointer focus:outline-none focus:border-[#1B2CC1]"
          >
            <option value="all">All Courses ({tracks.length})</option>
            {tracks.map(t => (
              <option key={t.id} value={t.id}>
                {t.title.split("(")[0].trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table in Clean Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Student Name & Contact</th>
                <th className="py-3.5 px-6">Enrolled Course</th>
                <th className="py-3.5 px-6">WhatsApp Phone</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Enrolled Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[#091540]">
              {filtered.map(item => {
                const isCopied = copiedId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#091540]">{item.studentName}</div>
                      <div className="text-[11px] text-slate-500">{item.studentEmail}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200 text-[11px] font-bold">
                        {item.trackName.split("(")[0].trim()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-700 font-bold">{item.studentPhone}</span>
                        <button
                          onClick={() => copyPhone(item.studentPhone, item.id)}
                          className="p-1 rounded-full text-slate-400 hover:text-[#091540] hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Copy Phone Number"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === "joined"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.status === "invite_sent"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "joined"
                            ? "bg-emerald-600"
                            : item.status === "invite_sent"
                            ? "bg-amber-600"
                            : "bg-slate-400"
                        }`}></span>
                        {item.status === "joined"
                          ? "Active in VIP"
                          : item.status === "invite_sent"
                          ? "Invite Sent"
                          : "Verification Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {item.paidAt || "Recently"}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
