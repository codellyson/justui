import { useState } from "react";
import { RadioGroup } from "@codellyson/justui/react";

function Demo() {
  const [plan, setPlan] = useState('team');
  return (
    <div className="w-full max-w-sm space-y-3">
      <RadioGroup
        label="Plan"
        value={plan}
        onChange={setPlan}
        options={[
          { value: 'free', label: 'Free', description: 'One project, community support.' },
          { value: 'team', label: 'Team', description: '$29 a month, five seats.' },
          { value: 'scale', label: 'Scale', description: 'Usage-based, SSO and audit logs.' },
          { value: 'legacy', label: 'Legacy', description: 'No longer offered.', disabled: true },
        ]}
      />
      <p className="text-xs text-muted">value: <code>{plan}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
