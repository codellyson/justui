import { useState } from "react";
import { AssetUploader } from "@codellyson/justui/react";

function Demo() {
  const [log, setLog] = useState([]);

  return (
    <div className="space-y-3">
      <AssetUploader
        onAddFiles={(files) => setLog(files.map((f) => `accepted ${f.name}`))}
        onReject={(rejections) =>
          setLog(
            rejections.map((r) => `${r.file.name} — ${r.errors.map((e) => e.code).join(', ')}`)
          )
        }
        accept={{ 'image/png': ['.png'] }}
        maxSize={50 * 1024}
        addLabel="PNG under 50 KB"
      />
      <div className="text-xs text-muted">
        {log.length === 0 ? 'Drop a JPEG or a large PNG to see a rejection.' : log.map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
