"use client";

import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import { X, ArrowRight, Camera, User, Smartphone, ShieldCheck } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, setCurrentUser } = useApp();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthModalOpen) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Photo size exceeds 5MB. Please choose a smaller image.");
      return;
    }
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGoogleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your display name to continue with Google.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter your 10-digit mobile number for WhatsApp group addition.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const chosenAvatar = avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80";
      const userId = `usr_${Date.now()}`;
      const userEmail = `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`;

      const userProfile = {
        id: userId,
        name: name.trim(),
        email: userEmail,
        phone: phone.trim(),
        avatar: chosenAvatar,
        role: "student_unpaid" as const,
        isPro: false,
        enrolledTracks: [],
        whatsappStatus: "not_started" as const,
        joinedAt: "Just now"
      };

      setCurrentUser(userProfile);

      // Persist to Supabase profiles
      supabase.from("profiles").upsert({
        id: userId,
        name: name.trim(),
        email: userEmail,
        phone: phone.trim(),
        avatar: chosenAvatar,
        role: "student_unpaid",
        is_pro: false
      }).then(() => {});

      closeAuthModal();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-[#091540] max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 bg-white mx-auto flex items-center justify-center mb-3 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#091540] border border-slate-200">
            Fast Google Sign-In
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight mt-2">
            Join 0.1% Community
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed font-medium">
            Sign in with Google. Set your display name, optional profile picture, and mobile number.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Google Onboarding Form */}
        <form onSubmit={handleGoogleSignIn} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Full Name *</span>
              <span className="text-[10px] text-slate-400 font-normal">Displayed on platform</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Aryan Sharma"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#091540] placeholder-slate-400 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#1B2CC1]"
              />
            </div>
          </div>

          {/* Mobile / WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Mobile / WhatsApp Number *</span>
              <span className="text-[10px] text-slate-400 font-normal">For WhatsApp group addition</span>
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 98765 43210 (10 digits)"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#091540] placeholder-slate-400 text-xs sm:text-sm font-mono bg-white focus:outline-none focus:border-[#1B2CC1]"
              />
            </div>
          </div>

          {/* Optional Profile Picture Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Profile Picture (Optional)</span>
              <span className="text-[10px] text-slate-400 font-normal">Optional</span>
            </label>

            {avatarPreview ? (
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#091540] block">Photo Selected</span>
                    <span className="text-[10px] text-emerald-600 font-medium">Ready to upload ✓</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFile}
                  className="hidden"
                  id="google-avatar-file-input"
                />
                <label
                  htmlFor="google-avatar-file-input"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#1B2CC1] bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer transition-all"
                >
                  <Camera className="w-4 h-4 text-slate-500" />
                  <span>Choose Profile Picture (Optional)</span>
                </label>
              </div>
            )}
          </div>

          {/* Google Sign In Button (CAPSULE BUTTON) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#091540] hover:bg-[#1B2CC1] text-white text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
                  />
                </svg>
                <span>Continue with Google Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
          <span>Frictionless Google authentication • No verification email needed</span>
        </div>
      </div>
    </div>
  );
}
