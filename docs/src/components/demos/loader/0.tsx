import { Loader } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-end gap-6">
      {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
        <div key={s} className="text-center">
          <Loader size={s} />
          <code className="mt-2 block font-mono text-xs text-muted">{s}</code>
        </div>
      ))}
    </div>
  );
}
