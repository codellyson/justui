"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { ChevronRightIcon } from "../lib/icons.js";

export interface BreadcrumbProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  children: ReactNode;
  separator?: ReactNode;
  /** Collapse the middle to an ellipsis once there are more crumbs than this. */
  maxItems?: number;
}

const BreadcrumbNav = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, separator, maxItems, ...props }, ref) => {
    const items = Children.toArray(children).filter(isValidElement);
    const collapsed =
      maxItems != null && items.length > maxItems
        ? [items[0], <BreadcrumbEllipsis key="ellipsis" />, ...items.slice(-(maxItems - 1))]
        : items;

    return (
      <nav ref={ref} aria-label="Breadcrumb" data-justui="breadcrumb" {...props}>
        <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", className)}>
          {collapsed.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="shrink-0 text-muted">
                  {separator ?? <ChevronRightIcon className="h-3.5 w-3.5" />}
                </span>
              )}
              {item}
            </li>
          ))}
        </ol>
      </nav>
    );
  },
);
BreadcrumbNav.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<"a"> {
  current?: boolean;
}

const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, current = false, href, children, ...props }, ref) => {
    if (current || !href) {
      return (
        <span
          data-justui="breadcrumb-item"
          aria-current={current ? "page" : undefined}
          className={cn(current ? "font-medium text-primary" : "text-muted", className)}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        data-justui="breadcrumb-item"
        className={cn(
          // An inline link takes an underline on focus; a ring boxes the text.
          "rounded text-secondary outline-none hover:text-primary hover:underline focus-visible:text-primary focus-visible:underline",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
BreadcrumbItem.displayName = "Breadcrumb.Item";

const BreadcrumbEllipsis = () => (
  <span data-justui="breadcrumb-ellipsis" className="px-0.5 text-muted">
    <span aria-hidden="true">…</span>
    <span className="sr-only">Hidden levels</span>
  </span>
);
BreadcrumbEllipsis.displayName = "Breadcrumb.Ellipsis";

export { BreadcrumbEllipsis, BreadcrumbItem };

export const Breadcrumb = Object.assign(BreadcrumbNav, {
  Item: BreadcrumbItem,
  Ellipsis: BreadcrumbEllipsis,
});
