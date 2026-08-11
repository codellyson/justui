import { Button, Divider, Label, Menu } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Menu>
      <Menu.Target asChild>
        <Button variant="outline">Actions</Button>
      </Menu.Target>
      <Menu.Dropdown align="start" width={220}>
        <Menu.Label>Project</Menu.Label>
        <Menu.Item rightSection="⌘R">Rename</Menu.Item>
        <Menu.Item rightSection="⌘D">Duplicate</Menu.Item>
        <Menu.Divider />
        <Menu.Item disabled>Transfer ownership</Menu.Item>
        <Menu.Item color="red">Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
