"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "./lib/cn.js";
import { XIcon } from "./lib/icons.js";
import { useMediaQuery } from "./lib/use-media-query.js";

const CLOSE_DISTANCE = 96;
const CLOSE_VELOCITY = 0.5; // px/ms
const MIN_FLICK_DISTANCE = 24;

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  mobileBreakpoint?: number;
  width?: number | string;
  /** Explicit height. `"100vh"` makes the sheet full-screen and squares its corners. */
  height?: number | string;
  radius?: number;
  withCloseButton?: boolean;
  withDragHandle?: boolean;
  swipeToClose?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  contentScrollable?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

export function Modal({
  opened,
  onClose,
  children,
  title,
  description,
  centered = false,
  mobileBreakpoint = 768,
  width = "min(420px, 92vw)",
  height,
  radius = 16,
  withCloseButton = true,
  withDragHandle = true,
  swipeToClose = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  contentScrollable = true,
  className,
  overlayClassName,
  contentClassName,
}: ModalProps) {
  const isNarrow = useMediaQuery(`(max-width: ${mobileBreakpoint - 1}px)`);
  const asSheet = isNarrow && !centered;
  const fullHeight = height === "100vh" || height === "100dvh";

  const [dragY, setDragY] = useState(0);
  const drag = useRef<{ startY: number; startTime: number } | null>(null);
  const canDrag = asSheet && (swipeToClose || withDragHandle);

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!canDrag) return;
      drag.current = { startY: e.clientY, startTime: e.timeStamp };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [canDrag],
  );

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setDragY(Math.max(0, e.clientY - drag.current.startY));
  }, []);

  const onPointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!drag.current) return;
      const distance = Math.max(0, e.clientY - drag.current.startY);
      const velocity = distance / Math.max(1, e.timeStamp - drag.current.startTime);
      drag.current = null;
      setDragY(0);
      const flicked = distance > MIN_FLICK_DISTANCE && velocity > CLOSE_VELOCITY;
      if (distance > CLOSE_DISTANCE || flicked) onClose();
    },
    [onClose],
  );

  const dragging = dragY > 0;

  const grabHandlers = canDrag
    ? { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp }
    : undefined;

  return (
    <DialogPrimitive.Root open={opened} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-justui="modal-overlay"
          className={cn(
            "fixed inset-0 z-50 bg-bg/70 backdrop-blur-md",
            "data-[state=open]:animate-justui-fade-in data-[state=closed]:animate-justui-fade-out",
            overlayClassName,
          )}
        />
        <DialogPrimitive.Content
          data-justui="modal"
          data-layout={asSheet ? "sheet" : "centered"}
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden border-border bg-bg focus-visible:outline-none",
            asSheet
              ? "bottom-0 left-0 w-full max-h-[90vh] border-t data-[state=open]:animate-justui-slide-in-bottom data-[state=closed]:animate-justui-slide-out-bottom"
              : "left-1/2 top-1/2 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 border shadow-lg data-[state=open]:animate-justui-zoom-in data-[state=closed]:animate-justui-zoom-out",
            fullHeight && asSheet && "max-h-screen",
            className,
          )}
          style={{
            width: asSheet ? "100%" : width,
            height: height ?? "auto",
            borderRadius: asSheet ? (fullHeight ? 0 : `${radius}px ${radius}px 0 0`) : radius,
            // Dropping the keyframes while dragging; they'd override this transform.
            ...(dragging
              ? { transform: `translateY(${dragY}px)`, animation: "none", transition: "none" }
              : null),
          }}
          onPointerDownOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
          onInteractOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
          onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
          // Radix warns about a missing description unless it is explicitly undefined.
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          {asSheet && withDragHandle && (
            <div
              data-justui="modal-drag-handle"
              aria-hidden="true"
              className="flex shrink-0 cursor-grab touch-none justify-center py-2.5 active:cursor-grabbing"
              {...grabHandlers}
            >
              <span className="h-1 w-10 rounded-full bg-muted/40" />
            </div>
          )}

          {(title || description || withCloseButton) && (
            <div
              className={cn(
                "flex shrink-0 justify-between gap-3 px-4",
                description ? "items-start" : "items-center",
                asSheet && withDragHandle ? "pb-3" : "py-3",
                (title || description) && "border-b border-border",
              )}
              {...(asSheet && !withDragHandle ? grabHandlers : undefined)}
            >
              <div className="min-w-0 flex-1">
                <DialogPrimitive.Title
                  className={cn(
                    "truncate font-mono text-[11.5px] font-normal uppercase leading-4 tracking-[0.08em] text-muted",
                    !title && "sr-only",
                  )}
                >
                  {title ?? "Dialog"}
                </DialogPrimitive.Title>
                {description && (
                  <DialogPrimitive.Description className="mt-1.5 text-[12.5px] italic text-secondary">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>
              {withCloseButton && (
                <DialogPrimitive.Close
                  aria-label="Close"
                  className="-mr-1 shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <XIcon className="h-4 w-4" />
                </DialogPrimitive.Close>
              )}
            </div>
          )}

          <div
            data-justui="modal-body"
            className={cn(
              "min-h-0 flex-1 px-4 py-4",
              contentScrollable ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden",
              asSheet && "pb-[max(1rem,env(safe-area-inset-bottom))]",
              contentClassName,
            )}
          >
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
