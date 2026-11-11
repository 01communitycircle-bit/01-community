import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing enrollment ID" }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { error } = await supabase.from("enrollments").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Enrollment delete API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
