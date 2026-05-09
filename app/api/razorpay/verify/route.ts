import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { savePaymentData } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Razorpay Verification Request:", body);
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = body;

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(text)
      .digest("hex");

    const isSignatureValid = generated_signature === razorpay_signature;

    if (!isSignatureValid) {
      console.error("Signature Mismatch!", { generated_signature, razorpay_signature });
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Update status in Supabase
    const { data: updatedPayment, error: dbError } = await supabase
      .from('payments')
      .update({ 
        status: 'paid',
        razorpay_payment_id,
        razorpay_signature,
        updated_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select()
      .single();
    
    if (dbError) {
      console.error("Database update error:", dbError);
      return NextResponse.json(
        { error: "Payment verified but failed to update database" },
        { status: 500 }
      );
    }

    // Update status in Google Sheets
    if (updatedPayment) {
      savePaymentData({
        name: updatedPayment.name,
        email: updatedPayment.email,
        phone: updatedPayment.phone,
        planName: updatedPayment.plan_name,
        amount: updatedPayment.amount,
        status: 'paid',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      }).catch(err => console.error("Google Sheets Background Error:", err));
    }

    return NextResponse.json({ message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
