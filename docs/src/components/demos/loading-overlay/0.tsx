import { useState } from "react";
import { Button, LoadingOverlay } from "@codellyson/justui/react";

function Demo() {
  const [busy, setBusy] = useState(false);
  return (
    <div className="w-full max-w-sm space-y-3">
      <Button size="xs" variant="outline" onClick={() => setBusy((v) => !v)}>
        {busy ? 'Stop' : 'Start'}
      </Button>
      <div className="relative rounded-lg border border-border p-4">
        <LoadingOverlay visible={busy} loaderProps={{ size: 'sm' }} />
        <div className="space-y-2">
          <p className="text-sm text-primary">acme-production</p>
          <p className="text-sm text-secondary">Try clicking the button below while loading.</p>
          <Button size="xs">Can't click me</Button>
        </div>
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
