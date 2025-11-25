# TakeHomePay

A comprehensive take-home pay calculator for all 50 US states. Calculate your net salary after federal, state, Social Security, and Medicare taxes.

## Features

- **All 50 US States** - Accurate tax calculations for every state including no-tax states (TX, FL, WA, etc.)
- **2024 Tax Rates** - Up-to-date federal tax brackets and state tax rates
- **Multiple Filing Statuses** - Single, Married Filing Jointly, Married Filing Separately, Head of Household
- **Pre-Tax Deductions** - 401(k), HSA, health insurance contributions
- **Salary Comparison** - Compare job offers across different states
- **Cost of Living Comparison** - Understand purchasing power differences between states
- **Salary Trends Visualization** - Interactive charts showing tax impact across salary ranges
- **Dark Mode** - Full dark/light theme support
- **State-Specific Pages** - SEO-optimized landing pages for each state (e.g., `/california`, `/texas`)
- **Save & Export** - Save calculations locally and export to PDF

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/malamapl09/takehomepay.git
cd takehomepay

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_BANNER_SLOT=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_INARTICLE_SLOT=XXXXXXXXXX

# Site URL (for sitemap)
NEXT_PUBLIC_SITE_URL=https://takehomepay.com
```

## Project Structure

```
takehomepay/
├── app/                          # Next.js App Router pages
│   ├── [state]/                  # Dynamic state pages (/california, /texas, etc.)
│   ├── compare/                  # Salary comparison page
│   ├── saved/                    # Saved calculations page
│   ├── about/                    # How it works page
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── robots.ts                # Robots.txt
│   └── layout.tsx               # Root layout with providers
├── components/
│   ├── calculator/              # Calculator components
│   │   ├── SalaryForm.tsx       # Main input form
│   │   ├── ResultsCard.tsx      # Results display
│   │   ├── TaxBreakdown.tsx     # Detailed tax breakdown
│   │   ├── TaxChart.tsx         # Pie chart visualization
│   │   ├── SalaryTrendsChart.tsx # Salary trends line charts
│   │   ├── CostOfLivingComparison.tsx # COL comparison
│   │   └── ComparisonView.tsx   # Side-by-side comparison
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header
│   │   └── Footer.tsx           # Site footer
│   ├── shared/                  # Shared components
│   │   ├── ExportButton.tsx     # PDF export
│   │   └── SaveButton.tsx       # Save calculation
│   ├── analytics/               # Analytics components
│   │   └── GoogleAnalytics.tsx  # GA4 integration
│   ├── ads/                     # Advertisement components
│   │   ├── AdSense.tsx          # AdSense script loader
│   │   └── AdSlot.tsx           # Ad slot components
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── tax-calculators/         # Tax calculation engine
│   │   ├── us/                  # US-specific calculations
│   │   │   ├── index.ts         # Main calculation function
│   │   │   ├── federal.ts       # Federal tax calculation
│   │   │   └── states/          # State tax configurations
│   │   └── types.ts             # TypeScript types
│   ├── constants/               # Static data
│   │   ├── tax-brackets-2024.ts # Federal tax brackets
│   │   ├── states.ts            # State information
│   │   └── cost-of-living.ts    # COL indices
│   └── utils/                   # Utility functions
│       └── formatters.ts        # Number/currency formatting
└── content/
    └── seo/                     # SEO content
        └── faq.ts               # FAQ schema markup
```

## Tax Calculations

### Federal Taxes
- Progressive tax brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%)
- Standard deduction applied based on filing status
- 2024 tax brackets from IRS

### FICA Taxes
- Social Security: 6.2% up to $168,600 wage base
- Medicare: 1.45% on all earnings
- Additional Medicare: 0.9% on earnings over $200,000 (single)

### State Taxes
- **No Income Tax**: AK, FL, NV, NH, SD, TN, TX, WA, WY
- **Flat Tax**: AZ, CO, GA, ID, IL, IN, IA, KY, MA, MI, MS, NC, PA, UT
- **Progressive Tax**: All other states with graduated brackets

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## SEO Features

- Dynamic sitemap (`/sitemap.xml`) with all pages including state pages
- Robots.txt configuration
- FAQ Schema markup for rich snippets
- WebApplication Schema markup
- Dynamic meta tags for each state page
- Open Graph and Twitter Card support

## Analytics & Monetization

### Google Analytics 4
Pre-configured event tracking for:
- Calculation completions
- Comparison views
- Save/export actions
- State page views

### Google AdSense
Ready-to-use ad components:
- `BannerAd` - Horizontal banner ads
- `SidebarAd` - 300x250 rectangle ads
- `InArticleAd` - Native in-content ads
- `ResponsiveAd` - Auto-sizing ads

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

```bash
npm install -g vercel
vercel
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This calculator is provided for informational purposes only and should not be construed as tax, legal, or financial advice. Tax calculations are estimates based on 2024 federal and state tax rates and the standard deduction. Your actual tax liability may vary. Always consult with a qualified tax professional for personalized advice.
