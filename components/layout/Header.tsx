'use client';

import Link from 'next/link';
import { Calculator, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">TakeHomePay</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Calculator
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Compare
          </Link>
          <Link
            href="/saved"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Saved
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col py-4 gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculator
            </Link>
            <Link
              href="/compare"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Compare Salaries
            </Link>
            <Link
              href="/saved"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Saved Calculations
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
