"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlHeight, controlPaddingX, controlText } from "../lib/control-sizes.js";
import { Loader } from "./loader.js";

export type ButtonColor = "primary" | "gray" | "red" | "blue" | "green";

const colorClasses: Record<ButtonColor, { solid: string; outline: string; ghost: string }> = {
  primary: {
    solid: "bg-accent text-bg hover:bg-accent-hover",
    outline: "border border-border bg-transparent text-primary hover:bg-bg-secondary",
    ghost: "bg-transparent text-accent hover:bg-accent/10",
  },
  gray: {
    solid: "bg-bg-secondary text-primary hover:bg-bg-secondary/80",
    outline: "border border-border bg-transparent text-primary hover:bg-bg-secondary",
    ghost: "bg-transparent text-secondary hover:bg-bg-secondary hover:text-primary",
  },
  red: {
    solid: "bg-danger text-bg hover:bg-danger/90",
    outline: "border border-danger bg-transparent text-danger hover:bg-danger hover:text-bg",
    ghost: "bg-transparent text-danger hover:bg-danger/10",
  },
  blue: {
    solid: "bg-accent text-bg hover:bg-accent-hover",
    outline: "border border-accent bg-transparent text-accent hover:bg-accent hover:text-bg",
    ghost: "bg-transparent text-accent hover:bg-accent/10",
  },
  green: {
    solid: "bg-success text-bg hover:bg-success/90",
    outline: "border border-success bg-transparent text-success hover:bg-success hover:text-bg",
    ghost: "bg-transparent text-success hover:bg-success/10",
  },
};

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        xs: cn(controlHeight.xs, controlPaddingX.xs, controlText.xs),
        sm: cn(controlHeight.sm, controlPaddingX.sm, controlText.sm),
        md: cn(controlHeight.md, controlPaddingX.md, controlText.md),
        lg: cn(controlHeight.lg, controlPaddingX.lg, controlText.lg),
      },
      fullWidth: { true: "w-full", false: "" },
    },
    defaultVariants: { size: "sm", fullWidth: false },
  },
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    Omit<VariantProps<typeof buttonVariants>, "fullWidth"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "transparent" | "danger";
  color?: ButtonColor;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

function variantClasses(
  variant: NonNullable<ButtonProps["variant"]>,
  color: ButtonColor,
): string {
  switch (variant) {
    case "secondary":
      return "bg-bg-secondary text-primary hover:bg-bg-secondary/80";
    case "danger":
      return colorClasses.red.solid;
    case "transparent":
      return "bg-transparent text-secondary hover:text-primary";
    case "outline":
      return colorClasses[color].outline;
    case "ghost":
      return colorClasses[color].ghost;
    default:
      return colorClasses[color].solid;
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      color = "primary",
      size,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth,
      asChild = false,
      disabled,
      type,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const spinner = variant === "primary" || variant === "danger" ? "current" : "accent";

    return (
      <Comp
        ref={ref}
        data-justui="button"
        data-loading={loading || undefined}
        className={cn(
          buttonVariants({ size, fullWidth }),
          variantClasses(variant, color),
          loading && "cursor-wait",
          className,
        )}
        disabled={asChild ? undefined : isDisabled}
        aria-busy={loading || undefined}
        type={asChild ? undefined : (type ?? "button")}
        {...props}
      >
        {loading && <Loader size="xs" color={spinner} label={null} />}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {/* Slottable, or asChild throws once the icon/loader siblings exist. */}
        <Slottable>{children}</Slottable>
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";
