import { useState } from "react";
import { PriceInput } from "@codellyson/justui/react";

function Demo() {
  const [amount, setAmount] = useState(1500);
  const [currency, setCurrency] = useState('NGN');
  return (
    <div className="w-full max-w-sm space-y-3">
      <PriceInput
        label="Price"
        value={amount}
        onChange={setAmount}
        currency={currency}
        onCurrencyChange={setCurrency}
      />
      <p className="text-xs text-muted">
        {currency} · <code>{amount === null ? 'null' : String(amount)}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
