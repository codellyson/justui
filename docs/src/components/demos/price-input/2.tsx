import { PriceInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <PriceInput size="xs" currency="USD" />
      <PriceInput size="sm" currency="USD" />
      <PriceInput size="md" currency="USD" />
      <PriceInput size="lg" currency="USD" />
      <PriceInput label="Between 0 and 100" currency="USD" min={0} max={100} error="Out of range." />
    </div>
  );
}
