import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { savePaymentData } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || "").trim();
    if (!secret) {
      console.error("Webhook secret is not configured.");
      return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Webhook signature mismatch.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const data = JSON.parse(rawBody);

    // We only care if the payment was successfully captured or order paid.
    if (data.event === "order.paid" || data.event === "payment.captured") {
      const paymentEntity = data.payload.payment?.entity;
      
      if (!paymentEntity) {
        return NextResponse.json({ status: "ignored - no payment entity" });
      }

      const razorpay_order_id = paymentEntity.order_id;
      const razorpay_payment_id = paymentEntity.id;

      // 1. Fetch the record from Supabase
      const { data: paymentRecord, error: fetchError } = await supabase
        .from('payments')
        .select('*')
        .eq('razorpay_order_id', razorpay_order_id)
        .single();

      if (fetchError || !paymentRecord) {
        console.error("Webhook: Payment record not found in Supabase for order", razorpay_order_id);
        return NextResponse.json({ status: "record not found" });
      }

      // 2. Check if already completed (maybe frontend callback fired faster)
      if (paymentRecord.status === 'completed') {
        console.log("Webhook: Order already marked as completed.", razorpay_order_id);
        return NextResponse.json({ status: "already completed" });
      }

      // 3. If pending, update to completed
      const { error: dbError } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          razorpay_payment_id,
          updated_at: new Date().toISOString(),
        })
        .eq('razorpay_order_id', razorpay_order_id);

      if (dbError) {
        console.error("Webhook: DB Update Error", dbError);
      } else {
        console.log("Webhook: Payment verified and completed for order", razorpay_order_id);
        
        // 4. Async update Google Sheets
        savePaymentData({
          name: paymentRecord.name,
          phone: paymentRecord.phone,
          email: paymentRecord.email,
          planName: paymentRecord.plan_name,
          amount: paymentRecord.amount,
          status: 'completed',
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        }).catch(err => console.error("Webhook: Sheet Error", err));
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
