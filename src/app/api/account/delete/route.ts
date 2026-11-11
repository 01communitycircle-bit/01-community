import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { studentId, studentEmail } = await req.json();

    if (!studentId && !studentEmail) {
      return NextResponse.json({ error: "Missing studentId or studentEmail" }, { status: 400 });
    }

    // Safety guard: Admin can NEVER be deleted
    if (studentEmail?.toLowerCase() === "0.1community.circle@gmail.com") {
      return NextResponse.json({ error: "Cannot delete master admin account" }, { status: 403 });
    }

    const supabase = getServiceSupabase();
    const cleanEmail = studentEmail ? studentEmail.toLowerCase() : "";

    // 1. Permanently delete all results (Wall of Fame proof)
    if (studentId) {
      await supabase.from("results").delete().eq("student_id", studentId);
    }
    if (cleanEmail) {
      await supabase.from("results").delete().eq("student_email", cleanEmail);
    }

    // 2. Permanently delete all enrollments (VIP WhatsApp & purchase records)
    if (studentId) {
      await supabase.from("enrollments").delete().eq("student_id", studentId);
    }
    if (cleanEmail) {
      await supabase.from("enrollments").delete().eq("student_email", cleanEmail);
    }

    // 3. Permanently delete from public profiles
    if (studentId) {
      await supabase.from("profiles").delete().eq("id", studentId);
    }
    if (cleanEmail) {
      await supabase.from("profiles").delete().eq("email", cleanEmail);
    }

    // 4. Permanently delete user from Supabase Auth (auth.users)
    if (studentId) {
      try {
        await supabase.auth.admin.deleteUser(studentId);
      } catch (authErr) {
        console.warn("Could not delete from auth.users by id:", authErr);
      }
    }

    return NextResponse.json({ success: true, message: "Account wiped permanently" });
  } catch (error: any) {
    console.error("Account delete API error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete account" }, { status: 500 });
  }
}
