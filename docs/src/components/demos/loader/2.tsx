import { Button, Loader } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-4">
      <Loader size="sm" label="Fetching deploys" />
      <Button loading>Saving</Button>
    </div>
  );
}
