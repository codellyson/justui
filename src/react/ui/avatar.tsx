"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

const sizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
} as const;

export type AvatarSize = keyof typeof sizes;

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  name?: string;
  alt?: string;
  size?: AvatarSize;
  radius?: "full" | "md";
  fallback?: ReactNode;
  delayMs?: number;
}

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    { className, src, name, alt, size = "md", radius = "full", fallback, delayMs, ...props },
    ref,
  ) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-justui="avatar"
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-bg-secondary align-middle",
        radius === "full" ? "rounded-full" : "rounded-md",
        sizes[size],
        className,
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? name ?? ""}
          className="h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        delayMs={delayMs}
        className="flex h-full w-full items-center justify-center font-medium text-secondary"
      >
        {fallback ?? (name ? initialsOf(name) : null)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  ),
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends ComponentPropsWithoutRef<"div"> {
  /** Collapse the tail past this many into a "+N" avatar. */
  max?: number;
  size?: AvatarSize;
  spacing?: "sm" | "md";
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, size = "md", spacing = "md", ...props }, ref) => {
    const items = Array.isArray(children) ? children.flat() : [children];
    const shown = max == null ? items : items.slice(0, max);
    const overflow = items.length - shown.length;

    return (
      <div
        ref={ref}
        data-justui="avatar-group"
        className={cn(
          "flex items-center",
          spacing === "sm" ? "-space-x-1.5" : "-space-x-2",
          "[&>*]:ring-2 [&>*]:ring-bg",
          className,
        )}
        {...props}
      >
        {shown}
        {overflow > 0 && (
          <Avatar size={size} fallback={`+${overflow}`} aria-label={`${overflow} more`} />
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
