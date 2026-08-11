"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { cn } from "../lib/cn.js";
import { PlayIcon, PlusIcon, XIcon } from "../lib/icons.js";

export type { Accept, FileRejection } from "react-dropzone";

export type AssetOrientation = "portrait" | "landscape";

export interface AssetUploaderItem {
  id: string | number;
  url: string;
  type?: "image" | "video";
  thumbnailUrl?: string;
  durationLabel?: string;
  alt?: string;
}

export const DEFAULT_ASSET_ACCEPT: Accept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "video/mp4": [".mp4"],
  "video/webm": [".webm"],
  "video/quicktime": [".mov"],
};

// react-dropzone wants mime -> extensions, and its keys must be MIME types.
// A plain `accept` string may mix both ("image/png,.heic"), so bare extensions
// ride along as values — the accept attribute is flattened either way.
export const toAccept = (accept: string | Accept): Accept => {
  if (typeof accept !== "string") return accept;

  const tokens = accept
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
  const mimeTypes = tokens.filter((token) => token.includes("/"));
  const extensions = tokens.filter((token) => token.startsWith("."));

  if (mimeTypes.length === 0) return Object.fromEntries(extensions.map((ext) => [ext, []]));

  return Object.fromEntries(
    mimeTypes.map((mime, i) => [mime, i === 0 ? extensions : []] as const),
  );
};

const tileSizes: Record<AssetOrientation, { width: string; height: string }> = {
  portrait: { width: "w-[136px]", height: "h-[160px]" },
  landscape: { width: "w-[220px]", height: "h-[136px]" },
};

export interface TileSize {
  width?: number | string;
  height?: number | string;
  ratio?: number;
}

// An explicit dimension drops the preset class for that axis only, so setting
// just a width keeps the orientation's height instead of collapsing.
const tileBox = (orientation: AssetOrientation, own: TileSize, inherited: TileSize) => {
  const width = own.width ?? inherited.width;
  const height = own.height ?? inherited.height;
  const ratio = own.ratio ?? inherited.ratio;
  return {
    className: cn(
      width == null && tileSizes[orientation].width,
      height == null && ratio == null && tileSizes[orientation].height,
    ),
    style: { width, height, aspectRatio: ratio },
  };
};

interface AssetUploaderContextValue {
  orientation: AssetOrientation;
  tile: TileSize;
  tileClassName?: string;
  disabled: boolean;
  remaining: number;
  isDragActive: boolean;
  open: () => void;
}

const AssetUploaderContext = createContext<AssetUploaderContextValue | null>(null);

const useAssetUploader = (part: string) => {
  const ctx = useContext(AssetUploaderContext);
  if (!ctx) throw new Error(`AssetUploader.${part} must be used inside AssetUploader`);
  return ctx;
};

export interface AssetUploaderProps {
  onAddFiles: (files: File[]) => void;
  onReject?: (rejections: FileRejection[]) => void;
  items?: AssetUploaderItem[];
  onRemove?: (id: string | number) => void;
  children?: ReactNode;
  maxItems?: number;
  count?: number;
  maxSize?: number;
  minSize?: number;
  orientation?: AssetOrientation;
  tileWidth?: number | string;
  tileHeight?: number | string;
  tileRatio?: number;
  accept?: string | Accept;
  multiple?: boolean;
  disabled?: boolean;
  noDrop?: boolean;
  addLabel?: string;
  withRemaining?: boolean;
  className?: string;
  tileClassName?: string;
}

