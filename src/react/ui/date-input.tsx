"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "../lib/icons.js";
import { Popover } from "./popover.js";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type PanelSize = "sm" | "md" | "lg";

const panelSizes = {
  sm: {
    container: "p-2",
    dayButton: "h-8 w-8 text-xs",
    header: "h-8 text-sm",
    body: "min-h-[210px]",
    picker: "h-[210px]",
    pickerButton: "px-2 py-1.5 text-xs",
    gap: "gap-0.5",
  },
  md: {
    container: "p-3",
    dayButton: "h-9 w-9 text-sm",
    header: "h-9 text-base",
    body: "min-h-[252px]",
    picker: "h-[252px]",
    pickerButton: "px-3 py-2 text-sm",
    gap: "gap-1",
  },
  lg: {
    container: "p-4",
    dayButton: "h-11 w-11 text-sm",
    header: "h-11 text-lg",
    body: "min-h-[312px]",
    picker: "h-[312px]",
    pickerButton: "px-4 py-2.5 text-sm",
    gap: "gap-1.5",
  },
} as const;

export const toDate = (value: Date | string | null | undefined): Date | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") {
    // Parse date-only strings as local time — new Date('yyyy-mm-dd') is UTC
    // midnight, which renders as the previous day west of UTC.
    const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnly) {
      const d = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
      return isNaN(d.getTime()) ? undefined : d;
    }
  }
  const d = value instanceof Date ? value : new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
};

export const formatDate = (date: Date | undefined): string => {
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
};

// Strict MM/DD/YYYY (and M/D/YYYY); rejects impossible dates like 02/31.
const parseDate = (input: string): Date | undefined => {
  const match = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return undefined;
  const month = parseInt(match[1], 10) - 1;
  const day = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  const date = new Date(year, month, day);
  const valid = date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  return valid ? date : undefined;
};

const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const navButton =
  "flex shrink-0 items-center justify-center rounded-md p-1.5 text-secondary hover:bg-bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40";

const dayCell = "rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const outsideDay = (size: PanelSize) =>
  cn(panelSizes[size].dayButton, dayCell, "cursor-default text-muted/50");

interface MonthGrid {
  year: number;
  month: number;
  firstDay: number;
  daysInMonth: number;
  daysInPrevMonth: number;
}

const monthGrid = (viewDate: Date): MonthGrid => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  return {
    year,
    month,
    firstDay: new Date(year, month, 1).getDay(),
    daysInMonth: new Date(year, month + 1, 0).getDate(),
    daysInPrevMonth: new Date(year, month, 0).getDate(),
  };
};

const DayNames = ({ size }: { size: PanelSize }) => (
  <div className={cn("mb-1 grid grid-cols-7", panelSizes[size].gap)}>
    {DAYS.map((d) => (
      <div
        key={d}
        className={cn(
          panelSizes[size].dayButton,
          "flex items-center justify-center font-medium text-muted",
        )}
      >
        {d.slice(0, size === "sm" ? 2 : 3)}
      </div>
    ))}
  </div>
);

export interface DatePickerPanelProps {
  value?: Date | string | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateBlocked?: (date: Date) => boolean;
  highlightToday?: boolean;
  size?: PanelSize;
  className?: string;
}

