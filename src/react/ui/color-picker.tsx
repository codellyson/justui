"use client";

import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { DEFAULT_PRESET_COLORS, isHex, normaliseHex } from "../lib/color.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { SwatchIcon } from "../lib/icons.js";
import { Popover } from "./popover.js";

export { DEFAULT_PRESET_COLORS };

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

const swatchSizes: Record<ControlSize, string> = {
  xs: "h-6 w-6",
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

export interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  name?: string;
  presetColors?: string[];
  columns?: number;
  presetsLabel?: ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
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
      presetColors = DEFAULT_PRESET_COLORS,
      columns = 6,
      presetsLabel = "Presets",
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState("");
    const [opened, setOpened] = useState(false);
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
      <div
        data-justui="color-picker-wrapper"
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
          {/* The field anchors the popover, not the trigger — hung off the 36px
              swatch button it overhangs the field by ~100px. */}
          <Popover.Anchor asChild>
            <div
              data-justui="color-picker"
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
              <label
                className="relative flex w-9 shrink-0 cursor-pointer items-center justify-center border-r border-border"
                style={{ backgroundColor: valid ? normaliseHex(text) : undefined }}
              >
                <span className="sr-only">Pick a colour</span>
                <input
                  type="color"
                  disabled={disabled}
                  value={valid ? normaliseHex(text) : "#000000"}
                  onChange={(e) => commit(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                {!valid && (
                  <span aria-hidden="true" className="h-3 w-3 rounded-full border border-muted" />
                )}
              </label>

              <input
                ref={ref}
                id={id}
                name={name}
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder={placeholder}
                disabled={disabled}
                value={text}
                aria-invalid={hasError || undefined}
                aria-describedby={message ? messageId : undefined}
                onChange={(e) => commit(e.target.value)}
                onBlur={() => valid && commit(normaliseHex(text))}
                className="min-w-0 flex-1 bg-transparent px-3 font-mono text-primary placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed"
              />

              {presetColors.length > 0 && (
                <Popover.Target asChild>
                  <button
                    type="button"
                    disabled={disabled}
                    aria-label={opened ? "Close presets" : "Open presets"}
                    className="flex w-9 shrink-0 items-center justify-center border-l border-border text-muted hover:text-primary focus-visible:outline-none disabled:cursor-not-allowed"
                  >
                    <SwatchIcon className="h-4 w-4" />
                  </button>
                </Popover.Target>
              )}
            </div>
          </Popover.Anchor>

          <Popover.Dropdown className={cn("w-auto p-3", dropdownClassName)}>
            {presetsLabel && (
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                {presetsLabel}
              </p>
            )}
            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {presetColors.map((color) => {
                const active = valid && normaliseHex(text) === normaliseHex(color);
                return (
                  <button
                    key={color}
                    type="button"
                    title={color}
                    aria-label={color}
                    aria-pressed={active}
                    onClick={() => {
                      commit(normaliseHex(color));
                      setOpened(false);
                    }}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "rounded border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      swatchSizes[size],
                      active ? "border-accent ring-2 ring-accent/40" : "border-border",
                    )}
                  />
                );
              })}
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
ColorPicker.displayName = "ColorPicker";
