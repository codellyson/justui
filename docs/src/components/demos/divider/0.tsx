import { Divider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-sm text-primary">Account</div>
      <Divider className="my-3" />
      <div className="text-sm text-secondary">Billing</div>
      <Divider className="my-3" />
      <div className="text-sm text-secondary">Members</div>
    </div>
  );
}
