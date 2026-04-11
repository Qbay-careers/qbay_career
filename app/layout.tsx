import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from './providers';
import StickyActionBar from '@/components/StickyActionBar';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'], 
  style: ['normal', 'italic'],
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: 'QBay Careers',
  description: 'QBay Careers website',
  icons: {
    icon: '/cropped-Adobe_Express_-_file-removebg-preview-32x32.png',
    shortcut: '/cropped-Adobe_Express_-_file-removebg-preview-192x192.png',
    apple: '/cropped-Adobe_Express_-_file-removebg-preview-180x180.png',
  },
  openGraph: {
    title: 'QBay Careers',
    description: 'QBay Careers website',
    url: 'https://qbaycareers.com',
    siteName: 'QBay Careers',
    images: [
      {
        url: '/cropped-Adobe_Express_-_file-removebg-preview-300x300.png',
        width: 300,
        height: 300,
        alt: 'QBay Careers Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <StickyActionBar />
          <WhatsAppPopup />
        </Providers>
      </body>
    </html>
  );
}
