"use client";

import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { ChevronDownIcon } from "../lib/icons.js";
import { Menu } from "./menu.js";

export interface PhoneCountry {
  /** ISO 3166-1 alpha-2. */
  code: string;
  name: string;
  /** Including the leading plus. */
  dial: string;
  /** Digits after the dial code, used only to cap input length. */
  nationalLength?: number;
}

/** A starting set, not exhaustive — pass `countries` to replace it. */
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
  /** E.164, e.g. `+2348012345678`. */
  value?: string;
  /** Receives E.164, or `""` once the national part is cleared. */
  onChange?: (value: string) => void;
  country?: string;
  onCountryChange?: (country: PhoneCountry) => void;
  countries?: PhoneCountry[];
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

/** 3-3-rest, so a 10-digit number reads 801 234 5678 rather than leaving an orphan. */
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

    // Derive the national part from the incoming E.164 so the field stays controlled.
    const national = (() => {
      if (!value) return "";
      const digits = value.replace(/\D/g, "");
      const dial = active.dial.replace(/\D/g, "");
      return digits.startsWith(dial) ? digits.slice(dial.length) : digits;
    })();

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
          <Menu>
            <Menu.Target asChild>
              <button
                type="button"
                disabled={disabled}
                aria-label={`Country code: ${active.name} ${active.dial}`}
                className="flex shrink-0 items-center gap-1 border-r border-border px-2.5 font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-none disabled:cursor-not-allowed"
              >
                <span className="text-xs text-muted">{active.code}</span>
                <span className="tabular-nums">{active.dial}</span>
                <ChevronDownIcon className="h-3 w-3 opacity-60" />
              </button>
            </Menu.Target>
            <Menu.Dropdown align="start" width={260} className="max-h-72 overflow-y-auto">
              {countries.map((c) => (
                <Menu.Item
                  key={`${c.code}-${c.dial}`}
                  onSelect={() => pickCountry(c)}
                  leftSection={<span className="w-7 text-left text-xs text-muted">{c.code}</span>}
                  rightSection={<span className="tabular-nums">{c.dial}</span>}
                >
                  {c.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

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
            className="min-w-0 flex-1 bg-transparent px-3 tabular-nums text-primary placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed"
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
