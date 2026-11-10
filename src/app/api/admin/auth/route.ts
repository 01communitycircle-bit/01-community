import { NextRequest, NextResponse } from "next/server";

// Secure Server-Side Admin Authentication
// Never exposed in client browser JS bundles
const SERVER_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin01";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, error: "Passcode is required." },
        { status: 400 }
      );
    }

    // Verify passcode against server environment or secure server secret
    if (passcode.trim() === SERVER_ADMIN_PASSCODE) {
      const response = NextResponse.json({
        success: true,
        message: "Admin authorization verified."
      });

      // Set secure HTTP-only cookie for session verification
      response.cookies.set("0.1_admin_auth_token", "authorized_session_master", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid Admin Passcode. Access denied." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server authentication error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.delete("0.1_admin_auth_token");
  return response;
}
