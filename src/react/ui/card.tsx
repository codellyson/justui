"use client";

import { createContext, forwardRef, useContext, type HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export type CardSpacing = "xs" | "sm" | "md" | "lg" | "xl";

const paddings: Record<CardSpacing, string> = {
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const negativeMargins: Record<CardSpacing, string> = {
  xs: "-mx-2",
  sm: "-mx-3",
  md: "-mx-4",
  lg: "-mx-6",
  xl: "-mx-8",
};

const radii = { sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl" } as const;

const shadows = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const;

const CardContext = createContext<CardSpacing | 0>("md");

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
  padding?: CardSpacing | 0;
  radius?: keyof typeof radii;
  shadow?: keyof typeof shadows;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, withBorder = false, padding = "md", radius = "lg", shadow, children, ...props }, ref) => (
    <CardContext.Provider value={padding}>
      <div
        ref={ref}
        data-justui="card"
        className={cn(
          "bg-bg",
          padding !== 0 && paddings[padding],
          radii[radius],
          shadow && shadows[shadow],
          withBorder && "border border-border",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  ),
);
CardRoot.displayName = "Card";

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
  inheritPadding?: boolean;
}

export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, withBorder = false, inheritPadding = false, ...props }, ref) => {
    const padding = useContext(CardContext);
    return (
      <div
        ref={ref}
        data-justui="card-section"
        className={cn(
          padding !== 0 && !inheritPadding && negativeMargins[padding],
          withBorder && "border-b border-border pb-3 [&+&]:border-t [&+&]:pt-3",
          className,
        )}
        {...props}
      />
    );
  },
);
CardSection.displayName = "Card.Section";

export const Card = Object.assign(CardRoot, { Root: CardRoot, Section: CardSection });
