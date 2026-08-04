"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type StoredCheckout = {
  checkout_id?: string;
  email?: string;
  plan?: string;
  price?: string;
  topup_credits?: number | null;
};

type Transaction = {
  id: number;
  creem_session_id: string;
  plan_type: "monthly" | "yearly" | "onetime" | "topup";
  amount: number;
  credits_added: number;
  status: string;
  created_at: string;
};

type SubscriptionResponse = {
  user?: { email: string; name?: string | null } | null;
  recent_transactions?: Transaction[];
};

function formatPlanName(plan?: string): string {
  switch (plan) {
    case "monthly":
      return "Monthly Full Editor";
    case "yearly":
      return "Yearly Full Editor";
    case "onetime":
      return "One-time License";
    case "topup":
      return "Extra credits";
    default:
      return "RemovePDFPages Full Editor";
  }
}

function formatPrice(plan?: string, amountCents?: number, credits?: number | null): string {
  if (plan === "monthly") return "$19/month";
  if (plan === "yearly") return "$99/year";
  if (plan === "onetime") return "$59 one-time";
  if (plan === "topup" && typeof amountCents === "number") {
    const price = `$${(amountCents / 100).toFixed(amountCents % 100 === 0 ? 0 : 2)}`;
    const unit = credits ? ` for ${credits} credits` : "";
    return `${price}${unit}`;
  }
  return "";
}

