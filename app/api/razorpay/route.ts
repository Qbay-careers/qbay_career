import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";
import { savePaymentData } from "@/lib/googleSheets";

const razorpay = new Razorpay({
  key_id: (process.env.RAZORPAY_KEY_ID || "").trim(),
  key_secret: (process.env.RAZORPAY_KEY_SECRET || "").trim(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Razorpay Order Request:", body);
    const { name, email, phone, planName } = body;

    if (!planName) {
      return NextResponse.json({ error: "Plan name is required" }, { status: 400 });
    }

    // 1. Fetch Pricing
    const { data: cmsData, error: cmsError } = await supabase
      .from('cms_content')
      .select('content')
      .eq('key', 'pricing')
      .single();

    if (cmsError || !cmsData?.content) {
      console.error("CMS Error:", cmsError);
      return NextResponse.json({ error: "Failed to verify pricing" }, { status: 500 });
    }

    const pricing = cmsData.content;
    const allPlans = [
      ...(Array.isArray(pricing.plans) ? pricing.plans : []),
      pricing.monthlyPlan,
      pricing.ultimatePlan
    ].filter(Boolean);

    const selectedPlan = allPlans.find(p => p.name === planName);
    if (!selectedPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // 2. Parse Price (Improved: handles commas like 1,500 and decimals like 1500.50)
    const amountRaw = parseFloat(selectedPlan.price.replace(/[^0-9.]/g, ''));
    const verifiedAmount = Math.round(amountRaw); // Round to whole euros
    const currency = "EUR"; // Forced for testing

    if (isNaN(verifiedAmount) || verifiedAmount <= 0) {
      return NextResponse.json({ error: "Invalid price in database" }, { status: 400 });
    }

    // 3. Create Order
    const order = await razorpay.orders.create({
      amount: verifiedAmount * 100, // paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    // 4. Save to Database
    const { error: dbError } = await supabase.from('payments').insert({
      name,
      email,
      phone,
      plan_name: planName,
      amount: verifiedAmount,
      currency,
      status: 'pending',
      razorpay_order_id: order.id,
      created_at: new Date().toISOString(),
    });

    if (dbError) console.error("Supabase Error:", dbError);

    // 5. Log Lead
    savePaymentData({
      name, email, phone, planName,
      amount: verifiedAmount,
      status: 'pending',
      orderId: order.id
    }).catch(err => console.error("Sheet Error:", err));

    console.log("Order Created:", order.id, "Amount:", verifiedAmount);

    return NextResponse.json({ 
      order,
      keyId: (process.env.RAZORPAY_KEY_ID || "").trim()
    });
  } catch (error: any) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
