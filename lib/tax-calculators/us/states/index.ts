import { TaxBracket, FilingStatus } from '../../types';
import { calculateProgressiveTax } from '../federal';

// State tax configurations for 2024
// Data sourced from state tax authorities

type StateTaxConfig = {
  type: 'none' | 'flat' | 'progressive';
  rate?: number;
  brackets?: Record<FilingStatus, TaxBracket[]>;
  standardDeduction?: Record<FilingStatus, number>;
  personalExemption?: number;
};

const STATE_TAX_CONFIG: Record<string, StateTaxConfig> = {
  // No Income Tax States
  AK: { type: 'none' },
  FL: { type: 'none' },
  NV: { type: 'none' },
  NH: { type: 'none' }, // No tax on earned income (only dividends/interest)
  SD: { type: 'none' },
  TN: { type: 'none' }, // No tax on earned income
  TX: { type: 'none' },
  WA: { type: 'none' },
  WY: { type: 'none' },

  // Flat Tax States
  AZ: { type: 'flat', rate: 0.025 },
  CO: { type: 'flat', rate: 0.044 },
  GA: { type: 'flat', rate: 0.0549 },
  ID: { type: 'flat', rate: 0.058 },
  IL: { type: 'flat', rate: 0.0495 },
  IN: { type: 'flat', rate: 0.0315 },
  IA: { type: 'flat', rate: 0.038 },
  KY: { type: 'flat', rate: 0.04 },
  MA: { type: 'flat', rate: 0.05 },
  MI: { type: 'flat', rate: 0.0425 },
  MS: { type: 'flat', rate: 0.047 },
  NC: { type: 'flat', rate: 0.0525 },
  PA: { type: 'flat', rate: 0.0307 },
  UT: { type: 'flat', rate: 0.0465 },

  // Progressive Tax States (with full bracket data)
  AL: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: Infinity, rate: 0.05 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 6000, rate: 0.04 },
        { min: 6000, max: Infinity, rate: 0.05 },
      ],
      head_of_household: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: Infinity, rate: 0.05 },
      ],
    },
    standardDeduction: { single: 2500, married: 7500, head_of_household: 2500 },
  },

  AR: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 4300, rate: 0.02 },
        { min: 4300, max: 8500, rate: 0.04 },
        { min: 8500, max: Infinity, rate: 0.044 },
      ],
      married: [
        { min: 0, max: 4300, rate: 0.02 },
        { min: 4300, max: 8500, rate: 0.04 },
        { min: 8500, max: Infinity, rate: 0.044 },
      ],
      head_of_household: [
        { min: 0, max: 4300, rate: 0.02 },
        { min: 4300, max: 8500, rate: 0.04 },
        { min: 8500, max: Infinity, rate: 0.044 },
      ],
    },
    standardDeduction: { single: 2270, married: 4540, head_of_household: 2270 },
  },

  CA: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 10412, rate: 0.01 },
        { min: 10412, max: 24684, rate: 0.02 },
        { min: 24684, max: 38959, rate: 0.04 },
        { min: 38959, max: 54081, rate: 0.06 },
        { min: 54081, max: 68350, rate: 0.08 },
        { min: 68350, max: 349137, rate: 0.093 },
        { min: 349137, max: 418961, rate: 0.103 },
        { min: 418961, max: 698271, rate: 0.113 },
        { min: 698271, max: Infinity, rate: 0.123 },
      ],
      married: [
        { min: 0, max: 20824, rate: 0.01 },
        { min: 20824, max: 49368, rate: 0.02 },
        { min: 49368, max: 77918, rate: 0.04 },
        { min: 77918, max: 108162, rate: 0.06 },
        { min: 108162, max: 136700, rate: 0.08 },
        { min: 136700, max: 698274, rate: 0.093 },
        { min: 698274, max: 837922, rate: 0.103 },
        { min: 837922, max: 1396542, rate: 0.113 },
        { min: 1396542, max: Infinity, rate: 0.123 },
      ],
      head_of_household: [
        { min: 0, max: 20839, rate: 0.01 },
        { min: 20839, max: 49371, rate: 0.02 },
        { min: 49371, max: 63644, rate: 0.04 },
        { min: 63644, max: 78765, rate: 0.06 },
        { min: 78765, max: 93037, rate: 0.08 },
        { min: 93037, max: 474824, rate: 0.093 },
        { min: 474824, max: 569790, rate: 0.103 },
        { min: 569790, max: 949649, rate: 0.113 },
        { min: 949649, max: Infinity, rate: 0.123 },
      ],
    },
    standardDeduction: { single: 5363, married: 10726, head_of_household: 10726 },
  },

  CT: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.02 },
        { min: 10000, max: 50000, rate: 0.045 },
        { min: 50000, max: 100000, rate: 0.055 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 250000, rate: 0.065 },
        { min: 250000, max: 500000, rate: 0.069 },
        { min: 500000, max: Infinity, rate: 0.0699 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.02 },
        { min: 20000, max: 100000, rate: 0.045 },
        { min: 100000, max: 200000, rate: 0.055 },
        { min: 200000, max: 400000, rate: 0.06 },
        { min: 400000, max: 500000, rate: 0.065 },
        { min: 500000, max: 1000000, rate: 0.069 },
        { min: 1000000, max: Infinity, rate: 0.0699 },
      ],
      head_of_household: [
        { min: 0, max: 16000, rate: 0.02 },
        { min: 16000, max: 80000, rate: 0.045 },
        { min: 80000, max: 160000, rate: 0.055 },
        { min: 160000, max: 320000, rate: 0.06 },
        { min: 320000, max: 400000, rate: 0.065 },
        { min: 400000, max: 800000, rate: 0.069 },
        { min: 800000, max: Infinity, rate: 0.0699 },
      ],
    },
  },

  DE: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
      head_of_household: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
    },
    standardDeduction: { single: 3250, married: 6500, head_of_household: 3250 },
  },

  HI: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 2400, rate: 0.014 },
        { min: 2400, max: 4800, rate: 0.032 },
        { min: 4800, max: 9600, rate: 0.055 },
        { min: 9600, max: 14400, rate: 0.064 },
        { min: 14400, max: 19200, rate: 0.068 },
        { min: 19200, max: 24000, rate: 0.072 },
        { min: 24000, max: 36000, rate: 0.076 },
        { min: 36000, max: 48000, rate: 0.079 },
        { min: 48000, max: 150000, rate: 0.0825 },
        { min: 150000, max: 175000, rate: 0.09 },
        { min: 175000, max: 200000, rate: 0.10 },
        { min: 200000, max: Infinity, rate: 0.11 },
      ],
      married: [
        { min: 0, max: 4800, rate: 0.014 },
        { min: 4800, max: 9600, rate: 0.032 },
        { min: 9600, max: 19200, rate: 0.055 },
        { min: 19200, max: 28800, rate: 0.064 },
        { min: 28800, max: 38400, rate: 0.068 },
        { min: 38400, max: 48000, rate: 0.072 },
        { min: 48000, max: 72000, rate: 0.076 },
        { min: 72000, max: 96000, rate: 0.079 },
        { min: 96000, max: 300000, rate: 0.0825 },
        { min: 300000, max: 350000, rate: 0.09 },
        { min: 350000, max: 400000, rate: 0.10 },
        { min: 400000, max: Infinity, rate: 0.11 },
      ],
      head_of_household: [
        { min: 0, max: 3600, rate: 0.014 },
        { min: 3600, max: 7200, rate: 0.032 },
        { min: 7200, max: 14400, rate: 0.055 },
        { min: 14400, max: 21600, rate: 0.064 },
        { min: 21600, max: 28800, rate: 0.068 },
        { min: 28800, max: 36000, rate: 0.072 },
        { min: 36000, max: 54000, rate: 0.076 },
        { min: 54000, max: 72000, rate: 0.079 },
        { min: 72000, max: 225000, rate: 0.0825 },
        { min: 225000, max: 262500, rate: 0.09 },
        { min: 262500, max: 300000, rate: 0.10 },
        { min: 300000, max: Infinity, rate: 0.11 },
      ],
    },
    standardDeduction: { single: 2200, married: 4400, head_of_household: 3212 },
  },

  KS: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: Infinity, rate: 0.057 },
      ],
      married: [
        { min: 0, max: 30000, rate: 0.031 },
        { min: 30000, max: 60000, rate: 0.0525 },
        { min: 60000, max: Infinity, rate: 0.057 },
      ],
      head_of_household: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: Infinity, rate: 0.057 },
      ],
    },
    standardDeduction: { single: 3500, married: 8000, head_of_household: 6000 },
  },

  LA: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: Infinity, rate: 0.0425 },
      ],
      married: [
        { min: 0, max: 25000, rate: 0.0185 },
        { min: 25000, max: 100000, rate: 0.035 },
        { min: 100000, max: Infinity, rate: 0.0425 },
      ],
      head_of_household: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: Infinity, rate: 0.0425 },
      ],
    },
  },

  ME: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 24500, rate: 0.058 },
        { min: 24500, max: 58050, rate: 0.0675 },
        { min: 58050, max: Infinity, rate: 0.0715 },
      ],
      married: [
        { min: 0, max: 49050, rate: 0.058 },
        { min: 49050, max: 116100, rate: 0.0675 },
        { min: 116100, max: Infinity, rate: 0.0715 },
      ],
      head_of_household: [
        { min: 0, max: 36750, rate: 0.058 },
        { min: 36750, max: 87100, rate: 0.0675 },
        { min: 87100, max: Infinity, rate: 0.0715 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head_of_household: 21900 },
  },

  MD: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: Infinity, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: Infinity, rate: 0.0575 },
      ],
      head_of_household: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: Infinity, rate: 0.0575 },
      ],
    },
    standardDeduction: { single: 2550, married: 5100, head_of_household: 2550 },
  },

  MN: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 31690, rate: 0.0535 },
        { min: 31690, max: 104090, rate: 0.068 },
        { min: 104090, max: 183340, rate: 0.0785 },
        { min: 183340, max: Infinity, rate: 0.0985 },
      ],
      married: [
        { min: 0, max: 46330, rate: 0.0535 },
        { min: 46330, max: 184040, rate: 0.068 },
        { min: 184040, max: 321450, rate: 0.0785 },
        { min: 321450, max: Infinity, rate: 0.0985 },
      ],
      head_of_household: [
        { min: 0, max: 39010, rate: 0.0535 },
        { min: 39010, max: 156570, rate: 0.068 },
        { min: 156570, max: 256880, rate: 0.0785 },
        { min: 256880, max: Infinity, rate: 0.0985 },
      ],
    },
    standardDeduction: { single: 14575, married: 29150, head_of_household: 21863 },
  },

  MO: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 1207, rate: 0.02 },
        { min: 1207, max: 2414, rate: 0.025 },
        { min: 2414, max: 3621, rate: 0.03 },
        { min: 3621, max: 4828, rate: 0.035 },
        { min: 4828, max: 6035, rate: 0.04 },
        { min: 6035, max: 7242, rate: 0.045 },
        { min: 7242, max: 8449, rate: 0.048 },
        { min: 8449, max: Infinity, rate: 0.0495 },
      ],
      married: [
        { min: 0, max: 1207, rate: 0.02 },
        { min: 1207, max: 2414, rate: 0.025 },
        { min: 2414, max: 3621, rate: 0.03 },
        { min: 3621, max: 4828, rate: 0.035 },
        { min: 4828, max: 6035, rate: 0.04 },
        { min: 6035, max: 7242, rate: 0.045 },
        { min: 7242, max: 8449, rate: 0.048 },
        { min: 8449, max: Infinity, rate: 0.0495 },
      ],
      head_of_household: [
        { min: 0, max: 1207, rate: 0.02 },
        { min: 1207, max: 2414, rate: 0.025 },
        { min: 2414, max: 3621, rate: 0.03 },
        { min: 3621, max: 4828, rate: 0.035 },
        { min: 4828, max: 6035, rate: 0.04 },
        { min: 6035, max: 7242, rate: 0.045 },
        { min: 7242, max: 8449, rate: 0.048 },
        { min: 8449, max: Infinity, rate: 0.0495 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head_of_household: 21900 },
  },

  MT: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: Infinity, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 41000, rate: 0.047 },
        { min: 41000, max: Infinity, rate: 0.059 },
      ],
      head_of_household: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: Infinity, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 5540, married: 11080, head_of_household: 5540 },
  },

  NE: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 35730, rate: 0.0501 },
        { min: 35730, max: Infinity, rate: 0.0584 },
      ],
      married: [
        { min: 0, max: 7390, rate: 0.0246 },
        { min: 7390, max: 44350, rate: 0.0351 },
        { min: 44350, max: 71460, rate: 0.0501 },
        { min: 71460, max: Infinity, rate: 0.0584 },
      ],
      head_of_household: [
        { min: 0, max: 6860, rate: 0.0246 },
        { min: 6860, max: 33180, rate: 0.0351 },
        { min: 33180, max: 53600, rate: 0.0501 },
        { min: 53600, max: Infinity, rate: 0.0584 },
      ],
    },
    standardDeduction: { single: 7900, married: 15800, head_of_household: 11600 },
  },

  NJ: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
      head_of_household: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
    },
  },

  NM: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 5500, rate: 0.017 },
        { min: 5500, max: 11000, rate: 0.032 },
        { min: 11000, max: 16000, rate: 0.047 },
        { min: 16000, max: 210000, rate: 0.049 },
        { min: 210000, max: Infinity, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: Infinity, rate: 0.059 },
      ],
      head_of_household: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: Infinity, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head_of_household: 21900 },
  },

  NY: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 8500, rate: 0.04 },
        { min: 8500, max: 11700, rate: 0.045 },
        { min: 11700, max: 13900, rate: 0.0525 },
        { min: 13900, max: 80650, rate: 0.055 },
        { min: 80650, max: 215400, rate: 0.06 },
        { min: 215400, max: 1077550, rate: 0.0685 },
        { min: 1077550, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: Infinity, rate: 0.109 },
      ],
      married: [
        { min: 0, max: 17150, rate: 0.04 },
        { min: 17150, max: 23600, rate: 0.045 },
        { min: 23600, max: 27900, rate: 0.0525 },
        { min: 27900, max: 161550, rate: 0.055 },
        { min: 161550, max: 323200, rate: 0.06 },
        { min: 323200, max: 2155350, rate: 0.0685 },
        { min: 2155350, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: Infinity, rate: 0.109 },
      ],
      head_of_household: [
        { min: 0, max: 12800, rate: 0.04 },
        { min: 12800, max: 17650, rate: 0.045 },
        { min: 17650, max: 20900, rate: 0.0525 },
        { min: 20900, max: 107650, rate: 0.055 },
        { min: 107650, max: 269300, rate: 0.06 },
        { min: 269300, max: 1616450, rate: 0.0685 },
        { min: 1616450, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: Infinity, rate: 0.109 },
      ],
    },
    standardDeduction: { single: 8000, married: 16050, head_of_household: 11200 },
  },

  ND: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 44725, rate: 0.0 },
        { min: 44725, max: 225975, rate: 0.0195 },
        { min: 225975, max: Infinity, rate: 0.025 },
      ],
      married: [
        { min: 0, max: 74750, rate: 0.0 },
        { min: 74750, max: 275100, rate: 0.0195 },
        { min: 275100, max: Infinity, rate: 0.025 },
      ],
      head_of_household: [
        { min: 0, max: 59850, rate: 0.0 },
        { min: 59850, max: 250500, rate: 0.0195 },
        { min: 250500, max: Infinity, rate: 0.025 },
      ],
    },
  },

  OH: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: Infinity, rate: 0.035 },
      ],
      married: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: Infinity, rate: 0.035 },
      ],
      head_of_household: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: Infinity, rate: 0.035 },
      ],
    },
  },

  OK: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: Infinity, rate: 0.0475 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.0025 },
        { min: 2000, max: 5000, rate: 0.0075 },
        { min: 5000, max: 7500, rate: 0.0175 },
        { min: 7500, max: 9800, rate: 0.0275 },
        { min: 9800, max: 12200, rate: 0.0375 },
        { min: 12200, max: Infinity, rate: 0.0475 },
      ],
      head_of_household: [
        { min: 0, max: 2000, rate: 0.0025 },
        { min: 2000, max: 5000, rate: 0.0075 },
        { min: 5000, max: 7500, rate: 0.0175 },
        { min: 7500, max: 9800, rate: 0.0275 },
        { min: 9800, max: 12200, rate: 0.0375 },
        { min: 12200, max: Infinity, rate: 0.0475 },
      ],
    },
    standardDeduction: { single: 6350, married: 12700, head_of_household: 9350 },
  },

  OR: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 4300, rate: 0.0475 },
        { min: 4300, max: 10750, rate: 0.0675 },
        { min: 10750, max: 125000, rate: 0.0875 },
        { min: 125000, max: Infinity, rate: 0.099 },
      ],
      married: [
        { min: 0, max: 8600, rate: 0.0475 },
        { min: 8600, max: 21500, rate: 0.0675 },
        { min: 21500, max: 250000, rate: 0.0875 },
        { min: 250000, max: Infinity, rate: 0.099 },
      ],
      head_of_household: [
        { min: 0, max: 4300, rate: 0.0475 },
        { min: 4300, max: 10750, rate: 0.0675 },
        { min: 10750, max: 125000, rate: 0.0875 },
        { min: 125000, max: Infinity, rate: 0.099 },
      ],
    },
    standardDeduction: { single: 2605, married: 5210, head_of_household: 4195 },
  },

  RI: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 73450, rate: 0.0375 },
        { min: 73450, max: 166950, rate: 0.0475 },
        { min: 166950, max: Infinity, rate: 0.0599 },
      ],
      married: [
        { min: 0, max: 73450, rate: 0.0375 },
        { min: 73450, max: 166950, rate: 0.0475 },
        { min: 166950, max: Infinity, rate: 0.0599 },
      ],
      head_of_household: [
        { min: 0, max: 73450, rate: 0.0375 },
        { min: 73450, max: 166950, rate: 0.0475 },
        { min: 166950, max: Infinity, rate: 0.0599 },
      ],
    },
    standardDeduction: { single: 10550, married: 21100, head_of_household: 15825 },
  },

  SC: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 3200, rate: 0.0 },
        { min: 3200, max: 16040, rate: 0.03 },
        { min: 16040, max: Infinity, rate: 0.064 },
      ],
      married: [
        { min: 0, max: 3200, rate: 0.0 },
        { min: 3200, max: 16040, rate: 0.03 },
        { min: 16040, max: Infinity, rate: 0.064 },
      ],
      head_of_household: [
        { min: 0, max: 3200, rate: 0.0 },
        { min: 3200, max: 16040, rate: 0.03 },
        { min: 16040, max: Infinity, rate: 0.064 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head_of_household: 21900 },
  },

  VT: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 45400, rate: 0.0335 },
        { min: 45400, max: 110050, rate: 0.066 },
        { min: 110050, max: 229550, rate: 0.076 },
        { min: 229550, max: Infinity, rate: 0.0875 },
      ],
      married: [
        { min: 0, max: 75850, rate: 0.0335 },
        { min: 75850, max: 183400, rate: 0.066 },
        { min: 183400, max: 279450, rate: 0.076 },
        { min: 279450, max: Infinity, rate: 0.0875 },
      ],
      head_of_household: [
        { min: 0, max: 60550, rate: 0.0335 },
        { min: 60550, max: 146700, rate: 0.066 },
        { min: 146700, max: 236350, rate: 0.076 },
        { min: 236350, max: Infinity, rate: 0.0875 },
      ],
    },
    standardDeduction: { single: 7000, married: 14000, head_of_household: 10500 },
  },

  VA: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
      head_of_household: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
    },
    standardDeduction: { single: 8000, married: 16000, head_of_household: 8000 },
  },

  WV: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: Infinity, rate: 0.0512 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: Infinity, rate: 0.0512 },
      ],
      head_of_household: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: Infinity, rate: 0.0512 },
      ],
    },
  },

  WI: {
    type: 'progressive',
    brackets: {
      single: [
        { min: 0, max: 14320, rate: 0.035 },
        { min: 14320, max: 28640, rate: 0.044 },
        { min: 28640, max: 315310, rate: 0.053 },
        { min: 315310, max: Infinity, rate: 0.0765 },
      ],
      married: [
        { min: 0, max: 19090, rate: 0.035 },
        { min: 19090, max: 38190, rate: 0.044 },
        { min: 38190, max: 420420, rate: 0.053 },
        { min: 420420, max: Infinity, rate: 0.0765 },
      ],
      head_of_household: [
        { min: 0, max: 14320, rate: 0.035 },
        { min: 14320, max: 28640, rate: 0.044 },
        { min: 28640, max: 315310, rate: 0.053 },
        { min: 315310, max: Infinity, rate: 0.0765 },
      ],
    },
    standardDeduction: { single: 13230, married: 24480, head_of_household: 17430 },
  },
};

