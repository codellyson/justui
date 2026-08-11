import { Button } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {['primary', 'gray', 'red', 'blue', 'green'].map((c) => (
          <Button key={c} color={c}>{c}</Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {['primary', 'gray', 'red', 'blue', 'green'].map((c) => (
          <Button key={c} variant="outline" color={c}>{c}</Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {['primary', 'gray', 'red', 'blue', 'green'].map((c) => (
          <Button key={c} variant="ghost" color={c}>{c}</Button>
        ))}
      </div>
    </div>
  );
}
