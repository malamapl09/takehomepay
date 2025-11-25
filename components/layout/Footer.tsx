import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">TakeHomePay</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              See your real take-home pay instantly with our free salary after-tax calculator.
            </p>
          </div>

          {/* Calculator */}
          <div>
            <h3 className="font-semibold mb-4">Calculator</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Salary Calculator
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  Compare Salaries
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-foreground transition-colors">
                  Saved Calculations
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://www.irs.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  IRS Website
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} TakeHomePay. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Tax calculations are estimates based on 2024 federal and state tax rates.
              Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
