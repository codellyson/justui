import { Button, Tooltip, TooltipProvider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip label="Bold — ⌘B">
          <Button size="xs" variant="outline" aria-label="Bold">B</Button>
        </Tooltip>
        <Tooltip label="Italic — ⌘I">
          <Button size="xs" variant="outline" aria-label="Italic">I</Button>
        </Tooltip>
        <Tooltip label="Insert link — ⌘K">
          <Button size="xs" variant="outline" aria-label="Insert link">↗</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
