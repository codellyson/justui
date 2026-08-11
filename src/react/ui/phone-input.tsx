"use client";

import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { Flag } from "../lib/flag.js";
import { ChevronDownIcon } from "../lib/icons.js";
import { Listbox } from "../lib/listbox.js";

export interface PhoneCountry {
  code: string;
  name: string;
  dial: string;
  nationalLength?: number;
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "NG", name: "Nigeria", dial: "+234", nationalLength: 10 },
  { code: "GH", name: "Ghana", dial: "+233", nationalLength: 9 },
  { code: "KE", name: "Kenya", dial: "+254", nationalLength: 9 },
  { code: "ZA", name: "South Africa", dial: "+27", nationalLength: 9 },
  { code: "EG", name: "Egypt", dial: "+20", nationalLength: 10 },
  { code: "US", name: "United States", dial: "+1", nationalLength: 10 },
  { code: "CA", name: "Canada", dial: "+1", nationalLength: 10 },
  { code: "GB", name: "United Kingdom", dial: "+44", nationalLength: 10 },
  { code: "IE", name: "Ireland", dial: "+353", nationalLength: 9 },
  { code: "DE", name: "Germany", dial: "+49", nationalLength: 11 },
  { code: "FR", name: "France", dial: "+33", nationalLength: 9 },
  { code: "ES", name: "Spain", dial: "+34", nationalLength: 9 },
  { code: "NL", name: "Netherlands", dial: "+31", nationalLength: 9 },
  { code: "IN", name: "India", dial: "+91", nationalLength: 10 },
  { code: "AE", name: "United Arab Emirates", dial: "+971", nationalLength: 9 },
  { code: "AU", name: "Australia", dial: "+61", nationalLength: 9 },
  { code: "BR", name: "Brazil", dial: "+55", nationalLength: 11 },
];

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  country?: string;
  onCountryChange?: (country: PhoneCountry) => void;
  countries?: PhoneCountry[];
  withFlags?: boolean;
  renderFlag?: (country: string) => ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: ControlSize;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

function groupDigits(digits: string): string {
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      country,
      onCountryChange,
      countries = PHONE_COUNTRIES,
      withFlags = true,
      renderFlag,
      label,
      description,
      error,
      size = "md",
      placeholder = "801 234 5678",
      disabled,
      name,
      className,
      containerClassName,
      labelClassName,
    },
    ref,
  ) => {
    const [fallbackCode, setFallbackCode] = useState(countries[0]?.code ?? "NG");
    const active =
      countries.find((c) => c.code === (country ?? fallbackCode)) ?? countries[0] ?? PHONE_COUNTRIES[0]!;

    const national = (() => {
      if (!value) return "";
      const digits = value.replace(/\D/g, "");
      const dial = active.dial.replace(/\D/g, "");
      return digits.startsWith(dial) ? digits.slice(dial.length) : digits;
    })();

    const flag = (code: string) =>
      withFlags ? (renderFlag ? renderFlag(code) : <Flag code={code} />) : null;

    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    const emit = (nationalDigits: string, forCountry: PhoneCountry) => {
      const capped = forCountry.nationalLength
        ? nationalDigits.slice(0, forCountry.nationalLength)
        : nationalDigits;
      onChange?.(capped ? `${forCountry.dial}${capped}` : "");
    };

    const pickCountry = (next: PhoneCountry) => {
      if (country == null) setFallbackCode(next.code);
      onCountryChange?.(next);
      emit(national, next);
    };

    return (
      <div data-justui="phone-input-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}

        <div
          data-justui="phone-input"
          className={cn(
            "flex items-stretch overflow-hidden rounded-md border bg-bg-secondary focus-within:ring-2",
            controlSizes[size],
            hasError ? "border-danger focus-within:ring-danger" : "border-border focus-within:ring-accent",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          <Listbox
            aria-label="Country"
            width={260}
            value={`${active.code}-${active.dial}`}
            onSelect={(key) => {
              const next = countries.find((c) => `${c.code}-${c.dial}` === key);
              if (next) pickCountry(next);
            }}
            items={countries.map((c) => ({
              value: `${c.code}-${c.dial}`,
              label: c.name,
              leftSection: flag(c.code) ?? <span className="w-5" />,
              rightSection: <span className="tabular-nums">{c.dial}</span>,
            }))}
            target={
              <button
                type="button"
                disabled={disabled}
                aria-label={`Country code: ${active.name} ${active.dial}`}
                className="flex shrink-0 items-center gap-1 border-r border-border px-2.5 font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-hidden disabled:cursor-not-allowed"
              >
                {flag(active.code)}
                <span className="tabular-nums">{active.dial}</span>
                <ChevronDownIcon className="h-3 w-3 opacity-60" />
              </button>
            }
          />

          <input
            ref={ref}
            id={id}
            name={name}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={placeholder}
            disabled={disabled}
            value={groupDigits(national)}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            onChange={(e) => emit(e.target.value.replace(/\D/g, ""), active)}
            className="min-w-0 flex-1 bg-transparent px-3 tabular-nums text-primary placeholder:text-muted focus-visible:outline-hidden disabled:cursor-not-allowed"
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
PhoneInput.displayName = "PhoneInput";
