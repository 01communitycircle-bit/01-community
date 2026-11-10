export type UserRole = "guest" | "student_unpaid" | "student_pro" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  isPro: boolean;
  phone?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
  enrolledTracks: string[];
  assignedMentorId?: string;
  whatsappStatus: "not_started" | "pending_add" | "invite_sent" | "joined";
  joinedAt: string;
}

export interface Mentor {
  id?: string;
  name?: string;
  [key: string]: any;
}

export interface SkillTrack {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  slug?: string;
  icon?: string;
  badge: string;
  price?: number;
  currency?: string;
  mentorName?: string;
  mentorAvatar?: string;
  mentorTitle?: string;
  averageEarnings: string;
  modulesCount: number;
  studentsCount: number;
  tags: string[];
  modules: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
  deliverables: string[];
}

export type TrackCategory =
  | "web-dev"
  | "app-dev"
  | "video-editing"
  | "thumbnail-design"
  | "seo-growth"
  | "youtube-growth"
  | "instagram-growth"
  | "client-hunting"
  | "freelancing"
  | "software-dev"
  | "content-creation"
  | "video_editing"
  | "web_dev"
  | string;

export interface ResultItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  studentAvatar: string;
  studentHandle: string;
  trackId: string;
  trackTitle: string;
  title: string;
  amountINR: number;
  currencyLabel: string;
  description: string;
  category: TrackCategory;
  proofImageUrl?: string;
  clientCountry?: string;
  sourcePlatform?: "Upwork" | "Fiverr" | "Direct Client" | "YouTube" | "Remote Job" | "X / Twitter";
  verified: boolean;
  featured: boolean;
  createdAt: string;
  likesCount: number;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  trackId: string;
  trackName: string;
  amount: number;
  status: "success" | "pending" | "failed";
  paymentMethod: "UPI" | "Card" | "NetBanking";
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface WhatsAppOnboarding {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  trackId: string;
  trackName: string;
  mentorId?: string;
  mentorName?: string;
  status: "pending_add" | "invite_sent" | "joined";
  paidAt: string;
  addedAt?: string;
  notes?: string;
  utrNumber?: string;
  screenshotUrl?: string;
}

export interface CommunityNotification {
  id: string;
  title: string;
  message: string;
  type: "payment" | "whatsapp" | "result" | "system";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
