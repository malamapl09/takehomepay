'use client';

import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalculationResult } from '@/lib/tax-calculators/types';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

interface ComparisonViewProps {
  result1: CalculationResult | null;
  result2: CalculationResult | null;
  label1?: string;
  label2?: string;
}

export function ComparisonView({
  result1,
  result2,
  label1 = 'Salary A',
  label2 = 'Salary B',
}: ComparisonViewProps) {
  if (!result1 || !result2) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">
            Enter both salaries to compare
          </p>
        </CardContent>
      </Card>
    );
  }

  const netDifference = result2.netAnnual - result1.netAnnual;
  const netPercentDiff = result1.netAnnual > 0
    ? (netDifference / result1.netAnnual) * 100
    : 0;
  const taxDifference = result2.totalTax - result1.totalTax;
  const effectiveRateDiff = (result2.effectiveTaxRate - result1.effectiveTaxRate) * 100;

  const getBetterLabel = () => {
    if (netDifference > 0) {
      return { label: `${label2} is better`, variant: 'default' as const };
    } else if (netDifference < 0) {
      return { label: `${label1} is better`, variant: 'default' as const };
    }
    return { label: 'Equal', variant: 'secondary' as const };
  };

  const { label: winnerLabel, variant: winnerVariant } = getBetterLabel();

  return (
    <div className="space-y-6">
      {/* Winner Card */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommendation</p>
              <Badge variant={winnerVariant} className="text-lg px-4 py-1">
                {winnerLabel}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">
                Net Difference
              </p>
              <p className={`text-2xl font-bold ${netDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netDifference >= 0 ? '+' : ''}{formatCurrency(netDifference)}
              </p>
              <p className="text-sm text-muted-foreground">
                {netPercentDiff >= 0 ? '+' : ''}{netPercentDiff.toFixed(1)}% annually
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side by Side Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4">
            <span className="text-muted-foreground">{label1}</span>
            <ArrowRight className="h-5 w-5" />
            <span className="text-muted-foreground">{label2}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Gross Salary */}
            <ComparisonRow
              label="Gross Salary"
              value1={result1.grossAnnual}
              value2={result2.grossAnnual}
              format="currency"
            />

            {/* Federal Tax */}
            <ComparisonRow
              label="Federal Tax"
              value1={result1.federalTax}
              value2={result2.federalTax}
              format="currency"
              inverse
            />

            {/* State Tax */}
            <ComparisonRow
              label="State Tax"
              value1={result1.stateTax}
              value2={result2.stateTax}
              format="currency"
              inverse
            />

            {/* Social Security */}
            <ComparisonRow
              label="Social Security"
              value1={result1.socialSecurity}
              value2={result2.socialSecurity}
              format="currency"
              inverse
            />

            {/* Medicare */}
            <ComparisonRow
              label="Medicare"
              value1={result1.medicare}
              value2={result2.medicare}
              format="currency"
              inverse
            />

            {/* Total Taxes */}
            <ComparisonRow
              label="Total Taxes"
              value1={result1.totalTax}
              value2={result2.totalTax}
              format="currency"
              inverse
              highlight
            />

            {/* Effective Tax Rate */}
            <ComparisonRow
              label="Effective Tax Rate"
              value1={result1.effectiveTaxRate}
              value2={result2.effectiveTaxRate}
              format="percentage"
              inverse
            />

            <div className="border-t pt-4">
              {/* Net Annual */}
              <ComparisonRow
                label="Net Annual"
                value1={result1.netAnnual}
                value2={result2.netAnnual}
                format="currency"
                highlight
              />

              {/* Net Monthly */}
              <ComparisonRow
                label="Net Monthly"
                value1={result1.netMonthly}
                value2={result2.netMonthly}
                format="currency"
              />

              {/* Net Bi-Weekly */}
              <ComparisonRow
                label="Net Bi-Weekly"
                value1={result1.netBiweekly}
                value2={result2.netBiweekly}
                format="currency"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Monthly Difference</p>
            <p className={`text-xl font-bold ${netDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netDifference >= 0 ? '+' : ''}{formatCurrency(netDifference / 12)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Tax Difference</p>
            <p className={`text-xl font-bold ${taxDifference <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {taxDifference >= 0 ? '+' : ''}{formatCurrency(taxDifference)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Rate Difference</p>
            <p className={`text-xl font-bold ${effectiveRateDiff <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {effectiveRateDiff >= 0 ? '+' : ''}{effectiveRateDiff.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface ComparisonRowProps {
  label: string;
  value1: number;
  value2: number;
  format: 'currency' | 'percentage';
  inverse?: boolean; // Lower is better (for taxes)
  highlight?: boolean;
}

function ComparisonRow({
  label,
  value1,
  value2,
  format,
  inverse = false,
  highlight = false,
}: ComparisonRowProps) {
  const diff = value2 - value1;
  const isBetter = inverse ? diff < 0 : diff > 0;
  const isWorse = inverse ? diff > 0 : diff < 0;

  const formatValue = (v: number) =>
    format === 'currency' ? formatCurrency(v) : formatPercentage(v);

  return (
    <div
      className={`flex items-center justify-between py-2 ${
        highlight ? 'bg-muted/50 px-3 rounded-lg -mx-3' : ''
      }`}
    >
      <span className={`text-sm ${highlight ? 'font-medium' : 'text-muted-foreground'}`}>
        {label}
      </span>
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium w-24 text-right">
          {formatValue(value1)}
        </span>
        <div className="w-6 flex justify-center">
          {diff > 0.001 ? (
            <TrendingUp
              className={`h-4 w-4 ${isBetter ? 'text-green-600' : 'text-red-600'}`}
            />
          ) : diff < -0.001 ? (
            <TrendingDown
              className={`h-4 w-4 ${isWorse ? 'text-red-600' : 'text-green-600'}`}
            />
          ) : (
            <Minus className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <span className="text-sm font-medium w-24 text-right">
          {formatValue(value2)}
        </span>
      </div>
    </div>
  );
}
