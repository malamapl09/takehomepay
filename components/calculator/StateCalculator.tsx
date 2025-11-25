'use client';

import { useState, useCallback, useEffect } from 'react';
import { SalaryForm } from '@/components/calculator/SalaryForm';
import { ResultsCard } from '@/components/calculator/ResultsCard';
import { TaxBreakdown } from '@/components/calculator/TaxBreakdown';
import { TaxChart } from '@/components/calculator/TaxChart';
import { ExportButton } from '@/components/shared/ExportButton';
import { SaveButton } from '@/components/shared/SaveButton';
import { SalaryInput, CalculationResult } from '@/lib/tax-calculators/types';
import { calculateNetSalary, createDefaultInput } from '@/lib/tax-calculators/us';

interface StateCalculatorProps {
  stateCode: string;
}

export function StateCalculator({ stateCode }: StateCalculatorProps) {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [currentInput, setCurrentInput] = useState<SalaryInput | null>(null);

  useEffect(() => {
    const defaultInput = {
      ...createDefaultInput(),
      state: stateCode,
    };
    setCurrentInput(defaultInput);
    setResult(calculateNetSalary(defaultInput));
  }, [stateCode]);

  const handleCalculate = useCallback((input: SalaryInput) => {
    const inputWithState = { ...input, state: stateCode };
    setCurrentInput(inputWithState);
    const calculationResult = calculateNetSalary(inputWithState);
    setResult(calculationResult);
  }, [stateCode]);

  return (
    <>
      {/* Calculator Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <SalaryForm
            onCalculate={handleCalculate}
            initialValues={{ state: stateCode }}
          />
        </div>

        <div className="space-y-6">
          <ResultsCard result={result} />
          {result && currentInput && (
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
    </>
  );
}
