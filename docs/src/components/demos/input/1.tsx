import { useState } from "react";
import { Input } from "@codellyson/justui/react";

function Demo() {
  const [slug, setSlug] = useState('acme');
  const invalid = /\s/.test(slug);
  return (
    <div className="w-full max-w-sm space-y-2">
      <Input label="Slug" value={slug} onChange={setSlug} error={invalid && 'Must not contain spaces.'} />
      <p className="text-xs text-muted">value: <code>{slug || '(empty)'}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
