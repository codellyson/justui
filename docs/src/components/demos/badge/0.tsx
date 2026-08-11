import { Badge } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-3">
      {['light', 'solid', 'outline'].map((v) => (
        <div key={v} className="flex flex-wrap items-center gap-2">
          {['primary', 'gray', 'red', 'blue', 'green', 'orange', 'yellow'].map((c) => (
            <Badge key={c} variant={v} color={c}>{v}/{c}</Badge>
          ))}
        </div>
      ))}
    </div>
  );
}
