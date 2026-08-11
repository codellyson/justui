import { Button, Switch, useTheme } from "@codellyson/justui/react";

function Demo() {
  const { themeId, mode, themes, setThemeId, toggleMode } = useTheme();
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {themes.map((t) => (
          <Button
            key={t.id}
            size="xs"
            variant={t.id === themeId ? 'primary' : 'outline'}
            color="gray"
            onClick={() => setThemeId(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <Button size="xs" variant="secondary" onClick={toggleMode}>
        Switch to {mode === 'dark' ? 'light' : 'dark'}
      </Button>
      <p className="text-xs text-muted">
        Active: <code>{themeId}</code> · <code>{mode}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
