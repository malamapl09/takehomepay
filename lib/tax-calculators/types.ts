export type FilingStatus = 'single' | 'married' | 'head_of_household';
export type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annual';
export type SalaryPeriod = 'annual' | 'monthly' | 'hourly';

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface PreTaxDeductions {
  retirement401k: number;
  hsa: number;
  healthInsurance: number;
  other: number;
}

export interface SalaryInput {
  grossSalary: number;
  salaryPeriod: SalaryPeriod;
  state: string;
  filingStatus: FilingStatus;
  payFrequency: PayFrequency;
  deductions: PreTaxDeductions;
}

export interface TaxBreakdownItem {
  name: string;
  amount: number;
  rate: number;
  description?: string;
}

export interface CalculationResult {
  grossAnnual: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
  totalDeductions: number;
  netAnnual: number;
  netMonthly: number;
  netBiweekly: number;
  netWeekly: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  breakdown: TaxBreakdownItem[];
}

export interface StateInfo {
  code: string;
  name: string;
  hasIncomeTax: boolean;
  taxType: 'none' | 'flat' | 'progressive';
}

export interface SavedCalculation {
  id: string;
  name: string;
  input: SalaryInput;
  result: CalculationResult;
  createdAt: string;
}