export function DatePickerPanel({
  value,
  onChange,
  minDate,
  maxDate,
  isDateBlocked,
  highlightToday = true,
  size = "sm",
  className,
}: DatePickerPanelProps) {
  const selected = toDate(value);
  const [viewDate, setViewDate] = useState(() => selected ?? new Date());
  const [picker, setPicker] = useState<"none" | "month" | "year">("none");
  const sizes = panelSizes[size];

  useEffect(() => {
    const next = toDate(value);
    if (next) setViewDate(next);
  }, [value]);

  const { year, month, firstDay, daysInMonth, daysInPrevMonth } = monthGrid(viewDate);

  const isDisabled = (day: number) => {
    const date = new Date(year, month, day);
    if (minDate && date < stripTime(minDate)) return true;
    if (maxDate && date > stripTime(maxDate)) return true;
    return !!isDateBlocked?.(date);
  };
  const isToday = (day: number) => {
    const t = new Date();
    return t.getDate() === day && t.getMonth() === month && t.getFullYear() === year;
  };
  const isSelected = (day: number) =>
    !!selected &&
    selected.getDate() === day &&
    selected.getMonth() === month &&
    selected.getFullYear() === year;

  const cells: ReactNode[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push(
      <button key={`prev-${i}`} type="button" disabled className={outsideDay(size)}>
        {daysInPrevMonth - i}
      </button>,
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const disabled = isDisabled(day);
    const active = isSelected(day);
    cells.push(
      <button
        key={`d-${day}`}
        type="button"
        disabled={disabled}
        aria-pressed={active}
        onClick={() => onChange?.(new Date(year, month, day))}
        className={cn(
          sizes.dayButton,
          dayCell,
          disabled
            ? "cursor-not-allowed text-muted/50"
            : active
              ? "bg-accent text-bg"
              : "text-primary hover:bg-bg-secondary",
          !active && !disabled && isToday(day) && highlightToday && "ring-1 ring-accent",
        )}
      >
        {day}
      </button>,
    );
  }
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let day = 1; cells.length < totalCells; day++) {
    cells.push(
      <button key={`next-${day}`} type="button" disabled className={outsideDay(size)}>
        {day}
      </button>,
    );
  }

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = year + 20; y >= year - 100; y--) list.push(y);
    return list;
  }, [year]);

  return (
    <div
      data-justui="date-picker-panel"
      className={cn("rounded-lg bg-bg text-primary", sizes.container, className)}
    >
      <div className={cn("mb-2 flex items-center justify-between", sizes.header)}>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          aria-label="Previous month"
          className={navButton}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1 font-semibold">
          <button
            type="button"
            onClick={() => setPicker(picker === "month" ? "none" : "month")}
            className="rounded px-2 py-1 hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {MONTHS[month]}
          </button>
          <button
            type="button"
            onClick={() => setPicker(picker === "year" ? "none" : "year")}
            className="rounded px-2 py-1 hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {year}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className={navButton}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className={sizes.body}>
        {picker === "year" && (
          <div className={cn(sizes.picker, "overflow-y-auto rounded-md border border-border")}>
            <div className={cn("grid grid-cols-3 p-1", sizes.gap)}>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    setViewDate(new Date(y, month, 1));
                    setPicker("none");
                  }}
                  className={cn(
                    sizes.pickerButton,
                    "rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    y === year ? "bg-accent text-bg" : "text-secondary hover:bg-bg-secondary",
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        )}
        {picker === "month" && (
          <div className={cn(sizes.picker, "flex items-center")}>
            <div className={cn("grid w-full grid-cols-3", sizes.gap)}>
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setViewDate(new Date(year, i, 1));
                    setPicker("none");
                  }}
                  className={cn(
                    sizes.pickerButton,
                    "rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    i === month ? "bg-accent text-bg" : "text-secondary hover:bg-bg-secondary",
                  )}
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        )}
        {picker === "none" && (
          <>
            <DayNames size={size} />
            <div className={cn("grid grid-cols-7", sizes.gap)}>{cells}</div>
          </>
        )}
      </div>
    </div>
  );
}

