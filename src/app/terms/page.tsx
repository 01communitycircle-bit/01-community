import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata = {
  title: "Terms of Service | 0.1% Community",
  description: "Official Terms of Service for 0.1% Community Members."
};

export default function TermsPage() {
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Community Guidelines & Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#091540] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Last Updated: November 2026 • 0.1% Community Guild
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">1. Membership & Access</h2>
            <p>
              The 0.1% Community operates on a one-time enrollment model (₹999 lifetime per course). Enrollment includes ongoing updates to the curriculum, deliverable roadmaps, and manual addition to verified WhatsApp circles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">2. Code of Conduct</h2>
            <p>
              Members agree to uphold respectful, high-value communication within WhatsApp circles. Spam, unsolicited commercial promotions, harassment, or abusive behavior will result in immediate revocation of community access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">3. Wall of Fame Submissions</h2>
            <p>
              Milestone and earnings submissions posted to the Wall of Fame must represent genuine client deals, freelance invoices, or platform payouts. Fake or misleading proofs are strictly prohibited and will be removed by community administrators.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091540]">4. Contact Support</h2>
            <p>
              For questions regarding membership or terms, contact us at:{" "}
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
