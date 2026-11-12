"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  SkillTrack,
  ResultItem,
  PaymentTransaction,
  WhatsAppOnboarding,
  CommunityNotification,
  UserRole
} from "../lib/types";
import {
  INITIAL_TRACKS,
  INITIAL_RESULTS,
  INITIAL_TRANSACTIONS,
  INITIAL_ONBOARDING_QUEUE
} from "../lib/mockData";
import { supabase } from "../lib/supabase";
import {
  TOTAL_SLOTS_LIMIT,
  calculateSubscriptionDaysRemaining,
  getSubscriptionUrgencyNotice
} from "../lib/constants";

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  tracks: SkillTrack[];
  handleAddCourse: (course: SkillTrack) => Promise<void>;
  handleUpdateCourse: (courseId: string, updates: Partial<SkillTrack>) => Promise<void>;
  handleDeleteCourse: (courseId: string) => Promise<void>;
  results: ResultItem[];
  mentors: any[];
  transactions: PaymentTransaction[];
  whatsappQueue: WhatsAppOnboarding[];
  notifications: CommunityNotification[];
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: "login" | "signup" | "forgot") => void;
  closeAuthModal: () => void;
  authModalMode: "login" | "signup" | "forgot";
  isPaymentModalOpen: boolean;
  selectedTrackForPurchase: SkillTrack | null;
  openPaymentModal: (track?: SkillTrack) => void;
  closePaymentModal: () => void;
  handleMockPaymentSuccess: (
    phone: string,
    utrNumberOrMethod?: string,
    screenshotUrl?: string,
    trackId?: string,
    planType?: "pro" | "vip",
    amount?: number
  ) => Promise<void>;
  handlePublishResult: (result: Omit<ResultItem, "id" | "studentId" | "studentName" | "studentAvatar" | "studentHandle" | "createdAt" | "likesCount" | "verified">) => Promise<void>;
  handleUpdateWhatsAppStatus: (id: string, status: "pending_add" | "invite_sent" | "joined") => Promise<void>;
  handleAssignMentor: (onboardingId: string, mentorId: string) => void;
  handleToggleVerifyResult: (resultId: string) => Promise<void>;
  handleToggleFeaturedResult: (resultId: string) => Promise<void>;
  handleUpdateResult: (resultId: string, updates: Partial<ResultItem>) => Promise<void>;
  handleDeleteResult: (resultId: string) => Promise<void>;
  dismissNotification: (id: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  handleDeleteStudentAccount: () => Promise<void>;
  handleDeleteEnrollment: (enrollmentId: string) => Promise<void>;
  totalRegisteredUsers: number;
  totalPurchasedStudents: number;
  slotsClaimed: number;
  slotsRemaining: number;
  allProfiles: any[];
  handleAdminDeleteUserAccount: (studentId: string, studentEmail: string) => Promise<void>;
  refreshSupabaseData: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  daysRemaining: number;
  urgencyNotice: {
    isUrgent: boolean;
    isExpired: boolean;
    message: string;
    badge: string;
    level: "normal" | "warning" | "critical" | "expired";
  };
  setSimulatedDaysRemaining: (days: number | undefined) => void;
}

export const isUserAuthenticated = (user: UserProfile | null | undefined): boolean => {
  if (!user) return false;
  if (user.role === "guest") return false;
  if (!user.id || user.id === "guest-0" || user.id.startsWith("guest")) return false;
  if (!user.email || user.email === "visitor@example.com") return false;
  return true;
};

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  guest: {
    id: "guest-0",
    name: "Guest Visitor",
    email: "visitor@example.com",
    phone: "",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    role: "guest",
    isPro: false,
    enrolledTracks: [],
    whatsappStatus: "not_started",
    joinedAt: "Just now"
  },
  student_unpaid: {
    id: "usr-unpaid",
    name: "New Student",
    email: "student@0point1percent.com",
    phone: "",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    role: "student_unpaid",
    isPro: false,
    bio: "Aspiring creative aiming for the top 0.1% digital income.",
    enrolledTracks: [],
    whatsappStatus: "not_started",
    joinedAt: "Today"
  },
  student_pro: {
    id: "usr-pro",
    name: "Pro Student",
    email: "pro@0point1percent.com",
    phone: "+91 98390 00000",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    role: "student_pro",
    isPro: true,
    planType: "pro",
    bio: "0.1% Community Pro Member | Scaling to ₹2,00,000/mo",
    enrolledTracks: ["web-dev"],
    whatsappStatus: "joined",
    joinedAt: "Recently"
  },
  admin: {
    id: "usr-admin",
    name: "Aarush",
    email: "0.1community.circle@gmail.com",
    phone: "+91 91206 46330",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    role: "admin",
    isPro: true,
    planType: "vip",
    bio: "Founder & Community Director at 0.1% Community. Master administrative access.",
    enrolledTracks: INITIAL_TRACKS.map(t => t.id),
    whatsappStatus: "joined",
    joinedAt: "Founding Date"
  }
};

