"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { CheckIcon } from "../lib/icons.js";

const boxSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" } as const;
const tickSizes = { sm: "h-3 w-3", md: "h-3.5 w-3.5", lg: "h-4 w-4" } as const;

export interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "onCheckedChange" | "onChange" | "children"
  > {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Receives the next checked state. `"indeterminate"` is passed through. */
  onChange?: (checked: boolean | "indeterminate") => void;
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, description, error, size = "sm", id, onChange, ...props }, ref) => {
    const generatedId = useId();
    const boxId = id ?? generatedId;
    const messageId = `${boxId}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    const box = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={boxId}
        data-justui="checkbox"
        onCheckedChange={onChange}
        aria-invalid={hasError || undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          "peer shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-bg",
          boxSizes[size],
          hasError ? "border-danger" : "border-border",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <CheckIcon className={tickSizes[size]} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !message) return box;

    return (
      <div data-justui="checkbox-wrapper" className="flex flex-col gap-1">
        <div className={cn("flex gap-2", message ? "items-start" : "items-center")}>
          {box}
          {label && (
            <label
              htmlFor={boxId}
              className="text-sm font-medium leading-tight text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {message && (
          <p
            id={messageId}
            className={cn("text-xs", hasError ? "text-danger" : "text-muted", label && "pl-6")}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
