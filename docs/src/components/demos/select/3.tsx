import { useState } from "react";
import { Select } from "@codellyson/justui/react";

const REGIONS = [
  { group: 'Americas', items: [
    { label: 'us-east-1', value: 'us-east-1', subLabel: 'N. Virginia' },
    { label: 'us-west-2', value: 'us-west-2', subLabel: 'Oregon' },
    { label: 'sa-east-1', value: 'sa-east-1', subLabel: 'Sao Paulo' },
  ]},
  { group: 'Europe', items: [
    { label: 'eu-west-1', value: 'eu-west-1', subLabel: 'Ireland' },
    { label: 'eu-west-2', value: 'eu-west-2', subLabel: 'London' },
    { label: 'eu-central-1', value: 'eu-central-1', subLabel: 'Frankfurt' },
  ]},
  { group: 'Asia Pacific', items: [
    { label: 'ap-south-1', value: 'ap-south-1', subLabel: 'Mumbai' },
    { label: 'ap-northeast-1', value: 'ap-northeast-1', subLabel: 'Tokyo' },
    { label: 'ap-southeast-2', value: 'ap-southeast-2', subLabel: 'Sydney', disabled: true },
  ]},
];

function Demo() {
  const [region, setRegion] = useState('eu-west-2');
  return (
    <div className="w-full max-w-sm space-y-3">
      <Select
        searchable
        label="Region"
        placeholder="Pick a region"
        value={region}
        onChange={setRegion}
        options={REGIONS}
      />
      <p className="text-xs text-muted">value: <code>{region || '(none)'}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
