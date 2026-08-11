import { useState } from "react";
import { Table } from "@codellyson/justui/react";

const columns = [
  { accessorKey: 'key', header: 'Key' },
  { accessorKey: 'value', header: 'Value' },
];

const data = [
  { key: 'DATABASE_URL', value: 'postgres://…' },
  { key: 'REDIS_URL', value: 'redis://…' },
];

function Demo() {
  const [picked, setPicked] = useState(null);
  return (
    <div className="space-y-3">
      <Table columns={columns} data={data} hideHeader onRowClick={(row) => setPicked(row.key)} />
      <p className="text-xs text-muted">clicked: <code>{picked ?? '(none)'}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
