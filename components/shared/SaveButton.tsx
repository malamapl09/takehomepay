'use client';

import { useState } from 'react';
import { Bookmark, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SalaryInput, CalculationResult } from '@/lib/tax-calculators/types';
import { saveCalculation } from '@/lib/utils/storage';
import { formatCurrency } from '@/lib/utils/formatters';

interface SaveButtonProps {
  input: SalaryInput;
  result: CalculationResult;
}

export function SaveButton({ input, result }: SaveButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const calculationName = name || `${formatCurrency(result.grossAnnual)} in ${input.state}`;
    saveCalculation(calculationName, input, result);
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
      setName('');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          <Bookmark className="h-4 w-4 mr-2" />
          Save
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Calculation</DialogTitle>
          <DialogDescription>
            Save this calculation to access it later. Your calculations are stored
            locally on your device.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input
                id="name"
                placeholder={`${formatCurrency(result.grossAnnual)} in ${input.state}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gross Salary</span>
                <span>{formatCurrency(result.grossAnnual)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">State</span>
                <span>{input.state}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Net Salary</span>
                <span className="text-primary font-medium">
                  {formatCurrency(result.netAnnual)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={saved}>
            {saved ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-2" />
                Save Calculation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
