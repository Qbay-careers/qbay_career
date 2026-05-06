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
    const { currency = "INR", name, email, phone, planName } = body;

    if (!planName) {
      return NextResponse.json({ error: "Plan name is required" }, { status: 400 });
    }

    // 1. Fetch the actual price from the database for security
    const { data: cmsData, error: cmsError } = await supabase
      .from('cms_content')
      .select('content')
      .eq('key', 'pricing')
      .single();

    if (cmsError || !cmsData?.content) {
      console.error("Error fetching pricing from CMS:", cmsError);
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
      return NextResponse.json({ error: `Plan "${planName}" not found in database` }, { status: 404 });
    }

    // Parse price from string like "€193/-" or "₹15000"
    const parsePrice = (priceStr: string) => {
      const match = priceStr.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };

    const verifiedAmount = parsePrice(selectedPlan.price);

    if (verifiedAmount <= 0) {
      return NextResponse.json({ error: "Invalid price found in database" }, { status: 400 });
    }

    // 2. Create Razorpay order with the VERIFIED amount
    const amountInSmallestUnit = Math.round(verifiedAmount * 100);

    const options = {
      amount: amountInSmallestUnit,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // 3. Save initial payment record to Supabase
    const { error: dbError } = await supabase
      .from('payments')
      .insert({
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

    if (dbError) {
      console.error("Supabase error (insert):", dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}. Did you create the 'payments' table?` },
        { status: 500 }
      );
    }

    console.log("Razorpay Order Created (Verified):", order.id, "Amount:", verifiedAmount);
    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Razorpay API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
