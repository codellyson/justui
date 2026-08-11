import { Accordion } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Accordion defaultValue="build" className="w-full max-w-lg">
      <Accordion.Item value="build">
        <Accordion.Control>Why did my build fail?</Accordion.Control>
        <Accordion.Panel>
          Check the logs tab — the most common cause is a missing environment variable.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="deploy">
        <Accordion.Control>How do I roll back?</Accordion.Control>
        <Accordion.Panel>
          Every deploy is immutable, so promoting an older one is a rollback.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="quota">
        <Accordion.Control>What counts toward my quota?</Accordion.Control>
        <Accordion.Panel>Build minutes and outbound bandwidth.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
