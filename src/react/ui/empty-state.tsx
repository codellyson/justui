"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Button, type ButtonProps } from "./button.js";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
  leftIcon?: ReactNode;
}

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, primaryAction, secondaryAction, children, ...props }, ref) => (
    <div
      ref={ref}
      data-justui="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && <div className="text-muted [&>svg]:h-10 [&>svg]:w-10">{icon}</div>}
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      {description && <p className="max-w-sm text-sm text-secondary">{description}</p>}
      {children}
      {(primaryAction || secondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {primaryAction && (
            <Button
              variant={primaryAction.variant ?? "primary"}
              leftIcon={primaryAction.leftIcon}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant ?? "outline"}
              color="gray"
              leftIcon={secondaryAction.leftIcon}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
