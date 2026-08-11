import { useState } from "react";
import { Button, Select, Table } from "@codellyson/justui/react";

const ROWS = [
  { id: 'srv_1', service: 'api-gateway', p99: 48 },
  { id: 'srv_2', service: 'billing-worker', p99: 210 },
  { id: 'srv_3', service: 'image-resizer', p99: 1400 },
  { id: 'srv_4', service: 'search-index', p99: 12 },
];

const columns = [
  { accessorKey: 'service', header: 'Service' },
  { accessorKey: 'p99', header: 'p99', cell: (c) => <span className="font-mono">{c.getValue()}ms</span> },
];

function Demo() {
  const [selection, setSelection] = useState({ srv_2: true });
  const picked = Object.keys(selection).filter((key) => selection[key]);

  return (
    <div className="space-y-3">
      <Table
        columns={columns}
        data={ROWS}
        sortable
        enableRowSelection
        getRowId={(row) => row.id}
        rowSelection={selection}
        onRowSelectionChange={setSelection}
        selectionLabel={(row) => `Select ${row.service}`}
      />
      <div className="flex items-center gap-3">
        <p className="text-xs text-muted">
          selected: <code>{picked.length ? picked.join(', ') : '(none)'}</code>
        </p>
        {picked.length > 0 && (
          <Button size="xs" variant="outline" onClick={() => setSelection({})}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
