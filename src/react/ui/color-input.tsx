"use client";

import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { DEFAULT_SWATCHES, isHex, normaliseHex as normalise } from "../lib/color.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";

export { DEFAULT_SWATCHES };

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface ColorInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  name?: string;
  swatches?: string[];
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      value,
      onChange,
      label,
      description,
      error,
      placeholder = "#000000",
      size = "md",
      disabled,
      name,
      swatches = DEFAULT_SWATCHES,
      className,
      containerClassName,
      labelClassName,
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState("");
    const text = value ?? uncontrolled;
    const id = useId();
    const messageId = `${id}-message`;

    const valid = isHex(text);
    const hasError = (error != null && error !== false) || (text !== "" && !valid);
    const message =
      error != null && error !== false
        ? error
        : text !== "" && !valid
          ? "Not a valid hex colour."
          : description;

    const commit = (next: string) => {
      if (value == null) setUncontrolled(next);
      onChange?.(next);
    };

    return (
      <div data-justui="color-input-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}

        <div
          data-justui="color-input"
          className={cn(
            "flex items-stretch overflow-hidden rounded-md border bg-bg-secondary focus-within:ring-2",
            controlSizes[size],
            hasError ? "border-danger focus-within:ring-danger" : "border-border focus-within:ring-accent",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          <label
            className="relative flex w-9 shrink-0 cursor-pointer items-center justify-center border-r border-border"
            style={{ backgroundColor: valid ? normalise(text) : undefined }}
          >
            <span className="sr-only">Pick a colour</span>
            <input
              type="color"
              disabled={disabled}
              value={valid ? normalise(text) : "#000000"}
              onChange={(e) => commit(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            {!valid && <span aria-hidden="true" className="h-3 w-3 rounded-full border border-muted" />}
          </label>

          <input
            ref={ref}
            id={id}
            name={name}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            disabled={disabled}
            value={text}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            onChange={(e) => commit(e.target.value)}
            onBlur={() => valid && commit(normalise(text))}
            className="min-w-0 flex-1 bg-transparent px-3 font-mono text-primary placeholder:text-muted focus-visible:outline-hidden disabled:cursor-not-allowed"
          />
        </div>

        {swatches.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {swatches.map((swatch) => (
              <button
                key={swatch}
                type="button"
                disabled={disabled}
                title={swatch}
                aria-label={swatch}
                aria-pressed={valid && normalise(text) === normalise(swatch)}
                onClick={() => commit(normalise(swatch))}
                style={{ backgroundColor: swatch }}
                className={cn(
                  "h-5 w-5 rounded border transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none",
                  valid && normalise(text) === normalise(swatch) ? "border-accent" : "border-border",
                )}
              />
            ))}
          </div>
        )}

        {message && (
          <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
            {message}
          </p>
        )}
      </div>
    );
  },
);
ColorInput.displayName = "ColorInput";
