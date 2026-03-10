"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function useActiveBlock(count: number) {
  const refs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0];

        if (!best) return;

        const idx = els.indexOf(best.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      {
        threshold: [0.32, 0.5, 0.68],
        rootMargin: "-12% 0px -48% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  return { refs, active };
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-black/8 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,248,248,0.92))]" />
        <div className="absolute left-0 top-0 h-28 w-28 rounded-full bg-black/[0.025] blur-3xl" />
        <div className="absolute right-0 top-16 h-32 w-32 rounded-full bg-black/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-black/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {children}
      </div>
    </div>
  );
}

function ProofMarker({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  return (
    <div
      className={cx(
        "relative flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300",
        active
          ? "border-black/18 bg-black text-white shadow-[0_14px_28px_rgba(15,23,42,0.14)]"
          : "border-black/10 bg-white text-black/50"
      )}
    >
      {index}
      <div
        className={cx(
          "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{
          boxShadow: "0 0 0 8px rgba(15,23,42,0.06)",
        }}
      />
    </div>
  );
}

function QuestionAnswerCard({
  eyebrow,
  question,
  answer,
  active,
}: {
  eyebrow: string;
  question: string;
  answer: string;
  active: boolean;
}) {
  return (
    <Card
      className={cx(
        "relative overflow-hidden rounded-[28px] border p-5 transition-all duration-300 sm:p-6",
        active
          ? "border-black/12 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
          : "border-black/8 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
      )}
    >
      <div
        className={cx(
          "pointer-events-none absolute inset-0 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(circle at top left, rgba(15,23,42,0.035), transparent 28%), radial-gradient(circle at bottom right, rgba(15,23,42,0.025), transparent 34%)",
        }}
      />

      <div className="relative">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
          {eyebrow}
        </div>

        <h3 className="mt-2 text-base font-semibold leading-[1.45] tracking-tight text-black sm:text-[1.05rem]">
          {question}
        </h3>

        <div className="mt-4 rounded-[22px] border border-black/8 bg-[#F7F7F7] p-4">
          <div className="flex items-start gap-3">
            <div
              className={cx(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-colors duration-300",
                active
                  ? "border-black/15 bg-black text-white"
                  : "border-black/10 bg-white text-black/45"
              )}
            >
              ✓
            </div>

            <p className="text-sm leading-relaxed text-black/64">{answer}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function FounderImpactPanel({ active }: { active: number }) {
  const panels = [
    {
      title: "The issue is what happens after the click.",
      body:
        "When buyers move into DMs, WhatsApp, calls, or transfer, the sale can still happen while attribution becomes harder to trust.",
    },
    {
      title: "That turns into costly guesswork.",
      body:
        "You can keep paying influencers, funding campaigns, and making decisions without fully knowing what actually produced the revenue.",
    },
    {
      title: "What founders need is revenue clarity.",
      body:
        "Clarity on what deserves more budget. Clarity on who is really performing. Clarity on whether the numbers are strong enough to trust.",
    },
    {
      title: "That matters more as sales get more complex.",
      body:
        "The more your business grows across social, off-site conversations, and mixed payment flows, the more valuable clean attribution becomes.",
    },
  ];

  const current = panels[active] ?? panels[0];

  return (
    <div className="rounded-[32px] border border-black/10 bg-[#111111] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
        Founder view
      </div>

      <div className="mt-3 text-xl font-semibold leading-[1.25] tracking-tight text-white">
        {current.title}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/72">
        {current.body}
      </p>

      <div className="mt-6 grid gap-3">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Without clarity
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Sales happen, but the reason behind them stays harder to prove.
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            With Proova
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            You preserve the trail earlier and report revenue with more confidence later.
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Why join early
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Early users get in while the workflow is still being shaped around real businesses.
          </div>
        </div>
      </div>
    </div>
  );
}

function ConvictionStrip() {
  const items = [
    "You are already paying for growth",
    "Your buyers do not always follow one clean checkout path",
    "Broken attribution leads to weaker decisions",
    "Cleaner revenue proof leads to stronger confidence",
  ];

  return (
    <div className="rounded-[30px] border border-black/8 bg-[#F7F7F7] p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
        If these are true for your business
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-[22px] border border-black/8 bg-white p-4"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
              ✓
            </div>
            <div className="text-sm font-medium leading-relaxed text-black">
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalJoinBlock() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-black p-6 text-white shadow-[0_26px_70px_rgba(15,23,42,0.16)] sm:p-7">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.00)_35%,rgba(255,255,255,0.02)_100%)]" />
        <div className="absolute left-[-8%] top-[-14%] h-40 w-40 rounded-full bg-white/[0.05] blur-3xl" />
        <div className="absolute right-[-6%] bottom-[-10%] h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <div className="relative">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
          The practical next step
        </div>

        <h3 className="mt-3 max-w-3xl text-2xl font-semibold leading-[1.2] tracking-tight text-white sm:text-[1.95rem]">
          If your revenue path is not perfectly clean, better attribution becomes part of better decision-making.
        </h3>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-[0.98rem]">
          Proova helps you connect traffic, off-site conversations, payments, confirmations, and revenue reporting more clearly. Join early if you want better visibility before more spend and more complexity make the picture harder to read.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-white/80">
            Early access
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-white/80">
            Founder-led feedback
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-white/80">
            Real sales flows
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:translate-y-[-1px] hover:bg-[#F5F5F5]"
          >
            Join the waitlist
          </Link>

          <div className="text-sm text-white/58">
            For founders who want clearer revenue truth before scaling blind.
          </div>
        </div>
      </div>
    </div>
  );
}

export function OffsiteProofSection() {
  const reducedMotion = usePrefersReducedMotion();

  const prompts = [
    {
      eyebrow: "Question 01",
      question:
        "If customers click from Instagram, TikTok, or an influencer link — then continue in WhatsApp, DMs, transfer, or a call — does attribution become harder to trust?",
      answer:
        "Yes. The sale can still happen, but the reporting trail becomes weaker. Revenue comes in, yet it becomes harder to say clearly what drove it.",
    },
    {
      eyebrow: "Question 02",
      question:
        "When that trail breaks, do growth decisions start leaning on partial information?",
      answer:
        "Yes. You can reward the wrong influencer, over-credit the wrong campaign, or keep funding channels that look active without fully knowing which one is producing stronger revenue.",
    },
    {
      eyebrow: "Question 03",
      question:
        "So the real problem is not just getting clicks — it is tracing revenue more clearly after the click, right?",
      answer:
        "Exactly. That is where better attribution matters. It helps preserve the story earlier, then confirm, reconcile, and report revenue more clearly later.",
    },
    {
      eyebrow: "Question 04",
      question:
        "And if you could see attributed and unattributed revenue more clearly, include refunds honestly, and know what deserves more budget — would that strengthen decisions?",
      answer:
        "Yes. Better attribution leads to stronger confidence in reporting, channel performance, creator payouts, and where the next budget should go.",
    },
  ];

  const { refs, active } = useActiveBlock(prompts.length);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <SectionShell>
        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-black/8 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            A final reason to care
          </div>

          <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-black md:text-3xl lg:text-[2.2rem] lg:leading-[1.14]">
            If these already feel true in your business, the need for Proova will feel familiar.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/62 md:text-base">
            As sales move across social, DMs, WhatsApp, transfer, and mixed payment flows, revenue becomes harder to trace clearly. This is where stronger attribution starts to matter more.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="relative">
            <div className="pointer-events-none absolute left-[17px] top-0 hidden h-full w-px bg-[linear-gradient(to_bottom,rgba(15,23,42,0.00),rgba(15,23,42,0.16),rgba(15,23,42,0.10),rgba(15,23,42,0.00))] lg:block" />

            <div className="space-y-5">
              {prompts.map((item, idx) => {
                const isActive = idx === active;

                return (
                  <div
                    key={item.question}
                    ref={(el) => {
                      refs.current[idx] = el;
                    }}
                    className="relative lg:pl-16"
                  >
                    <div className="absolute left-0 top-5 hidden lg:block">
                      <ProofMarker index={idx + 1} active={isActive} />
                    </div>

                    <QuestionAnswerCard
                      eyebrow={item.eyebrow}
                      question={item.question}
                      answer={item.answer}
                      active={isActive}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <FounderImpactPanel active={active} />
          </div>
        </div>

        <div className="mt-8">
          <ConvictionStrip />
        </div>

        <div className="mt-6">
          <FinalJoinBlock />
        </div>
      </SectionShell>
    </section>
  );
}