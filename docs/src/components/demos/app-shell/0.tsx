import { useState } from "react";
import { AppShell, Avatar, Badge, Breadcrumb, Button, NavLink } from "@codellyson/justui/react";
import { ArrowPathIcon, Bars3Icon, Cog6ToothIcon, HomeIcon } from "../../icons";

function Demo() {
  const [active, setActive] = useState('Deployments');
  const [collapsed, setCollapsed] = useState(false);

  return (
    // A transformed ancestor makes `fixed` resolve against this box instead of the
    // viewport, so the shell can be demoed inline. In an app it wraps the page.
    <div
      className="relative h-[460px] overflow-hidden rounded-lg border border-border"
      style={{ transform: 'translate(0)' }}
    >
      <AppShell
        header={{ height: 52 }}
        footer={{ height: 32 }}
        navbar={{ width: 210, collapsedWidth: 56, collapsed }}
        aside={{ width: 200, breakpoint: 'sm' }}
        padding="md"
        className="min-h-full"
        layout="alt"
      >
        <AppShell.Header className="gap-2 px-3">
          <Button
            size="xs"
            variant="ghost"
            aria-label="Toggle navbar"
            onClick={() => setCollapsed((c) => !c)}
            leftIcon={<Bars3Icon className="h-4 w-4" />}
          />
          <span className="font-semibold">justdeploy</span>
          <span className="ml-auto flex items-center gap-2">
            <Badge variant="light" color="green">Live</Badge>
            <Avatar size="sm" name="Ada Lovelace" />
          </span>
        </AppShell.Header>

        <AppShell.Navbar className="p-2">
          <AppShell.Section grow className="flex flex-col gap-1">
            <NavLink
              label="Overview"
              icon={<HomeIcon className="h-4 w-4" />}
              active={active === 'Overview'}
              onClick={() => setActive('Overview')}
            />
            <NavLink
              label="Deployments"
              icon={<ArrowPathIcon className="h-4 w-4" />}
              rightSection={<Badge variant="light">3</Badge>}
              active={active === 'Deployments'}
              onClick={() => setActive('Deployments')}
            />
            <NavLink label="Settings" icon={<Cog6ToothIcon className="h-4 w-4" />} nested="panel">
              <NavLink
                label="General"
                active={active === 'General'}
                onClick={() => setActive('General')}
              />
              <NavLink
                label="Members"
                active={active === 'Members'}
                onClick={() => setActive('Members')}
              />
            </NavLink>
          </AppShell.Section>

          <AppShell.Section className="-mx-2 mt-2 border-t border-border px-2 pt-2">
            <NavLink label="Ada Lovelace" icon={<Avatar size="xs" name="Ada Lovelace" />} />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Aside className="gap-2 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Activity</p>
          <p className="text-sm text-secondary">Deploy #2140 succeeded.</p>
          <p className="text-sm text-secondary">Deploy #2139 failed.</p>
        </AppShell.Aside>

        <AppShell.Footer className="px-3 text-xs text-muted">
          eu-west-2 · v0.15.0
        </AppShell.Footer>

        <AppShell.Main>
          <Breadcrumb className="mb-3">
            <Breadcrumb.Item href="/app-shell">Projects</Breadcrumb.Item>
            <Breadcrumb.Item current>{active}</Breadcrumb.Item>
          </Breadcrumb>
          <h3 className="mb-2 text-lg font-semibold">{active}</h3>
          <div className="space-y-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="rounded-md border border-border p-3 text-sm">
                Row {i + 1}
              </div>
            ))}
          </div>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
