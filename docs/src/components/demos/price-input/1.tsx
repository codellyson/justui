import { PriceInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <PriceInput label="USD only" currency="USD" withCurrencySelect={false} />
      <PriceInput label="Payout" currency="GBP" currencies={['GBP', 'EUR', 'USD']} />
    </div>
  );
}
