import { Alert } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full space-y-3">
      {['light', 'filled', 'outline'].map((v) => (
        <Alert key={v} variant={v} color="green" title={`variant="${v}"`}>
          Build 4821 is live.
        </Alert>
      ))}
    </div>
  );
}
