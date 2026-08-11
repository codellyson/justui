import { Table } from "@codellyson/justui/react";

const data = [
  { service: 'api-gateway', region: 'us-east-1', p99: 48, cost: 412.1 },
  { service: 'billing-worker', region: 'eu-west-2', p99: 210, cost: 38.44 },
  { service: 'image-resizer', region: 'us-east-1', p99: 1400, cost: 96.2 },
  { service: 'search-index', region: 'ap-south-1', p99: 12, cost: 7.05 },
];

const columns = [
  { accessorKey: 'service', header: 'Service' },
  { accessorKey: 'region', header: 'Region', enableSorting: false },
  {
    accessorKey: 'p99',
    header: 'p99',
    cell: (c) => <span className="font-mono">{c.getValue()}ms</span>,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: (c) => <span className="font-mono">${c.getValue().toFixed(2)}</span>,
  },
];

export default function JustuiDemo() {
  return (
    <Table columns={columns} data={data} sortable defaultSorting={[{ id: 'p99', desc: true }]} />
  );
}
