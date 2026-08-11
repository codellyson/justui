import { RadioGroup } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <RadioGroup
        size="md"
        label="Medium"
        defaultValue="a"
        options={[{ value: 'a', label: 'First' }, { value: 'b', label: 'Second' }]}
      />
      <RadioGroup
        size="lg"
        label="Large"
        defaultValue="a"
        options={[{ value: 'a', label: 'First' }, { value: 'b', label: 'Second' }]}
      />
      <RadioGroup
        label="Delivery"
        error="Pick a delivery speed."
        options={[{ value: 'std', label: 'Standard' }, { value: 'exp', label: 'Express' }]}
      />
      <RadioGroup
        label="Disabled"
        defaultValue="a"
        disabled
        options={[{ value: 'a', label: 'First' }, { value: 'b', label: 'Second' }]}
      />
    </div>
  );
}
