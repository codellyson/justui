import { useState } from "react";
import { Accordion } from "@codellyson/justui/react";
import { ChevronRightIcon } from "../../icons";

function Demo() {
  const [open, setOpen] = useState(['a']);
  return (
    <div className="w-full max-w-lg space-y-3">
      <Accordion multiple value={open} onChange={setOpen}>
        {['a', 'b', 'c'].map((v) => (
          <Accordion.Item key={v} value={v}>
            <Accordion.Control leftSection={<ChevronRightIcon />}>Section {v.toUpperCase()}</Accordion.Control>
            <Accordion.Panel>Body of section {v}.</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <p className="text-xs text-muted">open: <code>{open.join(', ') || 'none'}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
