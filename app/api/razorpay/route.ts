import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Razorpay Order Request:", body);
    const { amount, currency = "INR", name, email, phone, planName } = body;

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    // Amount is expected to be in the smallest currency unit (e.g. paise for INR, cents for EUR)
    // Here we assume the frontend sends the exact amount string (e.g. "193" for €193).
    // We need to multiply by 100.
    const amountInSmallestUnit = Math.round(Number(amount) * 100);

    const options = {
      amount: amountInSmallestUnit,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save initial payment record to Supabase
    const { error: dbError } = await supabase
      .from('payments')
      .insert({
        name,
        email,
        phone,
        plan_name: planName,
        amount: Number(amount),
        currency,
        status: 'pending',
        razorpay_order_id: order.id,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error("Supabase error (insert):", dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}. Did you create the 'payments' table?` },
        { status: 500 }
      );
    }

    console.log("Razorpay Order Created:", order.id);
    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Razorpay API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
