'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, TrendingDown, Minus, MapPin, DollarSign, Home, ShoppingCart, Zap, Car, Heart, Package } from 'lucide-react';
import {
  costOfLivingByState,
  calculateCOLAdjustedSalary,
  compareCOLCategories,
  type CostOfLivingData,
} from '@/lib/constants/cost-of-living';

interface CostOfLivingComparisonProps {
  currentSalary?: number;
  currentState?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Housing: <Home className="h-4 w-4" />,
  Groceries: <ShoppingCart className="h-4 w-4" />,
  Utilities: <Zap className="h-4 w-4" />,
  Transportation: <Car className="h-4 w-4" />,
  Healthcare: <Heart className="h-4 w-4" />,
  Miscellaneous: <Package className="h-4 w-4" />,
};

export function CostOfLivingComparison({
  currentSalary = 75000,
  currentState = 'TX',
}: CostOfLivingComparisonProps) {
  const [mounted, setMounted] = useState(false);
  const [fromState, setFromState] = useState(currentState);
  const [toState, setToState] = useState('CA');

  useEffect(() => {
    setMounted(true);
  }, []);

  const states = useMemo(() => {
    return Object.entries(costOfLivingByState)
      .map(([code, data]) => ({ code, name: data.state, index: data.overallIndex }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const comparison = useMemo(() => {
    return calculateCOLAdjustedSalary(currentSalary, fromState, toState);
  }, [currentSalary, fromState, toState]);

  const categoryComparison = useMemo(() => {
    return compareCOLCategories(fromState, toState);
  }, [fromState, toState]);

  const fromData = costOfLivingByState[fromState];
  const toData = costOfLivingByState[toState];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTrendIcon = (difference: number) => {
    if (difference > 0) return <TrendingUp className="h-4 w-4 text-destructive" />;
    if (difference < 0) return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getCOLBadgeVariant = (index: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (index < 95) return 'secondary';
    if (index > 110) return 'destructive';
    return 'outline';
  };

  const getCOLLabel = (index: number): string => {
    if (index < 90) return 'Very Low';
    if (index < 95) return 'Low';
    if (index < 105) return 'Average';
    if (index < 115) return 'High';
    return 'Very High';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Cost of Living Comparison
        </CardTitle>
        <CardDescription>
          Compare the cost of living between states and see how your salary translates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* State Selection */}
        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>From State</Label>
            {mounted ? (
              <Select value={fromState} onValueChange={setFromState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name} ({state.index.toFixed(1)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm animate-pulse" />
            )}
          </div>

          <div className="pb-2">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label>To State</Label>
            {mounted ? (
              <Select value={toState} onValueChange={setToState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name} ({state.index.toFixed(1)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm animate-pulse" />
            )}
          </div>
        </div>

        {/* Overall Index Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{fromData?.state}</span>
              <Badge variant={getCOLBadgeVariant(fromData?.overallIndex || 100)}>
                {getCOLLabel(fromData?.overallIndex || 100)}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{fromData?.overallIndex.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Cost of Living Index</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{toData?.state}</span>
              <Badge variant={getCOLBadgeVariant(toData?.overallIndex || 100)}>
                {getCOLLabel(toData?.overallIndex || 100)}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{toData?.overallIndex.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Cost of Living Index</p>
          </div>
        </div>

        {/* Salary Adjustment */}
        <div className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="font-medium">Salary Equivalence</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Salary</p>
              <p className="text-lg font-semibold">{formatCurrency(currentSalary)}</p>
              <p className="text-xs text-muted-foreground">in {fromData?.state}</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Equivalent Salary</p>
              <p className="text-lg font-semibold text-primary">
                {formatCurrency(comparison.adjustedSalary)}
              </p>
              <p className="text-xs text-muted-foreground">in {toData?.state}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            {getTrendIcon(comparison.percentageChange)}
            <span
              className={`text-sm font-medium ${
                comparison.percentageChange > 0
                  ? 'text-destructive'
                  : comparison.percentageChange < 0
                  ? 'text-green-600'
                  : 'text-muted-foreground'
              }`}
            >
              {comparison.percentageChange > 0 ? '+' : ''}
              {comparison.percentageChange}% cost of living
              {comparison.percentageChange > 0 ? ' increase' : comparison.percentageChange < 0 ? ' decrease' : ''}
            </span>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            To maintain the same purchasing power, you would need to earn{' '}
            <strong>{formatCurrency(comparison.adjustedSalary)}</strong> in {toData?.state}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Category Breakdown</h4>
          <div className="space-y-2">
            {categoryComparison.map((cat) => (
              <div
                key={cat.category}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {categoryIcons[cat.category]}
                  <span className="text-sm">{cat.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {cat.from.toFixed(1)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm w-12">{cat.to.toFixed(1)}</span>
                  <div className="flex items-center gap-1 w-20 justify-end">
                    {getTrendIcon(cat.difference)}
                    <span
                      className={`text-sm ${
                        cat.difference > 0
                          ? 'text-destructive'
                          : cat.difference < 0
                          ? 'text-green-600'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {cat.difference > 0 ? '+' : ''}
                      {cat.difference.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Index based on US Average = 100. Data sourced from Bureau of Economic Analysis and C2ER.
        </p>
      </CardContent>
    </Card>
  );
}
