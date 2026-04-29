'use client';

import React from 'react';
import { Youtube, Instagram, Linkedin, ExternalLink } from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
}

interface ActionLink {
  label: string;
  url: string;
}

interface InfluencerCardProps {
  name: string;
  image: string;
  followers: string;
  description: string;
  socialLinks: SocialLink[];
  actionLink: ActionLink;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  name,
  image,
  followers,
  description,
  socialLinks,
  actionLink
}) => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-[280px] flex-shrink-0 group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative aspect-[4/3.5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Name & Followers Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-white mb-0">{name}</h3>
          <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-tight">{followers}</p>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div 
          className="text-[12px] text-slate-500 leading-snug mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Links Section */}
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-600 transition-colors"
                title={link.platform}
              >
                {getIcon(link.platform)}
              </a>
            ))}
          </div>
          
          <a
            href={actionLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors group/link"
          >
            {actionLink.label}
            <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;
