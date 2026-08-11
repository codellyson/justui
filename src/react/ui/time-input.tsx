"use client";

import { forwardRef, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { ClockIcon } from "../lib/icons.js";
import { Popover } from "./popover.js";

export type TimeFormat = "12h" | "24h";

// Strict "h:mm" with optional AM/PM; a bare 24h hour ("14") also parses.
const parseTime = (input: string): { hours: number; minutes: number } | null => {
  const match = input.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([AP]M?)?$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3]?.toUpperCase();
  if (minutes > 59) return null;
  if (period) {
    if (hours < 1 || hours > 12) return null;
    if (period.startsWith("P") && hours < 12) hours += 12;
    if (period.startsWith("A") && hours === 12) hours = 0;
  } else if (hours > 23) {
    return null;
  }
  return { hours, minutes };
};

export const toTimeDate = (value: Date | string | null | undefined): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value;
  const parsed = parseTime(value);
  if (parsed) {
    const d = new Date();
    d.setHours(parsed.hours, parsed.minutes, 0, 0);
    return d;
  }
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
};

export const formatTime = (date: Date | undefined, format: TimeFormat = "12h"): string => {
  if (!date) return "";
  const h24 = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  if (format === "24h") return `${String(h24).padStart(2, "0")}:${m}`;
  const h12 = h24 % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${m} ${h24 >= 12 ? "PM" : "AM"}`;
};

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface TimeInputProps {
  value?: Date | string | null;
  onChange?: (date: Date) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  format?: TimeFormat;
  minuteStep?: number;
  size?: ControlSize;
  disabled?: boolean;
  name?: string;
  withDropdown?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      value,
      onChange,
      label,
      description,
      error,
      placeholder,
      format = "12h",
      minuteStep = 30,
      size = "md",
      disabled,
      name,
      withDropdown = true,
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
    },
    ref,
  ) => {
    const selected = toTimeDate(value);
    const [opened, setOpened] = useState(false);
    const [text, setText] = useState(() => formatTime(selected, format));
    const listRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const messageId = `${id}-message`;

    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    const formatRef = useRef(format);

    useEffect(() => {
      const next = toTimeDate(value);
      const typed = parseTime(text);
      const draftMeansValue =
        !!typed &&
        !!next &&
        typed.hours === next.getHours() &&
        typed.minutes === next.getMinutes();
      // Reformatting a draft that already means `value` would rewrite the field
      // mid-keystroke: "1" parses as 01:00, so the next digit would land after
      // "01:00 AM". Only a value from elsewhere, or a format switch, resyncs.
      if (draftMeansValue && formatRef.current === format) return;
      formatRef.current = format;
      setText(formatTime(next, format));
    }, [value, format]);

    const options = useMemo(() => {
      const list: { label: string; hours: number; minutes: number }[] = [];
      const probe = new Date();
      for (let mins = 0; mins < 24 * 60; mins += minuteStep) {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        probe.setHours(hours, minutes, 0, 0);
        list.push({ label: formatTime(probe, format), hours, minutes });
      }
      return list;
    }, [minuteStep, format]);

    const activeIndex = selected
      ? Math.round((selected.getHours() * 60 + selected.getMinutes()) / minuteStep) % options.length
      : -1;

    const emit = (hours: number, minutes: number) => {
      const next = new Date(selected ?? new Date());
      next.setHours(hours, minutes, 0, 0);
      onChange?.(next);
    };

    const handleText = (input: string) => {
      setText(input);
      const parsed = parseTime(input);
      if (parsed) emit(parsed.hours, parsed.minutes);
    };

    return (
      <div
        data-justui="time-input-wrapper"
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

        <Popover opened={opened && withDropdown} onChange={setOpened} position="bottom">
          <Popover.Anchor asChild>
            <div
              data-justui="time-input"
              className={cn(
                "flex items-stretch overflow-hidden rounded-md border bg-bg-secondary focus-within:ring-2",
                controlSizes[size],
                hasError
                  ? "border-danger focus-within:ring-danger"
                  : "border-border focus-within:ring-accent",
                disabled && "cursor-not-allowed opacity-50",
                className,
              )}
            >
              <input
                ref={ref}
                id={id}
                name={name}
                type="text"
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder ?? (format === "12h" ? "hh:mm AM/PM" : "HH:MM")}
                value={text}
                aria-invalid={hasError || undefined}
                aria-describedby={message ? messageId : undefined}
                onChange={(e) => handleText(e.target.value)}
                onBlur={() => setText(formatTime(toTimeDate(value), format))}
                className="min-w-0 flex-1 bg-transparent px-3 text-primary placeholder:text-muted focus-visible:outline-hidden disabled:cursor-not-allowed"
              />

              {withDropdown && (
                <Popover.Target asChild>
                  <button
                    type="button"
                    tabIndex={-1}
                    disabled={disabled}
                    aria-label="Open time options"
                    className="flex w-9 shrink-0 items-center justify-center text-muted hover:text-primary focus-visible:outline-hidden disabled:cursor-not-allowed"
                  >
                    <ClockIcon className="h-4 w-4" />
                  </button>
                </Popover.Target>
              )}
            </div>
          </Popover.Anchor>

          <Popover.Dropdown
            onOpenAutoFocus={(e) => {
              // Keep the caret in the field so the value stays typeable.
              e.preventDefault();
              listRef.current
                ?.querySelector('[data-active="true"]')
                ?.scrollIntoView({ block: "center" });
            }}
            className={cn("w-[var(--radix-popover-trigger-width)] min-w-40 p-1", dropdownClassName)}
          >
            <div ref={listRef} role="listbox" className="max-h-60 overflow-y-auto">
              {options.map((o, i) => (
                <button
                  key={o.label}
                  type="button"
                  role="option"
                  aria-selected={i === activeIndex}
                  data-active={i === activeIndex || undefined}
                  onClick={() => {
                    emit(o.hours, o.minutes);
                    setOpened(false);
                  }}
                  className={cn(
                    "w-full rounded-sm px-3 py-1.5 text-left text-sm hover:bg-bg-secondary",
                    i === activeIndex ? "bg-bg-secondary font-medium text-accent" : "text-primary",
                  )}
                >
                  {o.label}
                </button>
              ))}
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
TimeInput.displayName = "TimeInput";
