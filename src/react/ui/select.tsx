"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, useId, useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import {
  controlHeight,
  controlText,
  type ControlSize,
} from "../lib/control-sizes.js";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "../lib/icons.js";
import { Popover } from "./popover.js";

export interface SelectOption {
  label: string;
  subLabel?: string;
  value: string | number;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectGroupedOptions {
  group: string;
  items: SelectOption[];
}

const triggerSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface SelectProps {
  options: (SelectOption | SelectGroupedOptions)[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  size?: ControlSize;
  leftIcon?: ReactNode;
  position?: "popper" | "item-aligned";
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
  renderOption?: (option: SelectOption) => ReactNode;
}

const isGroup = (
  o: SelectOption | SelectGroupedOptions,
): o is SelectGroupedOptions => "group" in o;

function Option({
  option,
  renderOption,
}: {
  option: SelectOption;
  renderOption?: (option: SelectOption) => ReactNode;
}) {
  return (
    <SelectPrimitive.Item
      value={String(option.value)}
      disabled={option.disabled}
      data-justui="select-option"
      className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-bg-secondary focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      {option.icon && <span className="shrink-0">{option.icon}</span>}
      {renderOption ? (
        <SelectPrimitive.ItemText>
          {renderOption(option)}
        </SelectPrimitive.ItemText>
      ) : (
        <SelectPrimitive.ItemText>
          <span className="flex flex-col">
            <span>{option.label}</span>
            {option.subLabel && (
              <span className="text-xs text-muted">{option.subLabel}</span>
            )}
          </span>
        </SelectPrimitive.ItemText>
      )}
    </SelectPrimitive.Item>
  );
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      label,
      description,
      error,
      placeholder,
      disabled,
      name,
      size = "md",
      leftIcon,
      position = "popper",
      searchable = false,
      searchPlaceholder = "Search…",
      emptyMessage = "Nothing found",
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
      renderOption,
    },
    ref,
  ) => {
    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    if (searchable) {
      return (
        <SearchableSelect
          {...{
            options,
            value,
            defaultValue,
            onChange,
            label,
            placeholder,
            disabled,
            name,
            size,
            leftIcon,
            className,
            containerClassName,
            labelClassName,
            dropdownClassName,
            renderOption,
            searchPlaceholder,
            emptyMessage,
            id,
            messageId,
            hasError,
            message,
          }}
          ref={ref}
        />
      );
    }

    return (
      <div
        data-justui="select-wrapper"
        className={cn("flex flex-col gap-1.5", containerClassName)}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-xs font-medium uppercase tracking-wider text-muted",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <SelectPrimitive.Root
          value={value == null ? undefined : String(value)}
          defaultValue={defaultValue == null ? undefined : String(defaultValue)}
          onValueChange={onChange}
          disabled={disabled}
          name={name}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            id={id}
            data-justui="select"
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-md border bg-bg-secondary px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              triggerSizes[size],
              hasError
                ? "border-danger focus-visible:ring-danger"
                : "border-border focus-visible:ring-accent",
              className,
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              {leftIcon && (
                <span className="shrink-0 text-muted">{leftIcon}</span>
              )}
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-60" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              data-justui="select-dropdown"
              position={position}
              className={cn(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-bg text-primary shadow-md",
                position === "popper" &&
                  "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
                dropdownClassName,
              )}
            >
              <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                <ChevronUpIcon className="h-4 w-4" />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport
                className={cn(
                  "p-1",
                  position === "popper" &&
                    "w-full min-w-[var(--radix-select-trigger-width)]",
                )}
              >
                {options.map((entry) =>
                  isGroup(entry) ? (
                    <SelectPrimitive.Group key={entry.group}>
                      <SelectPrimitive.Label className="px-2 py-1.5 text-xs font-semibold text-muted">
                        {entry.group}
                      </SelectPrimitive.Label>
                      {entry.items.map((o) => (
                        <Option
                          key={o.value}
                          option={o}
                          renderOption={renderOption}
                        />
                      ))}
                    </SelectPrimitive.Group>
                  ) : (
                    <Option
                      key={entry.value}
                      option={entry}
                      renderOption={renderOption}
                    />
                  ),
                )}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
                <ChevronDownIcon className="h-4 w-4" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {message && (
          <p
            id={messageId}
            className={cn("text-xs", hasError ? "text-danger" : "text-muted")}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

interface SearchableSelectProps {
  options: (SelectOption | SelectGroupedOptions)[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  size: ControlSize;
  leftIcon?: ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
  renderOption?: (option: SelectOption) => ReactNode;
  searchPlaceholder: string;
  emptyMessage: string;
  id: string;
  messageId: string;
  hasError: boolean;
  message?: ReactNode;
}

// Radix Select owns typeahead and item focus, so a filter input inside its
// content fights the primitive. The searchable variant is a Popover listbox
// instead — the same shape MultiSelect uses.
const SearchableSelect = forwardRef<HTMLButtonElement, SearchableSelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      label,
      placeholder,
      disabled,
      name,
      size,
      leftIcon,
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
      renderOption,
      searchPlaceholder,
      emptyMessage,
      id,
      messageId,
      hasError,
      message,
    },
    ref,
  ) => {
    const [query, setQuery] = useState("");
    const [opened, setOpened] = useState(false);
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const current = value ?? uncontrolled;

    const flat = useMemo(
      () => options.flatMap((entry) => (isGroup(entry) ? entry.items : [entry])),
      [options],
    );
    const selected = flat.find((option) => String(option.value) === String(current));

    const groups = useMemo(() => {
      const q = query.trim().toLowerCase();
      const match = (option: SelectOption) =>
        !q ||
        option.label.toLowerCase().includes(q) ||
        option.subLabel?.toLowerCase().includes(q);

      return options
        .map((entry) =>
          isGroup(entry)
            ? { group: entry.group as string | undefined, items: entry.items.filter(match) }
            : { group: undefined, items: [entry].filter(match) },
        )
        .filter((entry) => entry.items.length > 0);
    }, [options, query]);

    const hits = groups.reduce((total, entry) => total + entry.items.length, 0);

    const pick = (option: SelectOption) => {
      if (value == null) setUncontrolled(option.value);
      onChange?.(String(option.value));
      setOpened(false);
      setQuery("");
    };

    return (
      <div
        data-justui="select-wrapper"
        className={cn("flex flex-col gap-1.5", containerClassName)}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-xs font-medium uppercase tracking-wider text-muted",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <Popover
          opened={opened}
          onChange={(next) => {
            setOpened(next);
            if (!next) setQuery("");
          }}
          position="bottom"
        >
          <Popover.Target asChild>
            <button
              ref={ref}
              id={id}
              type="button"
              role="combobox"
              aria-expanded={opened}
              aria-haspopup="listbox"
              disabled={disabled}
              data-justui="select"
              aria-invalid={hasError || undefined}
              aria-describedby={message ? messageId : undefined}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md border bg-bg-secondary px-3 text-left text-primary focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                triggerSizes[size],
                hasError
                  ? "border-danger focus-visible:ring-danger"
                  : "border-border focus-visible:ring-accent",
                className,
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                {leftIcon && <span className="shrink-0 text-muted">{leftIcon}</span>}
                {selected ? (
                  <span className="truncate">{selected.label}</span>
                ) : (
                  <span className="truncate text-muted">{placeholder}</span>
                )}
              </span>
              <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-60" />
            </button>
          </Popover.Target>

          <Popover.Dropdown
            className={cn("w-[var(--radix-popover-trigger-width)] p-0", dropdownClassName)}
          >
            <div className="relative border-b border-border">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-9 w-full bg-transparent pl-9 pr-8 text-sm text-primary placeholder:text-muted focus-visible:outline-none"
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

            <div role="listbox" className="max-h-64 overflow-y-auto p-1">
              {hits === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-muted">{emptyMessage}</p>
              ) : (
                groups.map((entry, i) => (
                  <div key={entry.group ?? `ungrouped-${i}`} role="group">
                    {entry.group && (
                      <p className="px-2 py-1.5 text-xs font-semibold text-muted">{entry.group}</p>
                    )}
                    {entry.items.map((option) => {
                      const active = String(option.value) === String(current);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={active}
                          disabled={option.disabled}
                          onClick={() => pick(option)}
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-primary hover:bg-bg-secondary disabled:pointer-events-none disabled:opacity-50"
                        >
                          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                            {active && <CheckIcon className="h-4 w-4" />}
                          </span>
                          {option.icon && <span className="shrink-0">{option.icon}</span>}
                          {renderOption ? (
                            renderOption(option)
                          ) : (
                            <span className="flex min-w-0 flex-col">
                              <span className="truncate">{option.label}</span>
                              {option.subLabel && (
                                <span className="text-xs text-muted">{option.subLabel}</span>
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </Popover.Dropdown>
        </Popover>

        {name && <input type="hidden" name={name} value={current == null ? "" : String(current)} />}

        {message && (
          <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
            {message}
          </p>
        )}
      </div>
    );
  },
);
SearchableSelect.displayName = "SearchableSelect";
