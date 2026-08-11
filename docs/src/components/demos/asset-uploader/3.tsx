import { AssetUploader, Loader } from "@codellyson/justui/react";

const shot = (label, hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="272" height="320"><rect width="100%" height="100%" fill="hsl(${hue} 40% 38%)"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="34" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <AssetUploader onAddFiles={() => {}} maxItems={5} count={3}>
    <AssetUploader.Item url={shot('1', 210)} alt="Front view" onRemove={() => {}}>
      <span className="absolute left-1 top-1 rounded bg-bg/85 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
        Cover
      </span>
    </AssetUploader.Item>

    <AssetUploader.Item url={shot('2', 150)} alt="Side view">
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-bg/70">
        <Loader size="sm" />
        <span className="text-xs text-secondary">Uploading…</span>
      </span>
    </AssetUploader.Item>

    <AssetUploader.Item url={shot('3', 20)} alt="Back view" onRemove={() => {}}>
      <span className="absolute inset-x-0 bottom-0 bg-danger px-2 py-1 text-center text-[11px] font-medium text-bg">
        Failed — retry
      </span>
    </AssetUploader.Item>

    <AssetUploader.Add withRemaining />
  </AssetUploader>
  );
}
