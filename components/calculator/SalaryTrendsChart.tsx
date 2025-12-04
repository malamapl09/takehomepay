'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, DollarSign } from 'lucide-react';
import { calculateNetSalary } from '@/lib/tax-calculators/us';
import { US_STATES } from '@/lib/tax-calculators/us/states';
import { FilingStatus } from '@/lib/tax-calculators/types';

interface DataPoint {
  grossSalary: number;
  netSalary: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
}

interface SalaryTrendsChartProps {
  currentSalary?: number;
  currentState?: string;
}

export function SalaryTrendsChart({
  currentSalary = 75000,
  currentState = 'CA',
}: SalaryTrendsChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState(currentState);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([30000, 250000]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const states = useMemo(() => {
    return Object.entries(US_STATES)
      .map(([code, data]) => ({ code, name: data.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const chartData = useMemo(() => {
    const data: DataPoint[] = [];
    const step = (salaryRange[1] - salaryRange[0]) / 20; // 20 data points

    const defaultDeductions = {
      retirement401k: 0,
      hsa: 0,
      healthInsurance: 0,
      other: 0,
    };

    for (let salary = salaryRange[0]; salary <= salaryRange[1]; salary += step) {
      const result = calculateNetSalary({
        grossSalary: salary,
        state,
        filingStatus,
        payFrequency: 'annual',
        salaryPeriod: 'annual',
        deductions: defaultDeductions,
      });

      // Calculate marginal rate by checking tax on $1000 more
      const resultPlus = calculateNetSalary({
        grossSalary: salary + 1000,
        state,
        filingStatus,
        payFrequency: 'annual',
        salaryPeriod: 'annual',
        deductions: defaultDeductions,
      });
      const marginalTaxRate = ((salary + 1000 - resultPlus.netAnnual) - (salary - result.netAnnual)) / 10;

      data.push({
        grossSalary: Math.round(salary),
        netSalary: Math.round(result.netAnnual),
        effectiveTaxRate: Math.round(result.effectiveTaxRate * 10) / 10,
        marginalTaxRate: Math.min(Math.max(Math.round(marginalTaxRate * 10) / 10, 0), 60),
        federalTax: Math.round(result.federalTax),
        stateTax: Math.round(result.stateTax),
        ficaTax: Math.round(result.socialSecurity + result.medicare),
      });
    }

    return data;
  }, [state, filingStatus, salaryRange]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${Math.round(value / 1000)}k`;
    }
    return `$${value}`;
  };

  const formatPercent = (value: number) => `${value}%`;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: { value: number; name: string; color: string }[];
    label?: number;
  }) => {
    if (active && payload && payload.length) {
      const dataPoint = chartData.find((d) => d.grossSalary === label);
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">Gross: {formatCurrency(label || 0)}</p>
          <div className="space-y-1 text-sm">
            <p className="text-green-600">
              Net: {formatCurrency(dataPoint?.netSalary || 0)}
            </p>
            <p className="text-blue-600">
              Federal Tax: {formatCurrency(dataPoint?.federalTax || 0)}
            </p>
            <p className="text-purple-600">
              State Tax: {formatCurrency(dataPoint?.stateTax || 0)}
            </p>
            <p className="text-orange-600">
              FICA: {formatCurrency(dataPoint?.ficaTax || 0)}
            </p>
            <div className="border-t pt-1 mt-1">
              <p className="text-muted-foreground">
                Effective Rate: {dataPoint?.effectiveTaxRate}%
              </p>
              <p className="text-muted-foreground">
                Marginal Rate: {dataPoint?.marginalTaxRate}%
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Salary Trends Visualization
        </CardTitle>
        <CardDescription>
          See how your take-home pay scales with gross salary and understand tax brackets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>State</Label>
            {isMounted ? (
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.code} value={s.code}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm animate-pulse" />
            )}
          </div>

          <div className="space-y-2">
            <Label>Filing Status</Label>
            {isMounted ? (
              <Select
                value={filingStatus}
                onValueChange={(v) => setFilingStatus(v as FilingStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                  <SelectItem value="head_of_household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm animate-pulse" />
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Salary Range: {formatCurrency(salaryRange[0])} - {formatCurrency(salaryRange[1])}
            </Label>
            <Slider
              value={salaryRange}
              onValueChange={(v) => setSalaryRange(v as [number, number])}
              min={20000}
              max={500000}
              step={10000}
              className="mt-2"
            />
          </div>
        </div>

        {/* Net vs Gross Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Take-Home Pay vs Gross Salary
          </h4>
          <div className="h-[300px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="grossSalary"
                    tickFormatter={formatCurrency}
                    className="text-xs"
                  />
                  <YAxis tickFormatter={formatCurrency} className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine
                    x={currentSalary}
                    stroke="#888"
                    strokeDasharray="5 5"
                    label={{ value: 'You', position: 'top' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="grossSalary"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={false}
                    name="Gross Salary"
                  />
                  <Line
                    type="monotone"
                    dataKey="netSalary"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    name="Net Salary"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Loading chart...</p>
              </div>
            )}
          </div>
        </div>

        {/* Tax Rate Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Effective vs Marginal Tax Rate</h4>
          <div className="h-[250px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="grossSalary"
                    tickFormatter={formatCurrency}
                    className="text-xs"
                  />
                  <YAxis tickFormatter={formatPercent} domain={[0, 50]} className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine
                    x={currentSalary}
                    stroke="#888"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="effectiveTaxRate"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="Effective Tax Rate %"
                  />
                  <Line
                    type="monotone"
                    dataKey="marginalTaxRate"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Marginal Tax Rate %"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Loading chart...</p>
              </div>
            )}
          </div>
        </div>

        {/* Tax Breakdown Stacked Area would go here for more advanced viz */}
        <div className="p-4 rounded-lg bg-muted/30 text-sm text-muted-foreground">
          <p>
            <strong>Tip:</strong> The gap between gross and net salary shows your total tax burden.
            The marginal rate (red line) shows the tax rate on your next dollar earned - useful
            for understanding raises and bonuses. Your effective rate (blue line) is your overall
            average tax rate.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
