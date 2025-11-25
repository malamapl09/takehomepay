import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Shield, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how our take home pay calculator works. We use 2024 federal and state tax rates to give you accurate net salary estimates.',
};

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          How It Works
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          About TakeHomePay
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A free, no-BS salary calculator that shows you exactly what you&apos;ll
          take home after taxes.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Calculator className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Accurate Calculations</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Uses official 2024 IRS tax brackets and state tax rates for all 50 US states.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Instant Results</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Real-time calculations as you type. No waiting, no page reloads.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Private & Secure</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            All calculations happen in your browser. We never store or transmit your salary data.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Globe className="h-10 w-10 text-primary mb-2" />
            <CardTitle>All 50 States</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Complete coverage of US state income taxes, including states with no income tax.
          </CardContent>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How We Calculate Your Take-Home Pay</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Start with Gross Salary</h3>
              <p className="text-muted-foreground">
                Enter your annual, monthly, or hourly salary. We convert everything to annual amounts for consistent calculations.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Apply Pre-Tax Deductions</h3>
              <p className="text-muted-foreground">
                If you enable Advanced Mode, we subtract 401(k) contributions, HSA contributions, and health insurance premiums from your gross income to get your Adjusted Gross Income (AGI).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Calculate Federal Income Tax</h3>
              <p className="text-muted-foreground">
                We apply the 2024 standard deduction based on your filing status, then calculate federal tax using the progressive tax brackets. Higher income portions are taxed at higher rates.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Calculate State Income Tax</h3>
              <p className="text-muted-foreground">
                We apply your state&apos;s tax rules. Some states have no income tax (like Texas and Florida), others have flat rates, and some have progressive brackets like California.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              5
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Add FICA Taxes</h3>
              <p className="text-muted-foreground">
                We add Social Security tax (6.2% up to $168,600) and Medicare tax (1.45% on all income, plus 0.9% additional on income over $200,000 for single filers).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              6
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Calculate Net Income</h3>
              <p className="text-muted-foreground">
                Your take-home pay is your gross salary minus all taxes and pre-tax deductions. We show you breakdowns by annual, monthly, bi-weekly, and weekly amounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2024 Tax Info */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">2024 Federal Tax Information</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Federal Tax Brackets (Single)</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Income Range</th>
                    <th className="text-right py-2">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-1">$0 - $11,600</td><td className="text-right">10%</td></tr>
                  <tr><td className="py-1">$11,600 - $47,150</td><td className="text-right">12%</td></tr>
                  <tr><td className="py-1">$47,150 - $100,525</td><td className="text-right">22%</td></tr>
                  <tr><td className="py-1">$100,525 - $191,950</td><td className="text-right">24%</td></tr>
                  <tr><td className="py-1">$191,950 - $243,725</td><td className="text-right">32%</td></tr>
                  <tr><td className="py-1">$243,725 - $609,350</td><td className="text-right">35%</td></tr>
                  <tr><td className="py-1">$609,350+</td><td className="text-right">37%</td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Standard Deductions (2024)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span>Single</span>
                <span className="font-semibold">$14,600</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Married Filing Jointly</span>
                <span className="font-semibold">$29,200</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Head of Household</span>
                <span className="font-semibold">$21,900</span>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">FICA Rates</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Social Security: 6.2% (up to $168,600)</p>
                  <p>Medicare: 1.45% (all income)</p>
                  <p>Additional Medicare: 0.9% (over $200k single)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/">
            Try the Calculator
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
