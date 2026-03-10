"use client";

import * as React from "react";

export function cn(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
) {
  const { className, variant = "primary", ...rest } = props;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold tracking-tight",
        "transition active:translate-y-[0.5px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg",
        variant === "primary" &&
          "bg-app-accent text-white hover:opacity-[0.96] shadow-soft",
        variant === "secondary" &&
          "bg-white border border-app-border text-app-ink hover:bg-white/70",
        variant === "ghost" &&
          "bg-white/0 border border-app-border text-app-ink hover:bg-white/70",
        className
      )}
      {...rest}
    />
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input(props, ref) {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
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
});

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

function normalizeOptions(children: React.ReactNode): SelectOption[] {
  const out: SelectOption[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === "option") {
      const props = child.props as {
        value?: string | number;
        children?: React.ReactNode;
        disabled?: boolean;
      };

      const label =
        typeof props.children === "string"
          ? props.children
          : Array.isArray(props.children)
          ? props.children.join("")
          : String(props.children ?? "");

      out.push({
        value: String(props.value ?? ""),
        label,
        disabled: Boolean(props.disabled),
      });
    }
  });

  return out;
}

type SelectChangeEvent = {
  target: {
    value: string;
    name?: string;
  };
};

type SelectProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "children" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (event: SelectChangeEvent) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  placeholder?: string;
};

export function Select(props: SelectProps) {
  const {
    className,
    value,
    defaultValue,
    onChange,
    children,
    disabled,
    name,
    id,
    placeholder = "Select",
    ...rest
  } = props;

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ? String(defaultValue) : ""
  );

  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const popRef = React.useRef<HTMLDivElement | null>(null);

  const options = React.useMemo(() => normalizeOptions(children), [children]);

  const currentValue = value !== undefined ? String(value) : internalValue;
  const current =
    options.find((o) => o.value === currentValue) ?? options[0] ?? null;

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
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: {
        value: nextValue,
        name,
      },
    });

    close();
    btnRef.current?.focus();
  }

  function onButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    const enabled = options.filter((o) => !o.disabled);
    const currentIndex = enabled.findIndex(
      (o) => o.value === String(currentValue || current?.value || "")
    );

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
      setActiveIndex((i) =>
        Math.min(enabled.length - 1, (i < 0 ? currentIndex : i) + 1)
      );
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
    }
  }

  const enabledOptions = options.filter((o) => !o.disabled);
  const activeValue = enabledOptions[Math.max(0, activeIndex)]?.value;

  return (
    <div className={cn("relative", className)} {...rest}>
      {name ? <input type="hidden" name={name} value={currentValue} /> : null}

      <button
        ref={btnRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((v) => !v);
        }}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "w-full rounded-2xl border border-app-border bg-white/90 px-4 py-3",
          "text-left text-sm tracking-tight",
          "shadow-[0_1px_0_rgba(17,24,39,0.02)]",
          "transition",
          "hover:bg-white",
          "focus:outline-none focus:ring-2 focus:ring-app-accent/25",
          disabled && "cursor-not-allowed opacity-60"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-app-ink/90">
            {current?.label ?? placeholder}
          </span>
          <span className="text-app-muted/80">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
            {options.map((o) => {
              const selected = currentValue === o.value;
              const active = activeValue === o.value;

              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={o.disabled}
                  onMouseEnter={() => {
                    if (o.disabled) return;
                    setActiveIndex(
                      enabledOptions.findIndex((x) => x.value === o.value)
                    );
                  }}
                  onClick={() => {
                    if (!o.disabled) commit(o.value);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm tracking-tight",
                    "transition",
                    o.disabled && "cursor-not-allowed opacity-40",
                    !o.disabled && "hover:bg-app-accent/7",
                    active && !o.disabled && "bg-app-accent/7",
                    selected && "text-app-ink"
                  )}
                >
                  <span
                    className={cn(
                      selected ? "font-semibold" : "font-medium",
                      "text-app-ink/90"
                    )}
                  >
                    {o.label}
                  </span>

                  {selected ? (
                    <span className="text-app-accent">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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

export const Card = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(function Card({ children, className }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-app-border bg-white/90 backdrop-blur",
        "shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
});