const mapDbTrackToSkillTrack = (db: any): SkillTrack => {
  let parsedModules = [];
  try {
    if (Array.isArray(db.modules)) {
      parsedModules = db.modules;
    } else if (typeof db.modules === "string") {
      parsedModules = JSON.parse(db.modules);
    }
  } catch {
    parsedModules = [];
  }

  let parsedDeliverables = [];
  try {
    if (Array.isArray(db.deliverables)) {
      parsedDeliverables = db.deliverables;
    } else if (typeof db.deliverables === "string") {
      parsedDeliverables = JSON.parse(db.deliverables);
    }
  } catch {
    parsedDeliverables = [];
  }

  let earnings = db.average_earnings || "₹20,000 / mo";
  const lowerId = (db.id || "").toLowerCase();
  if (lowerId === "web-dev" || lowerId === "app-dev" || lowerId === "software-dev") {
    earnings = "It depends";
  } else if (earnings.includes("3,00,000") || earnings.includes("3,50,000") || earnings.includes("2,50,000") || earnings.includes("60,000") || earnings.includes("75,000") || earnings.includes("85,000")) {
    earnings = "₹20,000 / mo";
  }

  return {
    id: db.id,
    title: db.title,
    shortDesc: db.short_desc || "",
    fullDesc: db.full_desc || "",
    badge: db.badge || "High Demand",
    price: Number(db.price) || 999,
    currency: "INR",
    averageEarnings: earnings,
    modulesCount: db.modules_count || 4,
    studentsCount: db.students_count || 0,
    tags: ["High-Income", "VIP WhatsApp", "Direct Mentorship"],
    modules: parsedModules,
    deliverables: parsedDeliverables
  };
};

const mapDbResultToResultItem = (db: any): ResultItem => {
  const ratingMatch = db.description?.match(/\[RATING:([1-5])\]/);
  const parsedRating = db.rating ? Number(db.rating) : (ratingMatch ? Number(ratingMatch[1]) : 5);
  const cleanDescription = db.description ? db.description.replace(/\[RATING:[1-5]\]\s*/, "") : "";

  return {
    id: db.id,
    studentId: db.student_id || "",
    studentName: db.student_name,
    studentEmail: db.student_email,
    studentAvatar: db.student_avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    studentHandle: db.student_handle || `@${(db.student_name || "member").toLowerCase().replace(/\s+/g, "_")}`,
    trackId: db.track_id || "",
    trackTitle: db.track_title || "",
    title: db.title,
    amountINR: Number(db.amount_inr) || 0,
    currencyLabel: db.currency_label || `₹${Number(db.amount_inr || 0).toLocaleString("en-IN")}`,
    description: cleanDescription,
    category: db.category || "web-dev",
    proofImageUrl: db.proof_image_url || "",
    clientCountry: db.client_country || "India 🇮🇳",
    sourcePlatform: db.source_platform || "Direct Client",
    rating: parsedRating,
    verified: Boolean(db.verified !== false),
    featured: Boolean(db.featured),
    createdAt: db.created_at ? new Date(db.created_at).toLocaleDateString() : "Recently",
    likesCount: db.likes_count || 0
  };
};

const mapDbEnrollmentToWhatsAppOnboarding = (db: any): WhatsAppOnboarding => {
  const isVip =
    db.plan_type === "vip" ||
    Number(db.amount) >= 1499 ||
    (db.notes && db.notes.toLowerCase().includes("vip"));
  return {
    id: db.id,
    studentId: db.student_id || db.id,
    studentName: db.student_name || "Student",
    studentEmail: db.student_email || "",
    studentPhone: db.student_phone || "",
    trackId: db.track_id || "",
    trackName: db.track_name || "High-Income Program",
    planType: isVip ? "vip" : "pro",
    status: db.status || "pending_add",
    paidAt: db.paid_at
      ? new Date(db.paid_at).toLocaleString()
      : db.created_at
      ? new Date(db.created_at).toLocaleString()
      : "Recently",
    utrNumber: db.utr_number || "",
    screenshotUrl: db.screenshot_url || "",
    notes: db.notes || ""
  };
};