function AssetUploaderRoot({
  onAddFiles,
  onReject,
  items,
  onRemove,
  children,
  maxItems = 5,
  count,
  maxSize,
  minSize,
  orientation = "portrait",
  tileWidth,
  tileHeight,
  tileRatio,
  accept = DEFAULT_ASSET_ACCEPT,
  multiple = false,
  disabled = false,
  noDrop = false,
  addLabel,
  withRemaining = false,
  className,
  tileClassName,
}: AssetUploaderProps) {
  const used = count ?? items?.length ?? 0;
  const remaining = Math.max(0, maxItems - used);
  const full = remaining <= 0;

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: toAccept(accept),
    multiple,
    maxSize,
    minSize,
    maxFiles: multiple ? remaining : 1,
    disabled: disabled || full,
    noDrag: noDrop,
    // The grid holds remove buttons and per-tile controls, so a click anywhere
    // must not open the picker — Add calls open() instead.
    noClick: true,
    noKeyboard: true,
    onDrop: (accepted) => {
      if (accepted.length) onAddFiles(accepted);
    },
    onDropRejected: onReject,
  });

  return (
    <AssetUploaderContext.Provider
      value={{
        orientation,
        tile: { width: tileWidth, height: tileHeight, ratio: tileRatio },
        tileClassName,
        disabled,
        remaining,
        isDragActive,
        open,
      }}
    >
      <div
        {...getRootProps({
          "data-justui": "asset-uploader",
          "data-drag-active": isDragActive || undefined,
          className: cn(
            "flex flex-wrap gap-4 rounded-xl",
            isDragActive && "ring-2 ring-accent ring-offset-4 ring-offset-bg",
            className,
          ),
        })}
      >
        {items?.map((item) => (
          <AssetUploaderItemTile
            key={item.id}
            url={item.url}
            type={item.type}
            thumbnailUrl={item.thumbnailUrl}
            durationLabel={item.durationLabel}
            alt={item.alt}
            onRemove={onRemove && (() => onRemove(item.id))}
          />
        ))}

        {children}

        {/* Children mean the caller places Add themselves; anything else — an
            items list or a fresh empty uploader — still needs one. */}
        {(items != null || children == null) && (
          <AssetUploaderAdd label={addLabel} withRemaining={withRemaining} />
        )}

        <input {...getInputProps()} />
      </div>
    </AssetUploaderContext.Provider>
  );
}

export interface AssetUploaderItemProps extends TileSize {
  url: string;
  type?: "image" | "video";
  thumbnailUrl?: string;
  durationLabel?: ReactNode;
  alt?: string;
  onRemove?: () => void;
  children?: ReactNode;
  className?: string;
}

function AssetUploaderItemTile({
  url,
  type,
  thumbnailUrl,
  durationLabel,
  alt = "Preview",
  onRemove,
  children,
  width,
  height,
  ratio,
  className,
}: AssetUploaderItemProps) {
  const { orientation, tile, tileClassName } = useAssetUploader("Item");
  const box = tileBox(orientation, { width, height, ratio }, tile);
  const isVideo = type === "video";

  return (
    <div
      data-justui="asset-uploader-item"
      style={box.style}
      className={cn(
        "relative overflow-hidden rounded-xl bg-bg-secondary",
        box.className,
        tileClassName,
        className,
      )}
    >
      {isVideo && !thumbnailUrl ? (
        <video src={url} muted playsInline className="h-full w-full object-cover" />
      ) : (
        <img src={thumbnailUrl ?? url} alt={alt} className="h-full w-full object-cover" />
      )}

      {isVideo && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/90 text-primary">
            <PlayIcon className="ml-0.5 h-5 w-5" />
          </span>
        </span>
      )}

      {durationLabel && (
        <span className="absolute bottom-2 right-2 rounded bg-bg/85 px-1.5 py-0.5 text-xs text-primary">
          {durationLabel}
        </span>
      )}

      {children}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-bg ring-2 ring-bg transition-opacity hover:opacity-90 focus-visible:outline-hidden focus-visible:ring-accent"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export interface AssetUploaderAddProps extends TileSize {
  label?: ReactNode;
  dropLabel?: ReactNode;
  withRemaining?: boolean;
  children?: ReactNode;
  className?: string;
}

function AssetUploaderAdd({
  label = "Add image",
  dropLabel = "Drop to upload",
  withRemaining = false,
  children,
  width,
  height,
  ratio,
  className,
}: AssetUploaderAddProps) {
  const { orientation, tile, tileClassName, disabled, remaining, isDragActive, open } =
    useAssetUploader("Add");
  if (remaining <= 0) return null;

  const box = tileBox(orientation, { width, height, ratio }, tile);

  return (
    <button
      type="button"
      onClick={open}
      disabled={disabled}
      data-justui="asset-uploader-add"
      style={box.style}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-accent text-secondary hover:bg-accent/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60",
        isDragActive ? "bg-accent/25" : "bg-accent/10",
        box.className,
        tileClassName,
        className,
      )}
    >
      {children ?? (
        <>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-bg">
            <PlusIcon className="h-4 w-4" />
          </span>
          <span className="text-sm">{isDragActive ? dropLabel : label}</span>
          {withRemaining && !isDragActive && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              {remaining} left
            </span>
          )}
        </>
      )}
    </button>
  );
}

AssetUploaderRoot.displayName = "AssetUploader";
AssetUploaderItemTile.displayName = "AssetUploader.Item";
AssetUploaderAdd.displayName = "AssetUploader.Add";

export const AssetUploader = Object.assign(AssetUploaderRoot, {
  Root: AssetUploaderRoot,
  Item: AssetUploaderItemTile,
  Add: AssetUploaderAdd,
});
