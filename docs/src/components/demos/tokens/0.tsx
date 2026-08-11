

export default function JustuiDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
      {[
        ['bg', 'bg-bg'],
        ['bg-secondary', 'bg-bg-secondary'],
        ['border', 'bg-border'],
        ['accent', 'bg-accent'],
        ['accent-hover', 'bg-accent-hover'],
        ['danger', 'bg-danger'],
        ['success', 'bg-success'],
        ['warning', 'bg-warning'],
      ].map(([name, cls]) => (
        <div key={name} className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-md border border-border ${cls}`} />
          <code className="font-mono text-xs text-secondary">{name}</code>
        </div>
      ))}
    </div>
  );
}
