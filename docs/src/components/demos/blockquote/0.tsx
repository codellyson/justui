import { Blockquote } from "@codellyson/justui/react";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-lg space-y-4">
      <Blockquote>A plain pull quote.</Blockquote>
      <Blockquote variant="info" icon={<InformationCircleIcon />}>Deploys are immutable.</Blockquote>
      <Blockquote variant="warning" icon={<ExclamationTriangleIcon />}>This will drop the column.</Blockquote>
      <Blockquote variant="success" icon={<CheckCircleIcon />} cite="Release notes 4.2">
        Migrations now run in a transaction.
      </Blockquote>
    </div>
  );
}
