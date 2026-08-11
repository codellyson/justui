import { Progress } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
        <Progress key={s} value={55} size={s} />
      ))}
      <Progress value={70} size={24} striped animated color="green" />
    </div>
  );
}
