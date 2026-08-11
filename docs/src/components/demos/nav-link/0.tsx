import { useState } from "react";
import { Badge, NavLink } from "@codellyson/justui/react";
import { ArchiveBoxIcon, ArrowPathIcon, DocumentTextIcon, HomeIcon } from "../../icons";

function Demo() {
  const [active, setActive] = useState('deployments');
  return (
    <div className="w-56 rounded-lg border border-border p-2">
      <div className="flex flex-col gap-1">
        <NavLink
          label="Overview"
          icon={<HomeIcon className="h-4 w-4" />}
          active={active === 'overview'}
          onClick={() => setActive('overview')}
        />
        <NavLink
          label="Deployments"
          icon={<ArrowPathIcon className="h-4 w-4" />}
          rightSection={<Badge variant="light">3</Badge>}
          active={active === 'deployments'}
          onClick={() => setActive('deployments')}
        />
        <NavLink
          label="Logs"
          description="Last 7 days"
          icon={<DocumentTextIcon className="h-4 w-4" />}
          active={active === 'logs'}
          onClick={() => setActive('logs')}
        />
        <NavLink label="Archived" icon={<ArchiveBoxIcon className="h-4 w-4" />} disabled />
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
