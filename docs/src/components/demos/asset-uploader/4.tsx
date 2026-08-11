import { AssetUploader } from "@codellyson/justui/react";

const poster = (label, hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="272"><rect width="100%" height="100%" fill="hsl(${hue} 35% 30%)"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="30" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <AssetUploader onAddFiles={() => {}} orientation="landscape" maxItems={3} count={2}>
    <AssetUploader.Item
      type="video"
      url="#"
      thumbnailUrl={poster('clip A', 265)}
      durationLabel="0:42"
      alt="Product demo"
      onRemove={() => {}}
    />
    <AssetUploader.Item
      type="video"
      url="#"
      thumbnailUrl={poster('clip B', 190)}
      durationLabel="1:15"
      alt="Unboxing"
      onRemove={() => {}}
    />
    <AssetUploader.Add label="Add video" />
  </AssetUploader>
  );
}
