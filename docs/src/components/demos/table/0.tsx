import { Badge, Table } from "@codellyson/justui/react";

const rows = [
  { name: 'api-gateway', region: 'us-east-1', status: 'live', requests: 128400 },
  { name: 'billing-worker', region: 'eu-west-2', status: 'live', requests: 9120 },
  { name: 'image-resizer', region: 'us-east-1', status: 'draft', requests: 0 },
  { name: 'search-index', region: 'ap-south-1', status: 'paused', requests: 431 },
];

const columns = [
  { accessorKey: 'name', header: 'Service', cell: (c) => <span className="font-medium">{c.getValue()}</span> },
  { accessorKey: 'region', header: 'Region' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (c) => (
      <Badge variant="light" color={{ live: 'green', draft: 'gray', paused: 'yellow' }[c.getValue()]}>
        {c.getValue()}
      </Badge>
    ),
  },
  {
    accessorKey: 'requests',
    header: 'Requests',
    cell: (c) => <span className="font-mono">{c.getValue().toLocaleString()}</span>,
  },
];

export default function JustuiDemo() {
  return (
    <Table columns={columns} data={rows} />
  );
}
