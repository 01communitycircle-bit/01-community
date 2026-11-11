"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { SkillTrack } from "../../../lib/types";
import { LIFETIME_PRO_PRICE, LIFETIME_VIP_PRICE } from "../../../lib/constants";
import {
  BookOpen,
  PlusCircle,
  Trash2,
  X,
  Sparkles,
  Award
} from "lucide-react";

export default function AdminCoursesPage() {
  const { tracks, handleAddCourse, handleDeleteCourse } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields for new track or batch
  const [title, setTitle] = useState("");
  const [batchName, setBatchName] = useState("Cohort 2026");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [badge, setBadge] = useState("High Demand");
  const [averageEarnings, setAverageEarnings] = useState("₹20,000 - ₹25,000 / mo");
  const [deliverablesInput, setDeliverablesInput] = useState("Client Contract SLA Agreement\nCold Outreach Pitch Scripts\nHigh-Converting Portfolio Templates");

  const openCreateModal = () => {
    setTitle("");
    setBatchName("Cohort 01 - 2026");
    setShortDesc("");
    setFullDesc("");
    setBadge("High Demand");
    setAverageEarnings("₹20,000 - ₹25,000 / mo");
    setDeliverablesInput("Curated Resource Vault\nClient Milestone Contract\nCold Pitch Email & DM Scripts");
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const parsedDeliverables = deliverablesInput.split("\n").filter(Boolean).map(item => item.trim());

    const newTrack: SkillTrack = {
      id: slug || `track-${Date.now()}`,
      title: batchName ? `${title} (${batchName})` : title,
      price: LIFETIME_PRO_PRICE,
      currency: "INR",
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      badge,
      averageEarnings,
      modulesCount: 1,
      studentsCount: 1,
      tags: ["High-Income", "VIP WhatsApp", "Mentorship"],
      modules: [],
      deliverables: parsedDeliverables
    };

    handleAddCourse(newTrack);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 text-white">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d12] border border-red-500/20 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-500/40 text-xs font-bold text-red-400 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-red-400" />
            <span>Program & Batch Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Manage Website Programs & Batches
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed font-medium">
            Add new skill tracks or cohort batches, define deliverables, and set realistic income targets. Any track removed here is deleted from the website immediately.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>Add New Program or Batch</span>
        </button>
      </div>

      {/* Active Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tracks.map(track => (
          <div
            key={track.id}
            className="bg-[#0d0d12] p-6 sm:p-7 rounded-3xl border border-red-500/20 hover:border-red-500/40 shadow-2xl flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-500/40">
                  {track.badge}
                </span>
                <span className="text-sm font-black text-red-400 font-mono">
                  ₹{track.price || LIFETIME_PRO_PRICE} / ₹{LIFETIME_VIP_PRICE}
                </span>
              </div>

              <h3 className="text-lg font-black text-white">
                {track.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                {track.shortDesc}
              </p>

              {/* Target Income Badge */}
              <div className="mt-3.5 p-3 rounded-2xl bg-black border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Graduate Target:</span>
                <span className="font-bold text-red-400 font-mono">{track.averageEarnings || "₹20,000 - ₹25,000 / mo"}</span>
              </div>

              {/* Deliverables breakdown */}
              {track.deliverables && track.deliverables.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Guild Deliverables:
                  </span>
                  {track.deliverables.slice(0, 3).map((d, dIdx) => (
                    <div key={dIdx} className="text-xs text-slate-300 truncate flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium font-mono">
                Active Guild Program
              </span>

              <button
                onClick={() => handleDeleteCourse(track.id)}
                className="px-3.5 py-1.5 rounded-full bg-black hover:bg-red-950 text-xs font-bold text-red-400 border border-red-500/30 flex items-center gap-1.5 cursor-pointer transition-all"
                title="Delete this course from website"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Remove from Website</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Course or Batch */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#0d0d12] border border-red-500/40 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-400" />
                <h3 className="text-base font-black text-white">
                  Create New Program or Cohort Batch
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-200">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Next.js SaaS Architecture"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-200">
                    Batch / Cohort Name
                  </label>
                  <input
                    type="text"
                    value={batchName}
                    onChange={e => setBatchName(e.target.value)}
                    placeholder="e.g. Cohort 01 - 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-200">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-200">
                    Target Earnings (Realistic)
                  </label>
                  <input
                    type="text"
                    value={averageEarnings}
                    onChange={e => setAverageEarnings(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Short Description
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={e => setShortDesc(e.target.value)}
                  placeholder="Summary for cards and listings"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-medium text-white bg-black focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-200">
                  Guild Deliverables (1 per line)
                </label>
                <textarea
                  value={deliverablesInput}
                  onChange={e => setDeliverablesInput(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs font-normal text-white bg-black resize-none focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="solid-btn-primary px-6 py-2.5 text-xs font-black rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer"
                >
                  Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
