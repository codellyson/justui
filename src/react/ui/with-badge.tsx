"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Badge, type BadgeColor, type BadgeProps } from "./badge.js";

const positions = {
  "top-right": "-right-1.5 -top-1.5",
  "top-left": "-left-1.5 -top-1.5",
  "bottom-right": "-bottom-1.5 -right-1.5",
  "bottom-left": "-bottom-1.5 -left-1.5",
} as const;

export interface WithBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  children: ReactNode;
  badge: ReactNode;
  variant?: BadgeProps["variant"];
  color?: BadgeColor;
  size?: BadgeProps["size"];
  position?: keyof typeof positions;
  badgeClassName?: string;
  hidden?: boolean;
}

export const WithBadge = forwardRef<HTMLSpanElement, WithBadgeProps>(
  (
    {
      className,
      children,
      badge,
      variant = "solid",
      color = "red",
      size = "sm",
      position = "top-right",
      badgeClassName,
      hidden = false,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      data-justui="with-badge"
      className={cn("relative inline-flex shrink-0", className)}
      {...props}
    >
      {children}
      {!hidden && (
        <Badge
          variant={variant}
          color={color}
          size={size}
          className={cn("absolute z-10", positions[position], badgeClassName)}
        >
          {badge}
        </Badge>
      )}
    </span>
  ),
);
WithBadge.displayName = "WithBadge";
