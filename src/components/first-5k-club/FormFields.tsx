"use client";

import { type ReactNode } from "react";

// ─── Shared field shell: label + hint + error ────────────────────────────────

export function FieldShell({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-neutral-900">
        {label}
        {required && <span className="text-brand-orange ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-neutral-500 -mt-1">{hint}</p>}
      {children}
      {error && <p className="text-xs font-medium text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 " +
  "focus:outline-none focus:ring-2 focus:ring-brand-orange/40 transition-colors";

export function TextField({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      className={`${inputBase} ${error ? "border-red-400" : "border-neutral-200 focus:border-brand-orange"} ${className ?? ""}`}
      {...props}
    />
  );
}

export function TextAreaField({
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      rows={3}
      className={`${inputBase} resize-none ${error ? "border-red-400" : "border-neutral-200 focus:border-brand-orange"} ${className ?? ""}`}
      {...props}
    />
  );
}

// ─── Single-select pill group (replaces a Google Forms "Tandai satu oval") ──

export function PillSingleSelect({
  options,
  value,
  onChange,
  error,
  columns = 1,
}: {
  options: readonly string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={active}
            className={[
              "rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all",
              active
                ? "border-brand-orange bg-brand-orange text-white shadow-md shadow-brand-orange/25"
                : `border-neutral-200 bg-white text-neutral-700 hover:border-brand-orange/50 ${error ? "border-red-300" : ""}`,
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Multi-select checkbox group (replaces "Centang semua yang sesuai") ─────

export function PillMultiSelect({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            aria-pressed={active}
            className={[
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all",
              active
                ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-brand-blue/40",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                active ? "border-brand-blue bg-brand-blue" : "border-neutral-300 bg-white",
              ].join(" ")}
            >
              {active && (
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                  <path d="M3 8.5 6.5 12 13 4" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Consent checkbox row (single statement, used in Agreement step) ────────

export function ConsentCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={[
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
        checked ? "border-brand-blue bg-brand-blue/5" : "border-neutral-200 bg-white hover:border-brand-blue/40",
      ].join(" ")}
    >
      <span
        className={[
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          checked ? "border-brand-blue bg-brand-blue" : "border-neutral-300 bg-white",
        ].join(" ")}
      >
        {checked && (
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
            <path d="M3 8.5 6.5 12 13 4" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={checked ? "text-brand-blue" : "text-neutral-700"}>{label}</span>
    </button>
  );
}
