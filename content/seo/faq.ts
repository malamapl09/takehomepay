export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between gross and net salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gross salary is your total earnings before any deductions. Net salary (take-home pay) is what you actually receive after federal taxes, state taxes, Social Security, Medicare, and any other deductions are taken out.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do some states have no income tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nine states (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming) have no state income tax on wages. These states typically fund their budgets through other means like sales tax, property tax, or natural resource revenues.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is this calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our calculator uses official 2024 tax rates and brackets from the IRS and state tax authorities. However, it provides estimates based on the standard deduction and may not account for all personal circumstances. For precise tax planning, consult a qualified tax professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the standard deduction for 2024?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 2024, the standard deduction is $14,600 for single filers, $29,200 for married filing jointly, and $21,900 for head of household. This amount is subtracted from your income before calculating federal income tax.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do 401(k) contributions affect my take-home pay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional 401(k) contributions are made with pre-tax dollars, reducing your taxable income. While this lowers your immediate take-home pay, it also reduces your tax burden. The maximum 401(k) contribution for 2024 is $23,000 (or $30,500 if you are 50 or older).',
      },
    },
    {
      '@type': 'Question',
      name: 'What are FICA taxes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $168,600 in 2024) and Medicare tax (1.45% on all income, plus an additional 0.9% on income over $200,000 for single filers). These taxes fund Social Security retirement benefits and Medicare healthcare.',
      },
    },
  ],
};

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TakeHomePay Calculator',
  description:
    'Free take home pay calculator for 2024. Calculate your net salary after federal, state, Social Security, and Medicare taxes for all 50 US states.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Calculate take-home pay for all 50 US states',
    '2024 federal and state tax brackets',
    'Support for pre-tax deductions (401k, HSA)',
    'Compare two salaries side-by-side',
    'Export and save calculations',
  ],
};
