import { useState } from "react";
import { Badge, Table } from "@codellyson/justui/react";

const ROWS = [
  { id: 'a', name: 'draft-post', status: 'draft' },
  { id: 'b', name: 'published-post', status: 'published' },
  { id: 'c', name: 'archived-post', status: 'archived' },
  { id: 'd', name: 'another-draft', status: 'draft' },
];

const columns = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (c) => (
      <Badge variant="light" color={{ draft: 'gray', published: 'green', archived: 'yellow' }[c.getValue()]}>
        {c.getValue()}
      </Badge>
    ),
  },
];

function Demo() {
  const [opened, setOpened] = useState(null);
  return (
    <div className="space-y-3">
      <Table
        columns={columns}
        data={ROWS}
        getRowId={(row) => row.id}
        enableRowSelection={(row) => row.original.status !== 'archived'}
        defaultRowSelection={{ a: true }}
        onRowClick={(row) => setOpened(row.name)}
        bordered
      />
      <p className="text-xs text-muted">
        row click: <code>{opened ?? '(none)'}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
