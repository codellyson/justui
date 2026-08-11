import * as React from "react";
import { useState } from "react";
import { Table } from "@codellyson/justui/react";

function Demo() {
  const [open, setOpen] = useState('api-gateway');
  const groups = [
    {
      region: 'us-east-1',
      services: [
        { name: 'api-gateway', p99: '48ms', detail: 'Cached at the edge for 60s.' },
        { name: 'image-resizer', p99: '1.4s', detail: 'Cold starts dominate the tail.' },
      ],
    },
    {
      region: 'eu-west-2',
      services: [{ name: 'billing-worker', p99: '210ms', detail: 'Waits on the ledger write.' }],
    },
  ];

  return (
    <Table.Root bordered={{ column: true }}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Service</Table.Head>
          <Table.Head className="text-right">p99</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {groups.map((group) => (
          <React.Fragment key={group.region}>
            <Table.Row className="bg-bg-secondary">
              <Table.Cell colSpan={2} className="py-1.5 text-xs uppercase tracking-wider text-muted">
                {group.region}
              </Table.Cell>
            </Table.Row>
            {group.services.map((service) => (
              <React.Fragment key={service.name}>
                <Table.Row
                  onClick={() => setOpen(open === service.name ? null : service.name)}
                  className="cursor-pointer hover:bg-bg-secondary"
                >
                  <Table.Cell className="font-medium">{service.name}</Table.Cell>
                  <Table.Cell className="text-right font-mono">{service.p99}</Table.Cell>
                </Table.Row>
                {open === service.name && (
                  <Table.Row>
                    <Table.Cell colSpan={2} className="bg-bg-secondary text-xs text-secondary">
                      {service.detail}
                    </Table.Cell>
                  </Table.Row>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
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
