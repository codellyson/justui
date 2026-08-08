"use client";

import { forwardRef, type BlockquoteHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

const variants = {
  default: "border-l-muted bg-bg-secondary text-secondary",
  info: "border-l-accent bg-accent/5 text-secondary",
  warning: "border-l-warning bg-warning/5 text-secondary",
  success: "border-l-success bg-success/5 text-secondary",
} as const;

export interface BlockquoteProps
  extends Omit<BlockquoteHTMLAttributes<HTMLQuoteElement>, "cite"> {
  variant?: keyof typeof variants;
  icon?: ReactNode;
  cite?: ReactNode;
}

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, variant = "default", icon, cite, children, ...props }, ref) => (
    <blockquote
      ref={ref}
      data-justui="blockquote"
      className={cn("flex items-start gap-3 border-l-2 py-3 pl-4 pr-3 text-sm", variants[variant], className)}
      {...props}
    >
      {icon && <span className="flex h-5 shrink-0 items-center justify-center leading-none [&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
      <div className="min-w-0 flex-1">
        {children}
        {cite && <cite className="mt-2 block text-xs not-italic text-muted">— {cite}</cite>}
      </div>
    </blockquote>
  ),
);
Blockquote.displayName = "Blockquote";
