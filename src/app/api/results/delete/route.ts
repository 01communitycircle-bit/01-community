import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing result ID" }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { error } = await supabase.from("results").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Results delete API error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete result" }, { status: 500 });
  }
}
