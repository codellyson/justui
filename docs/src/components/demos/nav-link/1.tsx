import { useState } from "react";
import { NavLink } from "@codellyson/justui/react";
import { CodeBracketIcon, Cog6ToothIcon } from "../../icons";

function Demo() {
  const [active, setActive] = useState('members');
  return (
    <div className="w-56 rounded-lg border border-border p-2">
      <div className="flex flex-col gap-1">
        <NavLink label="Project" icon={<CodeBracketIcon className="h-4 w-4" />} defaultOpened>
          <NavLink label="General" active={active === 'general'} onClick={() => setActive('general')} />
          <NavLink label="Members" active={active === 'members'} onClick={() => setActive('members')} />
          <NavLink label="Tokens" active={active === 'tokens'} onClick={() => setActive('tokens')} />
        </NavLink>
        <NavLink label="Billing" icon={<Cog6ToothIcon className="h-4 w-4" />}>
          <NavLink label="Invoices" active={active === 'invoices'} onClick={() => setActive('invoices')} />
        </NavLink>
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
