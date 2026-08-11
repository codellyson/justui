"use client";

import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  onChange?: (value: string) => void;
  onChangeEvent?: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      label,
      description,
      error,
      id,
      onChange,
      onChangeEvent,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const areaId = id ?? generatedId;
    const messageId = `${areaId}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    return (
      <div data-justui="textarea-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={areaId}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          data-justui="textarea"
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={(e) => {
            onChange?.(e.target.value);
            onChangeEvent?.(e);
          }}
          className={cn(
            "min-h-[80px] w-full rounded-md border bg-bg-secondary px-3 py-2 text-sm text-primary placeholder:text-muted focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-danger focus-visible:ring-danger"
              : "border-border focus-visible:ring-accent",
            className,
          )}
          {...props}
        />
        {message && (
          <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
            {message}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
