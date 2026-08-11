

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {[
        ['rounded-sm', 'rounded-sm'],
        ['rounded-md', 'rounded-md'],
        ['rounded-lg', 'rounded-lg'],
        ['rounded-xl', 'rounded-xl'],
      ].map(([name, cls]) => (
        <div key={name} className="text-center">
          <div className={`h-14 w-14 border border-border bg-bg-secondary ${cls}`} />
          <code className="mt-1 block font-mono text-xs text-muted">{name}</code>
        </div>
      ))}
    </div>
  );
}
