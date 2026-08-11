import { Button, Popover } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {['top', 'right', 'bottom', 'left'].map((p) => (
        <Popover key={p} position={p}>
          <Popover.Target asChild>
            <Button size="xs" variant="secondary">{p}</Button>
          </Popover.Target>
          <Popover.Dropdown>Opens {p}</Popover.Dropdown>
        </Popover>
      ))}
    </div>
  );
}
