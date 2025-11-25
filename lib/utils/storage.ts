import { SavedCalculation, SalaryInput, CalculationResult } from '../tax-calculators/types';

const STORAGE_KEY = 'takehomepay_calculations';
const PREFERENCES_KEY = 'takehomepay_preferences';

export interface UserPreferences {
  lastState: string;
  lastFilingStatus: string;
  lastPayFrequency: string;
  advancedMode: boolean;
}

const defaultPreferences: UserPreferences = {
  lastState: 'CA',
  lastFilingStatus: 'single',
  lastPayFrequency: 'biweekly',
  advancedMode: false,
};

export const getSavedCalculations = (): SavedCalculation[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCalculation = (
  name: string,
  input: SalaryInput,
  result: CalculationResult
): SavedCalculation => {
  const calculations = getSavedCalculations();

  const newCalc: SavedCalculation = {
    id: crypto.randomUUID(),
    name,
    input,
    result,
    createdAt: new Date().toISOString(),
  };

  calculations.unshift(newCalc);

  // Keep only last 20 calculations
  const trimmed = calculations.slice(0, 20);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  }

  return newCalc;
};

export const deleteCalculation = (id: string): void => {
  const calculations = getSavedCalculations();
  const filtered = calculations.filter(c => c.id !== id);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};

export const getPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') return defaultPreferences;

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
};

export const savePreferences = (prefs: Partial<UserPreferences>): void => {
  if (typeof window === 'undefined') return;

  const current = getPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
};
