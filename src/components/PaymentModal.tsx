"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { SkillTrack } from "../lib/types";
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  ArrowRight,
  MessageCircle,
  Clock,
  Copy,
  Check,
  HelpCircle,
  FileCheck,
  UploadCloud,
  AlertTriangle,
  BookOpen,
  PhoneCall,
  Flame,
  Award,
  Zap
} from "lucide-react";
import {
  LIFETIME_PRO_PRICE,
  LIFETIME_VIP_PRICE,
  TOTAL_SLOTS_LIMIT,
  CURRENT_SLOTS_CLAIMED,
  REMAINING_SLOTS,
  OFFICIAL_WHATSAPP_NUMBER,
  INCOME_DISCLAIMER,
  generateWhatsAppPurchaseUrl
} from "../lib/constants";

export default function PaymentModal() {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    openAuthModal,
    isAuthenticated,
    selectedTrackForPurchase,
    tracks,
    currentUser,
    handleMockPaymentSuccess,
    whatsappQueue,
    slotsClaimed,
    slotsRemaining
  } = useApp();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Business UPI Settings
  const BUSINESS_UPI_ID = "9839024329@ptyes";
  const BUSINESS_NAME = "0.1% Community";

  // Check user tier status
  const userIsVip = currentUser.role === "admin" || currentUser.planType === "vip";
  const userIsPro = currentUser.isPro && !userIsVip;

  // Selected Plan: "vip" (₹1,499) vs "pro" (₹999)
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "vip">("vip");
  const [planWarning, setPlanWarning] = useState<string | null>(null);

  // Selected Track State (1 Student = 1 Specific Course)
  const [currentSelectedTrack, setCurrentSelectedTrack] = useState<SkillTrack>(
    selectedTrackForPurchase || tracks[0]
  );

  useEffect(() => {
    if (selectedTrackForPurchase) {
      setCurrentSelectedTrack(selectedTrackForPurchase);
    } else if (tracks.length > 0) {
      setCurrentSelectedTrack(tracks[0]);
    }
  }, [selectedTrackForPurchase, tracks]);

  // If a Pro user opens the modal, automatically select VIP for upgrade
  useEffect(() => {
    if (userIsPro) {
      setSelectedPlan("vip");
      setPlanWarning(null);
    }
  }, [userIsPro, isPaymentModalOpen]);

  // Clean phone so student enters genuine WhatsApp number
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [utrNumber, setUtrNumber] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [showUtrHelp, setShowUtrHelp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Screenshot state
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string | null>(null);

  if (!isPaymentModalOpen) return null;

  const track = currentSelectedTrack || tracks[0];

  // VIP users cannot purchase again - they own the highest tier
  const isAlreadyVipEnrolled = userIsVip;

  const currentPrice = selectedPlan === "vip" ? LIFETIME_VIP_PRICE : LIFETIME_PRO_PRICE;
  const currentQrImage = selectedPlan === "vip" ? "/upi-qr-1499.png" : "/upi-qr-999.png";

  const upiIntentUrl = `upi://pay?pa=${BUSINESS_UPI_ID}&pn=${encodeURIComponent(
    BUSINESS_NAME
  )}&am=${currentPrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
    `${track?.title || "0.1% Community"} [${selectedPlan.toUpperCase()}]`
  )}`;

  const handleSelectPlan = (plan: "pro" | "vip") => {
    if (userIsVip && plan === "pro") {
      setPlanWarning(
        "You are already a part of the VIP plan. Why do you need a Pro plan? You are on the top plan of ours, so you need to stay on this and keep it up there."
      );
      return;
    }

    if (userIsPro && plan === "pro") {
      setPlanWarning(
        "You already own the Pro Plan! Select VIP Plan (₹1,499) to upgrade and unlock direct 1-on-1 mentorship calls."
      );
      return;
    }

    setPlanWarning(null);
    setSelectedPlan(plan);
  };

  const copyUpiId = () => {
    try {
      navigator.clipboard.writeText(BUSINESS_UPI_ID);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {}
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Screenshot image exceeds 5MB. Please upload a smaller image.");
      return;
    }

    setScreenshotName(file.name);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setScreenshotPreview(null);
    setScreenshotName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger celebration explosion
  const fireCelebrationBoom = () => {
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#ffffff", "#059669", "#fbbf24"]
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ["#10b981", "#34d399", "#ffffff", "#fbbf24"]
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ["#10b981", "#34d399", "#ffffff", "#fbbf24"]
        });
      }, 300);
    } catch {}
  };

  const handleConfirmUpiPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit WhatsApp number so the director can add you.");
      return;
    }

    const cleanUtr = utrNumber.replace(/[^0-9A-Za-z]/g, "").trim();
    if (cleanUtr.length < 12) {
      setErrorMessage("Please enter the complete 12-digit UPI UTR / Reference number from your payment receipt.");
      return;
    }

    const isDuplicateUtr = whatsappQueue.some(
      (q) =>
        (q.utrNumber && q.utrNumber.toLowerCase() === cleanUtr.toLowerCase()) ||
        (q.notes && q.notes.toLowerCase().includes(cleanUtr.toLowerCase()))
    );
    if (isDuplicateUtr) {
      setErrorMessage("This UTR number has already been submitted. Please check your banking app for the exact transaction reference.");
      return;
    }

    if (!screenshotPreview) {
      setErrorMessage("Payment proof screenshot is mandatory. Please upload your payment success screenshot.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      fireCelebrationBoom();

      handleMockPaymentSuccess(
        cleanPhone,
        cleanUtr,
        screenshotPreview || "",
        track?.id,
        selectedPlan,
        currentPrice
      );

      // Automatically launch WhatsApp so the buyer initiates the notification message to the founder
      try {
        window.open(whatsAppDirectUrl, "_blank", "noopener,noreferrer");
      } catch {}
    }, 850);
  };

  // Direct WhatsApp notification link for the purchasing student
  const whatsAppDirectUrl = generateWhatsAppPurchaseUrl({
    studentName: currentUser.name || "Student",
    studentEmail: currentUser.email,
    trackTitle: track?.title || "High-Income Program",
    planType: selectedPlan,
    utrNumber: utrNumber || undefined,
    slotNumber: slotsClaimed + 1
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0c100e] border border-emerald-500/40 shadow-emeraldGlow text-white max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        {!paymentDone && (
          <button
            onClick={closePaymentModal}
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* PRICING BOOMER / POST-PURCHASE SCREEN */}
        {paymentDone ? (
          <div className="text-center py-6 sm:py-8 space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Glowing Trophy Icon with Pulse Rings */}
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-600/30 blur-xl animate-ping" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 border-2 border-emerald-400 flex items-center justify-center text-white shadow-emeraldGlow relative z-10">
                <Flame className="w-10 h-10 text-white animate-bounce" />
              </div>
            </div>

            {/* Price Boom Headline */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                PRICE BOOM • SPOT #{slotsClaimed + 1} CLAIMED
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                BOOM! You&apos;re In The Guild!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed mt-1 font-medium">
                Successfully enrolled in <strong className="text-white font-bold">{track?.title}</strong> under the{" "}
                <span className="text-emerald-400 font-bold uppercase">
                  {selectedPlan === "vip" ? "VIP Plan (₹1,499)" : "Pro Plan (₹999)"}
                </span>.
              </p>
            </div>

            {/* VIP Direct Call Badge if VIP */}
            {selectedPlan === "vip" && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-black border border-emerald-500/50 text-xs text-left space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>VIP 1-on-1 Main Line Call Access Activated!</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Direct 1-on-1 phone call mentorship with Tech Arush is now linked to your profile (+91 {OFFICIAL_WHATSAPP_NUMBER.slice(-10)}).
                </p>
              </div>
            )}

            {/* DIRECT BUYER-INITIATED WHATSAPP NOTIFICATION BUTTON */}
            <div className="pt-2 space-y-2.5">
              <a
                href={whatsAppDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm inline-flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Open WhatsApp to Notify Founder Instantly</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
              <p className="text-[10px] text-neutral-400">
                Clicking above opens your WhatsApp directly with pre-filled details to verify your payment and trigger WhatsApp circle onboarding.
              </p>
            </div>

            {/* Dashboard Redirect Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  closePaymentModal();
                  setPaymentDone(false);
                  router.push("/dashboard");
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-neutral-800"
              >
                Continue to Member Dashboard →
              </button>
            </div>

          </div>
        ) : !isAuthenticated ? (
          /* Sign In Gatekeeper */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-emeraldGlowSm">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
              Step 1 of 2
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sign In Required to Secure Your Slot
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed font-medium">
              To make sure your course access to <strong className="text-white">{track?.title}</strong> and VIP WhatsApp access are permanently linked to your profile, please sign in with Google first.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  closePaymentModal();
                  openAuthModal("login");
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full solid-btn-primary text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In with Google First</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ) : isAlreadyVipEnrolled ? (
          /* Top VIP Tier Active - Cannot Downgrade */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-emeraldGlow">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50">
              VIP Master Member • Highest Tier
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Top VIP Tier Already Active
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium max-w-md mx-auto">
              &ldquo;You are already a part of the VIP plan. Why do you need a Pro plan? You are on the top plan of ours, so you need to stay on this and keep it up there.&rdquo;
            </div>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              You already hold 1-on-1 phone call mentorship access with Tech Arush and full community privileges under <strong className="text-white font-mono">{currentUser.email}</strong>.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  closePaymentModal();
                  router.push("/dashboard");
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full solid-btn-primary text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Go to Your Member Dashboard</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ) : (
          /* Direct Business UPI View with Plan Selector & Upgrade Capability */
          <div>
            {/* Header with Slot Scarcity Badge */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    STRICTLY {TOTAL_SLOTS_LIMIT} SLOTS ONLY
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    Only <strong className="text-emerald-400">{slotsRemaining} spots</strong> left
                  </span>
                </div>
                <h2 className="text-lg font-black text-white tracking-tight">
                  {userIsPro ? `Upgrade to VIP: ${track?.title}` : `Enroll in ${track?.title}`}
                </h2>
              </div>
            </div>

            {/* PRO USER UPGRADE NOTICE */}
            {userIsPro && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs text-neutral-200">
                  <strong className="text-white font-bold">Pro Member Upgrade:</strong> You are currently on the Pro Plan. Upgrade to the <strong className="text-emerald-400">VIP Plan (₹1,499)</strong> to unlock direct 1-on-1 phone call mentorship with Tech Arush!
                </div>
              </div>
            )}

            {/* DYNAMIC PLAN WARNING ALERT */}
            {planWarning && (
              <div className="mb-4 p-3 rounded-2xl bg-amber-950/60 border border-amber-500/60 flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-amber-200 font-medium leading-relaxed">
                  {planWarning}
                </span>
              </div>
            )}

            {/* TWO-TIER PLAN SELECTOR (PRO vs VIP) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Select Your Plan Tier:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* VIP Plan Card (Recommended) */}
                <div
                  onClick={() => handleSelectPlan("vip")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                    selectedPlan === "vip"
                      ? "bg-emerald-950/40 border-emerald-500 shadow-emeraldGlowSm ring-1 ring-emerald-500"
                      : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 opacity-80"
                  }`}
                >
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                      {userIsPro ? "UPGRADE" : "RECOMMENDED"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-black text-white">VIP Plan</span>
                  </div>
                  <div className="text-xl font-black text-white mt-1">
                    ₹{LIFETIME_VIP_PRICE}
                    <span className="text-[10px] text-neutral-400 font-normal ml-1">one-time</span>
                  </div>
                  <p className="text-[10px] text-emerald-300 font-medium mt-1 leading-snug">
                    📞 Direct 1-on-1 Call Access on Tech Arush&apos;s Main Line anytime for problem fixing & client acquisition.
                  </p>
                </div>

                {/* Pro Plan Card */}
                <div
                  onClick={() => handleSelectPlan("pro")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                    selectedPlan === "pro"
                      ? "bg-neutral-900 border-emerald-500/80 shadow-xs ring-1 ring-emerald-500/80"
                      : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 opacity-80"
                  } ${userIsPro ? "border-dashed border-neutral-700" : ""}`}
                >
                  {userIsPro && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-neutral-800 text-emerald-400 border border-emerald-500/30">
                        OWNED
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-black text-white">Pro Plan</span>
                  </div>
                  <div className="text-xl font-black text-white mt-1">
                    ₹{LIFETIME_PRO_PRICE}
                    <span className="text-[10px] text-neutral-400 font-normal ml-1">one-time</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-medium mt-1 leading-snug">
                    Complete curriculum, resource vault & standard community WhatsApp access.
                  </p>
                </div>

              </div>
            </div>

            {/* Authenticated Student Account Pill */}
            <div className="mb-4 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    currentUser.avatar ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                  }
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-neutral-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">{currentUser.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold shrink-0">
                      Verified
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono truncate block">
                    {currentUser.email}
                  </span>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-black shrink-0">
                ₹{currentPrice}
              </span>
            </div>

            {/* UPI QR Display Card (Dynamic based on selectedPlan: 1499 vs 999) */}
            <div className="p-4 rounded-2xl bg-black border border-emerald-500/30 mb-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-36 h-36 bg-white p-2 rounded-xl flex-shrink-0 shadow-emeraldGlowSm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentQrImage}
                  alt={`Official UPI QR - ₹${currentPrice}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                <div className="text-xs text-neutral-400 font-medium">Official Business UPI ID:</div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-mono text-sm font-black text-white bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-800">
                    {BUSINESS_UPI_ID}
                  </span>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Scan via GPay, PhonePe, Paytm, or BHIM. Amount:{" "}
                  <strong className="text-white font-bold">₹{currentPrice}</strong>
                </p>
                <a
                  href={upiIntentUrl}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Tap to Pay ₹{currentPrice} on Mobile UPI App</span>
                </a>
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleConfirmUpiPayment} className="space-y-3.5">
              
              {/* WhatsApp Number Field */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Your WhatsApp Number <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210 (10 digits)"
                    className="w-full px-3.5 py-2.5 rounded-xl solid-input text-xs text-white placeholder-neutral-500"
                  />
                </div>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  The founder uses this number to verify and invite you into the private VIP circle.
                </p>
              </div>

              {/* UTR Reference Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-neutral-300">
                    12-Digit UPI Ref / UTR Number <span className="text-emerald-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUtrHelp(!showUtrHelp)}
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Where to find UTR?</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 428719283741"
                  maxLength={22}
                  className="w-full px-3.5 py-2.5 rounded-xl solid-input font-mono text-xs text-white placeholder-neutral-500 uppercase"
                />
                {showUtrHelp && (
                  <p className="text-[10px] text-neutral-300 bg-neutral-900 p-2 rounded-lg mt-1 border border-neutral-800 leading-relaxed">
                    Open GPay/PhonePe/Paytm transaction history → Tap this ₹{currentPrice} payment → Copy the 12-digit &quot;UPI Ref No&quot; or &quot;UTR&quot;.
                  </p>
                )}
              </div>

              {/* Payment Proof Screenshot Upload */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Payment Proof Screenshot <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="hidden"
                />

                {screenshotPreview ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs text-neutral-200 truncate font-mono">
                        {screenshotName || "screenshot.jpg"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold ml-2 cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-xl border border-dashed border-emerald-500/40 hover:border-emerald-400 bg-black/40 text-neutral-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4 text-emerald-400" />
                    <span>Upload Payment Success Screenshot</span>
                  </button>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500 text-xs text-red-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Legal Realism Disclaimer */}
              <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800 text-[10px] text-neutral-400 leading-relaxed">
                {INCOME_DISCLAIMER}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-full solid-btn-primary font-black text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying UTR Reference...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>
                      {userIsPro
                        ? `Confirm Upgrade to VIP Plan (₹${LIFETIME_VIP_PRICE})`
                        : `Confirm & Claim Slot (₹${currentPrice})`}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
