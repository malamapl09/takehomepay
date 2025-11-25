import {
  SalaryInput,
  CalculationResult,
  TaxBreakdownItem,
  PreTaxDeductions,
} from '../types';
import { calculateFederalTax, getStandardDeduction } from './federal';
import { calculateFICA } from './fica';
import { calculateStateTax, getStateTaxType } from './states';
import { toAnnualSalary } from '../../utils/converters';

const calculateTotalPreTaxDeductions = (deductions: PreTaxDeductions): number => {
  return (
    deductions.retirement401k +
    deductions.hsa +
    deductions.healthInsurance +
    deductions.other
  );
};

export const calculateNetSalary = (input: SalaryInput): CalculationResult => {
  // Convert to annual salary
  const grossAnnual = toAnnualSalary(input.grossSalary, input.salaryPeriod);

  // Calculate total pre-tax deductions
  const totalDeductions = calculateTotalPreTaxDeductions(input.deductions);

  // Adjusted Gross Income (after pre-tax deductions)
  const adjustedGrossIncome = Math.max(0, grossAnnual - totalDeductions);

  // Calculate federal tax
  const federal = calculateFederalTax(grossAnnual, input.filingStatus, totalDeductions);

  // Calculate FICA (Social Security + Medicare) - based on gross, not AGI
  const fica = calculateFICA(grossAnnual, input.filingStatus);

  // Calculate state tax
  const standardDeduction = getStandardDeduction(input.filingStatus);
  const taxableIncomeForState = Math.max(0, adjustedGrossIncome - standardDeduction);
  const state = calculateStateTax(taxableIncomeForState, input.state, input.filingStatus);

  // Total taxes
  const totalTax = federal.tax + state.tax + fica.total;

  // Net income
  const netAnnual = grossAnnual - totalTax - totalDeductions;

  // Calculate effective tax rate (total tax / gross income)
  const effectiveTaxRate = grossAnnual > 0 ? totalTax / grossAnnual : 0;

  // Build breakdown
  const breakdown: TaxBreakdownItem[] = [
    {
      name: 'Federal Income Tax',
      amount: federal.tax,
      rate: federal.effectiveRate,
      description: `Marginal rate: ${(federal.marginalRate * 100).toFixed(0)}%`,
    },
    {
      name: 'State Income Tax',
      amount: state.tax,
      rate: state.effectiveRate,
      description: `${input.state} - ${getStateTaxType(input.state)}`,
    },
    {
      name: 'Social Security',
      amount: fica.socialSecurity,
      rate: fica.socialSecurity / grossAnnual,
      description: '6.2% up to $168,600',
    },
    {
      name: 'Medicare',
      amount: fica.medicare + fica.additionalMedicare,
      rate: (fica.medicare + fica.additionalMedicare) / grossAnnual,
      description: fica.additionalMedicare > 0
        ? '1.45% + 0.9% additional'
        : '1.45%',
    },
  ];

  // Add pre-tax deductions to breakdown if any
  if (totalDeductions > 0) {
    if (input.deductions.retirement401k > 0) {
      breakdown.push({
        name: '401(k) Contribution',
        amount: -input.deductions.retirement401k,
        rate: 0,
        description: 'Pre-tax retirement savings',
      });
    }
    if (input.deductions.hsa > 0) {
      breakdown.push({
        name: 'HSA Contribution',
        amount: -input.deductions.hsa,
        rate: 0,
        description: 'Health Savings Account',
      });
    }
    if (input.deductions.healthInsurance > 0) {
      breakdown.push({
        name: 'Health Insurance',
        amount: -input.deductions.healthInsurance,
        rate: 0,
        description: 'Pre-tax premium',
      });
    }
    if (input.deductions.other > 0) {
      breakdown.push({
        name: 'Other Deductions',
        amount: -input.deductions.other,
        rate: 0,
        description: 'Other pre-tax deductions',
      });
    }
  }

  return {
    grossAnnual,
    adjustedGrossIncome,
    taxableIncome: federal.taxableIncome,
    federalTax: federal.tax,
    stateTax: state.tax,
    socialSecurity: fica.socialSecurity,
    medicare: fica.medicare + fica.additionalMedicare,
    totalTax,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    netBiweekly: netAnnual / 26,
    netWeekly: netAnnual / 52,
    effectiveTaxRate,
    marginalTaxRate: federal.marginalRate,
    breakdown,
  };
};

// Helper to create default deductions
export const createDefaultDeductions = (): PreTaxDeductions => ({
  retirement401k: 0,
  hsa: 0,
  healthInsurance: 0,
  other: 0,
});

// Helper to create default input
export const createDefaultInput = (): SalaryInput => ({
  grossSalary: 75000,
  salaryPeriod: 'annual',
  state: 'CA',
  filingStatus: 'single',
  payFrequency: 'biweekly',
  deductions: createDefaultDeductions(),
});
