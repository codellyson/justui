"use client";

import { forwardRef, useId, useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { useListboxNav } from "../lib/listbox.js";
import { controlText, type ControlSize } from "../lib/control-sizes.js";
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon, XIcon } from "../lib/icons.js";
import { Badge } from "./badge.js";
import { Popover } from "./popover.js";

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

const triggerSizes: Record<ControlSize, string> = {
  xs: cn("min-h-7", controlText.xs),
  sm: cn("min-h-8", controlText.sm),
  md: cn("min-h-9", controlText.md),
  lg: cn("min-h-11", controlText.lg),
};

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  withSelectAll?: boolean;
  maxDisplayed?: number;
  renderValue?: (selected: MultiSelectOption[]) => ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      description,
      error,
      placeholder = "Select…",
      size = "md",
      disabled,
      searchable = true,
      searchPlaceholder = "Search…",
      emptyMessage = "Nothing found",
      withSelectAll = false,
      maxDisplayed = 3,
      renderValue,
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
    },
    ref,
  ) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    const selected = useMemo(
      () => options.filter((o) => value.includes(o.value)),
      [options, value],
    );
    const filtered = useMemo(() => {
      if (!query || !searchable) return options;
      const q = query.toLowerCase();
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query, searchable]);

    const selectable = options.filter((o) => !o.disabled);
    const allSelected = selectable.length > 0 && selectable.every((o) => value.includes(o.value));

    const nav = useListboxNav({
      items: filtered.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled })),
      opened: open,
      multiple: true,
      onSelect: (v) => {
        const hit = filtered.find((o) => o.value === v);
        if (hit) toggle(hit);
      },
    });

    const toggle = (option: MultiSelectOption) => {
      if (option.disabled) return;
      onChange(
        value.includes(option.value)
          ? value.filter((v) => v !== option.value)
          : [...value, option.value],
      );
    };

    const chips = selected.slice(0, maxDisplayed);
    const overflow = selected.length - chips.length;

    return (
      <div data-justui="multiselect-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}

        <Popover position="bottom" opened={open} onChange={setOpen}>
          <Popover.Target asChild>
            <button
              ref={ref}
              id={id}
              type="button"
              disabled={disabled}
              data-justui="multiselect"
              aria-invalid={hasError || undefined}
              aria-describedby={message ? messageId : undefined}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md border bg-bg-secondary px-2 py-1 text-left text-primary focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                triggerSizes[size],
                hasError
                  ? "border-danger focus-visible:ring-danger"
                  : "border-border focus-visible:ring-accent",
                className,
              )}
            >
              <span className="flex min-w-0 flex-wrap items-center gap-1">
                {selected.length === 0 && <span className="px-1 text-muted">{placeholder}</span>}
                {renderValue
                  ? renderValue(selected)
                  : chips.map((o) => (
                      <Badge key={o.value} variant="light" color="gray">
                        {o.label}
                      </Badge>
                    ))}
                {!renderValue && overflow > 0 && (
                  <Badge variant="light" color="gray">
                    +{overflow} more
                  </Badge>
                )}
              </span>
              <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-60" />
            </button>
          </Popover.Target>

          <Popover.Dropdown
            className={cn("w-[var(--radix-popover-trigger-width)] p-0", dropdownClassName)}
          >
            {searchable && (
              <div className="relative border-b border-border">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  autoFocus
                  value={query}
                  role="combobox"
                  aria-expanded={open}
                  aria-activedescendant={nav.activeDescendant}
                  onKeyDown={nav.onKeyDown}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className="h-9 w-full bg-transparent pl-9 pr-8 text-sm text-primary placeholder:text-muted focus-visible:outline-hidden"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            <div role="listbox" aria-multiselectable="true" className="max-h-64 overflow-y-auto p-1">
              {withSelectAll && filtered.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    onChange(allSelected ? [] : selectable.map((o) => o.value))
                  }
                  className="mb-1 flex w-full items-center gap-2 rounded-sm border-b border-border px-2 py-1.5 text-sm text-secondary hover:bg-bg-secondary hover:text-primary"
                >
                  {allSelected ? "Clear all" : "Select all"}
                </button>
              )}

              {filtered.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-muted">{emptyMessage}</p>
              ) : (
                filtered.map((o, i) => {
                  const checked = value.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      id={nav.optionId(i)}
                      type="button"
                      role="option"
                      aria-selected={checked}
                      disabled={o.disabled}
                      onClick={() => toggle(o)}
                      onPointerMove={() => !o.disabled && nav.setActiveIndex(i)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-primary disabled:pointer-events-none disabled:opacity-50",
                        i === nav.activeIndex ? "bg-bg-secondary" : "hover:bg-bg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border",
                          checked ? "border-accent bg-accent text-bg" : "border-border",
                        )}
                      >
                        {checked && <CheckIcon className="h-3 w-3" />}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{o.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </Popover.Dropdown>
        </Popover>

        {message && (
          <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
            {message}
          </p>
        )}
      </div>
    );
  },
);
MultiSelect.displayName = "MultiSelect";
