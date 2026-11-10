import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trackId, userEmail, userName, userPhone, amount = 1000 } = body;

    // Production Razorpay Order creation simulation
    // In live production, you initialize razorpay SDK:
    // const order = await razorpay.orders.create({ amount: 100000, currency: 'INR', receipt: ... });

    const orderId = `order_${Date.now().toString().slice(-8)}`;

    return NextResponse.json({
      success: true,
      orderId,
      amount,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mockKey123",
      student: {
        name: userName,
        email: userEmail,
        phone: userPhone,
        trackId
      },
      message: "Order generated successfully. Complete payment via Razorpay / UPI."
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
