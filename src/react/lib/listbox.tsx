"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Popover } from "../ui/popover.js";
import { cn } from "./cn.js";

export interface ListboxItem {
  value: string;
  label: ReactNode;
  /** Matched by typeahead and search; falls back to `label` when it is a string. */
  searchText?: string;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

export interface ListboxProps {
  items: ListboxItem[];
  /** A string, or an array when `multiple`. */
  value?: string | string[];
  onSelect: (value: string) => void;
  target: ReactNode;
  opened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  multiple?: boolean;
  /** Rendered above the options — a search field, a select-all row. */
  header?: ReactNode;
  emptyLabel?: ReactNode;
  width?: number | string;
  align?: "start" | "center" | "end";
  className?: string;
  listClassName?: string;
  "aria-label"?: string;
}

const textOf = (item: ListboxItem) =>
  (item.searchText ?? (typeof item.label === "string" ? item.label : "")).toLowerCase();

/**
 * The one dropdown that picks a value: role="listbox" with arrow-key roving focus.
 * A menu is for commands and announces `menuitem`, and a bare popover announces
 * nothing — neither is right for choosing a country, a currency or a time.
 * Built on Popover, which is non-modal, so opening one never locks page scroll.
 */
export function Listbox({
  items,
  value,
  onSelect,
  target,
  opened,
  onOpenChange,
  multiple = false,
  header,
  emptyLabel = "Nothing found",
  width,
  align = "start",
  className,
  listClassName,
  "aria-label": ariaLabel,
}: ListboxProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const isOpen = opened ?? uncontrolled;
  const setOpen = (next: boolean) => {
    if (opened == null) setUncontrolled(next);
    onOpenChange?.(next);
  };

  const selected = useMemo(
    () => new Set(Array.isArray(value) ? value : value == null ? [] : [value]),
    [value],
  );

  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useRef(`justui-listbox-${Math.random().toString(36).slice(2, 8)}`).current;
  const enabled = items.filter((i) => !i.disabled);
  const firstSelected = items.findIndex((i) => selected.has(i.value) && !i.disabled);
  const [active, setActive] = useState(0);
  const typed = useRef({ text: "", at: 0 });

  useEffect(() => {
    if (!isOpen) return;
    setActive(firstSelected >= 0 ? firstSelected : items.findIndex((i) => !i.disabled));
    listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current
      ?.querySelector(`#${baseId}-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, isOpen, baseId]);

  const step = (from: number, delta: number) => {
    if (!enabled.length) return from;
    let next = from;
    for (let i = 0; i < items.length; i += 1) {
      next = (next + delta + items.length) % items.length;
      if (!items[next]?.disabled) return next;
    }
    return from;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((a) => step(a, 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        setActive((a) => step(a, -1));
        return;
      case "Home":
        event.preventDefault();
        setActive(items.findIndex((i) => !i.disabled));
        return;
      case "End":
        event.preventDefault();
        setActive(step(0, -1));
        return;
      case "Enter":
      case " ": {
        const item = items[active];
        if (!item || item.disabled) return;
        event.preventDefault();
        onSelect(item.value);
        if (!multiple) setOpen(false);
        return;
      }
      default:
        break;
    }

    // Typeahead: a long list of countries is unusable without it.
    if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;
    const now = Date.now();
    typed.current.text = now - typed.current.at > 700 ? event.key : typed.current.text + event.key;
    typed.current.at = now;
    const query = typed.current.text.toLowerCase();
    const hit = items.findIndex((i) => !i.disabled && textOf(i).startsWith(query));
    if (hit >= 0) setActive(hit);
  };

  return (
    <Popover opened={isOpen} onChange={setOpen} position="bottom">
      <Popover.Target asChild>{target}</Popover.Target>
      <Popover.Dropdown align={align} width={width} className={cn("p-0", className)}>
        {header}
        <div
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-multiselectable={multiple || undefined}
          aria-activedescendant={items[active] ? `${baseId}-${active}` : undefined}
          onKeyDown={onKeyDown}
          className={cn("max-h-72 overflow-y-auto p-1 outline-hidden", listClassName)}
        >
          {items.length === 0 && (
            <p className="px-2 py-3 text-center text-sm text-muted">{emptyLabel}</p>
          )}
          {items.map((item, index) => (
            <div
              key={item.value}
              id={`${baseId}-${index}`}
              role="option"
              aria-selected={selected.has(item.value)}
              aria-disabled={item.disabled || undefined}
              onClick={() => {
                if (item.disabled) return;
                onSelect(item.value);
                if (!multiple) setOpen(false);
              }}
              onPointerMove={() => !item.disabled && setActive(index)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                item.disabled && "pointer-events-none opacity-50",
                index === active ? "bg-bg-secondary text-primary" : "text-secondary",
                selected.has(item.value) && "font-medium text-primary",
              )}
            >
              {item.leftSection}
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.rightSection}
            </div>
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
