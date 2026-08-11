import { Divider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex h-6 items-center gap-3 text-sm text-secondary">
      <span>Draft</span>
      <Divider orientation="vertical" />
      <span>Edited 2m ago</span>
      <Divider orientation="vertical" />
      <span>3 comments</span>
    </div>
  );
}
