"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, EyeSlashIcon } from "../lib/icons.js";

const controlSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

const iconSizes = {
  sm: "text-sm [&_svg]:h-4 [&_svg]:w-4",
  md: "text-base [&_svg]:h-5 [&_svg]:w-5",
  lg: "text-lg [&_svg]:h-6 [&_svg]:w-6",
} as const;

interface InputBaseProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "type" | "value"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: ControlSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  iconSize?: keyof typeof iconSizes;
  containerClassName?: string;
  labelClassName?: string;
  onChangeEvent?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export interface TextInputProps extends InputBaseProps {
  type?: "text" | "email" | "password" | "url" | "tel" | "search";
  value?: string;
  onChange?: (value: string) => void;
  withPasswordToggle?: boolean;
}

export interface NumberInputProps extends InputBaseProps {
  type: "number";
  value?: number | string;
  onChange?: (value: number) => void;
  step?: number;
  showNumberControls?: boolean;
}

export type InputProps = TextInputProps | NumberInputProps;

function Adornment({
  side,
  icon,
  size,
  onClick,
}: {
  side: "left" | "right";
  icon: ReactNode;
  size: keyof typeof iconSizes;
  onClick?: () => void;
}) {
  const classes = cn(
    "absolute top-1/2 flex -translate-y-1/2 items-center justify-center leading-none text-muted",
    side === "left" ? "left-3" : "right-3",
    iconSizes[size],
  );
  return onClick ? (
    <button type="button" tabIndex={-1} onClick={onClick} className={cn(classes, "hover:text-primary")}>
      {icon}
    </button>
  ) : (
    <span className={cn(classes, "pointer-events-none")}>{icon}</span>
  );
}

const isNumberInput = (p: InputProps): p is NumberInputProps => p.type === "number";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
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
    onChangeEvent,
    ...rest
  } = props;

  const numeric = isNumberInput(props);
  const step = numeric ? (props.step ?? 1) : undefined;
  const showNumberControls = numeric ? (props.showNumberControls ?? true) : false;
  const withPasswordToggle =
    !numeric && props.type === "password" ? (props.withPasswordToggle ?? true) : false;

  const [revealed, setRevealed] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasError = error != null && error !== false;
  const message = hasError ? error : description;

  const domProps = { ...rest } as Record<string, unknown>;
  delete domProps.showNumberControls;
  delete domProps.withPasswordToggle;
  delete domProps.step;
  delete domProps.type;
  delete domProps.value;
  delete domProps.onChange;

  const inputType = numeric ? "number" : revealed ? "text" : (props.type ?? "text");

  const nudge = (direction: 1 | -1) => {
    if (!numeric) return;
    const current = Number(props.value ?? 0) || 0;
    const next = current + direction * (step ?? 1);
    const min = props.min != null ? Number(props.min) : -Infinity;
    const max = props.max != null ? Number(props.max) : Infinity;
    props.onChange?.(Math.min(max, Math.max(min, next)));
  };

  const trailing = showNumberControls || withPasswordToggle || rightIcon;

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
        {leftIcon && <Adornment side="left" icon={leftIcon} size={iconSize} onClick={onLeftIconClick} />}
        <input
          {...domProps}
          ref={ref}
          id={inputId}
          data-justui="input"
          type={inputType}
          step={step}
          value={props.value as string | number | undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={(e) => {
            if (numeric) props.onChange?.(e.target.valueAsNumber);
            else props.onChange?.(e.target.value);
            onChangeEvent?.(e);
          }}
          className={cn(
            "w-full rounded-md border bg-bg-secondary px-3 py-2 text-primary placeholder:text-muted focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            // Chrome's own spinners would sit on top of ours.
            numeric && "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            controlSizes[size],
            hasError
              ? "border-danger focus-visible:ring-danger"
              : "border-border focus-visible:ring-accent",
            leftIcon && "pl-9",
            trailing && "pr-9",
            className,
          )}
        />

        {showNumberControls && (
          <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
            {([1, -1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                tabIndex={-1}
                aria-label={direction === 1 ? "Increment" : "Decrement"}
                disabled={props.disabled}
                onClick={() => nudge(direction)}
                className="flex h-1/2 items-center rounded px-1 text-muted hover:text-primary disabled:opacity-50"
              >
                {direction === 1 ? (
                  <ChevronUpIcon className="h-3 w-3" />
                ) : (
                  <ChevronDownIcon className="h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        )}

        {withPasswordToggle && (
          <Adornment
            side="right"
            icon={revealed ? <EyeSlashIcon /> : <EyeIcon />}
            size={iconSize}
            onClick={() => setRevealed((v) => !v)}
          />
        )}

        {!showNumberControls && !withPasswordToggle && rightIcon && (
          <Adornment side="right" icon={rightIcon} size={iconSize} onClick={onRightIconClick} />
        )}
      </div>

      {message && (
        <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
          {message}
        </p>
      )}
    </div>
  );
});
Input.displayName = "Input";
