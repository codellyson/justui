"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef, type ElementRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { XIcon } from "../lib/icons.js";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

const edges: Record<DrawerPosition, string> = {
  right: "right-0 top-0 h-full border-l",
  left: "left-0 top-0 h-full border-r",
  top: "top-0 left-0 w-full border-b",
  bottom: "bottom-0 left-0 w-full border-t",
};

const slides: Record<DrawerPosition, string> = {
  right:
    "data-[state=open]:animate-justui-slide-in-right data-[state=closed]:animate-justui-slide-out-right",
  left: "data-[state=open]:animate-justui-slide-in-left data-[state=closed]:animate-justui-slide-out-left",
  top: "data-[state=open]:animate-justui-slide-in-top data-[state=closed]:animate-justui-slide-out-top",
  bottom:
    "data-[state=open]:animate-justui-slide-in-bottom data-[state=closed]:animate-justui-slide-out-bottom",
};

export interface DrawerProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  position?: DrawerPosition;
  /** Width for left/right, height for top/bottom. */
  size?: number | string;
  withCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  padding?: boolean;
  className?: string;
  overlayClassName?: string;
  bodyClassName?: string;
}

export const Drawer = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DrawerProps>(
  (
    {
      opened,
      onClose,
      children,
      title,
      position = "right",
      size = 380,
      withCloseButton = true,
      closeOnClickOutside = true,
      closeOnEscape = true,
      padding = true,
      className,
      overlayClassName,
      bodyClassName,
    },
    ref,
  ) => {
    const horizontal = position === "left" || position === "right";

    return (
      <DialogPrimitive.Root open={opened} onOpenChange={(next) => !next && onClose()}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            data-justui="drawer-overlay"
            className={cn("fixed inset-0 z-50 bg-black/50", overlayClassName)}
          />
          <DialogPrimitive.Content
            ref={ref}
            data-justui="drawer"
            style={horizontal ? { width: size, maxWidth: "100vw" } : { height: size, maxHeight: "100vh" }}
            className={cn(
              "fixed z-50 flex flex-col border-border bg-bg shadow-lg focus-visible:outline-none",
              edges[position],
              slides[position],
              className,
            )}
            onPointerDownOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
            onInteractOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
            onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
            aria-describedby={undefined}
          >
            <div
              className={cn(
                "flex items-center justify-between gap-3 border-b border-border",
                padding ? "px-4 py-3" : "p-0",
                !title && !withCloseButton && "hidden",
              )}
            >
              <DialogPrimitive.Title
                className={cn(
                  "min-w-0 flex-1 truncate font-mono text-[11.5px] font-normal uppercase leading-4 tracking-[0.08em] text-muted",
                  !title && "sr-only",
                )}
              >
                {title ?? "Drawer"}
              </DialogPrimitive.Title>
              {withCloseButton && (
                <DialogPrimitive.Close
                  aria-label="Close"
                  className="shrink-0 rounded-sm text-muted opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <XIcon className="h-4 w-4" />
                </DialogPrimitive.Close>
              )}
            </div>

            <div className={cn("min-h-0 flex-1 overflow-y-auto", padding && "p-4", bodyClassName)}>
              {children}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);
Drawer.displayName = "Drawer";
