import { useState } from "react";
import { Pagination, Table } from "@codellyson/justui/react";

const ALL = Array.from({ length: 47 }, (_, i) => ({
  build: `#${2100 + i}`,
  branch: i % 3 === 0 ? 'main' : `feat/queue-${i}`,
  duration: `${(1 + (i % 7) * 0.4).toFixed(1)}s`,
}));

const columns = [
  { accessorKey: 'build', header: 'Build' },
  { accessorKey: 'branch', header: 'Branch' },
  { accessorKey: 'duration', header: 'Duration' },
];

function Demo() {
  const [page, setPage] = useState(1);
  const perPage = 8;
  const total = Math.ceil(ALL.length / perPage);
  const start = (page - 1) * perPage;
  const rows = ALL.slice(start, start + perPage);

  return (
    <div className="space-y-4">
      <Table columns={columns} data={rows} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Showing{' '}
          <span className="font-medium text-primary">
            {start + 1}–{Math.min(start + perPage, ALL.length)}
          </span>{' '}
          of {ALL.length}
        </p>
        <Pagination page={page} total={total} onChange={setPage} />
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
