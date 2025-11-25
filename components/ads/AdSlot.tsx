'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical';

interface AdSlotProps {
  adSlot: string;
  adFormat?: AdFormat;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Base AdSlot component
export function AdSlot({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only push ads in production and if not already loaded
    if (
      process.env.NODE_ENV === 'production' &&
      adSlot &&
      !isLoaded &&
      typeof window !== 'undefined'
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsLoaded(true);
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adSlot, isLoaded]);

  // Don't render in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ minHeight: '90px', ...style }}
      >
        Ad Placeholder (Production only)
      </div>
    );
  }

  if (!adSlot) return null;

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );
}

// Pre-configured ad components for common placements

// Banner ad - for top/bottom of page (728x90 desktop, responsive mobile)
export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-4 ${className}`}>
      <AdSlot
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || ''}
        adFormat="horizontal"
        style={{ width: '100%', maxWidth: '728px', height: '90px' }}
      />
    </div>
  );
}

// Sidebar ad - for sidebars (300x250 or 300x600)
export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <div className={`sticky top-20 ${className}`}>
      <AdSlot
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || ''}
        adFormat="rectangle"
        style={{ width: '300px', height: '250px' }}
      />
    </div>
  );
}

// In-article ad - for between content sections
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full my-6 ${className}`}>
      <AdSlot
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_INARTICLE_SLOT || ''}
        adFormat="auto"
        fullWidthResponsive={true}
      />
    </div>
  );
}

// Multiplex ad - for related content style ads
export function MultiplexAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full my-8 ${className}`}>
      <AdSlot
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_MULTIPLEX_SLOT || ''}
        adFormat="auto"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Responsive ad - auto-sizes based on container
export function ResponsiveAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full my-4 ${className}`}>
      <AdSlot
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_RESPONSIVE_SLOT || ''}
        adFormat="auto"
        fullWidthResponsive={true}
        style={{ minHeight: '100px' }}
      />
    </div>
  );
}
