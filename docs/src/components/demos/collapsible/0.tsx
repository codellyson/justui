import { Badge, Collapsible } from "@codellyson/justui/react";
import { Cog6ToothIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-lg space-y-3">
      <Collapsible title="Advanced settings" badge={<Badge size="sm">3</Badge>}>
        <p>Build command, output directory, install command.</p>
      </Collapsible>
      <Collapsible title="Bordered" variant="bordered" icon={<Cog6ToothIcon />} defaultOpened>
        <p>Opens by default.</p>
      </Collapsible>
      <Collapsible title="Minimal, large" variant="minimal" size="lg">
        <p>No surface, just the control and the body.</p>
      </Collapsible>
      <Collapsible title="Disabled" disabled>
        <p>Unreachable.</p>
      </Collapsible>
    </div>
  );
}
