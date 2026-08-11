import { Alert } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full space-y-3">
      <Alert title="Heads up">Your workspace will sleep after 30 minutes idle.</Alert>
      <Alert title="Deployed" color="green">Build 4821 is live in production.</Alert>
      <Alert title="Migration failed" color="red">
        Column `user_id` already exists. No changes were applied.
      </Alert>
      <Alert title="Quota at 90%" color="yellow">Consider upgrading before the reset.</Alert>
    </div>
  );
}
