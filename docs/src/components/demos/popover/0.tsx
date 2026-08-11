import { Button, Input, Popover } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Popover>
      <Popover.Target asChild>
        <Button variant="outline">Edit quota</Button>
      </Popover.Target>
      <Popover.Dropdown width={280}>
        <div className="space-y-3">
          <Input label="Monthly cap" defaultValue="500" size="sm" />
          <div className="flex justify-end gap-2">
            <Popover.Close asChild>
              <Button size="xs" variant="ghost" color="gray">Cancel</Button>
            </Popover.Close>
            <Popover.Close asChild>
              <Button size="xs">Save</Button>
            </Popover.Close>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
