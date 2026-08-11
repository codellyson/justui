import { useState } from "react";
import { Table } from "@codellyson/justui/react";

function Demo() {
  const [sort, setSort] = useState({ key: 'name', desc: false });
  const rows = [
    { name: 'nord', downloads: 1204 },
    { name: 'espresso', downloads: 8890 },
    { name: 'gruvbox', downloads: 430 },
  ];
  const sorted = [...rows].sort((a, b) => {
    const dir = sort.desc ? -1 : 1;
    return a[sort.key] > b[sort.key] ? dir : a[sort.key] < b[sort.key] ? -dir : 0;
  });
  const head = (key, label) => (
    <Table.Head
      className={key === 'downloads' ? 'text-right' : undefined}
      sortDirection={sort.key === key ? (sort.desc ? 'desc' : 'asc') : false}
      onSort={() => setSort((s) => ({ key, desc: s.key === key ? !s.desc : false }))}
    >
      {label}
    </Table.Head>
  );

  return (
    <Table.Root bordered>
      <Table.Header>
        <Table.Row>
          {head('name', 'Theme')}
          {head('downloads', 'Downloads')}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell className="font-medium">{row.name}</Table.Cell>
            <Table.Cell className="text-right font-mono">{row.downloads.toLocaleString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
