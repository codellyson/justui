import { AssetUploader } from "@codellyson/justui/react";

const shot = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="100%" height="100%" fill="hsl(${hue} 40% 38%)"/></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <div className="max-w-md space-y-6">
    <AssetUploader onAddFiles={() => {}} tileWidth="calc(33.333% - 11px)" tileRatio={1} maxItems={6} count={3}>
      <AssetUploader.Item url={shot(210)} alt="" onRemove={() => {}} />
      <AssetUploader.Item url={shot(150)} alt="" onRemove={() => {}} />
      <AssetUploader.Item url={shot(20)} alt="" onRemove={() => {}} />
      <AssetUploader.Add label="Add" />
    </AssetUploader>

    <AssetUploader onAddFiles={() => {}} tileWidth={120} tileRatio={16 / 9} maxItems={3} count={1}>
      <AssetUploader.Item url={shot(265)} alt="" onRemove={() => {}} />
      <AssetUploader.Add label="16:9" />
    </AssetUploader>
  </div>
  );
}
