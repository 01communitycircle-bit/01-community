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
  handleMockPaymentSuccess: (phone: string, utrNumberOrMethod?: string, screenshotUrl?: string, trackId?: string) => Promise<void>;
  handlePublishResult: (result: Omit<ResultItem, "id" | "studentId" | "studentName" | "studentAvatar" | "studentHandle" | "createdAt" | "likesCount" | "verified">) => Promise<void>;
  handleUpdateWhatsAppStatus: (id: string, status: "pending_add" | "invite_sent" | "joined") => Promise<void>;
  handleAssignMentor: (onboardingId: string, mentorId: string) => void;
  handleToggleVerifyResult: (resultId: string) => Promise<void>;
  handleToggleFeaturedResult: (resultId: string) => Promise<void>;
  dismissNotification: (id: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  handleDeleteStudentAccount: () => Promise<void>;
  totalRegisteredUsers: number;
  totalPurchasedStudents: number;
  refreshSupabaseData: () => Promise<void>;
  handleSignOut: () => Promise<void>;
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
    bio: "0.1% Community Pro Member | Scaling to ₹2,00,000/mo",
    enrolledTracks: ["web-dev"],
    whatsappStatus: "joined",
    joinedAt: "Recently"
  },
  admin: {
    id: "usr-admin",
    name: "Community Director",
    email: "0.1community.circle@gmail.com",
    phone: "",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    role: "admin",
    isPro: true,
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

  return {
    id: db.id,
    title: db.title,
    shortDesc: db.short_desc || "",
    fullDesc: db.full_desc || "",
    badge: db.badge || "High Demand",
    price: Number(db.price) || 999,
    currency: "INR",
    averageEarnings: db.average_earnings || "₹60,000 - ₹2,50,000 / mo",
    modulesCount: db.modules_count || 4,
    studentsCount: db.students_count || 0,
    tags: ["High-Income", "VIP WhatsApp", "Direct Mentorship"],
    modules: parsedModules,
    deliverables: parsedDeliverables
  };
};

const mapDbResultToResultItem = (db: any): ResultItem => ({
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
  description: db.description || "",
  category: db.category || "web-dev",
  proofImageUrl: db.proof_image_url || "",
  clientCountry: db.client_country || "India 🇮🇳",
  sourcePlatform: db.source_platform || "Direct Client",
  verified: Boolean(db.verified !== false),
  featured: Boolean(db.featured),
  createdAt: db.created_at ? new Date(db.created_at).toLocaleDateString() : "Recently",
  likesCount: db.likes_count || 0
});

const mapDbEnrollmentToWhatsAppOnboarding = (db: any): WhatsAppOnboarding => ({
  id: db.id,
  studentId: db.student_id || db.id,
  studentName: db.student_name,
  studentEmail: db.student_email,
  studentPhone: db.student_phone,
  trackId: db.track_id,
  trackName: db.track_name,
  status: db.status || "pending_add",
  paidAt: db.paid_at ? new Date(db.paid_at).toLocaleString() : "Recently",
  utrNumber: db.utr_number || "",
  screenshotUrl: db.screenshot_url || "",
  notes: db.notes || ""
});