const mapDbEnrollmentToTransaction = (db: any): PaymentTransaction => {
  const isVip =
    db.plan_type === "vip" ||
    Number(db.amount) >= 1499 ||
    (db.notes && db.notes.toLowerCase().includes("vip"));
  return {
    id: `txn_${db.id}`,
    userId: db.student_id || db.id,
    userName: db.student_name || "Student",
    userEmail: db.student_email || "",
    userPhone: db.student_phone || "",
    trackId: db.track_id || "",
    trackName: db.track_name || "High-Income Program",
    amount: Number(db.amount) || (isVip ? 1499 : 999),
    planType: isVip ? "vip" : "pro",
    status: "success",
    paymentMethod: "UPI",
    razorpayPaymentId: db.utr_number ? `UTR_${db.utr_number}` : db.id,
    createdAt: db.paid_at
      ? new Date(db.paid_at).toLocaleDateString()
      : db.created_at
      ? new Date(db.created_at).toLocaleDateString()
      : "Recently"
  };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USERS.guest);
  const isAuthenticated = isUserAuthenticated(currentUser);
  const [tracks, setTracks] = useState<SkillTrack[]>(INITIAL_TRACKS);
  const [results, setResults] = useState<ResultItem[]>(INITIAL_RESULTS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [whatsappQueue, setWhatsappQueue] = useState<WhatsAppOnboarding[]>(INITIAL_ONBOARDING_QUEUE);
  const [notifications, setNotifications] = useState<CommunityNotification[]>([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState<number>(0);
  const [totalPurchasedStudents, setTotalPurchasedStudents] = useState<number>(0);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup" | "forgot">("login");

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTrackForPurchase, setSelectedTrackForPurchase] = useState<SkillTrack | null>(null);

  // 30-Day Timeout Simulation State (allows testing 10 days left, 3 days left, expired)
  const [simulatedDaysRemaining, setSimulatedDaysRemainingState] = useState<number | undefined>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("0.1_simulated_days");
      return stored !== null ? Number(stored) : undefined;
    }
    return undefined;
  });

  const setSimulatedDaysRemaining = (days: number | undefined) => {
    setSimulatedDaysRemainingState(days);
    if (typeof window !== "undefined") {
      if (days === undefined) {
        localStorage.removeItem("0.1_simulated_days");
      } else {
        localStorage.setItem("0.1_simulated_days", String(days));
      }
    }
  };

  const daysRemaining = calculateSubscriptionDaysRemaining(
    currentUser.enrolledAt,
    simulatedDaysRemaining
  );
  const urgencyNotice = getSubscriptionUrgencyNotice(daysRemaining);

  // Fetch Supabase live data concurrently for instant response
  const refreshSupabaseData = async () => {
    try {
      const [profilesRes, tracksRes, resultsRes, enrRes] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact" }).order("created_at", { ascending: false }),
        supabase.from("tracks").select("*").order("created_at", { ascending: true }),
        supabase.from("results").select("*").order("created_at", { ascending: false }),
        supabase.from("enrollments").select("*", { count: "exact" }).order("created_at", { ascending: false })
      ]);

      if (profilesRes.data) {
        // Deduplicate profiles by unique lowercase email
        const uniqueProfiles = Array.from(
          profilesRes.data.reduce((map: Map<string, any>, p: any) => {
            const email = (p.email || "").toLowerCase().trim();
            if (!email) return map;
            const existing = map.get(email);
            if (!existing || (p.phone && !existing.phone) || (p.is_pro && !existing.is_pro)) {
              map.set(email, p);
            }
            return map;
          }, new Map<string, any>()).values()
        );
        setAllProfiles(uniqueProfiles);
        setTotalRegisteredUsers(uniqueProfiles.length);
      }

      if (!tracksRes.error && tracksRes.data && tracksRes.data.length > 0) {
        setTracks(tracksRes.data.map(mapDbTrackToSkillTrack));
      }

      if (!resultsRes.error && resultsRes.data) {
        setResults(resultsRes.data.map(mapDbResultToResultItem));
      }

      if (!enrRes.error && enrRes.data) {
        setWhatsappQueue(enrRes.data.map(mapDbEnrollmentToWhatsAppOnboarding));
        setTransactions(enrRes.data.map(mapDbEnrollmentToTransaction));
        setTotalPurchasedStudents(typeof enrRes.count === "number" ? enrRes.count : enrRes.data.length);
      }
    } catch (err) {
      console.warn("Supabase initial sync fallback:", err);
    }
  };

  // Initial load, Realtime Postgres Sync & Supabase Auth Sync
  useEffect(() => {
    refreshSupabaseData();

    // Realtime Postgres sync so all connected devices update instantly
    const realtimeChannel = supabase
      .channel("01_guild_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "enrollments" }, () => {
        refreshSupabaseData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        refreshSupabaseData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "results" }, () => {
        refreshSupabaseData();
      })
      .subscribe();

    const syncUserSession = async (session: any) => {
      if (!session?.user) return;
      const u = session.user;
      const userEmail = (u.email || "").toLowerCase();
      const isAdmin = userEmail === "0.1community.circle@gmail.com";
      const meta = u.user_metadata || {};
      let userName = meta.full_name || meta.name || u.email?.split("@")[0] || "Student";
      if (isAdmin && (!userName || userName.toLowerCase().includes("0.1community"))) {
        userName = "Aarush";
      }
      const userAvatar = meta.avatar_url || meta.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

      // Immediate optimistic profile update so UI never lags
      setCurrentUser(prev => ({
        ...prev,
        id: u.id,
        name: isAdmin ? "Aarush" : userName,
        email: userEmail,
        avatar: userAvatar,
        role: isAdmin ? "admin" : (prev.isPro ? "student_pro" : "student_unpaid"),
        isPro: isAdmin || prev.isPro,
        planType: isAdmin ? "vip" : prev.planType
      }));

      try {
        const [profileRes, enrollmentsRes] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", u.id).maybeSingle(),
          supabase.from("enrollments").select("*").or(`student_id.eq.${u.id},student_email.eq.${userEmail}`).order("created_at", { ascending: false })
        ]);

        const dbProfile = profileRes.data;
        const dbEnrollments = enrollmentsRes.data;

        let userIsPro = false;
        let userPlanType: "pro" | "vip" = "pro";
        let userWhatsappStatus: "not_started" | "pending_add" | "invite_sent" | "joined" = "not_started";
        let userEnrolledTrackIds: string[] = [];

        if (dbEnrollments && dbEnrollments.length > 0) {
          userIsPro = true;
          userWhatsappStatus = (dbEnrollments[0].status as "not_started" | "pending_add" | "invite_sent" | "joined") || "pending_add";
          userEnrolledTrackIds = dbEnrollments.map(e => e.track_id).filter(Boolean);
          const hasVip = dbEnrollments.some(e => Number(e.amount) >= 1499 || (e.notes && e.notes.toLowerCase().includes("vip")));
          if (hasVip) {
            userPlanType = "vip";
          }
        }

        if (isAdmin) {
          userPlanType = "vip";
        }

        const effectiveIsPro = isAdmin || userIsPro;
        const effectivePlanType: "pro" | "vip" | undefined = isAdmin ? "vip" : (effectiveIsPro ? userPlanType : undefined);

        const enrolledDate = dbEnrollments && dbEnrollments.length > 0
          ? (dbEnrollments[0].paid_at || dbEnrollments[0].created_at || new Date().toISOString())
          : undefined;

        let profile: UserProfile;
        if (dbProfile) {
          profile = {
            id: dbProfile.id,
            name: isAdmin ? "Aarush" : (dbProfile.name || userName),
            email: userEmail,
            phone: dbProfile.phone || "",
            avatar: dbProfile.avatar || userAvatar,
            role: isAdmin ? "admin" : (effectiveIsPro ? "student_pro" : "student_unpaid"),
            isPro: effectiveIsPro,
            planType: effectivePlanType,
            bio: dbProfile.bio || "",
            githubUrl: dbProfile.github_url,
            linkedinUrl: dbProfile.linkedin_url,
            twitterUrl: dbProfile.twitter_url,
            portfolioUrl: dbProfile.portfolio_url,
            enrolledTracks: isAdmin ? INITIAL_TRACKS.map(t => t.id) : (effectiveIsPro ? (userEnrolledTrackIds.length > 0 ? userEnrolledTrackIds : [INITIAL_TRACKS[0].id]) : []),
            whatsappStatus: isAdmin ? "joined" : (effectiveIsPro ? userWhatsappStatus : "not_started"),
            joinedAt: dbProfile.created_at ? new Date(dbProfile.created_at).toLocaleDateString() : "Today",
            enrolledAt: enrolledDate
          };

          if (!isAdmin && dbProfile.is_pro && !userIsPro) {
            supabase.from("profiles").update({ is_pro: false, role: "student_unpaid" }).eq("id", u.id).then(() => {});
          }
        } else {
          profile = {
            id: u.id,
            name: isAdmin ? "Aarush" : userName,
            email: userEmail,
            phone: "",
            avatar: userAvatar,
            role: isAdmin ? "admin" : (effectiveIsPro ? "student_pro" : "student_unpaid"),
            isPro: effectiveIsPro,
            planType: effectivePlanType,
            bio: "",
            githubUrl: undefined,
            linkedinUrl: undefined,
            twitterUrl: undefined,
            portfolioUrl: undefined,
            enrolledTracks: isAdmin ? INITIAL_TRACKS.map(t => t.id) : (effectiveIsPro ? (userEnrolledTrackIds.length > 0 ? userEnrolledTrackIds : [INITIAL_TRACKS[0].id]) : []),
            whatsappStatus: isAdmin ? "joined" : (effectiveIsPro ? userWhatsappStatus : "not_started"),
            joinedAt: "Just now",
            enrolledAt: enrolledDate
          };

          supabase.from("profiles").upsert({
            id: u.id,
            name: profile.name,
            email: userEmail,
            phone: "",
            avatar: userAvatar,
            role: profile.role,
            is_pro: profile.isPro
          }).then(() => {});
        }

        setCurrentUser(profile);

        // Auto-resume course purchase if user clicked "Buy Course" before signing in
        try {
          const pendingTrackId = localStorage.getItem("0.1_pending_purchase_track");
          if (pendingTrackId) {
            localStorage.removeItem("0.1_pending_purchase_track");
            const targetTrack = tracks.find(t => t.id === pendingTrackId) || INITIAL_TRACKS.find(t => t.id === pendingTrackId);
            if (targetTrack) {
              setSelectedTrackForPurchase(targetTrack);
              setIsPaymentModalOpen(true);
            }
          }
        } catch {}
      } catch (err) {
        console.error("Error syncing user profile:", err);
      }
    };

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        syncUserSession(session);
      } else {
        try {
          const savedUser = localStorage.getItem("0.1_user_role");
          if (savedUser && DEFAULT_USERS[savedUser as UserRole]) {
            setCurrentUser(DEFAULT_USERS[savedUser as UserRole]);
          }
        } catch {}
      }
    });

    // Listen for auth state changes (e.g. Google OAuth redirect callback!)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        syncUserSession(session);
      } else if (_event === "SIGNED_OUT") {
        setCurrentUser(DEFAULT_USERS.guest);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
      supabase.removeChannel(realtimeChannel);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    setCurrentUser(DEFAULT_USERS.guest);
    try {
      localStorage.removeItem("0.1_user_role");
      localStorage.removeItem("0.1_pending_purchase_track");
    } catch {}
  };

  const handleAddCourse = async (newCourse: SkillTrack) => {
    // 1. Optimistic local update
    setTracks(prev => [newCourse, ...prev]);

    // 2. Persist to Supabase
    try {
      await supabase.from("tracks").upsert({
        id: newCourse.id,
        title: newCourse.title,
        short_desc: newCourse.shortDesc,
        full_desc: newCourse.fullDesc,
        badge: newCourse.badge,
        price: newCourse.price || 999,
        average_earnings: newCourse.averageEarnings,
        modules_count: newCourse.modulesCount || 4,
        students_count: newCourse.studentsCount || 0,
        modules: newCourse.modules,
        deliverables: newCourse.deliverables
      });
    } catch (err) {
      console.error("Failed to add course in Supabase:", err);
    }

    const newNotif: CommunityNotification = {
      id: `notif_${Date.now()}`,
      title: "New Course Launched!",
      message: `${newCourse.title} is now live and open for student enrollments.`,
      type: "system",
      timestamp: "Just now",
      read: false,
      actionUrl: "/#tracks"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpdateCourse = async (courseId: string, updates: Partial<SkillTrack>) => {
    setTracks(prev => prev.map(t => (t.id === courseId ? { ...t, ...updates } : t)));

    try {
      const dbUpdates: any = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.shortDesc) dbUpdates.short_desc = updates.shortDesc;
      if (updates.fullDesc) dbUpdates.full_desc = updates.fullDesc;
      if (updates.badge) dbUpdates.badge = updates.badge;
      if (updates.price) dbUpdates.price = updates.price;
      if (updates.averageEarnings) dbUpdates.average_earnings = updates.averageEarnings;
      if (updates.modules) dbUpdates.modules = updates.modules;
      if (updates.deliverables) dbUpdates.deliverables = updates.deliverables;

      await supabase.from("tracks").update(dbUpdates).eq("id", courseId);
    } catch (err) {
      console.error("Failed to update course in Supabase:", err);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    setTracks(prev => prev.filter(t => t.id !== courseId));

    try {
      await supabase.from("tracks").delete().eq("id", courseId);
    } catch (err) {
      console.error("Failed to delete course in Supabase:", err);
    }
  };

  const switchRole = (role: UserRole) => {
    const newUser = { ...DEFAULT_USERS[role] };
    if (role === "admin") {
      newUser.enrolledTracks = tracks.map(t => t.id);
    }
    setCurrentUser(newUser);
    try {
      localStorage.setItem("0.1_user_role", role);
    } catch {}
  };

  const openAuthModal = (mode: "login" | "signup" | "forgot" = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openPaymentModal = (track?: SkillTrack) => {
    const targetTrack = track || tracks[0];
    setSelectedTrackForPurchase(targetTrack);

    // If student is not signed in with their real ID, require sign-in first
    if (!isAuthenticated) {
      try {
        localStorage.setItem("0.1_pending_purchase_track", targetTrack.id);
      } catch {}
      setAuthModalMode("login");
      setIsAuthModalOpen(true);
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  // Real Payment Success Handler - Writes directly to Supabase `enrollments` and `profiles`
  const handleMockPaymentSuccess = async (
    phone: string,
    utrNumberOrMethod?: string,
    screenshotUrl?: string,
    trackId?: string,
    planType?: "pro" | "vip",
    amount?: number
  ) => {
    const targetTrackId = trackId || selectedTrackForPurchase?.id || tracks[0]?.id || "web-dev";
    const track = tracks.find(t => t.id === targetTrackId) || selectedTrackForPurchase || tracks[0];

    const resolvedPlan: "pro" | "vip" = planType || "vip";
    const resolvedAmount: number = amount || (resolvedPlan === "vip" ? 1499 : 999);
    const cleanUtr = (utrNumberOrMethod || "").replace(/^(UPI\/|UTR_)/i, "").trim() || `UTR${Date.now().toString().slice(-8)}`;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const enrollmentId = `enr_${Date.now()}`;

    // 1. Upgrade currentUser locally
    const updatedUser: UserProfile = {
      ...currentUser,
      isPro: true,
      role: "student_pro",
      planType: resolvedPlan,
      phone: cleanPhone || currentUser.phone || "",
      enrolledTracks: Array.from(new Set([...currentUser.enrolledTracks, track.id])),
      whatsappStatus: "pending_add"
    };
    setCurrentUser(updatedUser);

    // 2. Add to local WhatsApp Queue & Transactions
    const newOnboarding: WhatsAppOnboarding = {
      id: enrollmentId,
      studentId: updatedUser.id,
      studentName: updatedUser.name,
      studentEmail: updatedUser.email,
      studentPhone: cleanPhone,
      trackId: track.id,
      trackName: track.title,
      planType: resolvedPlan,
      status: "pending_add",
      paidAt: "Just now",
      utrNumber: cleanUtr,
      screenshotUrl: screenshotUrl || "",
      notes: `Paid ₹${resolvedAmount} for ${track.title} [${resolvedPlan.toUpperCase()} Plan]. UTR: ${cleanUtr}. Direct UPI to 0.1% Community.`
    };
    setWhatsappQueue(prev => [newOnboarding, ...prev]);

    const newTxn: PaymentTransaction = {
      id: `txn_${enrollmentId}`,
      userId: updatedUser.id,
      userName: updatedUser.name,
      userEmail: updatedUser.email,
      userPhone: cleanPhone,
      trackId: track.id,
      trackName: track.title,
      amount: resolvedAmount,
      planType: resolvedPlan,
      status: "success",
      paymentMethod: "UPI",
      razorpayPaymentId: `UTR_${cleanUtr}`,
      createdAt: "Just now"
    };
    setTransactions(prev => [newTxn, ...prev]);

    // 3. Persist to Supabase Database (Real PostgreSQL)
    try {
      await supabase.from("enrollments").insert({
        id: enrollmentId,
        student_id: updatedUser.id,
        student_name: updatedUser.name,
        student_email: updatedUser.email,
        student_phone: cleanPhone,
        track_id: track.id,
        track_name: track.title,
        amount: resolvedAmount,
        utr_number: cleanUtr,
        screenshot_url: screenshotUrl || "",
        status: "pending_add",
        notes: `Paid ₹${resolvedAmount} for ${track.title} [${resolvedPlan.toUpperCase()} Plan]. UTR: ${cleanUtr}.`
      });

      await supabase.from("profiles").upsert({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: cleanPhone,
        role: "student_pro",
        is_pro: true
      });
    } catch (err) {
      console.error("Supabase enrollment insert error:", err);
    }

    // 4. Trigger High Priority Notification for Owner/Admin
    const newNotif: CommunityNotification = {
      id: `notif_${Date.now()}`,
      title: "New Direct UPI Payment (₹999)",
      message: `${updatedUser.name} submitted UTR: ${cleanUtr}. Phone: ${cleanPhone}. Verify receipt in Admin desk.`,
      type: "payment",
      timestamp: "Just now",
      read: false,
      actionUrl: "/admin"
    };
    setNotifications(prev => [newNotif, ...prev]);

    setIsPaymentModalOpen(false);
  };

  // Publish Result Handler - Writes directly to Supabase `results` (Wall of Fame with student Gmail and Rating)
  const handlePublishResult = async (
    data: Omit<ResultItem, "id" | "studentId" | "studentName" | "studentAvatar" | "studentHandle" | "createdAt" | "likesCount" | "verified">
  ) => {
    const resultId = `res_${Date.now()}`;
    const studentEmail = currentUser.email || `${currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`;
    const ratingValue = Number(data.rating) || 5;

    const newResult: ResultItem = {
      ...data,
      id: resultId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail,
      studentAvatar: currentUser.avatar,
      studentHandle: `@${currentUser.name.toLowerCase().replace(/\s+/g, "_")}`,
      rating: ratingValue,
      verified: true,
      createdAt: "Just now",
      likesCount: 1
    };

    // 1. Optimistic local update (instant 0ms lag)
    setResults(prev => [newResult, ...prev]);

    // 2. Persist to Supabase Database (encoding rating in description to be 100% resilient with existing DB schema)
    try {
      const descriptionWithRating = `[RATING:${ratingValue}] ${data.description || ""}`;
      await supabase.from("results").insert({
        id: resultId,
        student_id: currentUser.id,
        student_name: currentUser.name,
        student_email: studentEmail,
        student_avatar: currentUser.avatar,
        student_handle: newResult.studentHandle,
        track_id: data.trackId,
        track_title: data.trackTitle,
        title: data.title,
        amount_inr: data.amountINR,
        currency_label: data.currencyLabel,
        description: descriptionWithRating,
        category: data.category,
        proof_image_url: data.proofImageUrl || "",
        client_country: data.clientCountry || "India 🇮🇳",
        source_platform: data.sourcePlatform || "Direct Client",
        verified: true,
        featured: data.featured || false,
        likes_count: 1
      });
    } catch (err) {
      console.error("Supabase result publish error:", err);
    }

    const newNotif: CommunityNotification = {
      id: `notif_${Date.now()}`,
      title: "Proof of Work Published",
      message: `${currentUser.name} gave ${ratingValue}★ rating & uploaded ${data.currencyLabel} milestone in ${data.trackTitle}!`,
      type: "result",
      timestamp: "Just now",
      read: false,
      actionUrl: "/results"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpdateWhatsAppStatus = async (
    id: string,
    status: "pending_add" | "invite_sent" | "joined"
  ) => {
    // 1. Optimistic local update
    setWhatsappQueue(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status,
              addedAt: status === "joined" ? "Just now" : item.addedAt
            }
          : item
      )
    );

    const match = whatsappQueue.find(q => q.id === id);
    if (match && (match.studentId === currentUser.id || match.studentEmail === currentUser.email)) {
      setCurrentUser(prev => ({
        ...prev,
        whatsappStatus: status,
        isPro: true,
        role: prev.role === "admin" ? "admin" : "student_pro"
      }));
    }

    // 2. Persist to Supabase Database via API route with Service Role & Direct
    try {
      fetch("/api/admin/enrollments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      }).catch(e => console.warn("API status update warn:", e));

      await supabase.from("enrollments").update({ status }).eq("id", id);
      if (match?.studentId) {
        await supabase.from("profiles").update({
          is_pro: true,
          role: "student_pro"
        }).eq("id", match.studentId);
      }
    } catch (err) {
      console.error("Supabase enrollment status update error:", err);
    }
  };

  const handleAssignMentor = () => {
    // Mentors removed per client instruction
  };

  const handleToggleVerifyResult = async (resultId: string) => {
    const target = results.find(r => r.id === resultId);
    const newVerified = target ? !target.verified : true;

    setResults(prev =>
      prev.map(r => (r.id === resultId ? { ...r, verified: newVerified } : r))
    );

    try {
      await fetch("/api/results/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resultId, updates: { verified: newVerified } })
      });
    } catch (err) {
      console.error("Toggle verify error:", err);
    }
  };

  const handleToggleFeaturedResult = async (resultId: string) => {
    const target = results.find(r => r.id === resultId);
    const newFeatured = target ? !target.featured : true;

    setResults(prev =>
      prev.map(r => (r.id === resultId ? { ...r, featured: newFeatured } : r))
    );

    try {
      await fetch("/api/results/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resultId, updates: { featured: newFeatured } })
      });
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleUpdateResult = async (resultId: string, updates: Partial<ResultItem>) => {
    setResults(prev =>
      prev.map(r => (r.id === resultId ? { ...r, ...updates } : r))
    );

    try {
      await fetch("/api/results/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resultId, updates })
      });
    } catch (err) {
      console.error("Update result error:", err);
    }
  };

  const handleDeleteResult = async (resultId: string) => {
    setResults(prev => prev.filter(r => r.id !== resultId));

    try {
      await fetch("/api/results/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resultId })
      });
    } catch (err) {
      console.error("Delete result error:", err);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));

    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.bio) dbUpdates.bio = updates.bio;
      if (updates.avatar) {
        dbUpdates.avatar = updates.avatar;
        dbUpdates.avatar_url = updates.avatar;
      }
      if (updates.githubUrl) dbUpdates.github_url = updates.githubUrl;
      if (updates.linkedinUrl) dbUpdates.linkedin_url = updates.linkedinUrl;
      if (updates.twitterUrl) dbUpdates.twitter_url = updates.twitterUrl;
      if (updates.portfolioUrl) dbUpdates.portfolio_url = updates.portfolioUrl;

      await supabase.from("profiles").update(dbUpdates).eq("id", currentUser.id);
    } catch (err) {
      console.error("Supabase profile update error:", err);
    }
  };

  const handleDeleteEnrollment = async (enrollmentId: string) => {
    // 1. Find enrollment details from queue before deleting
    const itemToDelete = whatsappQueue.find(item => item.id === enrollmentId);
    const targetStudentId = itemToDelete?.studentId;
    const targetStudentEmail = itemToDelete?.studentEmail;

    // 2. Optimistic local update
    setWhatsappQueue(prev => prev.filter(item => item.id !== enrollmentId));
    setTransactions(prev => prev.filter(item => !item.id.includes(enrollmentId)));
    setTotalPurchasedStudents(prev => Math.max(0, prev - 1));

    // If current logged-in user is this student, immediately revert their local status
    if (
      (targetStudentId && currentUser.id === targetStudentId) ||
      (targetStudentEmail && currentUser.email && currentUser.email.toLowerCase() === targetStudentEmail.toLowerCase())
    ) {
      if (currentUser.role !== "admin") {
        setCurrentUser(prev => ({
          ...prev,
          isPro: false,
          role: "student_unpaid",
          whatsappStatus: "not_started",
          enrolledTracks: []
        }));
      }
    }

    // 3. Persist via server API route with service role
    try {
      await fetch("/api/admin/enrollments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: enrollmentId,
          studentId: targetStudentId,
          studentEmail: targetStudentEmail
        })
      });
    } catch (err) {
      console.error("Failed to delete enrollment in Supabase:", err);
    }
  };

  const handleDeleteStudentAccount = async () => {
    if (currentUser.role === "admin") return;
    try {
      const studentId = currentUser.id;
      const studentEmail = currentUser.email;

      // 1. Call server API with service role to permanently wipe from all Supabase tables & auth.users
      await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, studentEmail })
      });

      // 2. Clear from local state
      setWhatsappQueue(prev => prev.filter(q => q.studentId !== studentId && q.studentEmail !== studentEmail));
      setTransactions(prev => prev.filter(t => t.userId !== studentId && t.userEmail !== studentEmail));
      setResults(prev => prev.filter(r => r.studentId !== studentId));
      setTotalRegisteredUsers(prev => Math.max(1, prev - 1));
      setTotalPurchasedStudents(prev => Math.max(0, prev - 1));

      // 3. Clear browser storage and sign out
      try {
        localStorage.removeItem("0.1_user_role");
        localStorage.removeItem("0.1_pending_purchase_track");
      } catch {}

      await supabase.auth.signOut();
      setCurrentUser(DEFAULT_USERS.guest);

      // 4. Force refresh Supabase data to guarantee clean state
      await refreshSupabaseData();
    } catch (err) {
      console.error("Delete account error:", err);
    }
  };

  const handleAdminDeleteUserAccount = async (studentId: string, studentEmail: string) => {
    if (studentEmail?.toLowerCase() === "0.1community.circle@gmail.com") {
      alert("Master admin account cannot be deleted.");
      return;
    }

    try {
      // 1. Optimistic local state update (INSTANT response)
      setAllProfiles(prev => prev.filter(p => p.id !== studentId && p.email?.toLowerCase() !== studentEmail?.toLowerCase()));
      setWhatsappQueue(prev => prev.filter(q => q.studentId !== studentId && q.studentEmail?.toLowerCase() !== studentEmail?.toLowerCase()));
      setTransactions(prev => prev.filter(t => t.userId !== studentId && t.userEmail?.toLowerCase() !== studentEmail?.toLowerCase()));
      setResults(prev => prev.filter(r => r.studentId !== studentId && r.studentEmail?.toLowerCase() !== studentEmail?.toLowerCase()));
      setTotalRegisteredUsers(prev => Math.max(0, prev - 1));

      // 2. Client-side database deletion (runs immediately in parallel)
      if (studentId) {
        supabase.from("results").delete().eq("student_id", studentId).then(() => {});
        supabase.from("enrollments").delete().eq("student_id", studentId).then(() => {});
        supabase.from("profiles").delete().eq("id", studentId).then(() => {});
      }
      if (studentEmail) {
        const cleanEmail = studentEmail.toLowerCase();
        supabase.from("results").delete().eq("student_email", cleanEmail).then(() => {});
        supabase.from("enrollments").delete().eq("student_email", cleanEmail).then(() => {});
        supabase.from("profiles").delete().eq("email", cleanEmail).then(() => {});
      }

      // 3. Server route call with 4s timeout so UI never hangs
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      try {
        await fetch("/api/account/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, studentEmail }),
          signal: controller.signal
        });
      } catch {} finally {
        clearTimeout(timeoutId);
      }

      // 4. Background re-sync
      refreshSupabaseData();
    } catch (err) {
      console.error("Admin user delete error:", err);
    }
  };

  const slotsClaimed = totalPurchasedStudents;
  const slotsRemaining = Math.max(0, TOTAL_SLOTS_LIMIT - slotsClaimed);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        switchRole,
        tracks,
        handleAddCourse,
        handleUpdateCourse,
        handleDeleteCourse,
        results,
        mentors: [],
        transactions,
        whatsappQueue,
        notifications,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        isPaymentModalOpen,
        selectedTrackForPurchase,
        openPaymentModal,
        closePaymentModal,
        handleMockPaymentSuccess,
        handlePublishResult,
        handleUpdateWhatsAppStatus,
        handleAssignMentor,
        handleToggleVerifyResult,
        handleToggleFeaturedResult,
        handleUpdateResult,
        handleDeleteResult,
        dismissNotification,
        updateUserProfile,
        handleDeleteStudentAccount,
        handleDeleteEnrollment,
        refreshSupabaseData,
        handleSignOut,
        totalRegisteredUsers,
        totalPurchasedStudents,
        slotsClaimed,
        slotsRemaining,
        allProfiles,
        handleAdminDeleteUserAccount,
        daysRemaining,
        urgencyNotice,
        setSimulatedDaysRemaining
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
