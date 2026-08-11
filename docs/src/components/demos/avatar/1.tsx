import { Avatar } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar src="https://example.invalid/nope.png" name="Ada Lovelace" />
      <Avatar src="https://example.invalid/nope.png" name="Bo Nguyen" fallback="?" />
    </div>
  );
}
