"use client";

import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { ChevronDownIcon } from "../lib/icons.js";
import { Menu } from "./menu.js";

export type CurrencyCode =
  | "USD"
  | "NGN"
  | "GBP"
  | "EUR"
  | "CAD"
  | "AUD"
  | "GHS"
  | "KES"
  | "ZAR";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; label: string; decimals: number }> = {
  USD: { symbol: "$", label: "US Dollar", decimals: 2 },
  NGN: { symbol: "₦", label: "Nigerian Naira", decimals: 2 },
  GBP: { symbol: "£", label: "Pound Sterling", decimals: 2 },
  EUR: { symbol: "€", label: "Euro", decimals: 2 },
  CAD: { symbol: "CA$", label: "Canadian Dollar", decimals: 2 },
  AUD: { symbol: "A$", label: "Australian Dollar", decimals: 2 },
  GHS: { symbol: "₵", label: "Ghanaian Cedi", decimals: 2 },
  KES: { symbol: "KSh", label: "Kenyan Shilling", decimals: 2 },
  ZAR: { symbol: "R", label: "South African Rand", decimals: 2 },
};

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface PriceInputProps {
  value?: number | string;
  /** Receives the parsed amount. `null` while the field is empty. */
  onChange?: (value: number | null) => void;
  currency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
  /** Which codes the picker offers. Defaults to all of them. */
  currencies?: CurrencyCode[];
  /** Hide the picker and show the symbol alone. */
  withCurrencySelect?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: ControlSize;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  min?: number;
  max?: number;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const group = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Digits and at most one decimal point, thousands-grouped as you type. */
function format(raw: string, decimals: number): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [whole = "", ...rest] = cleaned.split(".");
  const fraction = rest.join("").slice(0, decimals);
  const grouped = group(whole.replace(/^0+(?=\d)/, ""));
  return cleaned.includes(".") ? `${grouped}.${fraction}` : grouped;
}

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  (
    {
      value,
      onChange,
      currency = "USD",
      onCurrencyChange,
      currencies,
      withCurrencySelect = true,
      label,
      description,
      error,
      size = "md",
      placeholder = "0.00",
      disabled,
      name,
      min,
      max,
      className,
      containerClassName,
      labelClassName,
    },
    ref,
  ) => {
    const meta = CURRENCIES[currency];
    const offered = currencies ?? (Object.keys(CURRENCIES) as CurrencyCode[]);
    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    // The field holds the grouped text; the number only leaves via onChange.
    const [text, setText] = useState(() =>
      value == null || value === "" ? "" : format(String(value), meta.decimals),
    );

    const write = (raw: string) => {
      const next = format(raw, meta.decimals);
      setText(next);
      const digits = next.replace(/,/g, "");
      if (digits === "" || digits === ".") return onChange?.(null);
      let parsed = Number(digits);
      if (Number.isNaN(parsed)) return onChange?.(null);
      if (min != null) parsed = Math.max(min, parsed);
      if (max != null) parsed = Math.min(max, parsed);
      onChange?.(parsed);
    };

    return (
      <div data-justui="price-input-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}

        <div
          data-justui="price-input"
          className={cn(
            "flex items-stretch overflow-hidden rounded-md border bg-bg-secondary focus-within:ring-2",
            controlSizes[size],
            hasError ? "border-danger focus-within:ring-danger" : "border-border focus-within:ring-accent",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          {withCurrencySelect ? (
            <Menu>
              <Menu.Target asChild>
                <button
                  type="button"
                  disabled={disabled}
                  aria-label={`Currency: ${meta.label}`}
                  className="flex shrink-0 items-center gap-1 border-r border-border px-2.5 font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-none disabled:cursor-not-allowed"
                >
                  <span>{meta.symbol}</span>
                  <span className="text-xs text-muted">{currency}</span>
                  <ChevronDownIcon className="h-3 w-3 opacity-60" />
                </button>
              </Menu.Target>
              <Menu.Dropdown align="start" width={220}>
                {offered.map((code) => (
                  <Menu.Item
                    key={code}
                    onSelect={() => onCurrencyChange?.(code)}
                    leftSection={<span className="w-6 text-left">{CURRENCIES[code].symbol}</span>}
                    rightSection={code === currency ? "✓" : undefined}
                  >
                    {CURRENCIES[code].label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <span className="flex shrink-0 items-center border-r border-border px-2.5 font-medium text-secondary">
              {meta.symbol}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            name={name}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            value={text}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            onChange={(e) => write(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-3 text-right tabular-nums text-primary placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed"
          />
        </div>

        {message && (
          <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
            {message}
          </p>
        )}
      </div>
    );
  },
);
PriceInput.displayName = "PriceInput";
