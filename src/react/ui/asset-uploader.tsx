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

// react-dropzone wants mime -> extensions; khaime passes a plain accept string.
const toAccept = (accept: string | Accept): Accept =>
  typeof accept === "string"
    ? Object.fromEntries(
        accept
          .split(",")
          .map((type) => type.trim())
          .filter(Boolean)
          .map((type) => [type, []]),
      )
    : accept;

const tileSizes: Record<AssetOrientation, string> = {
  portrait: "w-[136px] h-[160px]",
  landscape: "w-[220px] h-[136px]",
};

interface AssetUploaderContextValue {
  orientation: AssetOrientation;
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
      value={{ orientation, tileClassName, disabled, remaining, isDragActive, open }}
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

export interface AssetUploaderItemProps {
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
  className,
}: AssetUploaderItemProps) {
  const { orientation, tileClassName } = useAssetUploader("Item");
  const isVideo = type === "video";

  return (
    <div
      data-justui="asset-uploader-item"
      className={cn(
        "relative overflow-hidden rounded-xl bg-bg-secondary",
        tileSizes[orientation],
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
          className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-bg ring-2 ring-bg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-accent"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export interface AssetUploaderAddProps {
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
  className,
}: AssetUploaderAddProps) {
  const { orientation, tileClassName, disabled, remaining, isDragActive, open } =
    useAssetUploader("Add");
  if (remaining <= 0) return null;

  return (
    <button
      type="button"
      onClick={open}
      disabled={disabled}
      data-justui="asset-uploader-add"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-accent text-secondary hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60",
        isDragActive ? "bg-accent/25" : "bg-accent/10",
        tileSizes[orientation],
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
