import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { StateCalculator } from '@/components/calculator/StateCalculator';
import { US_STATES } from '@/lib/constants/states';
import { Badge } from '@/components/ui/badge';
import { getStateTaxType, getStateFlatRate } from '@/lib/tax-calculators/us/states';
import { formatPercentage } from '@/lib/utils/formatters';

// Generate static params for all states
export function generateStaticParams() {
  return US_STATES.map((state) => ({
    state: state.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateInfo = US_STATES.find(
    (s) => s.name.toLowerCase().replace(/\s+/g, '-') === stateSlug
  );

  if (!stateInfo) {
    return { title: 'State Not Found' };
  }

  return {
    title: `${stateInfo.name} Take Home Pay Calculator | ${stateInfo.name} Salary After Tax`,
    description: `Calculate your take home pay in ${stateInfo.name}. Free ${stateInfo.name} salary calculator with 2024 federal and ${stateInfo.hasIncomeTax ? 'state income' : 'no state'} tax rates.`,
    keywords: [
      `${stateInfo.name} take home pay calculator`,
      `${stateInfo.name} salary calculator`,
      `${stateInfo.name} tax calculator`,
      `${stateInfo.name} net salary`,
      `${stateInfo.name} income tax`,
    ],
  };
}

interface StatePageProps {
  params: Promise<{ state: string }>;
}

export default async function StatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params;

  const stateInfo = US_STATES.find(
    (s) => s.name.toLowerCase().replace(/\s+/g, '-') === stateSlug
  );

  if (!stateInfo) {
    notFound();
  }

  const taxType = getStateTaxType(stateInfo.code);
  const flatRate = getStateFlatRate(stateInfo.code);

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12">
        <Badge variant="secondary" className="mb-4">
          {stateInfo.name} Tax Calculator
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {stateInfo.name} Take Home Pay Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate your net salary in {stateInfo.name} after federal and state taxes.
          {!stateInfo.hasIncomeTax && ` ${stateInfo.name} has no state income tax!`}
        </p>
      </div>

      {/* State Tax Info Banner */}
      <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex flex-wrap items-center justify-center gap-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground">State Tax Type</p>
            <p className="text-xl font-bold capitalize">
              {taxType === 'none' ? 'No Income Tax' : taxType}
            </p>
          </div>
          {taxType === 'flat' && flatRate && (
            <div>
              <p className="text-sm text-muted-foreground">Flat Tax Rate</p>
              <p className="text-xl font-bold">{formatPercentage(flatRate)}</p>
            </div>
          )}
          {taxType === 'none' && (
            <div>
              <p className="text-sm text-muted-foreground">Your Advantage</p>
              <p className="text-xl font-bold text-green-600">Keep More Money!</p>
            </div>
          )}
        </div>
      </div>

      {/* Client-side Calculator */}
      <StateCalculator stateCode={stateInfo.code} />

      {/* State-Specific SEO Content */}
      <section className="prose prose-slate dark:prose-invert max-w-none mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Understanding {stateInfo.name} Income Taxes
        </h2>

        <div className="grid md:grid-cols-2 gap-8 not-prose">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{stateInfo.name} Tax Overview</h3>
            <p className="text-muted-foreground">
              {stateInfo.hasIncomeTax ? (
                taxType === 'flat' ? (
                  `${stateInfo.name} has a flat income tax rate of ${flatRate ? formatPercentage(flatRate) : 'N/A'}. This means all taxable income is taxed at the same rate, regardless of how much you earn.`
                ) : (
                  `${stateInfo.name} uses a progressive income tax system with multiple tax brackets. Higher income portions are taxed at higher rates.`
                )
              ) : (
                `${stateInfo.name} is one of the nine states with no state income tax on wages. This can significantly increase your take-home pay compared to high-tax states like California or New York.`
              )}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What Taxes Apply in {stateInfo.name}?</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>Federal Income Tax (10% - 37%)</li>
              <li>Social Security (6.2% up to $168,600)</li>
              <li>Medicare (1.45% + 0.9% above $200k)</li>
              {stateInfo.hasIncomeTax ? (
                <li>{stateInfo.name} State Income Tax ({taxType})</li>
              ) : (
                <li className="text-green-600 font-medium">No State Income Tax!</li>
              )}
            </ul>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg not-prose">
          <h3 className="font-semibold mb-4">Compare {stateInfo.name} With Other States</h3>
          <p className="text-muted-foreground mb-4">
            Considering a move or job offer in another state? Use our comparison tool to see how your take-home pay would differ.
          </p>
          <a
            href="/compare"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            Compare Salaries Across States →
          </a>
        </div>
      </section>
    </div>
  );
}
