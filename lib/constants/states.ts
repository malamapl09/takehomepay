import { StateInfo } from '../tax-calculators/types';

export const US_STATES: StateInfo[] = [
  { code: 'AL', name: 'Alabama', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'AK', name: 'Alaska', hasIncomeTax: false, taxType: 'none' },
  { code: 'AZ', name: 'Arizona', hasIncomeTax: true, taxType: 'flat' },
  { code: 'AR', name: 'Arkansas', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'CA', name: 'California', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'CO', name: 'Colorado', hasIncomeTax: true, taxType: 'flat' },
  { code: 'CT', name: 'Connecticut', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'DE', name: 'Delaware', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'FL', name: 'Florida', hasIncomeTax: false, taxType: 'none' },
  { code: 'GA', name: 'Georgia', hasIncomeTax: true, taxType: 'flat' },
  { code: 'HI', name: 'Hawaii', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'ID', name: 'Idaho', hasIncomeTax: true, taxType: 'flat' },
  { code: 'IL', name: 'Illinois', hasIncomeTax: true, taxType: 'flat' },
  { code: 'IN', name: 'Indiana', hasIncomeTax: true, taxType: 'flat' },
  { code: 'IA', name: 'Iowa', hasIncomeTax: true, taxType: 'flat' },
  { code: 'KS', name: 'Kansas', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'KY', name: 'Kentucky', hasIncomeTax: true, taxType: 'flat' },
  { code: 'LA', name: 'Louisiana', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'ME', name: 'Maine', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'MD', name: 'Maryland', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'MA', name: 'Massachusetts', hasIncomeTax: true, taxType: 'flat' },
  { code: 'MI', name: 'Michigan', hasIncomeTax: true, taxType: 'flat' },
  { code: 'MN', name: 'Minnesota', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'MS', name: 'Mississippi', hasIncomeTax: true, taxType: 'flat' },
  { code: 'MO', name: 'Missouri', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'MT', name: 'Montana', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'NE', name: 'Nebraska', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'NV', name: 'Nevada', hasIncomeTax: false, taxType: 'none' },
  { code: 'NH', name: 'New Hampshire', hasIncomeTax: false, taxType: 'none' },
  { code: 'NJ', name: 'New Jersey', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'NM', name: 'New Mexico', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'NY', name: 'New York', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'NC', name: 'North Carolina', hasIncomeTax: true, taxType: 'flat' },
  { code: 'ND', name: 'North Dakota', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'OH', name: 'Ohio', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'OK', name: 'Oklahoma', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'OR', name: 'Oregon', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'PA', name: 'Pennsylvania', hasIncomeTax: true, taxType: 'flat' },
  { code: 'RI', name: 'Rhode Island', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'SC', name: 'South Carolina', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'SD', name: 'South Dakota', hasIncomeTax: false, taxType: 'none' },
  { code: 'TN', name: 'Tennessee', hasIncomeTax: false, taxType: 'none' },
  { code: 'TX', name: 'Texas', hasIncomeTax: false, taxType: 'none' },
  { code: 'UT', name: 'Utah', hasIncomeTax: true, taxType: 'flat' },
  { code: 'VT', name: 'Vermont', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'VA', name: 'Virginia', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'WA', name: 'Washington', hasIncomeTax: false, taxType: 'none' },
  { code: 'WV', name: 'West Virginia', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'WI', name: 'Wisconsin', hasIncomeTax: true, taxType: 'progressive' },
  { code: 'WY', name: 'Wyoming', hasIncomeTax: false, taxType: 'none' },
];

export const getStateByCode = (code: string): StateInfo | undefined => {
  return US_STATES.find(state => state.code === code);
};

export const getStateByName = (name: string): StateInfo | undefined => {
  return US_STATES.find(state => state.name.toLowerCase() === name.toLowerCase());
};

export const NO_TAX_STATES = US_STATES.filter(s => !s.hasIncomeTax).map(s => s.code);
