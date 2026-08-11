import { Table } from "@codellyson/justui/react";

const columns = [
  { accessorKey: 'metric', header: 'Metric' },
  { accessorKey: 'p50', header: 'p50' },
  { accessorKey: 'p99', header: 'p99' },
];

const data = [
  { metric: 'render', p50: '12ms', p99: '48ms' },
  { metric: 'query', p50: '3ms', p99: '210ms' },
  { metric: 'upload', p50: '90ms', p99: '1.4s' },
];

export default function JustuiDemo() {
  return (
    <div className="space-y-8">
    <Table columns={columns} data={data} />
    <Table columns={columns} data={data} bordered />
    <Table columns={columns} data={data} bordered={{ column: true }} />
  </div>
  );
}
