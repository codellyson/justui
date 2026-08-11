import { Label, Table } from "@codellyson/justui/react";

const columns = [
  { accessorKey: 'code', header: 'Code', size: 80 },
  { accessorKey: 'label', header: 'Label' },
  { accessorKey: 'note', header: 'Note', size: 220 },
];

const data = [
  { code: '200', label: 'OK', note: 'Cached for 60s at the edge.' },
  { code: '404', label: 'Not Found', note: 'Falls through to the SPA shell.' },
];

export default function JustuiDemo() {
  return (
    <Table columns={columns} data={data} />
  );
}
