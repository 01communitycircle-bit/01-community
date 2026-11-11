import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function DELETE(req: Request) {
  try {
    const { id, studentId, studentEmail } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing enrollment ID" }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // 1. Fetch enrollment first to get student ID and email if not provided
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("student_id, student_email")
      .eq("id", id)
      .maybeSingle();

    const targetStudentId = studentId || enrollment?.student_id;
    const targetStudentEmail = studentEmail || enrollment?.student_email;

    // 2. Delete the enrollment record
    const { error } = await supabase.from("enrollments").delete().eq("id", id);
    if (error) throw error;

    // 3. Check if this student has any remaining active enrollments
    if (targetStudentId || targetStudentEmail) {
      let query = supabase.from("enrollments").select("id");
      if (targetStudentId && targetStudentEmail) {
        query = query.or(`student_id.eq.${targetStudentId},student_email.eq.${targetStudentEmail}`);
      } else if (targetStudentId) {
        query = query.eq("student_id", targetStudentId);
      } else if (targetStudentEmail) {
        query = query.eq("student_email", targetStudentEmail);
      }

      const { data: remaining } = await query;

      // If no remaining enrollments, revert student profile to unpaid
      if (!remaining || remaining.length === 0) {
        if (targetStudentId) {
          await supabase
            .from("profiles")
            .update({ is_pro: false, role: "student_unpaid" })
            .eq("id", targetStudentId);
        }
        if (targetStudentEmail) {
          await supabase
            .from("profiles")
            .update({ is_pro: false, role: "student_unpaid" })
            .eq("email", targetStudentEmail);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Enrollment delete API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
