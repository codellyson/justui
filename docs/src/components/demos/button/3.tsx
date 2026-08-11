import { Button, Input, Select } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full space-y-3">
      {["xs", "sm", "md", "lg"].map((s) => (
        <div key={s} className="flex items-end gap-3">
          <Button size={s}>Save</Button>
          <Input size={s} placeholder={s} containerClassName="flex-1" />
          <Select size={s} placeholder={s} containerClassName="w-32"
            options={[{ label: "One", value: "1" }]} />
        </div>
      ))}
    </div>
  );
}
