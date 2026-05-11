import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { savePaymentData } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // 1. Verify HMAC Signature
    const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("Signature Mismatch!");
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    console.log("Payment Verified Successfully:", razorpay_payment_id);

    // 2. Update Database & Fetch Details
    const { data: paymentRecord, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .single();

    if (fetchError || !paymentRecord) {
      console.error("Payment Record Not Found or Fetch Error:", fetchError);
      // We still try to update the status if possible, but we might not have all details for Google Sheets
    }

    const { error: dbError } = await supabase
      .from('payments')
      .update({
        status: 'completed',
        razorpay_payment_id,
        razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (dbError) console.error("Update Error:", dbError);

    // 3. Update Google Sheets (Async)
    if (paymentRecord) {
      savePaymentData({
        name: paymentRecord.name,
        phone: paymentRecord.phone,
        email: paymentRecord.email,
        planName: paymentRecord.plan_name,
        amount: paymentRecord.amount,
        status: 'completed',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      }).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verification Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
