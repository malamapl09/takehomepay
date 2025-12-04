'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  SalaryInput,
  SalaryPeriod,
  FilingStatus,
  PayFrequency,
  PreTaxDeductions,
} from '@/lib/tax-calculators/types';
import { US_STATES } from '@/lib/constants/states';
import { DEDUCTION_LIMITS_2024 } from '@/lib/constants/tax-brackets-2024';
import { parseCurrencyInput, formatNumber } from '@/lib/utils/formatters';

interface SalaryFormProps {
  onCalculate: (input: SalaryInput) => void;
  initialValues?: Partial<SalaryInput>;
}

export function SalaryForm({ onCalculate, initialValues }: SalaryFormProps) {
  const [mounted, setMounted] = useState(false);
  const [salary, setSalary] = useState(initialValues?.grossSalary?.toString() || '75000');
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>(
    initialValues?.salaryPeriod || 'annual'
  );
  const [state, setState] = useState(initialValues?.state || 'CA');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    initialValues?.filingStatus || 'single'
  );
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(
    initialValues?.payFrequency || 'biweekly'
  );
  const [advancedMode, setAdvancedMode] = useState(false);
  const [deductionsOpen, setDeductionsOpen] = useState(false);
  const [deductions, setDeductions] = useState<PreTaxDeductions>(
    initialValues?.deductions || {
      retirement401k: 0,
      hsa: 0,
      healthInsurance: 0,
      other: 0,
    }
  );

  // Prevent hydration mismatch with Radix UI Select
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced calculation
  const triggerCalculation = useCallback(() => {
    const grossSalary = parseCurrencyInput(salary);
    if (grossSalary > 0) {
      onCalculate({
        grossSalary,
        salaryPeriod,
        state,
        filingStatus,
        payFrequency,
        deductions: advancedMode ? deductions : {
          retirement401k: 0,
          hsa: 0,
          healthInsurance: 0,
          other: 0,
        },
      });
    }
  }, [salary, salaryPeriod, state, filingStatus, payFrequency, deductions, advancedMode, onCalculate]);

  // Trigger calculation on any input change with debounce
  useEffect(() => {
    const timer = setTimeout(triggerCalculation, 150);
    return () => clearTimeout(timer);
  }, [triggerCalculation]);

  const handleSalaryChange = (value: string) => {
    // Remove non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    setSalary(cleaned);
  };

  const handleDeductionChange = (field: keyof PreTaxDeductions, value: string) => {
    const numValue = parseCurrencyInput(value);
    setDeductions(prev => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const formatSalaryDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return formatNumber(num);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Salary Details</span>
          <span className="text-xs font-normal text-muted-foreground bg-primary/10 px-2 py-1 rounded">
            2024 Tax Rates
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salary Input */}
        <div className="space-y-2">
          <Label htmlFor="salary">Gross Salary</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="salary"
              type="text"
              inputMode="decimal"
              value={formatSalaryDisplay(salary)}
              onChange={(e) => handleSalaryChange(e.target.value)}
              className="pl-7 text-lg font-medium"
              placeholder="75,000"
            />
          </div>
        </div>

        {/* Salary Period Toggle */}
        <div className="space-y-2">
          <Label>Salary Period</Label>
          <Tabs
            value={salaryPeriod}
            onValueChange={(v) => setSalaryPeriod(v as SalaryPeriod)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="annual">Annual</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* State Selection */}
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          {mounted ? (
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="state" className="w-full">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((s) => (
                  <SelectItem key={s.code} value={s.code}>
                    {s.name}
                    {!s.hasIncomeTax && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (No state tax)
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm animate-pulse" />
          )}
        </div>

        {/* Filing Status */}
        <div className="space-y-2">
          <Label htmlFor="filingStatus">Filing Status</Label>
          {mounted ? (
            <Select
              value={filingStatus}
              onValueChange={(v) => setFilingStatus(v as FilingStatus)}
            >
              <SelectTrigger id="filingStatus" className="w-full">
                <SelectValue placeholder="Select filing status" />
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

        {/* Pay Frequency */}
        <div className="space-y-2">
          <Label htmlFor="payFrequency">Pay Frequency</Label>
          {mounted ? (
            <Select
              value={payFrequency}
              onValueChange={(v) => setPayFrequency(v as PayFrequency)}
            >
              <SelectTrigger id="payFrequency" className="w-full">
                <SelectValue placeholder="Select pay frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly (52 paychecks)</SelectItem>
                <SelectItem value="biweekly">Bi-Weekly (26 paychecks)</SelectItem>
                <SelectItem value="semimonthly">Semi-Monthly (24 paychecks)</SelectItem>
                <SelectItem value="monthly">Monthly (12 paychecks)</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm animate-pulse" />
          )}
        </div>

        {/* Advanced Mode Toggle */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Label htmlFor="advancedMode" className="cursor-pointer">
              Advanced Mode
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Include pre-tax deductions like 401(k) and HSA</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="advancedMode"
            checked={advancedMode}
            onCheckedChange={setAdvancedMode}
          />
        </div>

        {/* Pre-tax Deductions (Collapsible) */}
        {advancedMode && (
          <Collapsible open={deductionsOpen} onOpenChange={setDeductionsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
              <span>Pre-Tax Deductions</span>
              {deductionsOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-2">
              {/* 401(k) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="401k">401(k) Contribution</Label>
                  <span className="text-xs text-muted-foreground">
                    Max: ${formatNumber(DEDUCTION_LIMITS_2024.retirement401k)}/yr
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="401k"
                    type="text"
                    inputMode="decimal"
                    value={deductions.retirement401k || ''}
                    onChange={(e) =>
                      handleDeductionChange('retirement401k', e.target.value)
                    }
                    className="pl-7"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* HSA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hsa">HSA Contribution</Label>
                  <span className="text-xs text-muted-foreground">
                    Max: ${formatNumber(DEDUCTION_LIMITS_2024.hsa_single)}/yr
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="hsa"
                    type="text"
                    inputMode="decimal"
                    value={deductions.hsa || ''}
                    onChange={(e) => handleDeductionChange('hsa', e.target.value)}
                    className="pl-7"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Health Insurance */}
              <div className="space-y-2">
                <Label htmlFor="healthInsurance">Health Insurance Premium</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="healthInsurance"
                    type="text"
                    inputMode="decimal"
                    value={deductions.healthInsurance || ''}
                    onChange={(e) =>
                      handleDeductionChange('healthInsurance', e.target.value)
                    }
                    className="pl-7"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    /year
                  </span>
                </div>
              </div>

              {/* Other Deductions */}
              <div className="space-y-2">
                <Label htmlFor="other">Other Pre-Tax Deductions</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="other"
                    type="text"
                    inputMode="decimal"
                    value={deductions.other || ''}
                    onChange={(e) => handleDeductionChange('other', e.target.value)}
                    className="pl-7"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    /year
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
