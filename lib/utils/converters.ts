import { SalaryPeriod, PayFrequency } from '../tax-calculators/types';

const HOURS_PER_YEAR = 2080; // 40 hours/week * 52 weeks
const MONTHS_PER_YEAR = 12;

export const toAnnualSalary = (amount: number, period: SalaryPeriod): number => {
  switch (period) {
    case 'annual':
      return amount;
    case 'monthly':
      return amount * MONTHS_PER_YEAR;
    case 'hourly':
      return amount * HOURS_PER_YEAR;
    default:
      return amount;
  }
};

export const fromAnnualSalary = (annual: number, period: SalaryPeriod): number => {
  switch (period) {
    case 'annual':
      return annual;
    case 'monthly':
      return annual / MONTHS_PER_YEAR;
    case 'hourly':
      return annual / HOURS_PER_YEAR;
    default:
      return annual;
  }
};

export const getPayPeriodsPerYear = (frequency: PayFrequency): number => {
  switch (frequency) {
    case 'weekly':
      return 52;
    case 'biweekly':
      return 26;
    case 'semimonthly':
      return 24;
    case 'monthly':
      return 12;
    case 'annual':
      return 1;
    default:
      return 26; // Default to biweekly
  }
};

export const toPayPeriodAmount = (annual: number, frequency: PayFrequency): number => {
  return annual / getPayPeriodsPerYear(frequency);
};

export const annualToBreakdown = (annual: number) => ({
  annual,
  monthly: annual / 12,
  biweekly: annual / 26,
  weekly: annual / 52,
  daily: annual / 260, // Assume 260 working days
});
