"use client";

import * as React from "react";

export function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const { className, variant = "primary", ...rest } = props;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold tracking-tight",
        "transition active:translate-y-[0.5px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg",
        variant === "primary" && "bg-app-accent text-white hover:opacity-[0.96] shadow-soft",
        variant === "secondary" && "bg-white border border-app-border text-app-ink hover:bg-white/70",
        variant === "ghost" && "bg-white/0 border border-app-border text-app-ink hover:bg-white/70",
        className
      )}
      {...rest}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-app-border bg-white/90 px-4 py-3 text-sm",
        "placeholder:text-app-muted/80",
        "shadow-[0_1px_0_rgba(17,24,39,0.02)]",
        "focus:outline-none focus:ring-2 focus:ring-app-accent/25",
        className
      )}
      {...rest}
    />
  );
}

type SelectOption = { value: string; label: string; disabled?: boolean };

function normalizeOptions(children: React.ReactNode): SelectOption[] {
  const out: SelectOption[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    // support <option value="x">Label</option>
    if ((child.type as any) === "option") {
      const value = String((child.props as any).value ?? "");
      const label = String((child.props as any).children ?? "");
      const disabled = Boolean((child.props as any).disabled);
      out.push({ value, label, disabled });
    }
  });
  return out;
}

/**
 * Premium (Apple-ish) select.
 * - Keeps API compatible with <select> for this project:
 *   <Select value={...} onChange={(e)=>setX(e.target.value)}><option .../></Select>
 */
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, value, onChange, children, disabled, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const popRef = React.useRef<HTMLDivElement | null>(null);

  const options = React.useMemo(() => normalizeOptions(children), [children]);
  const current = options.find((o) => o.value === String(value ?? "")) ?? options[0];

  function close() {
    setOpen(false);
    setActiveIndex(-1);
  }

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (popRef.current?.contains(t)) return;
      close();
    }
    if (!open) return;
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function commit(nextValue: string) {
    // keep backward compatible event signature
    onChange?.({ target: { value: nextValue } } as any);
    close();
    // restore focus for good keyboard flow
    btnRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    const enabled = options.filter((o) => !o.disabled);
    const currentIndex = enabled.findIndex((o) => o.value === String(value ?? current?.value ?? ""));

    if (!open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(Math.max(0, currentIndex));
      return;
    }

    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(enabled.length - 1, (i < 0 ? currentIndex : i) + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, (i < 0 ? currentIndex : i) - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const pick = enabled[Math.max(0, activeIndex)];
      if (pick) commit(pick.value);
      return;
    }
  }

  const listOptions = options;
  const activeValue = (() => {
    const enabled = listOptions.filter((o) => !o.disabled);
    return enabled[Math.max(0, activeIndex)]?.value;
  })();

  return (
    <div className={cn("relative", className)}>
      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          "w-full rounded-2xl border border-app-border bg-white/90 px-4 py-3",
          "text-left text-sm tracking-tight",
          "shadow-[0_1px_0_rgba(17,24,39,0.02)]",
          "transition",
          "hover:bg-white",
          "focus:outline-none focus:ring-2 focus:ring-app-accent/25",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        {...rest}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-app-ink/90">{current?.label ?? "Select"}</span>
          <span className="text-app-muted/80">
            {/* chevron */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </button>

      {open ? (
        <div
          ref={popRef}
          role="listbox"
          className={cn(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-app-border",
            "bg-white/95 backdrop-blur shadow-soft"
          )}
        >
          <div className="max-h-64 overflow-auto p-1">
            {listOptions.map((o) => {
              const selected = String(value ?? "") === o.value;
              const active = activeValue === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={o.disabled}
                  onMouseEnter={() => !o.disabled && setActiveIndex(listOptions.filter((x) => !x.disabled).findIndex((x) => x.value === o.value))}
                  onClick={() => !o.disabled && commit(o.value)}
                  className={cn(
                    "w-full rounded-xl px-3 py-2.5 text-left text-sm tracking-tight",
                    "flex items-center justify-between gap-3",
                    "transition",
                    o.disabled && "opacity-40 cursor-not-allowed",
                    !o.disabled && "hover:bg-app-accent/7",
                    active && !o.disabled && "bg-app-accent/7",
                    selected && "text-app-ink"
                  )}
                >
                  <span className={cn(selected ? "font-semibold" : "font-medium", "text-app-ink/90")}>{o.label}</span>
                  {selected ? (
                    <span className="text-app-accent">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-app-border bg-white/90 backdrop-blur",
        "shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}
