import { AssetUploader } from "@codellyson/justui/react";

const shot = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="100%" height="100%" fill="hsl(${hue} 40% 38%)"/></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <AssetUploader onAddFiles={() => {}} disabled tileWidth={96} tileHeight={96} maxItems={2} count={1}>
    <AssetUploader.Item url={shot(265)} alt="" />
    <AssetUploader.Add />
  </AssetUploader>
  );
}
