import { useState } from "react";
import { AssetUploader } from "@codellyson/justui/react";

function Demo() {
  const [log, setLog] = useState('Drop something.');
  const shared = {
    onAddFiles: (files) => setLog(`accepted ${files.map((f) => f.name).join(', ')}`),
    onReject: (rs) => setLog(rs.map((r) => `${r.file.name} — ${r.errors[0].code}`).join(' · ')),
    multiple: true,
    maxItems: 9,
  };
  return (
    <div className="space-y-4">
      <AssetUploader
        {...shared}
        accept={{ 'image/*': [], 'application/pdf': ['.pdf'] }}
        addLabel="Object form"
      />
      <AssetUploader {...shared} accept="image/png,.heic" addLabel="String form" />
      <AssetUploader {...shared} accept=".csv,.tsv" addLabel="Extensions only" />
      <p className="text-xs text-muted">{log}</p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
