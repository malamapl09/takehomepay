'use client';

import { useState, useCallback } from 'react';
import { SalaryForm } from '@/components/calculator/SalaryForm';
import { ResultsCard } from '@/components/calculator/ResultsCard';
import { TaxBreakdown } from '@/components/calculator/TaxBreakdown';
import { TaxChart } from '@/components/calculator/TaxChart';
import { SalaryTrendsChart } from '@/components/calculator/SalaryTrendsChart';
import { ExportButton } from '@/components/shared/ExportButton';
import { SaveButton } from '@/components/shared/SaveButton';
import { BannerAd, InArticleAd } from '@/components/ads';
import { SalaryInput, CalculationResult } from '@/lib/tax-calculators/types';
import { calculateNetSalary, createDefaultInput } from '@/lib/tax-calculators/us';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [result, setResult] = useState<CalculationResult | null>(() => {
    // Calculate initial result with default values
    const defaultInput = createDefaultInput();
    return calculateNetSalary(defaultInput);
  });
  const [currentInput, setCurrentInput] = useState<SalaryInput>(createDefaultInput());

  const handleCalculate = useCallback((input: SalaryInput) => {
    setCurrentInput(input);
    const calculationResult = calculateNetSalary(input);
    setResult(calculationResult);
  }, []);

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12">
        <Badge variant="secondary" className="mb-4">
          Updated for 2024 Tax Year
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Take Home Pay Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See your real take-home pay instantly. Calculate your net salary after federal,
          state, Social Security, and Medicare taxes.
        </p>
      </div>

      {/* Calculator Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <SalaryForm onCalculate={handleCalculate} />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <ResultsCard result={result} />

          {/* Action Buttons */}
          {result && (
            <div className="flex gap-4">
              <SaveButton input={currentInput} result={result} />
              <ExportButton input={currentInput} result={result} />
            </div>
          )}
        </div>
      </div>

      {/* Detailed Breakdown Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <TaxBreakdown result={result} />
        <TaxChart result={result} />
      </div>

      {/* Salary Trends Visualization */}
      <div className="mb-12">
        <SalaryTrendsChart
          currentSalary={currentInput.grossSalary}
          currentState={currentInput.state}
        />
      </div>

      {/* Ad Placement */}
      <InArticleAd />

      {/* SEO Content Section */}
      <section className="prose prose-slate dark:prose-invert max-w-none mt-16">
        <h2 className="text-2xl font-bold mb-6">
          How Our Take Home Pay Calculator Works
        </h2>

        <div className="grid md:grid-cols-2 gap-8 not-prose">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What is Take Home Pay?</h3>
            <p className="text-muted-foreground">
              Take home pay, also known as net pay or net salary, is the amount of money
              you actually receive in your paycheck after all deductions. This includes
              federal income tax, state income tax (if applicable), Social Security tax,
              and Medicare tax.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">How We Calculate Your Taxes</h3>
            <p className="text-muted-foreground">
              Our calculator uses the 2024 federal tax brackets and rates from the IRS,
              along with current state tax rates for all 50 US states. We apply the
              standard deduction based on your filing status to determine your taxable
              income.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Understanding FICA Taxes</h3>
            <p className="text-muted-foreground">
              FICA taxes include Social Security (6.2% on income up to $168,600) and
              Medicare (1.45% on all income, plus an additional 0.9% on income over
              $200,000 for single filers). These taxes fund retirement and healthcare
              benefits.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pre-Tax Deductions</h3>
            <p className="text-muted-foreground">
              Enable Advanced Mode to include pre-tax deductions like 401(k)
              contributions, HSA contributions, and health insurance premiums. These
              reduce your taxable income and can significantly increase your take-home
              pay.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12" id="faq">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6 not-prose">
            <details className="group border rounded-lg p-4">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                What is the difference between gross and net salary?
                <span className="transform group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">
                Gross salary is your total earnings before any deductions. Net salary
                (take-home pay) is what you actually receive after federal taxes, state
                taxes, Social Security, Medicare, and any other deductions are taken
                out.
              </p>
            </details>

            <details className="group border rounded-lg p-4">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                Why do some states have no income tax?
                <span className="transform group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">
                Nine states (Alaska, Florida, Nevada, New Hampshire, South Dakota,
                Tennessee, Texas, Washington, and Wyoming) have no state income tax on
                wages. These states typically fund their budgets through other means
                like sales tax, property tax, or natural resource revenues.
              </p>
            </details>

            <details className="group border rounded-lg p-4">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                How accurate is this calculator?
                <span className="transform group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">
                Our calculator uses official 2024 tax rates and brackets from the IRS
                and state tax authorities. However, it provides estimates based on the
                standard deduction and may not account for all personal circumstances.
                For precise tax planning, consult a qualified tax professional.
              </p>
            </details>

            <details className="group border rounded-lg p-4">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                What is the standard deduction for 2024?
                <span className="transform group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">
                For 2024, the standard deduction is $14,600 for single filers, $29,200
                for married filing jointly, and $21,900 for head of household. This
                amount is subtracted from your income before calculating federal income
                tax.
              </p>
            </details>

            <details className="group border rounded-lg p-4">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                How do 401(k) contributions affect my take-home pay?
                <span className="transform group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">
                Traditional 401(k) contributions are made with pre-tax dollars, reducing
                your taxable income. While this lowers your immediate take-home pay, it
                also reduces your tax burden. Use Advanced Mode in our calculator to see
                the impact of 401(k) contributions on your net pay.
              </p>
            </details>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg not-prose">
          <h3 className="font-semibold mb-2">Disclaimer</h3>
          <p className="text-sm text-muted-foreground">
            This calculator is provided for informational purposes only and should not
            be construed as tax, legal, or financial advice. Tax calculations are
            estimates based on 2024 federal and state tax rates and the standard
            deduction. Your actual tax liability may vary based on itemized deductions,
            tax credits, additional income sources, and other factors. Always consult
            with a qualified tax professional for personalized advice.
          </p>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <BannerAd className="mt-8" />
    </div>
  );
}
