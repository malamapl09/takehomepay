import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { AdSenseScript } from '@/components/ads';
import { faqSchema, webApplicationSchema } from '@/content/seo/faq';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Take Home Pay Calculator | Free Salary After Tax Calculator 2024',
    template: '%s | TakeHomePay',
  },
  description:
    'Free take home pay calculator for 2024. Calculate your net salary after federal, state, Social Security, and Medicare taxes. Includes all 50 US states.',
  keywords: [
    'take home pay calculator',
    'salary after tax',
    'net salary calculator',
    'paycheck calculator',
    'tax calculator',
    'income tax calculator',
    'salary calculator',
  ],
  authors: [{ name: 'TakeHomePay' }],
  creator: 'TakeHomePay',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://takehomepay.com',
    siteName: 'TakeHomePay',
    title: 'Take Home Pay Calculator | Free Salary After Tax Calculator 2024',
    description:
      'Free take home pay calculator for 2024. Calculate your net salary after federal, state, Social Security, and Medicare taxes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take Home Pay Calculator | Free Salary After Tax Calculator 2024',
    description:
      'Free take home pay calculator for 2024. Calculate your net salary after taxes.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <AdSenseScript publisherId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || ''} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
