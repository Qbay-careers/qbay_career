'use client';

import React from 'react';
import { Plus, Trash2, Instagram, Facebook, Linkedin, Link as LinkIcon, Mail, Phone, MapPin, Users } from 'lucide-react';

interface QuickLink { label: string; url: string; }

interface FooterData {
  tagline?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  quickLinks?: QuickLink[];
  email1?: string;
  email2?: string;
  email3?: string;
  phone?: string;
  address?: string;
  communityHeading?: string;
  communitySubtext?: string;
  communityButtonLabel?: string;
  whatsappCommunityUrl?: string;
}

interface FooterAdminFormProps {
  value: FooterData;
  onChange: (newValue: FooterData) => void;
}

const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm space-y-5">
    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
        <Icon size={18} />
      </div>
      <h3 className="font-bold text-[#1A112B] text-base">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({
  label, value, onChange, type = 'text', placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all resize-none leading-relaxed"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
      />
    )}
  </div>
);

export default function FooterAdminForm({ value, onChange }: FooterAdminFormProps) {
  const update = (patch: Partial<FooterData>) => onChange({ ...value, ...patch });

  const quickLinks: QuickLink[] = value.quickLinks || [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about-us' },
    { label: 'Wall of Fame', url: '/wall-of-fame' },
    { label: 'Blog', url: '/blog' },
    { label: 'Pricing', url: '/pricing' },
  ];

  const updateLink = (index: number, patch: Partial<QuickLink>) => {
    const newLinks = [...quickLinks];
    newLinks[index] = { ...newLinks[index], ...patch };
    update({ quickLinks: newLinks });
  };

  const addLink = () => update({ quickLinks: [...quickLinks, { label: 'New Link', url: '/' }] });
  const removeLink = (index: number) => update({ quickLinks: quickLinks.filter((_, i) => i !== index) });

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">

      {/* Brand Info */}
      <SectionCard title="Brand Info" icon={Linkedin}>
        <Field
          label="Tagline / Description"
          value={value.tagline || ''}
          onChange={v => update({ tagline: v })}
          type="textarea"
          placeholder="Empowering job seekers with smart tools..."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Facebook size={12} className="text-blue-600" /> Facebook URL
            </label>
            <input
              type="text" value={value.facebookUrl || ''} onChange={e => update({ facebookUrl: e.target.value })}
              placeholder="https://facebook.com/..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Instagram size={12} className="text-pink-600" /> Instagram URL
            </label>
            <input
              type="text" value={value.instagramUrl || ''} onChange={e => update({ instagramUrl: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Linkedin size={12} className="text-blue-500" /> LinkedIn URL
            </label>
            <input
              type="text" value={value.linkedinUrl || ''} onChange={e => update({ linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/company/..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
        </div>
      </SectionCard>

      {/* Quick Links */}
      <SectionCard title="Quick Links" icon={LinkIcon}>
        <div className="space-y-3">
          {quickLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <span className="text-xs font-bold text-slate-400 w-5 shrink-0">#{i + 1}</span>
              <input
                type="text" value={link.label} onChange={e => updateLink(i, { label: e.target.value })}
                placeholder="Label"
                className="w-1/3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
              />
              <input
                type="text" value={link.url} onChange={e => updateLink(i, { url: e.target.value })}
                placeholder="/path or https://..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
              />
              <button
                onClick={() => removeLink(i)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addLink}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-purple-200 px-4 py-2.5 text-sm font-semibold text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all w-full justify-center mt-2"
        >
          <Plus size={15} /> Add Quick Link
        </button>
      </SectionCard>

      {/* Contact Us */}
      <SectionCard title="Contact Us" icon={Mail}>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Mail size={12} /> Email 1
            </label>
            <input type="text" value={value.email1 || ''} onChange={e => update({ email1: e.target.value })}
              placeholder="info@qbaycareer.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Mail size={12} /> Email 2
            </label>
            <input type="text" value={value.email2 || ''} onChange={e => update({ email2: e.target.value })}
              placeholder="sales@qbaycareer.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Mail size={12} /> Email 3
            </label>
            <input type="text" value={value.email3 || ''} onChange={e => update({ email3: e.target.value })}
              placeholder="support@qbaycareer.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <Phone size={12} /> Phone Number
            </label>
            <input type="text" value={value.phone || ''} onChange={e => update({ phone: e.target.value })}
              placeholder="+44 7704 862669"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <MapPin size={12} /> Address
            </label>
            <input type="text" value={value.address || ''} onChange={e => update({ address: e.target.value })}
              placeholder="London Rd, Elephant and Castle..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
            />
          </div>
        </div>
      </SectionCard>

      {/* Community */}
      <SectionCard title="Community" icon={Users}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Section Heading" value={value.communityHeading || ''} onChange={v => update({ communityHeading: v })} placeholder="Community" />
          <Field label="Button Label" value={value.communityButtonLabel || ''} onChange={v => update({ communityButtonLabel: v })} placeholder="JOIN COMMUNITY" />
        </div>
        <Field label="Subtext" value={value.communitySubtext || ''} onChange={v => update({ communitySubtext: v })} placeholder="Join our community of professionals and get expert guidance." />
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <LinkIcon size={12} /> WhatsApp Community URL
          </label>
          <input type="text" value={value.whatsappCommunityUrl || ''} onChange={e => update({ whatsappCommunityUrl: e.target.value })}
            placeholder="https://www.whatsapp.com/channel/..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
          />
        </div>
      </SectionCard>

    </div>
  );
}
