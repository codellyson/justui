"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode;
  /** Helper text under the control. Hidden while `error` is set. */
  description?: ReactNode;
  error?: ReactNode;
  size?: ControlSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  iconSize?: "sm" | "md" | "lg";
  containerClassName?: string;
  labelClassName?: string;
  /** Receives the value, not the event — pass `onChangeEvent` if you need the event. */
  onChange?: (value: string) => void;
  onChangeEvent?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      label,
      description,
      error,
      size = "md",
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      iconSize = "sm",
      id,
      onChange,
      onChangeEvent,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    const Adornment = ({ side, icon, onClick }: { side: "left" | "right"; icon: ReactNode; onClick?: () => void }) => {
      const position = side === "left" ? "left-3" : "right-3";
      const classes = cn(
        "absolute top-1/2 -translate-y-1/2 text-muted [&>*]:block",
        position,
        iconSizes[iconSize],
      );
      return onClick ? (
        <button type="button" onClick={onClick} className={cn(classes, "hover:text-primary")}>
          {icon}
        </button>
      ) : (
        <span className={cn(classes, "pointer-events-none")}>{icon}</span>
      );
    };

    return (
      <div data-justui="input-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && <Adornment side="left" icon={leftIcon} onClick={onLeftIconClick} />}
          <input
            ref={ref}
            id={inputId}
            data-justui="input"
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            onChange={(e) => {
              onChange?.(e.target.value);
              onChangeEvent?.(e);
            }}
            className={cn(
              "w-full rounded-md border bg-bg-secondary px-3 py-2 text-primary placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
              controlSizes[size],
              hasError
                ? "border-danger focus-visible:ring-danger"
                : "border-border focus-visible:ring-accent",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className,
            )}
            {...props}
          />
          {rightIcon && <Adornment side="right" icon={rightIcon} onClick={onRightIconClick} />}
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
Input.displayName = "Input";
