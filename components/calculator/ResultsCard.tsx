'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalculationResult } from '@/lib/tax-calculators/types';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

interface ResultsCardProps {
  result: CalculationResult | null;
}

export function ResultsCard({ result }: ResultsCardProps) {
  if (!result) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Take-Home Pay</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            Enter your salary to see results
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Your Take-Home Pay</CardTitle>
          <Badge variant="secondary" className="font-normal">
            {formatPercentage(result.effectiveTaxRate)} effective rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Net Salary Display */}
        <div className="text-center py-6 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Annual Net Income</p>
          <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {formatCurrency(result.netAnnual)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            after all taxes and deductions
          </p>
        </div>

        {/* Period Breakdown Tabs */}
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="annual">Annual</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="biweekly">Bi-Weekly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="annual" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Gross</p>
                <p className="text-xl font-semibold">
                  {formatCurrency(result.grossAnnual)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Net</p>
                <p className="text-xl font-semibold text-primary">
                  {formatCurrency(result.netAnnual)}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Gross</p>
                <p className="text-xl font-semibold">
                  {formatCurrency(result.grossAnnual / 12)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Net</p>
                <p className="text-xl font-semibold text-primary">
                  {formatCurrency(result.netMonthly)}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="biweekly" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Gross</p>
                <p className="text-xl font-semibold">
                  {formatCurrency(result.grossAnnual / 26)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Net</p>
                <p className="text-xl font-semibold text-primary">
                  {formatCurrency(result.netBiweekly)}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Gross</p>
                <p className="text-xl font-semibold">
                  {formatCurrency(result.grossAnnual / 52)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Net</p>
                <p className="text-xl font-semibold text-primary">
                  {formatCurrency(result.netWeekly)}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Total Taxes</p>
            <p className="text-lg font-semibold text-destructive">
              -{formatCurrency(result.totalTax)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Marginal Rate</p>
            <p className="text-lg font-semibold">
              {formatPercentage(result.marginalTaxRate)}
            </p>
          </div>
        </div>

        {result.totalDeductions > 0 && (
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Pre-Tax Deductions</p>
            <p className="text-lg font-semibold">
              -{formatCurrency(result.totalDeductions)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