export const calculateStateTax = (
  taxableIncome: number,
  stateCode: string,
  filingStatus: FilingStatus
): { tax: number; effectiveRate: number } => {
  const config = STATE_TAX_CONFIG[stateCode];

  if (!config || config.type === 'none') {
    return { tax: 0, effectiveRate: 0 };
  }

  // Apply state standard deduction if available
  let adjustedIncome = taxableIncome;
  if (config.standardDeduction) {
    adjustedIncome = Math.max(0, taxableIncome - config.standardDeduction[filingStatus]);
  }

  let tax = 0;

  if (config.type === 'flat' && config.rate) {
    tax = adjustedIncome * config.rate;
  } else if (config.type === 'progressive' && config.brackets) {
    const brackets = config.brackets[filingStatus];
    tax = calculateProgressiveTax(adjustedIncome, brackets);
  }

  const effectiveRate = taxableIncome > 0 ? tax / taxableIncome : 0;

  return { tax, effectiveRate };
};

export const getStateTaxType = (stateCode: string): 'none' | 'flat' | 'progressive' => {
  const config = STATE_TAX_CONFIG[stateCode];
  return config?.type || 'none';
};

export const getStateFlatRate = (stateCode: string): number | null => {
  const config = STATE_TAX_CONFIG[stateCode];
  if (config?.type === 'flat' && config.rate) {
    return config.rate;
  }
  return null;
};

