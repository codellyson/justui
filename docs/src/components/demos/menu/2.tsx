import { useState } from "react";
import { Button, Divider, Label, Menu, RadioGroup } from "@codellyson/justui/react";

function Demo() {
  const [wrap, setWrap] = useState(true);
  const [minimap, setMinimap] = useState(false);
  const [density, setDensity] = useState('cosy');
  return (
    <div className="flex items-center gap-3">
      <Menu>
        <Menu.Target asChild>
          <Button variant="outline">View</Button>
        </Menu.Target>
        <Menu.Dropdown align="start" width={224}>
          <Menu.Label>Editor</Menu.Label>
          <Menu.CheckboxItem checked={wrap} onCheckedChange={setWrap}>Word wrap</Menu.CheckboxItem>
          <Menu.CheckboxItem checked={minimap} onCheckedChange={setMinimap}>Minimap</Menu.CheckboxItem>
          <Menu.Divider />
          <Menu.Label>Density</Menu.Label>
          <Menu.RadioGroup value={density} onValueChange={setDensity}>
            <Menu.RadioItem value="compact">Compact</Menu.RadioItem>
            <Menu.RadioItem value="cosy">Cosy</Menu.RadioItem>
            <Menu.RadioItem value="roomy">Roomy</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Dropdown>
      </Menu>
      <span className="text-xs text-muted">
        wrap: {String(wrap)} · minimap: {String(minimap)} · {density}
      </span>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
