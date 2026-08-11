import { Loader } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-6">
      <Loader color="accent" />
      <Loader color="primary" />
      <Loader color="danger" />
      <span className="text-accent"><Loader color="current" /></span>
    </div>
  );
}
