import { useState } from "react";
import { AssetUploader } from "@codellyson/justui/react";

const shot = (label, hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="272" height="320"><rect width="100%" height="100%" fill="hsl(${hue} 40% 38%)"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="34" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
  )}`;

function Demo() {
  const [items, setItems] = useState([
    { id: 1, url: shot('1', 210), alt: 'Front view' },
    { id: 2, url: shot('2', 150), alt: 'Side view' },
  ]);

  return (
    <div className="space-y-3">
      <AssetUploader
        items={items}
        maxItems={4}
        withRemaining
        onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
        onAddFiles={(files) =>
          setItems((prev) => [
            ...prev,
            ...files.map((file, i) => ({
              id: `${file.name}-${prev.length + i}`,
              url: URL.createObjectURL(file),
              alt: file.name,
            })),
          ])
        }
      />
      <p className="text-xs text-muted">{items.length} of 4 · pick a file to add one</p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
