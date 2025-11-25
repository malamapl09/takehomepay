'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}

// Custom event tracking helper
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Pre-defined events for the calculator
export const analyticsEvents = {
  calculation: (state: string, salary: number) =>
    trackEvent('calculation_complete', 'calculator', state, salary),

  comparison: () =>
    trackEvent('comparison_viewed', 'calculator'),

  saveCalculation: () =>
    trackEvent('calculation_saved', 'engagement'),

  exportResults: (format: string) =>
    trackEvent('results_exported', 'engagement', format),

  statePageView: (state: string) =>
    trackEvent('state_page_view', 'navigation', state),
};
