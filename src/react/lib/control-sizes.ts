export type ControlSize = "xs" | "sm" | "md" | "lg";

// Fixed heights, shared by Button/Input/Select so the same `size` lines up in a row.
export const controlHeight: Record<ControlSize, string> = {
  xs: "h-7", // 28px
  sm: "h-8", // 32px
  md: "h-9", // 36px
  lg: "h-11", // 44px
};

export const controlText: Record<ControlSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

export const controlPaddingX: Record<ControlSize, string> = {
  xs: "px-2.5",
  sm: "px-3",
  md: "px-4",
  lg: "px-5",
};
