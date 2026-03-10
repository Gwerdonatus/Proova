"use client";

import * as React from "react";

export function useInView<T extends Element>(opts?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -12% 0px", ...(opts || {}) }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, inView };
}