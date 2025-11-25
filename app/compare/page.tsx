'use client';

import { useState, useCallback } from 'react';
import { SalaryForm } from '@/components/calculator/SalaryForm';
import { ComparisonView } from '@/components/calculator/ComparisonView';
import { CostOfLivingComparison } from '@/components/calculator/CostOfLivingComparison';
import { SalaryInput, CalculationResult } from '@/lib/tax-calculators/types';
import { calculateNetSalary } from '@/lib/tax-calculators/us';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ComparePage() {
  const [result1, setResult1] = useState<CalculationResult | null>(null);
  const [result2, setResult2] = useState<CalculationResult | null>(null);
  const [input1, setInput1] = useState<SalaryInput | null>(null);
  const [input2, setInput2] = useState<SalaryInput | null>(null);

  const handleCalculate1 = useCallback((input: SalaryInput) => {
    setInput1(input);
    const calculationResult = calculateNetSalary(input);
    setResult1(calculationResult);
  }, []);

  const handleCalculate2 = useCallback((input: SalaryInput) => {
    setInput2(input);
    const calculationResult = calculateNetSalary(input);
    setResult2(calculationResult);
  }, []);

  const getLabel1 = () => {
    if (!input1) return 'Salary A';
    return `$${Math.round(input1.grossSalary / 1000)}k in ${input1.state}`;
  };

  const getLabel2 = () => {
    if (!input2) return 'Salary B';
    return `$${Math.round(input2.grossSalary / 1000)}k in ${input2.state}`;
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12">
        <Badge variant="secondary" className="mb-4">
          Compare Offers
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Compare Salaries
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Compare two job offers side-by-side. See which salary gives you more
          take-home pay after considering state taxes.
        </p>
      </div>

      {/* Two Column Form Layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-1">
                  Salary A
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryForm onCalculate={handleCalculate1} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-1">
                  Salary B
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryForm
                onCalculate={handleCalculate2}
                initialValues={{
                  grossSalary: 85000,
                  state: 'TX',
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comparison Results */}
      <ComparisonView
        result1={result1}
        result2={result2}
        label1={getLabel1()}
        label2={getLabel2()}
      />

      {/* Cost of Living Comparison */}
      <section className="mt-12">
        <CostOfLivingComparison
          currentSalary={input1?.grossSalary || 75000}
          currentState={input1?.state || 'TX'}
        />
      </section>

      {/* Tips Section */}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold">Tips for Comparing Job Offers</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consider State Taxes</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              A higher salary in California might result in less take-home pay
              than a lower salary in Texas due to state income tax differences.
              Always compare net salaries, not gross.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Look at the Full Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Take-home pay is important, but also consider cost of living,
              benefits, 401(k) matching, health insurance, and remote work
              flexibility when comparing offers.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">401(k) Impact</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Enable Advanced Mode to factor in 401(k) contributions. Higher
              contributions reduce taxable income and can change which offer is
              financially better.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cost of Living</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Remember that $100k in San Francisco has very different purchasing
              power than $100k in Austin. Research local costs before making
              decisions.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
