import { Button } from "@codellyson/justui/react";
import { ArrowPathIcon, ArrowUpRightIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button loading>Saving</Button>
        <Button variant="outline" loading>Saving</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button leftIcon={<ArrowPathIcon />}>Redeploy</Button>
        <Button variant="outline" rightIcon={<ArrowUpRightIcon />}>Open logs</Button>
      </div>
      <Button fullWidth>Full width</Button>
    </div>
  );
}
