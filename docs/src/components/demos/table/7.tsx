import { useState } from "react";
import { Table } from "@codellyson/justui/react";

const ROWS = [
  { service: 'api-gateway', p99: 48 },
  { service: 'billing-worker', p99: 210 },
  { service: 'image-resizer', p99: 1400 },
  { service: 'search-index', p99: 12 },
];

const columns = [
  { accessorKey: 'service', header: 'Service' },
  { accessorKey: 'p99', header: 'p99', cell: (c) => <span className="font-mono">{c.getValue()}ms</span> },
];

function Demo() {
  const [sorting, setSorting] = useState([{ id: 'service', desc: false }]);

  // Stands in for a request keyed on the sort.
  const rows = [...ROWS].sort((a, b) => {
    const { id, desc } = sorting[0] ?? {};
    if (!id) return 0;
    const dir = desc ? -1 : 1;
    return a[id] > b[id] ? dir : a[id] < b[id] ? -dir : 0;
  });

  return (
    <div className="space-y-3">
      <Table
        columns={columns}
        data={rows}
        sortable
        manualSorting
        sorting={sorting}
        onSortingChange={setSorting}
      />
      <p className="text-xs text-muted">
        sent to the server: <code>{JSON.stringify(sorting)}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
