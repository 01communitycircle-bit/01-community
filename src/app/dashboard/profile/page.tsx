"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import {
  Award,
  Globe,
  Github,
  Linkedin,
  Twitter,
  CheckCircle2,
  Edit3,
  Save,
  ExternalLink,
  BookOpen,
  Smartphone,
  UploadCloud,
  Camera,
  AlertCircle,
  Trash2,
  AlertTriangle,
  X,
  ShieldAlert
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, updateUserProfile, handleDeleteStudentAccount, tracks, results } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [githubUrl, setGithubUrl] = useState(currentUser.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(currentUser.linkedinUrl || "");
  const [twitterUrl, setTwitterUrl] = useState(currentUser.twitterUrl || "");
  const [portfolioUrl, setPortfolioUrl] = useState(currentUser.portfolioUrl || "");
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarError, setAvatarError] = useState("");

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setAvatarError("Image must be smaller than 4MB");
      return;
    }

    setAvatarError("");
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // User's specifically enrolled course (1 Student = 1 Specific Course)
  const enrolledTracksList = tracks.filter(t =>
    currentUser.enrolledTracks.includes(t.id) || (currentUser.role === "admin" && currentUser.enrolledTracks.includes(t.id))
  );

  const displayTracks = enrolledTracksList.length > 0 ? enrolledTracksList : (currentUser.isPro ? [tracks[0]] : []);
  const userResults = results.filter(r => r.studentId === currentUser.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      bio,
      avatar,
      githubUrl,
      linkedinUrl,
      twitterUrl,
      portfolioUrl,
      phone
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 bg-white text-[#091540]">
      
      {/* Top Banner / Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-slate-200 shadow-sm">
        
        {savedSuccess && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile successfully updated</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <div className="relative group flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-200 shadow-sm mx-auto"
              />
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight whitespace-nowrap">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200 whitespace-nowrap">
                  {currentUser.isPro ? "0.1% Pro Member" : "Registered Student"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed font-medium">
                {currentUser.bio || "Member of the 0.1% exclusive digital skill ecosystem."}
              </p>

              {/* Mobile Phone Pill */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs text-slate-600 font-mono font-medium">
                <Smartphone className="w-3.5 h-3.5 text-[#1B2CC1]" />
                <span>{currentUser.phone || "No phone added yet"}</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-4 mt-3 text-xs text-slate-500 font-medium">
                {currentUser.githubUrl && (
                  <a href={currentUser.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#091540] flex items-center gap-1 transition-colors">
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {currentUser.linkedinUrl && (
                  <a href={currentUser.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#091540] flex items-center gap-1 transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {currentUser.twitterUrl && (
                  <a href={currentUser.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#091540] flex items-center gap-1 transition-colors">
                    <Twitter className="w-3.5 h-3.5" />
                    <span>Twitter/X</span>
                  </a>
                )}
                {currentUser.portfolioUrl && (
                  <a href={currentUser.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#091540] flex items-center gap-1 transition-colors">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-[#091540] hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#1B2CC1]" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1] resize-none"
              />
            </div>

            {/* Avatar Image File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Profile Photo / Avatar
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleAvatarFileChange}
                className="hidden"
              />

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar || currentUser.avatar}
                  alt="Avatar preview"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 shadow-xs flex-shrink-0"
                />

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-white" />
                      <span>Upload Image</span>
                    </button>

                    {avatar !== currentUser.avatar && (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatar(currentUser.avatar);
                          setAvatarError("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors"
                      >
                        Reset Photo
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium">
                    PNG, JPG, or WEBP up to 4MB. Updates your profile picture across the platform.
                  </p>
                </div>
              </div>

              {avatarError && (
                <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{avatarError}</span>
                </div>
              )}
            </div>

            {/* Social URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">GitHub URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">LinkedIn URL</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Twitter / X URL</label>
                <input
                  type="url"
                  value={twitterUrl}
                  onChange={e => setTwitterUrl(e.target.value)}
                  placeholder="https://x.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Portfolio Website</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-[#091540] bg-white focus:outline-none focus:border-[#1B2CC1]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all"
            >
              <Save className="w-3.5 h-3.5 text-white" />
              <span>Save Profile Changes</span>
            </button>
          </form>
        )}
      </div>

      {/* SPECIFICALLY ENROLLED COURSES SECTION */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-[#091540] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#1B2CC1]" />
          <span>Your Enrolled Course on the Platform</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayTracks.map(t => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl flex flex-col justify-between space-y-4 border border-slate-200 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
                  Active Enrolled Course
                </span>
                <h4 className="text-base font-bold text-[#091540] mt-2 mb-1">{t.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 font-medium">{t.shortDesc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#091540]">
                  Target: {t.averageEarnings}
                </span>
                <Link
                  href={`/tracks/${t.id}`}
                  className="px-4 py-2 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Go to Course Syllabus</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User's Published Results */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-[#091540] flex items-center gap-2">
          <Award className="w-4 h-4 text-[#1B2CC1]" />
          <span>Your Published Proof of Work ({userResults.length})</span>
        </h3>

        {userResults.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl text-center space-y-2 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">
              You haven&apos;t published any client earnings proofs yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userResults.map(res => (
              <div
                key={res.id}
                className="bg-white p-6 rounded-3xl space-y-2.5 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#091540] font-mono">
                    {res.currencyLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{res.createdAt}</span>
                </div>
                <h4 className="text-xs font-bold text-[#091540]">&ldquo;{res.title}&rdquo;</h4>
                <p className="text-xs text-slate-500 line-clamp-2 font-medium">{res.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STUDENT DANGER ZONE: ACCOUNT DELETION (EXCEPT ADMIN) */}
      {currentUser.role !== "admin" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-black text-rose-600 uppercase tracking-wider">
                  Danger Zone
                </h3>
              </div>
              <h4 className="text-base font-bold text-[#091540] mt-1">
                Permanently Delete Account
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-medium">
                Permanently delete your profile, payment verification, course access, and VIP WhatsApp community membership. This action is irreversible.
              </p>
            </div>

            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <button
                onClick={() => {
                  setDeleteConfirmText("");
                  setShowDeleteModal(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete My Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#091540]">Permanently Delete Account?</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Irreversible Action</span>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#091540] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-xs text-slate-700">
              <p className="font-bold text-rose-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>You will permanently lose everything:</span>
              </p>
              <ul className="space-y-1.5 pl-5 list-disc text-slate-600 text-xs">
                <li><strong className="text-slate-800">Course Access:</strong> Complete loss of your enrolled ₹999 course modules and roadmaps.</li>
                <li><strong className="text-slate-800">VIP WhatsApp Guild:</strong> Revocation of access to the encrypted network.</li>
                <li><strong className="text-slate-800">Payment & UTR Records:</strong> All transaction logs and proof of payment will be wiped clean.</li>
                <li><strong className="text-slate-800">Proof of Work:</strong> All published client wins and Wall of Fame posts will be removed.</li>
                <li><strong className="text-rose-700">Brand New Account on Re-Login:</strong> When you sign in again with Google, your account will be 100% brand new with zero restored course access.</li>
              </ul>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              To confirm, please type <span className="font-mono font-bold text-rose-600">DELETE</span> in the box below:
            </p>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#091540] bg-white focus:outline-none focus:border-rose-500"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-[#091540] hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={async () => {
                  if (deleteConfirmText !== "DELETE") return;
                  setIsDeleting(true);
                  try {
                    await handleDeleteStudentAccount();
                    setShowDeleteModal(false);
                    router.push("/");
                  } catch (err) {
                    console.error("Account deletion failed:", err);
                    setIsDeleting(false);
                  }
                }}
                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Wiping Everything..." : "Permanently Delete Everything"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
