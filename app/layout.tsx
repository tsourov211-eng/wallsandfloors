import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://wallsandfloors.vercel.app'
  ),
  title: 'Walls and Floors | Beautiful spaces start here',
  description:
    'Shop tiles, wall panels, paving and more for every room in your home.',
  openGraph: {
    title: 'Walls and Floors | Beautiful spaces start here',
    description:
      'Shop tiles, wall panels, paving and more for every room in your home.',
    url: 'https://wallsandfloors.vercel.app',
    siteName: 'Walls and Floors',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Walls and Floors | Beautiful spaces start here',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walls and Floors | Beautiful spaces start here',
    description:
      'Shop tiles, wall panels, paving and more for every room in your home.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png?v=2' },
    ],
    shortcut: ['/favicon.ico?v=2'],
  },
};

import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
