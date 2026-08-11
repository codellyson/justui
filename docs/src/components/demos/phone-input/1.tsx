import { PhoneInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <PhoneInput
        label="West Africa"
        countries={[
          { code: 'NG', name: 'Nigeria', dial: '+234', nationalLength: 10 },
          { code: 'GH', name: 'Ghana', dial: '+233', nationalLength: 9 },
          { code: 'SN', name: 'Senegal', dial: '+221', nationalLength: 9 },
        ]}
      />
      <PhoneInput label="Error state" error="Enter a valid number." />
    </div>
  );
}
