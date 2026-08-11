import { AssetUploader } from "@codellyson/justui/react";

const shot = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="100%" height="100%" fill="hsl(${hue} 40% 38%)"/></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <AssetUploader onAddFiles={() => {}} tileWidth={72} tileHeight={72} maxItems={5} count={3}>
    <AssetUploader.Item url={shot(210)} alt="" width={152} height={152} onRemove={() => {}} />
    <AssetUploader.Item url={shot(150)} alt="" onRemove={() => {}} />
    <AssetUploader.Item url={shot(20)} alt="" onRemove={() => {}} />
    <AssetUploader.Add />
  </AssetUploader>
  );
}
