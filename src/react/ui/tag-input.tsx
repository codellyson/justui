"use client";

import { forwardRef, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { controlText, type ControlSize } from "../lib/control-sizes.js";
import { XIcon } from "../lib/icons.js";

const fieldSizes: Record<ControlSize, string> = {
  xs: cn("min-h-7", controlText.xs),
  sm: cn("min-h-8", controlText.sm),
  md: cn("min-h-9", controlText.md),
  lg: cn("min-h-11", controlText.lg),
};

export interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  maxTags?: number;
  allowDuplicates?: boolean;
  separator?: string | RegExp;
  validateTag?: (tag: string) => boolean;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value,
      onChange,
      label,
      description,
      error,
      placeholder = "Add a tag…",
      size = "md",
      disabled,
      maxTags,
      allowDuplicates = false,
      separator = ",",
      validateTag,
      onTagAdd,
      onTagRemove,
      className,
      containerClassName,
      labelClassName,
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState<string[]>([]);
    const tags = value ?? uncontrolled;
    const [draft, setDraft] = useState("");

    const id = useId();
    const messageId = `${id}-message`;
    const hasError = error != null && error !== false;
    const full = maxTags != null && tags.length >= maxTags;
    const message = hasError ? error : description;

    const commit = (next: string[]) => {
      if (value == null) setUncontrolled(next);
      onChange?.(next);
    };

    const add = (raw: string) => {
      const tag = raw.trim();
      if (!tag || full) return false;
      if (!allowDuplicates && tags.includes(tag)) return false;
      if (validateTag && !validateTag(tag)) return false;
      commit([...tags, tag]);
      onTagAdd?.(tag);
      return true;
    };

    const remove = (tag: string) => {
      commit(tags.filter((t) => t !== tag));
      onTagRemove?.(tag);
    };

    const write = (raw: string) => {
      const parts =
        typeof separator === "string" ? raw.split(separator) : raw.split(separator);
      if (parts.length > 1) {
        parts.slice(0, -1).forEach((p) => add(p));
        setDraft(parts[parts.length - 1] ?? "");
        return;
      }
      setDraft(raw);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (add(draft)) setDraft("");
      } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
        e.preventDefault();
        remove(tags[tags.length - 1]!);
      }
    };

    return (
      <div data-justui="tag-input-wrapper" className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn("text-xs font-medium uppercase tracking-wider text-muted", labelClassName)}
          >
            {label}
          </label>
        )}

        <div
          data-justui="tag-input"
          className={cn(
            "flex flex-wrap items-center gap-1.5 rounded-md border bg-bg-secondary px-2 py-1.5 focus-within:ring-2",
            fieldSizes[size],
            hasError
              ? "border-danger focus-within:ring-danger"
              : "border-border focus-within:ring-accent",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              data-justui="tag"
              className="inline-flex items-center gap-1 rounded-full bg-bg px-2 py-0.5 text-xs text-primary"
            >
              {tag}
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                aria-label={`Remove ${tag}`}
                onClick={() => remove(tag)}
                className="text-muted hover:text-danger disabled:pointer-events-none"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </span>
          ))}

          <input
            ref={ref}
            id={id}
            value={draft}
            disabled={disabled || full}
            placeholder={full ? `Limit of ${maxTags} reached` : placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            onChange={(e) => write(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={() => add(draft) && setDraft("")}
            className="min-w-[8ch] flex-1 bg-transparent text-primary placeholder:text-muted focus-visible:outline-hidden disabled:cursor-not-allowed"
          />
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
TagInput.displayName = "TagInput";
