"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, useId, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import {
  controlHeight,
  controlText,
  type ControlSize,
} from "../lib/control-sizes.js";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../lib/icons.js";

export interface SelectOption {
  label: string;
  subLabel?: string;
  value: string | number;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectGroupedOptions {
  group: string;
  items: SelectOption[];
}

const triggerSizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, controlText.xs),
  sm: cn(controlHeight.sm, controlText.sm),
  md: cn(controlHeight.md, controlText.md),
  lg: cn(controlHeight.lg, controlText.lg),
};

export interface SelectProps {
  options: (SelectOption | SelectGroupedOptions)[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  size?: ControlSize;
  leftIcon?: ReactNode;
  position?: "popper" | "item-aligned";
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
  renderOption?: (option: SelectOption) => ReactNode;
}

const isGroup = (
  o: SelectOption | SelectGroupedOptions,
): o is SelectGroupedOptions => "group" in o;

function Option({
  option,
  renderOption,
}: {
  option: SelectOption;
  renderOption?: (option: SelectOption) => ReactNode;
}) {
  return (
    <SelectPrimitive.Item
      value={String(option.value)}
      disabled={option.disabled}
      data-justui="select-option"
      className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-bg-secondary focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      {option.icon && <span className="shrink-0">{option.icon}</span>}
      {renderOption ? (
        <SelectPrimitive.ItemText>
          {renderOption(option)}
        </SelectPrimitive.ItemText>
      ) : (
        <SelectPrimitive.ItemText>
          <span className="flex flex-col">
            <span>{option.label}</span>
            {option.subLabel && (
              <span className="text-xs text-muted">{option.subLabel}</span>
            )}
          </span>
        </SelectPrimitive.ItemText>
      )}
    </SelectPrimitive.Item>
  );
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      label,
      description,
      error,
      placeholder,
      disabled,
      name,
      size = "md",
      leftIcon,
      position = "popper",
      className,
      containerClassName,
      labelClassName,
      dropdownClassName,
      renderOption,
    },
    ref,
  ) => {
    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const message = hasError ? error : description;

    return (
      <div
        data-justui="select-wrapper"
        className={cn("flex flex-col gap-1.5", containerClassName)}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-xs font-medium uppercase tracking-wider text-muted",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <SelectPrimitive.Root
          value={value == null ? undefined : String(value)}
          defaultValue={defaultValue == null ? undefined : String(defaultValue)}
          onValueChange={onChange}
          disabled={disabled}
          name={name}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            id={id}
            data-justui="select"
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-md border bg-bg-secondary px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              triggerSizes[size],
              hasError
                ? "border-danger focus-visible:ring-danger"
                : "border-border focus-visible:ring-accent",
              className,
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              {leftIcon && (
                <span className="shrink-0 text-muted">{leftIcon}</span>
              )}
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-60" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              data-justui="select-dropdown"
              position={position}
              className={cn(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-bg text-primary shadow-md",
                position === "popper" &&
                  "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
                dropdownClassName,
              )}
            >
              <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                <ChevronUpIcon className="h-4 w-4" />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport
                className={cn(
                  "p-1",
                  position === "popper" &&
                    "w-full min-w-[var(--radix-select-trigger-width)]",
                )}
              >
                {options.map((entry) =>
                  isGroup(entry) ? (
                    <SelectPrimitive.Group key={entry.group}>
                      <SelectPrimitive.Label className="px-2 py-1.5 text-xs font-semibold text-muted">
                        {entry.group}
                      </SelectPrimitive.Label>
                      {entry.items.map((o) => (
                        <Option
                          key={o.value}
                          option={o}
                          renderOption={renderOption}
                        />
                      ))}
                    </SelectPrimitive.Group>
                  ) : (
                    <Option
                      key={entry.value}
                      option={entry}
                      renderOption={renderOption}
                    />
                  ),
                )}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
                <ChevronDownIcon className="h-4 w-4" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {message && (
          <p
            id={messageId}
            className={cn("text-xs", hasError ? "text-danger" : "text-muted")}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
