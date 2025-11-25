'use client';

import Script from 'next/script';

interface AdSenseProps {
  publisherId: string;
}

// AdSense script loader - add this to the layout
export function AdSenseScript({ publisherId }: AdSenseProps) {
  if (!publisherId) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
