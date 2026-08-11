"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-justui="skeleton"
      className={cn("animate-pulse rounded-md bg-bg-secondary", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
