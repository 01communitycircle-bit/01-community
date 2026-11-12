/**
 * 0.1% Community Platform Constants
 */

// Official Master 0.1% VIP WhatsApp Group Invite Link
export const MASTER_WHATSAPP_INVITE_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL ||
  "https://chat.whatsapp.com/JmhE9JcDdUrClO3ZV1RDuA";

// Official Platform & Payment Details
export const OFFICIAL_ADMIN_EMAIL = "0.1community.circle@gmail.com";
export const OFFICIAL_ADMIN_NAME = "0.1% Community";
export const OFFICIAL_UPI_ID = "9839024329@ptyes";
export const OFFICIAL_PHONE = "+91 91206 46330";
export const OFFICIAL_WHATSAPP_NUMBER = "919120646330";

// Strict 100 Slot Scarcity (Real dynamic admissions count)
export const TOTAL_SLOTS_LIMIT = 100;
export const CURRENT_SLOTS_CLAIMED = 0;
export const REMAINING_SLOTS = 100;

// Two-Tier Pricing
export const LIFETIME_PRO_PRICE = 999;
export const LIFETIME_VIP_PRICE = 1499;

// Mandatory Realism & Legal Disclaimer
export const INCOME_DISCLAIMER =
  "⚠️ Important Earnings Realism Disclaimer: Results and income depend entirely on individual student dedication, practice hours, skill level, portfolio strength, and client negotiations. We provide elite practical frameworks, real assets, and direct 1-on-1 mentorship — we DO NOT guarantee any fixed income or financial results.";

/**
 * 30-Day Timeout Calculation & Daily Urgency Warnings (Day 20+)
 * Live Count Only — Real Days Remaining based on enrollment timestamp
 */
export function calculateSubscriptionDaysRemaining(enrolledAt?: string): number {
  if (!enrolledAt || enrolledAt === "Just now" || enrolledAt === "Today") {
    return 30;
  }
  const enrolledTime = new Date(enrolledAt).getTime();
  if (isNaN(enrolledTime)) return 30;
  const daysPassed = Math.floor((Date.now() - enrolledTime) / (1000 * 60 * 60 * 24));
  return Math.max(0, 30 - daysPassed);
}

export function getSubscriptionUrgencyNotice(daysRemaining: number): {
  isUrgent: boolean;
  isExpired: boolean;
  message: string;
  badge: string;
  level: "normal" | "warning" | "critical" | "expired";
} {
  if (daysRemaining <= 0) {
    return {
      isUrgent: true,
      isExpired: true,
      badge: "EXPIRED",
      message: "Your 30-day guild pass has expired. Please buy the course again to regain active access.",
      level: "expired"
    };
  }
  if (daysRemaining <= 3) {
    return {
      isUrgent: true,
      isExpired: false,
      badge: `${daysRemaining} DAYS LEFT`,
      message: `Only ${daysRemaining} days left • You are losing it all! You will need to buy the course again after 30 days.`,
      level: "critical"
    };
  }
  if (daysRemaining === 9) {
    return {
      isUrgent: true,
      isExpired: false,
      badge: "9 DAYS LEFT",
      message: "Only 9 days left • You should buy the course again after 30 days.",
      level: "warning"
    };
  }
  if (daysRemaining === 10) {
    return {
      isUrgent: true,
      isExpired: false,
      badge: "10 DAYS LEFT",
      message: "Only 10 days left • You should buy the course again after 30 days to keep VIP access.",
      level: "warning"
    };
  }
  if (daysRemaining <= 10) {
    return {
      isUrgent: true,
      isExpired: false,
      badge: `${daysRemaining} DAYS LEFT`,
      message: `Only ${daysRemaining} days left • You should buy the course again after 30 days to keep your access.`,
      level: "warning"
    };
  }
  return {
    isUrgent: false,
    isExpired: false,
    badge: `${daysRemaining} DAYS ACTIVE`,
    message: `${daysRemaining} days remaining in your 30-day guild pass.`,
    level: "normal"
  };
}

/**
 * Generate dynamic WhatsApp link on the fly when student purchases a course
 */
export function generateWhatsAppPurchaseUrl({
  studentName,
  studentEmail,
  trackTitle,
  planType,
  utrNumber,
  slotNumber,
}: {
  studentName: string;
  studentEmail?: string;
  trackTitle: string;
  planType: "pro" | "vip";
  utrNumber?: string;
  slotNumber?: number;
}): string {
  const isVip = planType === "vip";
  const planLabel = isVip
    ? `VIP Plan (₹${LIFETIME_VIP_PRICE}) - Includes 1-on-1 Main Line Call Mentorship`
    : `Pro Plan (₹${LIFETIME_PRO_PRICE})`;

  const currentSlot = slotNumber !== undefined ? slotNumber : (CURRENT_SLOTS_CLAIMED + 1);

  const message = [
    `🔥 *NEW 0.1% COMMUNITY ENROLLMENT CONFIRMATION*`,
    ``,
    `Hello Arush Sir / 0.1% Community Team,`,
    `I have just completed my payment and secured my spot (Slot #${currentSlot} of 100).`,
    ``,
    `📌 *Student Details:*`,
    `• *Name:* ${studentName}`,
    studentEmail ? `• *Email:* ${studentEmail}` : null,
    `• *Selected Course:* ${trackTitle}`,
    `• *Plan Chosen:* ${planLabel}`,
    utrNumber ? `• *UPI UTR / Ref No:* ${utrNumber}` : null,
    ``,
    isVip
      ? `⭐ *VIP Access Requested:* Please activate my Direct 1-on-1 Main Line Call Access and add me to the private VIP Community group.`
      : `🚀 Please verify my payment proof and add me to the official Community group.`,
    ``,
    `Thank you!`
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate dynamic WhatsApp link for floating Live WhatsApp Agent
 */
export function generateWhatsAppAgentInquiryUrl(queryType?: string): string {
  let prompt = "Hello! I am exploring the 0.1% Community courses and have a question before claiming 1 of the 100 slots.";
  if (queryType === "vip") {
    prompt = "Hello Arush Sir! I want to know more about the ₹1,499 VIP Plan and how the 1-on-1 direct main line calls work.";
  } else if (queryType === "slots") {
    prompt = "Hi! Are there still slots left out of the 100 total spots for this batch?";
  } else if (queryType === "payment") {
    prompt = "Hi! I want to pay via UPI and need quick assistance to confirm my enrollment.";
  }

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(prompt)}`;
}
