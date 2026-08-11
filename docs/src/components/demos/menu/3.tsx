import { Button, Menu } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {['top', 'right', 'bottom', 'left'].map((side) => (
        <Menu key={side}>
          <Menu.Target asChild>
            <Button size="xs" variant="secondary">{side}</Button>
          </Menu.Target>
          <Menu.Dropdown side={side}>
            <Menu.Item>Opens {side}</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ))}
    </div>
  );
}
