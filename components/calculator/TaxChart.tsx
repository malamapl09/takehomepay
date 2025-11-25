'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculationResult } from '@/lib/tax-calculators/types';
import { formatCurrency } from '@/lib/utils/formatters';

interface TaxChartProps {
  result: CalculationResult | null;
}

const COLORS = [
  'hsl(var(--chart-5))', // Net - Green
  'hsl(var(--chart-1))', // Federal - Blue
  'hsl(var(--chart-2))', // State - Teal
  'hsl(var(--chart-3))', // Social Security - Orange
  'hsl(var(--chart-4))', // Medicare - Purple
];

export function TaxChart({ result }: TaxChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!result) {
    return null;
  }

  const data = [
    {
      name: 'Take Home',
      value: result.netAnnual,
      color: COLORS[0],
    },
    {
      name: 'Federal Tax',
      value: result.federalTax,
      color: COLORS[1],
    },
    {
      name: 'State Tax',
      value: result.stateTax,
      color: COLORS[2],
    },
    {
      name: 'Social Security',
      value: result.socialSecurity,
      color: COLORS[3],
    },
    {
      name: 'Medicare',
      value: result.medicare,
      color: COLORS[4],
    },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: { name: string; value: number } }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / result.grossAnnual) * 100).toFixed(1);
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(data.value)} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Income Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading chart...</div>
            </div>
          )}
        </div>
        {renderLegend()}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You Keep</p>
            <p className="text-2xl font-bold text-primary">
              {((result.netAnnual / result.grossAnnual) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Goes to Taxes</p>
            <p className="text-2xl font-bold text-destructive">
              {((result.totalTax / result.grossAnnual) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