export interface MultiDatePickerPanelProps {
  value?: Date[];
  onChange?: (dates: Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  maxSelections?: number;
  disabled?: boolean;
  highlightToday?: boolean;
  size?: PanelSize;
  className?: string;
}

export function MultiDatePickerPanel({
  value = [],
  onChange,
  minDate,
  maxDate,
  maxSelections,
  disabled = false,
  highlightToday = true,
  size = "md",
  className,
}: MultiDatePickerPanelProps) {
  const effectiveMaxDate = useMemo(() => {
    if (maxDate) return maxDate;
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d;
  }, [maxDate]);

  const [viewDate, setViewDate] = useState(() => toDate(value[0]) ?? new Date());
  const sizes = panelSizes[size];

  const selectedTimes = useMemo(
    () =>
      new Set(
        value
          .map((d) => toDate(d))
          .filter((d): d is Date => !!d)
          .map((d) => stripTime(d).getTime()),
      ),
    [value],
  );

  const { year, month, firstDay, daysInMonth, daysInPrevMonth } = monthGrid(viewDate);

  const canGoPrev = !minDate || new Date(year, month, 0) >= stripTime(minDate);
  const canGoNext = new Date(year, month + 1, 1) <= effectiveMaxDate;

  const isDayDisabled = (day: number) => {
    const date = new Date(year, month, day);
    if (minDate && date < stripTime(minDate)) return true;
    return date > stripTime(effectiveMaxDate);
  };
  const isToday = (day: number) => {
    const t = new Date();
    return t.getDate() === day && t.getMonth() === month && t.getFullYear() === year;
  };

  const toggle = (day: number) => {
    if (disabled) return;
    const date = new Date(year, month, day);
    const time = date.getTime();
    const dates = value.map((d) => toDate(d)).filter((d): d is Date => !!d);
    if (selectedTimes.has(time)) {
      onChange?.(dates.filter((d) => stripTime(d).getTime() !== time));
      return;
    }
    if (maxSelections && dates.length >= maxSelections) return;
    onChange?.([...dates, date].sort((a, b) => a.getTime() - b.getTime()));
  };

  const cells: ReactNode[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push(
      <button key={`prev-${i}`} type="button" disabled className={outsideDay(size)}>
        {daysInPrevMonth - i}
      </button>,
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDisabled = isDayDisabled(day) || disabled;
    const active = selectedTimes.has(new Date(year, month, day).getTime());
    cells.push(
      <button
        key={`d-${day}`}
        type="button"
        disabled={dayDisabled}
        aria-pressed={active}
        onClick={() => toggle(day)}
        className={cn(
          sizes.dayButton,
          dayCell,
          active && "bg-accent text-bg",
          !active && dayDisabled && "cursor-not-allowed text-muted/50",
          !active && !dayDisabled && "text-primary hover:bg-bg-secondary",
          !active && !dayDisabled && isToday(day) && highlightToday && "ring-1 ring-accent",
        )}
      >
        {day}
      </button>,
    );
  }
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let day = 1; cells.length < totalCells; day++) {
    cells.push(
      <button key={`next-${day}`} type="button" disabled className={outsideDay(size)}>
        {day}
      </button>,
    );
  }

  return (
    <div
      data-justui="multi-date-picker-panel"
      className={cn("rounded-lg bg-bg text-primary", sizes.container, className)}
    >
      <div className={cn("mb-2 flex items-center justify-between", sizes.header)}>
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          aria-label="Previous month"
          className={navButton}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <div className="font-semibold">
          {MONTHS[month]} {year}
        </div>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className={navButton}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {selectedTimes.size > 0 && (
        <p className="mb-2 text-xs text-secondary">
          {selectedTimes.size} date{selectedTimes.size === 1 ? "" : "s"} selected
          {maxSelections != null && <span className="text-muted"> (max {maxSelections})</span>}
        </p>
      )}

      <DayNames size={size} />
      <div
        className={cn("grid grid-cols-7", sizes.gap, disabled && "pointer-events-none opacity-50")}
      >
        {cells}
      </div>
    </div>
  );
}

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface DateInputProps {
  value?: Date | string | null;
  onChange?: (date: Date) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  isDateBlocked?: (date: Date) => boolean;
  size?: ControlSize;
  calendarSize?: PanelSize;
  disabled?: boolean;
  name?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      value,
      onChange,
      label,
      description,
      error,
      placeholder = "MM/DD/YYYY",
      minDate,
      maxDate,
      isDateBlocked,
      size = "md",
      calendarSize = "sm",
      disabled,
      name,
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
    },
    ref,
  ) => {
    const selected = toDate(value);
    const [opened, setOpened] = useState(false);
    const [text, setText] = useState(() => formatDate(selected));
    const id = useId();
    const messageId = `${id}-message`;

    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    useEffect(() => {
      const next = toDate(value);
      const typed = parseDate(text);
      // Leave a draft that already means `value` alone, so "8/5/2026" isn't
      // rewritten to "08/05/2026" under the caret. Blur reformats it.
      if (typed && next && typed.getTime() === next.getTime()) return;
      setText(formatDate(next));
    }, [value]);

    const allowed = (date: Date) => {
      if (minDate && date < stripTime(minDate)) return false;
      if (maxDate && date > stripTime(maxDate)) return false;
      return !isDateBlocked?.(date);
    };

    const handleText = (input: string) => {
      setText(input);
      const parsed = parseDate(input);
      if (parsed && allowed(parsed)) onChange?.(parsed);
    };

    return (
      <div
        data-justui="date-input-wrapper"
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

        <Popover opened={opened} onChange={setOpened} position="bottom">
          <Popover.Anchor asChild>
            <div
              data-justui="date-input"
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
                inputMode="numeric"
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder}
                value={text}
                aria-invalid={hasError || undefined}
                aria-describedby={message ? messageId : undefined}
                onChange={(e) => handleText(e.target.value)}
                onBlur={() => setText(formatDate(toDate(value)))}
                className="min-w-0 flex-1 bg-transparent px-3 text-primary placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed"
              />

              <Popover.Target asChild>
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  aria-label="Open calendar"
                  className="flex w-9 shrink-0 items-center justify-center text-muted hover:text-primary focus-visible:outline-none disabled:cursor-not-allowed"
                >
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </Popover.Target>
            </div>
          </Popover.Anchor>

          <Popover.Dropdown className={cn("w-auto p-0", dropdownClassName)}>
            <DatePickerPanel
              value={selected}
              onChange={(date) => {
                if (!allowed(date)) return;
                onChange?.(date);
                setOpened(false);
              }}
              minDate={minDate}
              maxDate={maxDate}
              isDateBlocked={isDateBlocked}
              size={calendarSize}
            />
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
DateInput.displayName = "DateInput";
