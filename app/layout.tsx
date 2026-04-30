import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from './providers';
import StickyActionBar from '@/components/StickyActionBar';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'], 
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});



const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qbaycareer.com'),
  title: 'QBay Careers – #1 Career Consultant for Indians in UK & Ireland',
  description: 'QBay Career is the best career consultant for Indian and Malayali professionals in the UK and Ireland. We handle job applications, CV writing, interview coaching, and visa-sponsored roles.',
  keywords: 'career consultant UK, Malayali career consultant, Indian career consultant Ireland, UK visa sponsored jobs, CV writing UK, interview coaching UK, QBay Career',
  icons: {
    icon: [
      { url: '/cropped-Adobe_Express_-_file-removebg-preview-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/cropped-Adobe_Express_-_file-removebg-preview-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/cropped-Adobe_Express_-_file-removebg-preview-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/cropped-Adobe_Express_-_file-removebg-preview-32x32.png',
  },
  openGraph: {
    title: 'QBay Careers – #1 Career Consultant for Indians in UK & Ireland',
    description: 'QBay Career is not just another service. It is a consultancy created for Indian and Malayali professionals who want to build strong and meaningful careers in the UK and Ireland.',
    url: 'https://qbaycareer.com',
    siteName: 'QBay Careers',
    images: [
      {
        url: 'https://qbaycareer.com/cropped-Adobe_Express_-_file-removebg-preview-300x300.png',
        width: 300,
        height: 300,
        alt: 'QBay Careers Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'QBay Careers – #1 Career Consultant for Indians in UK & Ireland',
    description: 'QBay Career helps Indian and Malayali professionals land jobs in the UK and Ireland through expert CV writing, interview coaching, and job applications.',
    images: ['https://qbaycareer.com/cropped-Adobe_Express_-_file-removebg-preview-300x300.png'],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <WhatsAppPopup />
        </Providers>
      </body>
    </html>
  );
}
