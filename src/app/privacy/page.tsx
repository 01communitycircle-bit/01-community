import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | 0.1% Community",
  description: "Official Privacy Policy for 0.1% Community Members and Platform Users."
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen py-16 bg-white text-[#091540]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#091540] hover:text-[#1B2CC1] transition-colors bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f7ff] border border-[#cce4fc] text-xs font-bold text-[#1B2CC1] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Legal Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#091540] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Last Updated: November 2026 • 0.1% Community Guild
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">1. Information We Collect</h2>
            <p>
              When you authenticate on 0.1% Community via Google OAuth, we receive your basic Google account details including your name, email address, and profile picture avatar. If you enroll in a course, we collect your WhatsApp contact number and transaction UTR details solely to verify your admission into private WhatsApp circles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">2. How We Use Your Data</h2>
            <p>
              Your information is strictly used to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Authenticate your identity and grant access to enrolled courses.</li>
              <li>Manually verify and add you to the exclusive 0.1% VIP WhatsApp Community.</li>
              <li>Display verified milestone proofs on the student Wall of Fame when voluntarily published by you.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">3. Account Deletion & Rights</h2>
            <p>
              Students have complete ownership of their data. You may permanently delete your profile, course records, and all linked data at any time from your member profile desk.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">4. Contact Support</h2>
            <p>
              For privacy or account inquiries, contact the director at:{" "}
              <a href="mailto:0.1community.circle@gmail.com" className="font-bold text-[#1B2CC1] underline">
                0.1community.circle@gmail.com
              </a>
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
