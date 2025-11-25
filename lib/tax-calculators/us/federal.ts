import { TaxBracket, FilingStatus } from '../types';
import { FEDERAL_BRACKETS_2024, STANDARD_DEDUCTIONS_2024 } from '../../constants/tax-brackets-2024';

export const calculateProgressiveTax = (income: number, brackets: TaxBracket[]): number => {
  if (income <= 0) return 0;

  let tax = 0;
  let remainingIncome = income;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }

  return tax;
};

export const getMarginalTaxRate = (income: number, brackets: TaxBracket[]): number => {
  if (income <= 0) return 0;

  for (const bracket of brackets) {
    if (income <= bracket.max) {
      return bracket.rate;
    }
  }

  // Return highest bracket rate if above all brackets
  return brackets[brackets.length - 1].rate;
};

export const calculateFederalTax = (
  grossIncome: number,
  filingStatus: FilingStatus,
  preTaxDeductions: number = 0
): {
  tax: number;
  taxableIncome: number;
  marginalRate: number;
  effectiveRate: number;
} => {
  // Calculate Adjusted Gross Income (AGI)
  const agi = Math.max(0, grossIncome - preTaxDeductions);

  // Apply standard deduction
  const standardDeduction = STANDARD_DEDUCTIONS_2024[filingStatus];
  const taxableIncome = Math.max(0, agi - standardDeduction);

  // Get brackets for filing status
  const brackets = FEDERAL_BRACKETS_2024[filingStatus];

  // Calculate tax
  const tax = calculateProgressiveTax(taxableIncome, brackets);
  const marginalRate = getMarginalTaxRate(taxableIncome, brackets);
  const effectiveRate = grossIncome > 0 ? tax / grossIncome : 0;

  return {
    tax,
    taxableIncome,
    marginalRate,
    effectiveRate,
  };
};

export const getFederalBrackets = (filingStatus: FilingStatus): TaxBracket[] => {
  return FEDERAL_BRACKETS_2024[filingStatus];
};

export const getStandardDeduction = (filingStatus: FilingStatus): number => {
  return STANDARD_DEDUCTIONS_2024[filingStatus];
};
