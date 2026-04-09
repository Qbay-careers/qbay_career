const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const p = (key) => envFile.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim();

const supabase = createClient(
  p('NEXT_PUBLIC_SUPABASE_URL'),
  p('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

const newPricingContent = {
  "hero": {
    "title": "Choose The Best!",
    "subtitle": "Focus on building your career, not filling out forms.",
    "description": "Our human assistants apply to jobs for you while you spend your time networking and preparing for interviews."
  },
  "plans": [
    {
      "name": "Monthly Subscription",
      "price": "€219/-",
      "originalPrice": "€258/-",
      "description": "One time payment",
      "features": ["Job applications on your behalf", "Daily 10 job applications", "Non-easy applications", "Email & message applications", "LinkedIn applications included", "Direct company website apps", "Dedicated Account Manager"],
      "buttonText": "Checkout",
      "buttonLink": "#"
    },
    {
      "name": "Qbay Career Plan",
      "price": "€193/-",
      "originalPrice": "€263/-",
      "description": "One time payment",
      "isHighlighted": true,
      "features": ["UK/Germany/Ireland Internship", "60-Day Success Club Access", "Market Research & Profiling", "1:1 Career Counseling", "1:1 Mind Belief Sessions", "Mock Interview Prep (1)", "ATS CV & Cover Letter", "LinkedIn Optimisation"],
      "buttonText": "Checkout",
      "buttonLink": "#"
    },
    {
      "name": "Qbay Master Plan",
      "price": "€329/-",
      "originalPrice": "€499/-",
      "description": "One time payment",
      "isPopular": true,
      "badgeText": "MOST POPULAR",
      "features": ["Career Strategy Development", "Effective Career Roadmap", "UK/DE/IE Full time Experience", "90-Day Success Club Access", "2x 1:1 Career Coaching", "Mock Interview Prep (2)", "ATS CV & Cover Letter", "LinkedIn Optimisation"],
      "buttonText": "Checkout",
      "buttonLink": "#"
    },
    {
      "name": "Qbay Premium Plan",
      "price": "€639/-",
      "originalPrice": "€799/-",
      "description": "One time payment",
      "isMaxResult": true,
      "badgeText": "MAX RESULTS!",
      "features": ["3 Month Application Assistance", "UK & India Career Roadmap", "100-Day Internship Assistance", "Full Success Club Access", "3x Career Coaching Sessions", "2x Mind Belief Counseling", "Mock Interview Prep (3)", "ATS CV & Cover Letter"],
      "buttonText": "Checkout",
      "buttonLink": "#"
    }
  ],
  "cancellation": {
    "title": "Cancellation Policy",
    "subtitle": "You can cancel your plan anytime, no questions asked",
    "policies": [
      { "title": "1. Eligibility for Cancellation", "content": "Cancellation requests are accepted only after a successful payment transaction has been completed and reflected in our company account." },
      { "title": "2. Cancellation Before Process Begins", "content": "If the candidate requests cancellation before profile creation and application processing has started, a partial refund may be issued after deducting administrative charges (20-30%)." },
      { "title": "3. Cancellation After Process Begins", "content": "Once our team has started preparing the candidate CV, profile, documentation, or application submissions, the service is considered in progress and the payment becomes non-refundable." },
      { "title": "4. Completed Service", "content": "If the profile has been prepared and applications have been submitted on behalf of the candidate, cancellation requests will not be accepted." },
      { "title": "5. Candidate Responsibility", "content": "Candidates must provide accurate and complete information required for CV preparation and job applications. Delays caused by missing or incorrect information do not qualify for refunds." },
      { "title": "6. Requesting Cancellation", "content": "All cancellation requests must be submitted through our official email or WhatsApp support channel with the candidate name, payment reference, and registered contact details." },
      { "title": "7. Company Rights", "content": "The company reserves the right to decline cancellation or refund requests once the service process has started or if the service has been delivered." }
    ]
  }
};

async function fixPricing() {
  const { error } = await supabase
    .from('cms_content')
    .update({ content: newPricingContent })
    .eq('key', 'pricing');

  if (error) {
    console.error('Failed to update:', error);
  } else {
    console.log('Successfully restored pricing data!');
  }
}

fixPricing();
