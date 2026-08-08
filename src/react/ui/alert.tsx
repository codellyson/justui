"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { XIcon } from "../lib/icons.js";

export type AlertColor = "primary" | "gray" | "red" | "green" | "yellow" | "orange" | "blue";

const colorClasses: Record<AlertColor, { light: string; filled: string; outline: string }> = {
  primary: {
    light: "bg-accent/10 text-primary",
    filled: "bg-accent text-bg",
    outline: "border border-accent text-primary",
  },
  blue: {
    light: "bg-accent/10 text-primary",
    filled: "bg-accent text-bg",
    outline: "border border-accent text-primary",
  },
  gray: {
    light: "bg-bg-secondary text-primary",
    filled: "bg-muted text-bg",
    outline: "border border-border text-primary",
  },
  red: {
    light: "bg-danger/10 text-danger",
    filled: "bg-danger text-bg",
    outline: "border border-danger text-danger",
  },
  green: {
    light: "bg-success/10 text-success",
    filled: "bg-success text-bg",
    outline: "border border-success text-success",
  },
  yellow: {
    light: "bg-warning/10 text-warning",
    filled: "bg-warning text-bg",
    outline: "border border-warning text-warning",
  },
  orange: {
    light: "bg-warning/10 text-warning",
    filled: "bg-warning text-bg",
    outline: "border border-warning text-warning",
  },
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "color"> {
  title?: ReactNode;
  color?: AlertColor;
  variant?: "light" | "filled" | "outline";
  icon?: ReactNode;
  withCloseButton?: boolean;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      title,
      color = "primary",
      variant = "light",
      icon,
      withCloseButton = false,
      onClose,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-justui="alert"
      role="alert"
      className={cn(
        "relative flex w-full gap-3 rounded-lg px-4 py-3 text-sm",
        colorClasses[color][variant],
        className,
      )}
      {...props}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">
        {title && <div className="mb-1 font-medium leading-none tracking-tight">{title}</div>}
        {children && <div className="opacity-90">{children}</div>}
      </div>
      {withCloseButton && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 shrink-0 self-start rounded p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  ),
);
Alert.displayName = "Alert";
