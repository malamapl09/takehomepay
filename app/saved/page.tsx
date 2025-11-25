'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Calculator, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SavedCalculation } from '@/lib/tax-calculators/types';
import { getSavedCalculations, deleteCalculation } from '@/lib/utils/storage';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

export default function SavedPage() {
  const [calculations, setCalculations] = useState<SavedCalculation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCalculations(getSavedCalculations());
    setIsLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    deleteCalculation(id);
    setCalculations(getSavedCalculations());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isLoaded) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12">
        <Badge variant="secondary" className="mb-4">
          Your Calculations
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Saved Calculations
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          View and manage your saved salary calculations. All data is stored
          locally on your device.
        </p>
      </div>

      {/* Empty State */}
      {calculations.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved calculations</h3>
            <p className="text-muted-foreground text-center mb-6">
              Save a calculation from the main calculator to see it here.
            </p>
            <Button asChild>
              <Link href="/">
                Go to Calculator
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {calculations.map((calc) => (
            <Card key={calc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{calc.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(calc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(calc.createdAt)}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Gross</p>
                    <p className="font-semibold">
                      {formatCurrency(calc.result.grossAnnual)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-semibold">{calc.input.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax Rate</p>
                    <p className="font-semibold">
                      {formatPercentage(calc.result.effectiveTaxRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net</p>
                    <p className="font-semibold text-primary">
                      {formatCurrency(calc.result.netAnnual)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Federal</p>
                      <p>{formatCurrency(calc.result.federalTax)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">State</p>
                      <p>{formatCurrency(calc.result.stateTax)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SS</p>
                      <p>{formatCurrency(calc.result.socialSecurity)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Medicare</p>
                      <p>{formatCurrency(calc.result.medicare)}</p>
                    </div>
                  </div>
                </div>

                {calc.result.totalDeductions > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      Pre-tax deductions:{' '}
                      <span className="text-foreground">
                        {formatCurrency(calc.result.totalDeductions)}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Clear All Button */}
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => {
                if (confirm('Are you sure you want to delete all saved calculations?')) {
                  calculations.forEach(c => deleteCalculation(c.id));
                  setCalculations([]);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Calculations
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
