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

export interface ListboxNav {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  /** Attach to whatever holds focus — the list itself, or a combobox's input. */
  onKeyDown: (event: React.KeyboardEvent) => void;
  optionId: (index: number) => string;
  activeDescendant: string | undefined;
}

/**
 * Roving-focus behaviour for a listbox, separated from the markup because the two
 * shapes differ in where focus lives: a button-triggered listbox focuses itself,
 * while a combobox keeps the caret in its input and only moves the active option.
 */
export function useListboxNav({
  items,
  opened,
  onSelect,
  multiple = false,
  onClose,
  initialIndex,
}: {
  items: ListboxItem[];
  opened: boolean;
  onSelect: (value: string) => void;
  multiple?: boolean;
  onClose?: () => void;
  initialIndex?: number;
}): ListboxNav {
  const baseId = useRef(`justui-listbox-${Math.random().toString(36).slice(2, 8)}`).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const typed = useRef({ text: "", at: 0 });

  useEffect(() => {
    if (!opened) return;
    const first = items.findIndex((i) => !i.disabled);
    setActiveIndex(initialIndex != null && initialIndex >= 0 ? initialIndex : first);
  }, [opened]);

  // A filtered list can shrink under the cursor.
  useEffect(() => {
    if (activeIndex > items.length - 1) setActiveIndex(items.findIndex((i) => !i.disabled));
  }, [items.length, activeIndex]);

  const step = (from: number, delta: number) => {
    if (!items.some((i) => !i.disabled)) return from;
    let next = from;
    for (let i = 0; i < items.length; i += 1) {
      next = (next + delta + items.length) % items.length;
      if (!items[next]?.disabled) return next;
    }
    return from;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((a) => step(a, 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((a) => step(a, -1));
        return;
      case "Home":
        event.preventDefault();
        setActiveIndex(items.findIndex((i) => !i.disabled));
        return;
      case "End":
        event.preventDefault();
        setActiveIndex(step(0, -1));
        return;
      case "Enter": {
        const item = items[activeIndex];
        if (!item || item.disabled) return;
        event.preventDefault();
        onSelect(item.value);
        if (!multiple) onClose?.();
        return;
      }
      default:
        break;
    }

    // Typeahead only where the key isn't already text input.
    if (event.currentTarget instanceof HTMLInputElement) return;
    if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === " ") {
      const item = items[activeIndex];
      if (item && !item.disabled) {
        event.preventDefault();
        onSelect(item.value);
        if (!multiple) onClose?.();
      }
      return;
    }
    const now = Date.now();
    typed.current.text = now - typed.current.at > 700 ? event.key : typed.current.text + event.key;
    typed.current.at = now;
    const hit = items.findIndex((i) => !i.disabled && textOf(i).startsWith(typed.current.text.toLowerCase()));
    if (hit >= 0) setActiveIndex(hit);
  };

  return {
    activeIndex,
    setActiveIndex,
    onKeyDown,
    optionId: (index: number) => `${baseId}-${index}`,
    activeDescendant: items[activeIndex] ? `${baseId}-${activeIndex}` : undefined,
  };
}

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
  const nav = useListboxNav({
    items,
    opened: isOpen,
    onSelect,
    multiple,
    onClose: () => setOpen(false),
    initialIndex: items.findIndex((i) => selected.has(i.value) && !i.disabled),
  });

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current
      ?.querySelector(`#${nav.optionId(nav.activeIndex)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [nav.activeIndex, isOpen]);

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
          aria-activedescendant={nav.activeDescendant}
          onKeyDown={nav.onKeyDown}
          className={cn("max-h-72 overflow-y-auto p-1 outline-hidden", listClassName)}
        >
          {items.length === 0 && (
            <p className="px-2 py-3 text-center text-sm text-muted">{emptyLabel}</p>
          )}
          {items.map((item, index) => (
            <div
              key={item.value}
              id={nav.optionId(index)}
              role="option"
              aria-selected={selected.has(item.value)}
              aria-disabled={item.disabled || undefined}
              onClick={() => {
                if (item.disabled) return;
                onSelect(item.value);
                if (!multiple) setOpen(false);
              }}
              onPointerMove={() => !item.disabled && nav.setActiveIndex(index)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                item.disabled && "pointer-events-none opacity-50",
                index === nav.activeIndex ? "bg-bg-secondary text-primary" : "text-secondary",
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
