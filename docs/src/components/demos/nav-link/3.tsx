import { NavLink } from "@codellyson/justui/react";
import { ArrowPathIcon, Cog6ToothIcon, DocumentTextIcon, HomeIcon } from "../../icons";



export default function JustuiDemo() {
  return (
    <div className="flex w-14 flex-col gap-1 rounded-lg border border-border p-2">
    <NavLink iconOnly label="Overview" icon={<HomeIcon className="h-4 w-4" />} active />
    <NavLink iconOnly label="Deployments" icon={<ArrowPathIcon className="h-4 w-4" />} />
    <NavLink iconOnly label="Logs" icon={<DocumentTextIcon className="h-4 w-4" />} />
    <NavLink iconOnly label="Settings" icon={<Cog6ToothIcon className="h-4 w-4" />} />
  </div>
  );
}
