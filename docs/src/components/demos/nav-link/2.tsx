import { useState } from "react";
import { AppShell, NavLink } from "@codellyson/justui/react";
import { ArchiveBoxIcon, ArrowPathIcon, ArrowUpRightIcon, CodeBracketIcon, Cog6ToothIcon, DocumentDuplicateIcon, ExclamationTriangleIcon, HomeIcon, Squares2X2Icon } from "../../icons";

function Demo() {
  const [active, setActive] = useState('functions');
  const heading = 'px-2 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted';

  return (
    // The panel is absolute, so it fills the nearest positioned ancestor. Inside an
    // AppShell that's the navbar; standalone, mark the container `relative`.
    <div className="relative h-[340px] w-56 overflow-hidden rounded-lg border border-border p-2">
      <div className="flex flex-col gap-1">
        <NavLink label="Overview" icon={<HomeIcon className="h-4 w-4" />} />
        <NavLink label="Deployments" icon={<ArrowPathIcon className="h-4 w-4" />} />
        <NavLink
          label="Observability"
          icon={<Squares2X2Icon className="h-4 w-4" />}
          nested="panel"
        >
          <NavLink
            label="Overview"
            icon={<Squares2X2Icon className="h-4 w-4" />}
            active={active === 'overview'}
            onClick={() => setActive('overview')}
          />
          <NavLink
            label="Alerts"
            icon={<ExclamationTriangleIcon className="h-4 w-4" />}
            active={active === 'alerts'}
            onClick={() => setActive('alerts')}
          />
          <p className={heading}>Compute</p>
          <NavLink
            label="Functions"
            icon={<CodeBracketIcon className="h-4 w-4" />}
            active={active === 'functions'}
            onClick={() => setActive('functions')}
          />
          <NavLink
            label="Sandboxes"
            icon={<ArchiveBoxIcon className="h-4 w-4" />}
            active={active === 'sandboxes'}
            onClick={() => setActive('sandboxes')}
          />
          <p className={heading}>CDN</p>
          <NavLink
            label="Edge Requests"
            icon={<ArrowUpRightIcon className="h-4 w-4" />}
            active={active === 'edge'}
            onClick={() => setActive('edge')}
          />
          <NavLink
            label="Image Optimization"
            icon={<DocumentDuplicateIcon className="h-4 w-4" />}
            active={active === 'images'}
            onClick={() => setActive('images')}
          />
        </NavLink>
        <NavLink label="Settings" icon={<Cog6ToothIcon className="h-4 w-4" />} />
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
