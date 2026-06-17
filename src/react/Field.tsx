import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

const INPUT_BASE =
  "w-full appearance-none rounded-md border border-border bg-bg-secondary " +
  "px-3 py-2 text-sm text-primary placeholder:text-muted " +
  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent " +
  "disabled:opacity-50";

/**
 * Label + input combo. The label is associated to the input via a
 * generated id (useId) so screen readers + click-to-focus work without
 * the caller having to wire htmlFor manually.
 */
export function Field({ label, hint, error, id, className = "", ...inputProps }: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="text-xs font-medium uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      <input id={inputId} className={INPUT_BASE} {...inputProps} />
      {error ? (
        <div className="text-xs text-danger">{error}</div>
      ) : hint ? (
        <div className="text-xs text-muted">{hint}</div>
      ) : null}
    </div>
  );
}
