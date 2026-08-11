"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { DotIcon } from "../lib/icons.js";

const boxSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" } as const;
const dotSizes = { sm: "h-2 w-2", md: "h-2.5 w-2.5", lg: "h-3 w-3" } as const;

export type RadioSize = keyof typeof boxSizes;

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children"> {
  label?: ReactNode;
  description?: ReactNode;
  size?: RadioSize;
}

export const Radio = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, label, description, size = "sm", id, ...props }, ref) => {
  const generatedId = useId();
  const itemId = id ?? generatedId;
  const descriptionId = `${itemId}-description`;

  const control = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={itemId}
      data-justui="radio"
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "peer shrink-0 rounded-full border border-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent data-[state=checked]:text-accent",
        boxSizes[size],
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex h-full w-full items-center justify-center text-current">
        <DotIcon className={dotSizes[size]} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) return control;

  return (
    <div className={cn("flex gap-2", description ? "items-start" : "items-center")}>
      {control}
      <div className="flex flex-col gap-0.5">
        {label && (
          <label
            htmlFor={itemId}
            className="text-sm font-medium leading-tight text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p id={descriptionId} className="text-xs text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});
Radio.displayName = "Radio";

export interface RadioGroupProps
  extends Omit<
    ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "onValueChange" | "onChange" | "children" | "dir"
  > {
  options?: RadioOption[];
  children?: ReactNode;
  onChange?: (value: string) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: RadioSize;
  containerClassName?: string;
  labelClassName?: string;
}

const RadioGroupRoot = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      options,
      children,
      onChange,
      label,
      description,
      error,
      size = "sm",
      className,
      containerClassName,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    return (
      <div
        data-justui="radio-group-wrapper"
        className={cn("flex flex-col gap-1.5", containerClassName)}
      >
        {label && (
          <span
            className={cn(
              "text-xs font-medium uppercase tracking-wider text-muted",
              labelClassName,
            )}
          >
            {label}
          </span>
        )}

        <RadioGroupPrimitive.Root
          ref={ref}
          data-justui="radio-group"
          aria-label={typeof label === "string" ? label : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          onValueChange={onChange}
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {options?.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
              size={size}
            />
          ))}
          {children}
        </RadioGroupPrimitive.Root>

        {message && (
          <p id={messageId} className={cn("text-xs", hasError ? "text-danger" : "text-muted")}>
            {message}
          </p>
        )}
      </div>
    );
  },
);
RadioGroupRoot.displayName = "RadioGroup";

export const RadioGroup = Object.assign(RadioGroupRoot, { Item: Radio });
