"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const PLANS = [
  {
    value: "monthly" as const,
    label: "Monthly — $19/month",
    tagline: "Billed monthly. Cancel anytime. Save $10 off the standard price.",
    price: "$19",
    unit: "/month",
    oldPrice: "$29",
    button: "Subscribe — $19/month",
  },
  {
    value: "yearly" as const,
    label: "Yearly — $99/year",
    tagline: "Billed annually. Save $129.",
    price: "$99",
    unit: "/year",
    oldPrice: "$149",
    button: "Subscribe — $99/year",
  },
  {
    value: "onetime" as const,
    label: "One-time License — $59",
    tagline: "Pay once. Use for the current major version. No recurring billing.",
    price: "$59",
    unit: "one-time",
    oldPrice: "$79",
    button: "Buy one-time license — $59",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckoutMode =
  | { kind: "plan"; value: "monthly" | "yearly" | "onetime" }
  | { kind: "topup"; credits: 2 | 10 };

export default function CheckoutForm() {
  const searchParams = useSearchParams();

  const mode: CheckoutMode = useMemo(() => {
    const topupParam = searchParams?.get("topup");
    const planParam = searchParams?.get("plan");
    if (topupParam === "10" || topupParam === "2") {
      return { kind: "topup", credits: Number(topupParam) as 2 | 10 };
    }
    if (planParam === "monthly" || planParam === "yearly" || planParam === "onetime") {
      return { kind: "plan", value: planParam };
    }
    return { kind: "plan", value: "monthly" };
  }, [searchParams]);

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | "onetime">(
    mode.kind === "plan" ? mode.value : "monthly"
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode.kind === "plan") {
      setSelectedPlan(mode.value);
    }
  }, [mode]);

  const planDetails = PLANS.find((p) => p.value === selectedPlan);

  const topupDetails = useMemo(() => {
    if (mode.kind !== "topup") return null;
    if (mode.credits === 10) {
      return { credits: 10, price: "$5", label: "$5 for 10 credits", button: "Buy 10 extra credits — $5" };
    }
    return { credits: 2, price: "$1", label: "$1 for 2 credits", button: "Buy 2 extra credits — $1" };
  }, [mode]);

  const buttonText = topupDetails?.button || planDetails?.button || "Subscribe";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address to receive your license key and receipts.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const body: Record<string, string | number> = { email };
      if (mode.kind === "topup") {
        body.plan = "topup";
        body.topup = mode.credits;
      } else {
        body.plan = selectedPlan;
      }

      const res = await fetch("/api/creem/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await res.json().catch(() => ({}))) as { checkout_url?: string; checkout_id?: string; error?: string };

      if (!res.ok || !data.checkout_url || !data.checkout_id) {
        throw new Error(data.error || "Something went wrong with the payment. Please try again or contact support.");
      }

      // Persist minimal checkout context so /success can render real data after return.
      const priceText =
        mode.kind === "topup"
          ? topupDetails?.price || `$${mode.credits === 10 ? 5 : 1}`
          : planDetails?.button.includes("onetime")
          ? "$59 one-time"
          : planDetails?.button.replace(/^Subscribe — /, "") || selectedPlan;

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "removepdf_checkout",
            JSON.stringify({
              checkout_id: data.checkout_id,
              email,
              plan: mode.kind === "topup" ? "topup" : selectedPlan,
              price: priceText,
              topup_credits: mode.kind === "topup" ? mode.credits : null,
            })
          );
        } catch {
          // ignore storage errors
        }
      }

      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong with the payment. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main">
      <section className="rpp-section rpp-section-hero">
        <div className="rpp-container rpp-text-center">
          <h1 className="rpp-display">Get the Full Editor</h1>
          <p
            className="rpp-lead"
            style={{ maxWidth: "640px", margin: "var(--rpp-space-4) auto 0" }}
          >
            Choose a plan and complete your purchase securely through Creem.
          </p>
        </div>
      </section>

      <section className="rpp-section">
        <div className="rpp-workspace">
          <form onSubmit={handleSubmit} className="rpp-card">
            {mode.kind === "plan" && (
              <div className="rpp-checkout-options">
                {PLANS.map((plan) => {
                  const isSelected = selectedPlan === plan.value;
                  return (
                    <label
                      key={plan.value}
                      className={`rpp-checkout-option${isSelected ? " rpp-checkout-option-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={plan.value}
                        checked={isSelected}
                        onChange={() => setSelectedPlan(plan.value)}
                      />
                      <span className="rpp-checkout-option-body">
                        <span className="rpp-checkout-option-title">{plan.label}</span>
                        <span className="rpp-checkout-option-desc">{plan.tagline}</span>
                        <span className="rpp-checkout-option-price">
                          <span className="rpp-pricing-card-old">{plan.oldPrice}</span>
                          {plan.price}
                          <span className="rpp-pricing-card-unit">{plan.unit}</span>
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {mode.kind === "topup" && topupDetails && (
              <div className="rpp-checkout-options">
                <label className="rpp-checkout-option rpp-checkout-option-selected">
                  <input type="radio" name="topup" value={topupDetails.credits} checked readOnly />
                  <span className="rpp-checkout-option-body">
                    <span className="rpp-checkout-option-title">Extra credits</span>
                    <span className="rpp-checkout-option-desc">Top-up credits are consumed after your included 30 conversions.</span>
                    <span className="rpp-checkout-option-price">{topupDetails.label}</span>
                  </span>
                </label>
              </div>
            )}

            <div className="rpp-checkout-form" style={{ marginTop: "var(--rpp-space-6)" }}>
              <label className="rpp-checkout-label" htmlFor="email">
                Email for your license key / receipts
              </label>
              <input
                id="email"
                type="email"
                className="rpp-checkout-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />

              {error && (
                <div className="rpp-notice rpp-notice-warning" style={{ marginTop: "var(--rpp-space-4)" }}>
                  <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <div>
                    <div className="rpp-notice-title">Something went wrong</div>
                    <div className="rpp-notice-body">{error}</div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="rpp-btn rpp-btn-primary rpp-btn-full"
                style={{ marginTop: "var(--rpp-space-4)" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait…" : buttonText}
              </button>
            </div>

            <div className="rpp-checkout-notes" style={{ marginTop: "var(--rpp-space-5)" }}>
              <div className="rpp-notice rpp-notice-info">
                <svg className="rpp-icon rpp-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <div className="rpp-notice-title">
                    Payments are processed by Creem, our Merchant of Record. We do not store your card details.
                  </div>
                  <div className="rpp-notice-body">
                    Sales tax, VAT, and GST are calculated and collected automatically by Creem based on your location. 14-day refund policy. Subscriptions and the one-time license are refundable within 14 days. Includes 30 Convert to Word conversions per month.
                  </div>
                </div>
              </div>
            </div>

            <div className="rpp-trust-bar" style={{ marginTop: "var(--rpp-space-6)" }}>
              <div className="rpp-trust-item">
                <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                Encrypted checkout via Creem
              </div>
              <div className="rpp-trust-item">
                <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                14-day refund policy
              </div>
              <div className="rpp-trust-item">
                <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                License key / receipts sent to your email
              </div>
              <div className="rpp-trust-item">
                <svg className="rpp-icon" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                Cancel monthly or yearly subscriptions anytime
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
