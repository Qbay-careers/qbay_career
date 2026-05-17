'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, ShieldCheck, ChevronDown, ArrowRight, Lock, Globe } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
  } | null;
}

const COUNTRIES = [
  { name: 'India', iso: 'IN', code: '+91', flag: '🇮🇳' },
  { name: 'United Kingdom', iso: 'GB', code: '+44', flag: '🇬🇧' },
  { name: 'Ireland', iso: 'IE', code: '+353', flag: '🇮🇪' },
  { name: 'Finland', iso: 'FI', code: '+358', flag: '🇫🇮' },
  { name: 'UAE', iso: 'AE', code: '+971', flag: '🇦🇪' },
  { name: 'United States', iso: 'US', code: '+1', flag: '🇺🇸' },
  { name: 'Canada', iso: 'CA', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', iso: 'AU', code: '+61', flag: '🇦🇺' },
  { name: 'Germany', iso: 'DE', code: '+49', flag: '🇩🇪' },
  { name: 'France', iso: 'FR', code: '+33', flag: '🇫🇷' },
  { name: 'Sweden', iso: 'SE', code: '+46', flag: '🇸🇪' },
  { name: 'Singapore', iso: 'SG', code: '+65', flag: '🇸🇬' },
  { name: 'Qatar', iso: 'QA', code: '+974', flag: '🇶🇦' },
  { name: 'Other', iso: 'INT', code: '', flag: '🌍' },
];

export default function CheckoutModal({ isOpen, onClose, plan }: CheckoutModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [customCountryCode, setCustomCountryCode] = useState('+');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const amountRaw = parseFloat(plan.price.replace(/[^0-9.]/g, ''));
  const amountNumeric = Math.round(amountRaw);
  const displayPrice = `€${amountNumeric.toLocaleString()}`;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, planName: plan.name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay failed to load");

      const cleanNumber = formData.phone.replace(/[^0-9]/g, '');
      const activeCode = selectedCountry.name === 'Other' ? customCountryCode : selectedCountry.code;
      const fullPhone = `${activeCode}${cleanNumber}`;

      const options = {
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "QBay Careers",
        description: plan.name,
        order_id: data.order.id,
        prefill: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          contact: fullPhone,
        },
        handler: async (response: any) => {
          setLoading(true);
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            if (!verifyRes.ok) throw new Error("Verification failed");
            setIsSuccess(true);
            setTimeout(handleClose, 3000);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
        theme: { color: '#0F172A' } // Sleek slate blue
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (resp: any) => {
        console.error("RAZORPAY FAILURE:", resp.error);
        setError(resp.error.description || "Payment failed");
        setLoading(false);
      });
      rzp.open();

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`relative w-full max-w-4xl bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-500 flex flex-col md:flex-row h-auto max-h-[85vh] rounded-2xl ${isClosing ? 'scale-95 translate-y-4' : 'scale-100 translate-y-0'}`}>
        
        {/* Left Side: Premium Visual */}
        <div className="relative w-full md:w-[40%] overflow-hidden hidden md:block">
          <img 
            src="/images/checkout-visual.png" 
            alt="Success & Career" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-3.5 h-3.5 text-indigo-300" />
                <span className="text-white/60 text-[9px] font-bold tracking-[0.2em] uppercase">Global Career Access</span>
              </div>
              <h3 className="text-white text-xl font-playfair font-medium mb-2 leading-tight">Elevate Your Career Trajectory</h3>
              <p className="text-white/70 text-[11px] font-sans font-light leading-relaxed">Join 110k+ professionals who have successfully navigated their global job search.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[60%] p-6 md:p-10 relative flex flex-col justify-center overflow-y-auto">
          <button 
            onClick={handleClose} 
            className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-all p-2 rounded-full hover:bg-slate-50"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 rounded-full">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2">Welcome Aboard!</h2>
              <p className="text-slate-500 text-sm font-sans">Your payment was successful. Redirecting you shortly...</p>
            </div>
          ) : (
            <div className="w-full max-w-sm mx-auto">
              <header className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-6 bg-indigo-600"></span>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Secure Checkout</span>
                </div>
                <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-1 leading-tight">
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-sans font-semibold text-slate-900">{displayPrice}</span>
                  <span className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">one-time investment</span>
                </div>
              </header>

              {error && (
                <div className="mb-6 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2 text-rose-600 animate-in fade-in zoom-in duration-300">
                  <div className="shrink-0 mt-0.5"><Lock className="w-3.5 h-3.5" /></div>
                  <p className="text-[11px] font-medium leading-relaxed">{error}</p>
                </div>
              )}

              <form onSubmit={handlePayment} className="space-y-5">
                <div className="group">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-indigo-600">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full py-1.5 border-b border-slate-100 focus:border-indigo-600 transition-all outline-none text-slate-900 font-medium text-base placeholder:text-slate-200 bg-transparent"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="group">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-indigo-600">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@professional.com"
                    className="w-full py-1.5 border-b border-slate-100 focus:border-indigo-600 transition-all outline-none text-slate-900 font-medium text-base placeholder:text-slate-200 bg-transparent"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="group">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-indigo-600">Phone Number</label>
                  <div className="flex gap-4">
                    <div className="relative shrink-0 flex items-center gap-1.5 py-1.5 border-b border-slate-100 group-focus-within:border-indigo-600 transition-all">
                      <div className="relative flex items-center gap-1 cursor-pointer hover:bg-slate-50 p-0.5 rounded">
                        <span className="text-sm font-bold text-slate-900">{selectedCountry.iso}</span>
                        <ChevronDown className="w-3 h-3 text-slate-300" />
                        <select 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          value={selectedCountry.name}
                          onChange={(e) => {
                            const country = COUNTRIES.find(c => c.name === e.target.value);
                            if (country) setSelectedCountry(country);
                          }}
                        >
                          {COUNTRIES.map(c => (
                            <option key={c.name} value={c.name}>{c.flag} {c.name} {c.code ? `(${c.code})` : ''}</option>
                          ))}
                        </select>
                      </div>
                      
                      {selectedCountry.name === 'Other' ? (
                        <input 
                          type="text" 
                          className="w-10 text-sm font-medium text-slate-900 bg-transparent outline-none border-b border-dashed border-slate-300 focus:border-indigo-600"
                          value={customCountryCode}
                          onChange={(e) => setCustomCountryCode(e.target.value)}
                          placeholder="+"
                        />
                      ) : (
                        <span className="text-sm font-medium text-slate-500">{selectedCountry.code}</span>
                      )}
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="00000 00000"
                      className="grow py-1.5 border-b border-slate-100 focus:border-indigo-600 transition-all outline-none text-slate-900 font-medium text-base placeholder:text-slate-200 bg-transparent"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-xs tracking-[0.2em] uppercase hover:bg-black transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-slate-100"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <>
                        <span>Initialize Payment</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  
                  <div className="mt-6 flex items-center justify-center gap-5 opacity-30">
                    <div className="flex items-center gap-1.5 text-[8px] font-bold tracking-widest uppercase text-slate-900">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[8px] font-bold tracking-widest uppercase text-slate-900">
                      <Lock className="w-3 h-3" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
