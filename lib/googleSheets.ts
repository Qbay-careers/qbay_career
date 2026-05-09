const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz0AxkO-UrB9is3dX0C2iDa_mDizudfMHlUA0ID1zHPV6DF1TMXbN758E9P8c8Sv1LI/exec';

export async function savePaymentData(data: {
  name: string;
  phone: string;
  email: string;
  planName: string;
  amount: number;
  status: string;
  orderId?: string;
  paymentId?: string;
}) {
  try {
    // We use a background task-like approach so the main API response isn't slowed down
    const response = await fetch(SHEET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: data.name,
        phone: data.phone,
        email: data.email,
        plan_name: data.planName,
        amount: data.amount,
        payment_status: data.status,
        order_id: data.orderId || 'N/A',
        payment_id: data.paymentId || 'N/A'
      })
    });

    if (!response.ok) {
      console.error('Google Sheet Error Response:', await response.text());
    } else {
      console.log('Successfully saved to Google Sheet!');
    }
  } catch (err) {
    console.error('Failed to save to Google Sheet:', err);
  }
}
