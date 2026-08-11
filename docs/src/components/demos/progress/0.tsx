import { Progress } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Progress value={28} />
      <Progress value={62} color="green" />
      <Progress value={90} color="orange" />
      <Progress value={100} color="red" />
    </div>
  );
}
