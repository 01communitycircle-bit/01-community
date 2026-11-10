"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { SkillTrack } from "../../../lib/types";
import {
  BookOpen,
  PlusCircle,
  Trash2,
  X
} from "lucide-react";

export default function AdminCoursesPage() {
  const { tracks, handleAddCourse, handleDeleteCourse } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields for new course or batch
  const [title, setTitle] = useState("");
  const [batchName, setBatchName] = useState("Batch 1 - Cohort");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [badge, setBadge] = useState("High Demand");
  const [averageEarnings, setAverageEarnings] = useState("₹70,000 - ₹2,00,000 / mo");
  const [deliverablesInput, setDeliverablesInput] = useState("Client Contract SLA\nCold Email Pitch Script\nNotion CRM Starter Kit");
  const [modulesInput, setModulesInput] = useState("Module 1: Core Fundamentals & Setups\nModule 2: Client Outreach & Portfolio\nModule 3: Production Delivery & Scale");

  const openCreateModal = () => {
    setTitle("");
    setBatchName("Cohort 01 - 2026");
    setShortDesc("");
    setFullDesc("");
    setBadge("High Demand");
    setAverageEarnings("₹60,000 - ₹2,50,000 / mo");
    setDeliverablesInput("Curated Resource Vault\nClient Milestone Contract\nCold Pitch Email & DM Scripts");
    setModulesInput("Module 1: Skill Fundamentals\nModule 2: High-Paying Client Outreaches\nModule 3: Retainer Closings");
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const parsedModules = modulesInput.split("\n").filter(Boolean).map((modTitle) => ({
      title: modTitle.trim(),
      duration: "2h 30m",
      lessons: [
        "Core masterclass overview",
        "Step-by-step execution workflow",
        "Client delivery framework"
      ]
    }));

    const parsedDeliverables = deliverablesInput.split("\n").filter(Boolean).map(item => item.trim());

    const newTrack: SkillTrack = {
      id: slug || `track-${Date.now()}`,
      title: batchName ? `${title} (${batchName})` : title,
      price: 999,
      currency: "INR",
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      badge,
      averageEarnings,
      modulesCount: parsedModules.length,
      studentsCount: 1,
      tags: ["High-Income", "VIP WhatsApp", "Curriculum"],
      modules: parsedModules,
      deliverables: parsedDeliverables
    };

    handleAddCourse(newTrack);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 bg-white text-[#091540]">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#091540] mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>Course & Batch Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#091540] tracking-tight">
            Manage Website Courses & Batches
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed font-medium">
            Add new courses or cohort batches, define deliverables, and set earnings targets. Any course removed here is deleted from the website immediately.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>Add New Course or Batch</span>
        </button>
      </div>

      {/* Active Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tracks.map(track => (
          <div
            key={track.id}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                  {track.badge}
                </span>
                <span className="text-sm font-black text-[#091540] font-mono">
                  ₹{track.price} (One-Time)
                </span>
              </div>

              <h3 className="text-lg font-black text-[#091540]">
                {track.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-normal leading-relaxed">
                {track.shortDesc}
              </p>

              {/* Target Income Badge */}
              <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Target Graduate Income:</span>
                <span className="font-bold text-[#091540] font-mono">{track.averageEarnings}</span>
              </div>

              {/* Modules breakdown */}
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Curriculum ({track.modules.length} Modules):
                </span>
                {track.modules.slice(0, 3).map((m, mIdx) => (
                  <div key={mIdx} className="text-xs text-slate-600 truncate flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B2CC1]"></span>
                    <span>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {track.studentsCount || 40}+ Students Enrolled
              </span>

              <button
                onClick={() => handleDeleteCourse(track.id)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-rose-50 text-xs font-bold text-rose-600 border border-rose-200 flex items-center gap-1.5 cursor-pointer transition-all"
                title="Delete this course from website"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Remove from Website</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Course or Batch */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto text-[#091540]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1B2CC1]" />
                <h3 className="text-base font-black text-[#091540]">
                  Create New Course or Cohort Batch
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs text-[#091540]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Next.js SaaS Architecture"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">
                    Batch / Cohort Name
                  </label>
                  <input
                    type="text"
                    value={batchName}
                    onChange={e => setBatchName(e.target.value)}
                    placeholder="e.g. Cohort 01 - 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                    placeholder="High Demand, Exclusive, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">
                    Target Average Earnings
                  </label>
                  <input
                    type="text"
                    value={averageEarnings}
                    onChange={e => setAverageEarnings(e.target.value)}
                    placeholder="e.g. ₹80,000 - ₹3,00,000 / mo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Short Description *
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={e => setShortDesc(e.target.value)}
                  placeholder="One sentence punchline for course cards"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Full Description & Roadmap
                </label>
                <textarea
                  rows={2}
                  value={fullDesc}
                  onChange={e => setFullDesc(e.target.value)}
                  placeholder="Detailed breakdown for track page"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Curriculum Modules (1 Per Line)
                </label>
                <textarea
                  rows={3}
                  value={modulesInput}
                  onChange={e => setModulesInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">
                  Included Templates & Assets (1 Per Line)
                </label>
                <textarea
                  rows={2}
                  value={deliverablesInput}
                  onChange={e => setDeliverablesInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Save & Publish to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
