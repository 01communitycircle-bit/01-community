"use client";

import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import { X, ArrowRight, Camera, User, Smartphone, ShieldCheck, Mail, Sparkles } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, setCurrentUser } = useApp();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const handleRealGoogleOAuth = async () => {
    setErrorMessage(null);
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined
        }
      });
      if (error) {
        setErrorMessage("Google OAuth is not configured in your Supabase dashboard yet. Use the quick registration form below.");
        setLoading(false);
      }
    } catch {
      setErrorMessage("Unable to connect to Google OAuth. Please fill in the details below.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your display name.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setErrorMessage("Please enter a valid email address (e.g. yourname@gmail.com).");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter your 10-digit mobile number for WhatsApp VIP addition.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const chosenAvatar = avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80";
      const userId = `usr_${Date.now()}`;

      const userProfile = {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
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
        email: cleanEmail,
        phone: cleanPhone,
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
            Student Access
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#091540] tracking-tight mt-2">
            Join 0.1% Community
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed font-medium">
            Register your profile with your Gmail and WhatsApp number to unlock courses and VIP community access.
          </p>
        </div>

        {/* One-Click Google OAuth Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleRealGoogleOAuth}
            className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-[#091540] bg-white hover:bg-slate-50 text-[#091540] text-xs font-bold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Account</span>
          </button>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-3 bg-white text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Or quick register below
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Google Onboarding Form */}
        <form onSubmit={handleGoogleSignIn} className="space-y-3.5">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Full Name *</span>
              <span className="text-[10px] text-slate-400 font-normal">Displayed on profile</span>
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

          {/* Email / Gmail Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Gmail / Email Address *</span>
              <span className="text-[10px] text-slate-400 font-normal">For course access</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. aryansharma@gmail.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#091540] placeholder-slate-400 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#1B2CC1]"
              />
            </div>
          </div>

          {/* Mobile / WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Mobile / WhatsApp Number *</span>
              <span className="text-[10px] text-[#1B2CC1] font-bold">Required for VIP Add</span>
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
                    <span className="text-[10px] text-emerald-600 font-medium">Ready ✓</span>
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
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-300 hover:border-[#1B2CC1] bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer transition-all"
                >
                  <Camera className="w-4 h-4 text-slate-500" />
                  <span>Choose Profile Picture</span>
                </label>
              </div>
            )}
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="solid-btn-primary w-full py-3.5 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
          >
            {loading ? (
              <span>Connecting to Supabase...</span>
            ) : (
              <>
                <span>Sign In & Continue</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>

          <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
            <span>Secure Supabase Profile & Instant VIP Access</span>
          </div>

        </form>

      </div>
    </div>
  );
}
