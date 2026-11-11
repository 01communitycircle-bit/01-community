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

    // Parallelize all deletions across results, enrollments, profiles, and auth.users
    const deletePromises: any[] = [];

    if (studentId) {
      deletePromises.push(Promise.resolve(supabase.from("results").delete().eq("student_id", studentId)));
      deletePromises.push(Promise.resolve(supabase.from("enrollments").delete().eq("student_id", studentId)));
      deletePromises.push(Promise.resolve(supabase.from("profiles").delete().eq("id", studentId)));
      deletePromises.push(
        supabase.auth.admin.deleteUser(studentId).catch((err: any) => {
          console.warn("Could not delete from auth.users:", err);
        })
      );
    }

    if (cleanEmail) {
      deletePromises.push(Promise.resolve(supabase.from("results").delete().eq("student_email", cleanEmail)));
      deletePromises.push(Promise.resolve(supabase.from("enrollments").delete().eq("student_email", cleanEmail)));
      deletePromises.push(Promise.resolve(supabase.from("profiles").delete().eq("email", cleanEmail)));
    }

    await Promise.allSettled(deletePromises);

    return NextResponse.json({ success: true, message: "Account wiped permanently" });
  } catch (error: any) {
    console.error("Account delete API error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete account" }, { status: 500 });
  }
}
