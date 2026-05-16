import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapVideoUrls = (items: any[], quality: 'hqdefault' | 'maxresdefault' = 'hqdefault') => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      const url = typeof item === 'string' ? item : item?.url;
      const flag = typeof item === 'object' ? (item?.flag || 'https://flagcdn.com/w80/in.png') : 'https://flagcdn.com/w80/in.png';
      
      if (typeof url !== 'string' || !url) return null;

      // Handle Cloudinary URLs
      if (url.includes('cloudinary.com')) {
        const thumbnail = url
          .replace(/\/video\/upload\//, '/video/upload/f_auto,q_auto,so_auto/')
          .replace(/\.[^/.]+$/, '.jpg');
        return {
          id: url,
          url,
          thumbnail,
          isCloudinary: true,
          flag
        };
      }

      // Robust regex for both shorts and regular YouTube videos
      const match = url.match(/(?:shorts\/|v=|\/)([a-zA-Z0-9_-]{11})/);
      const id = match?.[1];
      if (!id) return null;
      return {
        id,
        url,
        thumbnail: `https://i.ytimg.com/vi/${id}/${quality}.jpg`,
        isCloudinary: false,
        flag
      };
    })
    .filter((v): v is any => v !== null);
};
