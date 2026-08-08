"use client";

import { useId, useRef, type ClipboardEvent, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

const boxSizes = {
  sm: "h-9 w-8 text-base",
  md: "h-11 w-10 text-lg",
  lg: "h-14 w-12 text-2xl",
} as const;

export interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  /** Fires once every box is filled. */
  onComplete?: (value: string) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: keyof typeof boxSizes;
  mask?: boolean;
  alphanumeric?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export function PinInput({
  length = 6,
  value,
  onChange,
  onComplete,
  label,
  description,
  error,
  size = "md",
  mask = false,
  alphanumeric = false,
  autoFocus = false,
  disabled = false,
  className,
  containerClassName,
}: PinInputProps) {
  const boxes = useRef<(HTMLInputElement | null)[]>([]);
  const groupId = useId();
  const messageId = `${groupId}-message`;
  const hasError = error != null && error !== false;
  const message = hasError ? error : description;

  const clean = (raw: string) =>
    alphanumeric ? raw.replace(/[^0-9a-z]/gi, "").toUpperCase() : raw.replace(/\D/g, "");

  const commit = (next: string, focusIndex: number) => {
    const trimmed = next.slice(0, length);
    onChange(trimmed);
    boxes.current[Math.min(focusIndex, length - 1)]?.focus();
    if (trimmed.length === length) onComplete?.(trimmed);
  };

  const write = (index: number, raw: string) => {
    if (disabled) return;
    const digits = clean(raw);
    if (!digits) return;

    const chars = value.padEnd(length, " ").split("");
    digits.split("").forEach((d, i) => {
      if (index + i < length) chars[index + i] = d;
    });
    commit(chars.join("").trimEnd(), index + digits.length);
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = value.split("");
      if (chars[index]) {
        chars[index] = "";
        commit(chars.join(""), index);
      } else if (index > 0) {
        chars[index - 1] = "";
        commit(chars.join("").trimEnd(), index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      boxes.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      boxes.current[index + 1]?.focus();
    }
  };

  const onPaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    write(index, e.clipboardData.getData("text"));
  };

  return (
    <div data-justui="pin-input-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
      )}

      <div
        data-justui="pin-input"
        role="group"
        aria-label={typeof label === "string" ? label : "Verification code"}
        aria-describedby={message ? messageId : undefined}
        className={cn("flex items-center gap-2", className)}
      >
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              boxes.current[index] = el;
            }}
            data-justui="pin-input-box"
            type={mask ? "password" : "text"}
            inputMode={alphanumeric ? "text" : "numeric"}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={hasError || undefined}
            value={value[index] ?? ""}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            onChange={(e) => write(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(index, e)}
            onPaste={(e) => onPaste(index, e)}
            onFocus={(e) => e.currentTarget.select()}
            className={cn(
              "rounded-md border bg-bg-secondary text-center font-medium text-primary caret-accent focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
              boxSizes[size],
              hasError
                ? "border-danger focus-visible:ring-danger"
                : "border-border focus-visible:ring-accent",
            )}
          />
        ))}
      </div>

      {message && (
        <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}
