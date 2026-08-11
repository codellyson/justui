import { Table } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Table.Root bordered>
      <Table.Caption>Spend by region, last 30 days</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Region</Table.Head>
          <Table.Head className="text-right">Requests</Table.Head>
          <Table.Head className="text-right">Cost</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell className="font-medium">us-east-1</Table.Cell>
          <Table.Cell className="text-right font-mono">128,400</Table.Cell>
          <Table.Cell className="text-right font-mono">$412.10</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="font-medium">eu-west-2</Table.Cell>
          <Table.Cell className="text-right font-mono">9,120</Table.Cell>
          <Table.Cell className="text-right font-mono">$38.44</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell className="text-right font-mono">137,520</Table.Cell>
          <Table.Cell className="text-right font-mono">$450.54</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
