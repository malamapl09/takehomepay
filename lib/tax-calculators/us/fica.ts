import { FilingStatus } from '../types';
import { FICA_2024 } from '../../constants/tax-brackets-2024';

export interface FICAResult {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  total: number;
}

export const calculateFICA = (
  grossIncome: number,
  filingStatus: FilingStatus
): FICAResult => {
  // Social Security Tax (6.2% up to wage base limit)
  const ssWageBase = FICA_2024.socialSecurity.wageBase;
  const ssTaxableIncome = Math.min(grossIncome, ssWageBase);
  const socialSecurity = ssTaxableIncome * FICA_2024.socialSecurity.rate;

  // Medicare Tax (1.45% on all income)
  const medicare = grossIncome * FICA_2024.medicare.rate;

  // Additional Medicare Tax (0.9% on income over threshold)
  const additionalMedicareThreshold = FICA_2024.medicare.additionalThreshold[filingStatus];
  const additionalMedicareIncome = Math.max(0, grossIncome - additionalMedicareThreshold);
  const additionalMedicare = additionalMedicareIncome * FICA_2024.medicare.additionalRate;

  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  };
};

export const getSocialSecurityRate = (): number => FICA_2024.socialSecurity.rate;
export const getMedicareRate = (): number => FICA_2024.medicare.rate;
export const getSocialSecurityWageBase = (): number => FICA_2024.socialSecurity.wageBase;
