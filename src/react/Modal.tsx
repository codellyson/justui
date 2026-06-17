import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** Sub-title / context line under the title. */
  description?: ReactNode;
  children: ReactNode;
  /** Set false to hide the built-in close button. */
  showClose?: boolean;
  /** Tailwind classes on the inner card. Defaults to a sensible width. */
  className?: string;
}

/**
 * Centered modal with a backdrop, escape-to-close, click-outside-to-close,
 * and a built-in close affordance. Children are responsible for the body.
 * The shroud blurs the canvas behind it so notes stay legible without
 * fighting for attention.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  showClose = true,
  className,
}: ModalProps) {
  const shroudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onShroudMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === shroudRef.current) onClose();
  };

  return (
    <div
      ref={shroudRef}
      onMouseDown={onShroudMouseDown}
      className={
        "fixed inset-0 z-[220] flex items-center justify-center bg-bg/70 backdrop-blur-md " +
        "p-[4vh_4vw] animate-[justui-fade_160ms_ease-out]"
      }
      role="dialog"
      aria-modal="true"
    >
      <div
        className={
          (className ?? "w-[min(360px,92vw)]") +
          " flex flex-col gap-3 rounded-lg border border-border bg-bg p-6 " +
          "shadow-[0_28px_80px_-16px_rgba(0,0,0,0.7)]"
        }
        onMouseDown={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted">
            <span>{title}</span>
            {showClose && (
              <button
                type="button"
                aria-label="close"
                onClick={onClose}
                className="rounded p-1 text-muted hover:text-primary"
              >
                ✕
              </button>
            )}
          </div>
        )}
        {description && (
          <p className="-mt-1 text-[12.5px] italic text-secondary">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
