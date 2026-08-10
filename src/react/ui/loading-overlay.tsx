"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";
import { Loader, type LoaderProps } from "./loader.js";

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  zIndex?: number;
  loaderProps?: Pick<LoaderProps, "size" | "color" | "label">;
  overlayClassName?: string;
}

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, visible, zIndex = 40, loaderProps, overlayClassName, style, ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        data-justui="loading-overlay"
        aria-busy="true"
        // rounded-[inherit] so the wash follows the container's corners instead of
        // squaring them off and bleeding past the border.
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-[inherit]",
          className,
        )}
        style={{ zIndex, ...style }}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] bg-bg/70 backdrop-blur-sm",
            overlayClassName,
          )}
        />
        <Loader size={loaderProps?.size ?? "md"} color={loaderProps?.color ?? "accent"} label={loaderProps?.label} />
      </div>
    );
  },
);
LoadingOverlay.displayName = "LoadingOverlay";
