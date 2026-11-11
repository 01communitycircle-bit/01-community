import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { id, updates } = await req.json();

    if (!id || !updates) {
      return NextResponse.json({ error: "Missing result ID or updates" }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.amountINR !== undefined) dbUpdates.amount_inr = updates.amountINR;
    if (updates.currencyLabel !== undefined) dbUpdates.currency_label = updates.currencyLabel;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.trackId !== undefined) dbUpdates.track_id = updates.trackId;
    if (updates.trackTitle !== undefined) dbUpdates.track_title = updates.trackTitle;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.proofImageUrl !== undefined) dbUpdates.proof_image_url = updates.proofImageUrl;
    if (updates.clientCountry !== undefined) dbUpdates.client_country = updates.clientCountry;
    if (updates.sourcePlatform !== undefined) dbUpdates.source_platform = updates.sourcePlatform;
    if (updates.verified !== undefined) dbUpdates.verified = updates.verified;
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured;

    const { error } = await supabase.from("results").update(dbUpdates).eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Results update API error:", err);
    return NextResponse.json({ error: err.message || "Failed to update result" }, { status: 500 });
  }
}
