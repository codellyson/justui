import { useState } from "react";
import { TagInput } from "@codellyson/justui/react";

function Demo() {
  const [tags, setTags] = useState(['react', 'radix']);
  return (
    <div className="w-full max-w-sm space-y-3">
      <TagInput label="Topics" value={tags} onChange={setTags} />
      <p className="text-xs text-muted">value: <code>{JSON.stringify(tags)}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
