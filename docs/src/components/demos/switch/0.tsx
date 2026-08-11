import { useState } from "react";
import { Label, Switch } from "@codellyson/justui/react";

function Demo() {
  const [on, setOn] = useState(true);
  return (
    <div className="space-y-4">
      <Switch label="Auto-deploy on push" description="Runs on every push to main." checked={on} onChange={setOn} />
      <Switch label="Label on the left" labelPosition="left" defaultChecked />
      <Switch label="Requires an upgraded plan" disabled />
      <p className="text-xs text-muted">Auto-deploy is {on ? 'enabled' : 'disabled'}.</p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
