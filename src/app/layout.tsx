import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Onchain App Template',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'Onchain App Template',
    description: 'Built with OnchainKit',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: 'https://ffce-2a13-2540-2ed-8d00-00-7900.ngrok-free.app/onchainkit.png',
      button: {
        title: 'OnchainKit',
        action: {
          type: 'launch_frame',
          name: 'OnchainKitFrame',
          url: 'https://ffce-2a13-2540-2ed-8d00-00-7900.ngrok-free.app/',
          splashImageUrl: 'https://ffce-2a13-2540-2ed-8d00-00-7900.ngrok-free.app/favicon.ico',
          splashBackgroundColor: '#131313'
        }
      }
    })
  }
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