const mapDbEnrollmentToTransaction = (db: any): PaymentTransaction => ({
  id: `txn_${db.id}`,
  userId: db.student_id || db.id,
  userName: db.student_name,
  userEmail: db.student_email,
  userPhone: db.student_phone,
  trackId: db.track_id,
  trackName: db.track_name,
  amount: Number(db.amount) || 999,
  status: "success",
  paymentMethod: "UPI",
  razorpayPaymentId: db.utr_number ? `UTR_${db.utr_number}` : undefined,
  createdAt: db.paid_at ? new Date(db.paid_at).toLocaleDateString() : "Recently"
});

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USERS.guest);
  const isAuthenticated = isUserAuthenticated(currentUser);
  const [tracks, setTracks] = useState<SkillTrack[]>(INITIAL_TRACKS);
  const [results, setResults] = useState<ResultItem[]>(INITIAL_RESULTS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [whatsappQueue, setWhatsappQueue] = useState<WhatsAppOnboarding[]>(INITIAL_ONBOARDING_QUEUE);
  const [notifications, setNotifications] = useState<CommunityNotification[]>([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState<number>(1);
  const [totalPurchasedStudents, setTotalPurchasedStudents] = useState<number>(0);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup" | "forgot">("login");

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTrackForPurchase, setSelectedTrackForPurchase] = useState<SkillTrack | null>(null);

  // Fetch Supabase live data
  const refreshSupabaseData = async () => {
    try {
      // 0. Registered Users Count from Profiles
      const { count: pCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact" });
      if (typeof pCount === "number" && pCount > 0) {
        setTotalRegisteredUsers(pCount);
      }

      // 1. Tracks
      const { data: dbTracks, error: tErr } = await supabase
        .from("tracks")
        .select("*")
        .order("created_at", { ascending: true });
      if (!tErr && dbTracks && dbTracks.length > 0) {
        setTracks(dbTracks.map(mapDbTrackToSkillTrack));
      }

      // 2. Results (Wall of Fame)
      const { data: dbResults, error: rErr } = await supabase
        .from("results")
        .select("*")
        .order("created_at", { ascending: false });
      if (!rErr && dbResults) {
        setResults(dbResults.map(mapDbResultToResultItem));
      }

      // 3. Enrollments (WhatsApp Queue & Real Transactions)
      const { data: dbEnr, count: eCount, error: eErr } = await supabase
        .from("enrollments")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });
      if (!eErr && dbEnr) {
        setWhatsappQueue(dbEnr.map(mapDbEnrollmentToWhatsAppOnboarding));
        setTransactions(dbEnr.map(mapDbEnrollmentToTransaction));
        setTotalPurchasedStudents(typeof eCount === "number" ? eCount : dbEnr.length);
      }
    } catch (err) {
      console.warn("Supabase initial sync fallback:", err);
    }
  };

  // Initial load & Supabase Auth Sync (including Google OAuth redirects)
  useEffect(() => {
    refreshSupabaseData();

    const syncUserSession = async (session: any) => {
      if (!session?.user) return;
      const u = session.user;
      const userEmail = (u.email || "").toLowerCase();
      const isAdmin = userEmail === "0.1community.circle@gmail.com";
      const meta = u.user_metadata || {};
      const userName = meta.full_name || meta.name || u.email?.split("@")[0] || "Student";
      const userAvatar = meta.avatar_url || meta.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80";

      try {
        const { data: dbProfile } = await supabase.from("profiles").select("*").eq("id", u.id).single();

        // Check if user has an enrollment recorded in Supabase
        let userWhatsappStatus: "not_started" | "pending_add" | "invite_sent" | "joined" = isAdmin ? "joined" : "not_started";
        let userIsPro = isAdmin;
        try {
          const { data: dbEnrollments } = await supabase
            .from("enrollments")
            .select("*")
            .or(`student_id.eq.${u.id},student_email.eq.${userEmail}`)
            .order("created_at", { ascending: false });

          if (dbEnrollments && dbEnrollments.length > 0) {
            userIsPro = true;
            userWhatsappStatus = (dbEnrollments[0].status as "not_started" | "pending_add" | "invite_sent" | "joined") || "pending_add";
          }
        } catch {}

        let profile: UserProfile;
        if (dbProfile) {
          profile = {
            id: dbProfile.id,
            name: dbProfile.name || userName,
            email: userEmail,
            phone: dbProfile.phone || "",
            avatar: dbProfile.avatar || userAvatar,
            role: isAdmin ? "admin" : (dbProfile.role as UserRole || (userIsPro ? "student_pro" : "student_unpaid")),
            isPro: isAdmin || userIsPro || Boolean(dbProfile.is_pro),
            bio: dbProfile.bio || "",
            githubUrl: dbProfile.github_url,
            linkedinUrl: dbProfile.linkedin_url,
            twitterUrl: dbProfile.twitter_url,
            portfolioUrl: dbProfile.portfolio_url,
            enrolledTracks: isAdmin ? INITIAL_TRACKS.map(t => t.id) : (userIsPro ? [INITIAL_TRACKS[0].id] : []),
            whatsappStatus: isAdmin ? "joined" : userWhatsappStatus,
            joinedAt: dbProfile.created_at ? new Date(dbProfile.created_at).toLocaleDateString() : "Today"
          };
        } else {
          profile = {
            id: u.id,
            name: userName,
            email: userEmail,
            phone: "",
            avatar: userAvatar,
            role: isAdmin ? "admin" : (userIsPro ? "student_pro" : "student_unpaid"),
            isPro: isAdmin || userIsPro,
            enrolledTracks: isAdmin ? INITIAL_TRACKS.map(t => t.id) : (userIsPro ? [INITIAL_TRACKS[0].id] : []),
            whatsappStatus: isAdmin ? "joined" : userWhatsappStatus,
            joinedAt: "Just now"
          };

          await supabase.from("profiles").upsert({
            id: u.id,
            name: userName,
            email: userEmail,
            phone: "",
            avatar: userAvatar,
            role: profile.role,
            is_pro: profile.isPro
          });
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
    trackId?: string
  ) => {
    const targetTrackId = trackId || selectedTrackForPurchase?.id || tracks[0]?.id || "web-dev";
    const track = tracks.find(t => t.id === targetTrackId) || selectedTrackForPurchase || tracks[0];

    const cleanUtr = (utrNumberOrMethod || "").replace(/^(UPI\/|UTR_)/i, "").trim() || `UTR${Date.now().toString().slice(-8)}`;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const enrollmentId = `enr_${Date.now()}`;

    // 1. Upgrade currentUser locally
    const updatedUser: UserProfile = {
      ...currentUser,
      isPro: true,
      role: "student_pro",
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
      status: "pending_add",
      paidAt: "Just now",
      utrNumber: cleanUtr,
      screenshotUrl: screenshotUrl || "",
      notes: `Paid ₹999 for ${track.title}. UTR: ${cleanUtr}. Direct UPI to Pinki Pandey.`
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
      amount: 999,
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
        amount: 999,
        utr_number: cleanUtr,
        screenshot_url: screenshotUrl || "",
        status: "pending_add",
        notes: `Paid ₹999 for ${track.title}. UTR: ${cleanUtr}.`
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

  // Publish Result Handler - Writes directly to Supabase `results` (Wall of Fame with student Gmail)
  const handlePublishResult = async (
    data: Omit<ResultItem, "id" | "studentId" | "studentName" | "studentAvatar" | "studentHandle" | "createdAt" | "likesCount" | "verified">
  ) => {
    const resultId = `res_${Date.now()}`;
    const studentEmail = currentUser.email || `${currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`;

    const newResult: ResultItem = {
      ...data,
      id: resultId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail,
      studentAvatar: currentUser.avatar,
      studentHandle: `@${currentUser.name.toLowerCase().replace(/\s+/g, "_")}`,
      verified: true,
      createdAt: "Just now",
      likesCount: 1
    };

    // 1. Optimistic local update
    setResults(prev => [newResult, ...prev]);

    // 2. Persist to Supabase Database
    try {
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
        description: data.description,
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
      message: `${currentUser.name} uploaded ${data.currencyLabel} milestone in ${data.trackTitle}!`,
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

    // 2. Persist to Supabase Database
    try {
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
      await supabase.from("results").update({ verified: newVerified }).eq("id", resultId);
    } catch (err) {
      console.error("Supabase toggle verify error:", err);
    }
  };

  const handleToggleFeaturedResult = async (resultId: string) => {
    const target = results.find(r => r.id === resultId);
    const newFeatured = target ? !target.featured : true;

    setResults(prev =>
      prev.map(r => (r.id === resultId ? { ...r, featured: newFeatured } : r))
    );

    try {
      await supabase.from("results").update({ featured: newFeatured }).eq("id", resultId);
    } catch (err) {
      console.error("Supabase toggle featured error:", err);
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

  const handleDeleteStudentAccount = async () => {
    if (currentUser.role === "admin") return;
    try {
      const studentId = currentUser.id;
      const studentEmail = currentUser.email;

      // 1. Delete user data from Supabase tables
      await supabase.from("results").delete().eq("student_id", studentId);
      await supabase.from("enrollments").delete().or(`student_id.eq.${studentId},student_email.eq.${studentEmail}`);
      await supabase.from("profiles").delete().eq("id", studentId);

      // 2. Clear from local state
      setWhatsappQueue(prev => prev.filter(q => q.studentId !== studentId && q.studentEmail !== studentEmail));
      setTransactions(prev => prev.filter(t => t.userId !== studentId && t.userEmail !== studentEmail));
      setResults(prev => prev.filter(r => r.studentId !== studentId));
      setTotalRegisteredUsers(prev => Math.max(1, prev - 1));

      // 3. Sign out of Supabase auth session
      await supabase.auth.signOut();
      try {
        localStorage.removeItem("0.1_user_role");
      } catch {}
      setCurrentUser(DEFAULT_USERS.guest);
    } catch (err) {
      console.error("Delete account error:", err);
    }
  };

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
        dismissNotification,
        updateUserProfile,
        handleDeleteStudentAccount,
        refreshSupabaseData,
        handleSignOut,
        totalRegisteredUsers,
        totalPurchasedStudents
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