export default function SuccessContent() {
  const searchParams = useSearchParams();

  const queryData: StoredCheckout = useMemo(() => {
    const get = (key: string) => searchParams?.get(key) || undefined;
    return {
      order: get("order") || get("checkout_id"),
      email: get("email"),
      plan: get("plan"),
      price: get("price"),
      topup_credits: get("topup_credits") ? Number(get("topup_credits")) : undefined,
    };
  }, [searchParams]);

  const [stored, setStored] = useState<StoredCheckout | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem("removepdf_checkout");
      if (raw) setStored(JSON.parse(raw));
    } catch {
      // ignore storage errors
    }

    fetch("/api/subscription", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSubscription(data as SubscriptionResponse);
      })
      .catch(() => {
        // ignore
      });
  }, []);

  const checkoutId = queryData.checkout_id || stored?.checkout_id;

  const matchedTx = useMemo(() => {
    if (!checkoutId) return null;
    return (
      subscription?.recent_transactions?.find(
        (tx) => tx.creem_session_id === checkoutId
      ) || null
    );
  }, [checkoutId, subscription]);

  const plan = matchedTx?.plan_type || stored?.plan || queryData.plan;
  const price =
    formatPrice(matchedTx?.plan_type, matchedTx?.amount, matchedTx?.credits_added || undefined) ||
    stored?.price ||
    queryData.price ||
    "—";
  const email = subscription?.user?.email || stored?.email || queryData.email || "—";
  const orderId = checkoutId || "—";
  const planName = formatPlanName(plan);

  const handleCopyLicense = async () => {
    try {
      await navigator.clipboard.writeText("REMPDF-XXXX-XXXX-XXXX");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!mounted) {
    return (
      <main id="main">
        <section className="rpp-section rpp-section-hero">
          <div className="rpp-container rpp-text-center">
            <h1 className="rpp-display">Welcome to the Full Editor</h1>
            <p className="rpp-lead">Loading your purchase details…</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main">
      <section className="rpp-section rpp-section-hero">
        <div className="rpp-container rpp-text-center">
          <div
            className="rpp-notice rpp-notice-success"
            style={{ maxWidth: "640px", margin: "0 auto", justifyContent: "center" }}
          >
            <svg
              className="rpp-icon rpp-notice-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            <div>
              <div className="rpp-notice-title">Payment successful</div>
            </div>
          </div>
          <h1 className="rpp-display" style={{ marginTop: "var(--rpp-space-5)" }}>
            Welcome to the Full Editor
          </h1>
          <p
            className="rpp-lead"
            style={{ maxWidth: "640px", margin: "var(--rpp-space-4) auto 0" }}
          >
            Your purchase is complete. Your license key and receipts have been emailed to you.
          </p>
        </div>
      </section>

      <section className="rpp-section">
        <div className="rpp-workspace">
          <div className="rpp-card">
            <h2 className="rpp-heading-2">Purchase summary</h2>
            <dl className="rpp-summary-list" style={{ marginTop: "var(--rpp-space-4)" }}>
              <div className="rpp-summary-row">
                <dt>Item</dt>
                <dd>{planName}</dd>
              </div>
              <div className="rpp-summary-row">
                <dt>Plan</dt>
                <dd>{planName}</dd>
              </div>
              <div className="rpp-summary-row">
                <dt>Price paid</dt>
                <dd>{price}</dd>
              </div>
              <div className="rpp-summary-row">
                <dt>Email</dt>
                <dd>{email}</dd>
              </div>
              <div className="rpp-summary-row">
                <dt>Order ID</dt>
                <dd>{orderId}</dd>
              </div>
            </dl>
          </div>

          <div className="rpp-card" style={{ marginTop: "var(--rpp-space-6)" }}>
            <h2 className="rpp-heading-2">Your license key</h2>
            <div className="rpp-license-box" style={{ marginTop: "var(--rpp-space-4)" }}>
              <code className="rpp-mono">REMPDF-XXXX-XXXX-XXXX</code>
              <button
                type="button"
                className="rpp-btn rpp-btn-secondary rpp-btn-small"
                onClick={handleCopyLicense}
              >
                {copied ? "Copied" : "Copy License Key"}
              </button>
            </div>
            <p
              className="rpp-body-sm"
              style={{ marginTop: "var(--rpp-space-3)", color: "var(--rpp-ink-700)" }}
            >
              We also emailed this key to {email}. Check your spam folder if you don’t see it.
            </p>
            <div className="rpp-notice rpp-notice-info" style={{ marginTop: "var(--rpp-space-4)" }}>
              <svg
                className="rpp-icon rpp-notice-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div>
                <div className="rpp-notice-title">Your subscription is active</div>
                <div className="rpp-notice-body">
                  You can cancel anytime from your account settings or by contacting support.
                </div>
              </div>
            </div>
          </div>

          <div className="rpp-card" style={{ marginTop: "var(--rpp-space-6)" }}>
            <h2 className="rpp-heading-2">What’s next</h2>
            <ul className="rpp-feature-list" style={{ marginTop: "var(--rpp-space-4)" }}>
              <li className="rpp-feature-item">
                <div className="rpp-feature-icon">
                  <svg
                    className="rpp-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <div>
                  <div className="rpp-feature-title">
                    Includes 30 Convert to Word conversions per month.
                  </div>
                </div>
              </li>
              <li className="rpp-feature-item">
                <div className="rpp-feature-icon">
                  <svg
                    className="rpp-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <div>
                  <div className="rpp-feature-title">
                    Your license works on up to 5 personal devices.
                  </div>
                </div>
              </li>
              <li className="rpp-feature-item">
                <div className="rpp-feature-icon">
                  <svg
                    className="rpp-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <div>
                  <div className="rpp-feature-title">
                    Need to reinstall? Use the same license key.
                  </div>
                </div>
              </li>
              <li className="rpp-feature-item">
                <div className="rpp-feature-icon">
                  <svg
                    className="rpp-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <div>
                  <div className="rpp-feature-title">
                    Questions about refunds? <a href="/refund">Visit our refund policy</a>.
                  </div>
                </div>
              </li>
            </ul>
            <div
              className="rpp-flex"
              style={{
                marginTop: "var(--rpp-space-6)",
                gap: "var(--rpp-space-3)",
                flexWrap: "wrap",
              }}
            >
              <a href="/convert-to-word" className="rpp-btn rpp-btn-primary">
                Convert PDF to Word
              </a>
              <a href="/pricing" className="rpp-btn rpp-btn-secondary">
                Go to Pricing
              </a>
              <a href="/contact" className="rpp-btn rpp-btn-tertiary">
                Need help? Contact support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
