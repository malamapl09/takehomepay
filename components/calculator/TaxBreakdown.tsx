'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalculationResult } from '@/lib/tax-calculators/types';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

interface TaxBreakdownProps {
  result: CalculationResult | null;
}

export function TaxBreakdown({ result }: TaxBreakdownProps) {
  if (!result) {
    return null;
  }

  const taxItems = result.breakdown.filter(item => item.amount > 0);
  const deductionItems = result.breakdown.filter(item => item.amount < 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tax Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Income Summary */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Gross Income</span>
            <span className="font-medium">{formatCurrency(result.grossAnnual)}</span>
          </div>
          {result.totalDeductions > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pre-Tax Deductions</span>
              <span className="font-medium text-amber-600">
                -{formatCurrency(result.totalDeductions)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Taxable Income</span>
            <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
          </div>
        </div>

        <Separator />

        {/* Tax Items */}
        <div className="space-y-3">
          {taxItems.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        index === 0
                          ? 'hsl(var(--chart-1))'
                          : index === 1
                          ? 'hsl(var(--chart-2))'
                          : index === 2
                          ? 'hsl(var(--chart-3))'
                          : 'hsl(var(--chart-4))',
                    }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="font-medium text-destructive">
                  -{formatCurrency(item.amount)}
                </span>
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground ml-5">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Taxes</span>
            <span className="font-bold text-destructive">
              -{formatCurrency(result.totalTax)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Effective Tax Rate</span>
            <span>{formatPercentage(result.effectiveTaxRate)}</span>
          </div>
        </div>

        <Separator />

        {/* Net Income */}
        <div className="flex justify-between items-center py-2 px-4 bg-primary/10 rounded-lg">
          <span className="font-semibold">Net Annual Income</span>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(result.netAnnual)}
          </span>
        </div>

        {/* Pre-tax Deductions Breakdown */}
        {deductionItems.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pre-Tax Deductions Applied
              </p>
              {deductionItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{item.name}</span>
                  <span className="text-amber-600">
                    {formatCurrency(Math.abs(item.amount))}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
