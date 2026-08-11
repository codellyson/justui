import { useState } from "react";
import { Button, Skeleton } from "@codellyson/justui/react";

function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full max-w-sm space-y-3">
      <Button size="xs" variant="outline" onClick={() => setLoading((v) => !v)}>
        {loading ? 'Show content' : 'Show skeleton'}
      </Button>
      {loading ? (
        <Skeleton className="h-9 w-full" />
      ) : (
        <div className="flex h-9 items-center rounded-md border border-border px-3 text-sm text-primary">
          acme-production
        </div>
      )}
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
