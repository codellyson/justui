import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      data-justui="label"
      className={cn(
        "text-sm font-medium leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";
