import { Table } from "@codellyson/justui/react";

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'seat', header: 'Seat' },
];

export default function JustuiDemo() {
  return (
    <div className="space-y-8">
    <Table columns={columns} data={[]} isLoading loadingRows={3} />
    <Table columns={columns} data={[]} emptyMessage="No teammates yet — invite someone." />
  </div>
  );
}
