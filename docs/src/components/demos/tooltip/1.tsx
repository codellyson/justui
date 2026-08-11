import { Button, Tooltip, TooltipProvider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-wrap gap-3">
        {['top', 'right', 'bottom', 'left'].map((p) => (
          <Tooltip key={p} label={`Appears on the ${p}`} position={p} withArrow>
            <Button size="xs" variant="secondary">{p}</Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