// State names and codes for UI/selects
export const US_STATES: Record<string, { name: string; code: string }> = {
  AL: { name: 'Alabama', code: 'AL' },
  AK: { name: 'Alaska', code: 'AK' },
  AZ: { name: 'Arizona', code: 'AZ' },
  AR: { name: 'Arkansas', code: 'AR' },
  CA: { name: 'California', code: 'CA' },
  CO: { name: 'Colorado', code: 'CO' },
  CT: { name: 'Connecticut', code: 'CT' },
  DE: { name: 'Delaware', code: 'DE' },
  FL: { name: 'Florida', code: 'FL' },
  GA: { name: 'Georgia', code: 'GA' },
  HI: { name: 'Hawaii', code: 'HI' },
  ID: { name: 'Idaho', code: 'ID' },
  IL: { name: 'Illinois', code: 'IL' },
  IN: { name: 'Indiana', code: 'IN' },
  IA: { name: 'Iowa', code: 'IA' },
  KS: { name: 'Kansas', code: 'KS' },
  KY: { name: 'Kentucky', code: 'KY' },
  LA: { name: 'Louisiana', code: 'LA' },
  ME: { name: 'Maine', code: 'ME' },
  MD: { name: 'Maryland', code: 'MD' },
  MA: { name: 'Massachusetts', code: 'MA' },
  MI: { name: 'Michigan', code: 'MI' },
  MN: { name: 'Minnesota', code: 'MN' },
  MS: { name: 'Mississippi', code: 'MS' },
  MO: { name: 'Missouri', code: 'MO' },
  MT: { name: 'Montana', code: 'MT' },
  NE: { name: 'Nebraska', code: 'NE' },
  NV: { name: 'Nevada', code: 'NV' },
  NH: { name: 'New Hampshire', code: 'NH' },
  NJ: { name: 'New Jersey', code: 'NJ' },
  NM: { name: 'New Mexico', code: 'NM' },
  NY: { name: 'New York', code: 'NY' },
  NC: { name: 'North Carolina', code: 'NC' },
  ND: { name: 'North Dakota', code: 'ND' },
  OH: { name: 'Ohio', code: 'OH' },
  OK: { name: 'Oklahoma', code: 'OK' },
  OR: { name: 'Oregon', code: 'OR' },
  PA: { name: 'Pennsylvania', code: 'PA' },
  RI: { name: 'Rhode Island', code: 'RI' },
  SC: { name: 'South Carolina', code: 'SC' },
  SD: { name: 'South Dakota', code: 'SD' },
  TN: { name: 'Tennessee', code: 'TN' },
  TX: { name: 'Texas', code: 'TX' },
  UT: { name: 'Utah', code: 'UT' },
  VT: { name: 'Vermont', code: 'VT' },
  VA: { name: 'Virginia', code: 'VA' },
  WA: { name: 'Washington', code: 'WA' },
  WV: { name: 'West Virginia', code: 'WV' },
  WI: { name: 'Wisconsin', code: 'WI' },
  WY: { name: 'Wyoming', code: 'WY' },
};
