import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-justui="skeleton" className={cn("animate-pulse rounded-md bg-bg-secondary", className)} {...props} />;
}
