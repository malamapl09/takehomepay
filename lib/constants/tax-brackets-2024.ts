import { TaxBracket, FilingStatus } from '../tax-calculators/types';

// 2024 Federal Tax Brackets
export const FEDERAL_BRACKETS_2024: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

// 2024 Standard Deductions
export const STANDARD_DEDUCTIONS_2024: Record<FilingStatus, number> = {
  single: 14600,
  married: 29200,
  head_of_household: 21900,
};

// FICA Tax Rates (2024)
export const FICA_2024 = {
  socialSecurity: {
    rate: 0.062, // 6.2%
    wageBase: 168600, // Maximum taxable earnings
  },
  medicare: {
    rate: 0.0145, // 1.45%
    additionalRate: 0.009, // 0.9% additional
    additionalThreshold: {
      single: 200000,
      married: 250000,
      head_of_household: 200000,
    },
  },
};

// Pre-tax deduction limits (2024)
export const DEDUCTION_LIMITS_2024 = {
  retirement401k: 23000, // Under 50
  retirement401k_catchup: 30500, // 50 and older
  hsa_single: 4150,
  hsa_family: 8300,
  hsa_catchup: 1000, // 55 and older additional
  fsa: 3200,
};
