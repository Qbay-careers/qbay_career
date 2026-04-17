'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from './actions';
import { Lock, User, KeyRound, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else if (result?.success) {
      toast.success('Login successful!');
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFCFE] p-4">
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-8 border border-purple-50">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200 mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[#1A112B]">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-1">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email / Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                name="username"
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ex: admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound size={18} />
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
