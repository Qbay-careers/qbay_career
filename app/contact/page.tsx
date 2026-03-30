'use client';

import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! Our team will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-purple-100">
      <QBayNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#5D4A7A] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our career services? We're here to help you land your dream job. Reach out to us via the form below or our official channels.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#5D4A7A]">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-purple-50 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-[#5D4A7A] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Email Us</p>
                    <p className="text-lg font-black text-gray-900">support@qbaycareer.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-purple-50 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">WhatsApp Support</p>
                    <p className="text-lg font-black text-gray-900">+44 7441 391851</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-purple-50 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-[#5D4A7A] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Office</p>
                    <p className="text-lg font-black text-gray-900">London, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#5D4A7A]">Follow Our Journey</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/company/qbay/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-12 w-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/global_career_desk?igsh=MWN1Z2F6OTV5ZWpmbA==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-12 w-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all shadow-sm"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61588315100598" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-12 w-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-purple-100 border border-purple-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 123 456 7890"
                  className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your career goals..."
                  className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#121826] text-white py-5 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100"
              >
                Send Message
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
