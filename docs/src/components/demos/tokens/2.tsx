

export default function JustuiDemo() {
  return (
    <div className="space-y-2">
      {[
        ['text-xs', 'text-xs'],
        ['text-sm', 'text-sm'],
        ['text-base', 'text-base'],
        ['text-lg', 'text-lg'],
        ['text-xl', 'text-xl'],
        ['text-2xl', 'text-2xl'],
      ].map(([name, cls]) => (
        <div key={name} className="flex items-baseline gap-4">
          <code className="w-16 shrink-0 font-mono text-xs text-muted">{name}</code>
          <span className={`${cls} text-primary`}>The quick brown fox</span>
        </div>
      ))}
    </div>
  );
}
