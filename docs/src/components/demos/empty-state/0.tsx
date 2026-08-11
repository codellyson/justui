import { EmptyState } from "@codellyson/justui/react";
import { ArchiveBoxIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <EmptyState
      icon={<ArchiveBoxIcon className="h-10 w-10" />}
      title="No projects yet"
      description="Create one to get a deploy URL, logs and a preview branch."
      primaryAction={{ label: 'Create project', onClick: () => {} }}
      secondaryAction={{ label: 'Import from Git', onClick: () => {} }}
    />
  );
}
