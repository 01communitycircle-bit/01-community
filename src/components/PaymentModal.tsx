"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  ExternalLink,
  HelpCircle,
  FileCheck,
  UploadCloud,
  AlertTriangle,
  BookOpen,
  ChevronDown
} from "lucide-react";

export default function PaymentModal() {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    selectedTrackForPurchase,
    tracks,
    currentUser,
    handleMockPaymentSuccess,
    transactions,
    whatsappQueue
  } = useApp();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Business UPI Settings - Extracted directly from client's official UPI QR code
  const BUSINESS_UPI_ID = "9839024329@ptyes";
  const BUSINESS_NAME = "Pinki Pandey";
  const AMOUNT = 999;

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

  // Clean empty phone so student enters genuine WhatsApp number
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
  const upiIntentUrl = `upi://pay?pa=${BUSINESS_UPI_ID}&pn=${encodeURIComponent(BUSINESS_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(track?.title || "0.1% Pro Access")}`;

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
      q => (q.utrNumber && q.utrNumber.toLowerCase() === cleanUtr.toLowerCase()) ||
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

      handleMockPaymentSuccess(
        cleanPhone,
        cleanUtr,
        screenshotPreview || "",
        track?.id
      );

      setTimeout(() => {
        closePaymentModal();
        setPaymentDone(false);
        router.push("/dashboard");
      }, 1800);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-[#091540] max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        {!paymentDone && (
          <button
            onClick={closePaymentModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-[#091540] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {paymentDone ? (
          /* Payment Success Confirmation */
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="inline-flex p-4 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-[#091540] tracking-tight">
              ₹999 UPI Payment Submitted!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
              Enrolled in <strong className="text-[#091540]">{track?.title}</strong>. WhatsApp verification is in progress (<strong className="text-[#091540]">~15 minutes</strong>). The community director is verifying your UTR and will add you to the VIP group ASAP!
            </p>
            <div className="p-3.5 rounded-2xl bg-[#f8fbff] border border-slate-200 text-xs text-[#091540] flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#1B2CC1] flex-shrink-0" />
              <span>WhatsApp invite assigned to: <strong className="text-[#091540] font-bold">{phone}</strong></span>
            </div>
            <div className="pt-2 text-xs text-[#1B2CC1] flex items-center justify-center gap-2 font-bold">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Redirecting to your unlocked Member Hub...</span>
            </div>
          </div>
        ) : (
          /* Direct Business UPI QR View */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-[#091540] flex-shrink-0 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f0f7ff] text-[#1B2CC1] border border-[#cce4fc]">
                    Direct Business UPI
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Zero Commission</span>
                </div>
                <h2 className="text-lg font-black text-[#091540] tracking-tight mt-0.5">
                  Scan & Pay ₹999 for Course Access
                </h2>
              </div>
            </div>

            {/* Course Selection Dropdown (1 Student = 1 Specific Course) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#091540] mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#1B2CC1]" />
                  <span>Enrolling in Course:</span>
                </span>
                <span className="text-[10px] text-slate-500 font-bold">1 Student = 1 Specific Course</span>
              </label>
              <div className="relative">
                <select
                  value={track?.id}
                  onChange={(e) => {
                    const found = tracks.find(t => t.id === e.target.value);
                    if (found) setCurrentSelectedTrack(found);
                  }}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-[#091540] font-bold text-xs sm:text-sm focus:outline-none focus:border-[#1B2CC1] cursor-pointer appearance-none truncate"
                >
                  {tracks.map(t => (
                    <option key={t.id} value={t.id} className="bg-white text-[#091540]">
                      {t.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between px-1 text-[11px]">
                <span className="text-slate-500 font-medium">Course Fee:</span>
                <span className="font-mono font-bold text-[#091540]">₹999 (Lifetime Access)</span>
              </div>
            </div>

            {/* Official QR Code & UPI ID Card (CLEAN WHITE) */}
            <div className="mb-5 p-4 rounded-2xl bg-[#f8fbff] border border-slate-200 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              
              {/* Client's Official UPI QR Code */}
              <div className="p-2 rounded-2xl bg-white border border-slate-200 flex-shrink-0 shadow-xs flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/upi-qr.jpg"
                  alt="Official UPI QR Code"
                  className="w-34 h-34 sm:w-36 sm:h-36 object-contain rounded-xl"
                />
                <span className="text-[10px] font-bold text-slate-700 mt-1">Official Payment QR</span>
              </div>

              {/* UPI ID & Details */}
              <div className="flex-1 space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Official Business VPA</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <code className="text-xs font-mono font-bold text-[#091540] bg-white px-2.5 py-1 rounded-lg border border-slate-300">
                      {BUSINESS_UPI_ID}
                    </code>
                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-[#091540] transition-colors cursor-pointer"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-[#1B2CC1]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-600">
                  <span>Pay: </span>
                  <strong className="text-base font-black text-[#091540] font-mono">₹999</strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Google Pay, PhonePe, Paytm, BHIM, Cred</span>
                </div>

                <a
                  href={upiIntentUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2CC1] hover:underline"
                >
                  <span>Pay via Installed UPI App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Submission Form (CLEAN WHITE INPUTS) */}
            <form onSubmit={handleConfirmUpiPayment} className="space-y-3.5">
              
              {/* WhatsApp Phone */}
              <div>
                <label className="block text-xs font-bold text-[#091540] mb-1 flex items-center justify-between">
                  <span>1. Enter Your WhatsApp Phone Number *</span>
                  <span className="text-[10px] text-[#1B2CC1] font-bold">Required for WhatsApp VIP Add</span>
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter 10-digit WhatsApp number (e.g. 98765 43210)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#091540] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#1B2CC1]"
                  />
                </div>
              </div>

              {/* 12-Digit UTR Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#091540] flex items-center gap-1.5">
                    <span>2. Enter 12-Digit UPI Ref / UTR Number *</span>
                    <FileCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUtrHelp(!showUtrHelp)}
                    className="text-[11px] text-[#1B2CC1] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Where is UTR?</span>
                  </button>
                </div>

                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={e => {
                    setUtrNumber(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="e.g. 432198765432 (12 digits)"
                  maxLength={16}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#091540] placeholder-slate-400 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#1B2CC1]"
                />

                {showUtrHelp && (
                  <div className="mt-2 p-3 rounded-xl bg-[#f8fbff] border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                    💡 <strong>Where to find UTR:</strong> After sending ₹999 on Google Pay, PhonePe, or Paytm, tap on the completed transaction details. Look for <em>&ldquo;UPI Transaction ID&rdquo;</em> or <em>&ldquo;UTR (12 digits)&rdquo;</em>. Copy and paste all 12 digits here.
                  </div>
                )}
              </div>

              {/* Screenshot Receipt Upload (Payment Proof) */}
              <div>
                <label className="block text-xs font-bold text-[#091540] mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>3. Upload Payment Proof Screenshot *</span>
                    <UploadCloud className="w-3.5 h-3.5 text-[#1B2CC1]" />
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">GPay / PhonePe / Paytm receipt</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="hidden"
                  id="payment-screenshot-upload"
                />

                {screenshotPreview ? (
                  <div className="p-3 rounded-xl bg-[#f8fbff] border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={screenshotPreview}
                        alt="Payment preview"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#091540] truncate block">
                          {screenshotName || "payment-proof.jpg"}
                        </span>
                        <span className="text-[10px] text-[#1B2CC1] font-bold block flex items-center gap-1">
                          <Check className="w-3 h-3" /> Screenshot Ready
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="payment-screenshot-upload"
                    className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#091540] bg-[#f8fbff] text-slate-600 hover:text-[#091540] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all text-center"
                  >
                    <UploadCloud className="w-5 h-5 text-[#1B2CC1]" />
                    <span className="text-xs font-bold text-[#091540]">
                      Click to upload payment proof screenshot
                    </span>
                    <span className="text-[10px] text-slate-500">
                      PNG, JPG up to 5MB (Required by Director)
                    </span>
                  </label>
                )}
              </div>

              {/* Submit CTA Button (SOLID DARK BUTTON) */}
              <button
                type="submit"
                disabled={isProcessing}
                className="solid-btn-primary w-full py-4 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying UTR & Registering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#ABD2FA]" />
                    <span>Submit Payment & Request WhatsApp Access</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B2CC1]" />
                <span>Anti-fraud verified • WhatsApp invite issued in ~15 mins</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
