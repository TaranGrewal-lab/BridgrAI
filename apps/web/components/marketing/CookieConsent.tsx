"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "sada-vyah-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(CONSENT_KEY));
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-ivory px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-charcoal/70">
          We use cookies to keep you signed in and to understand how Sada Vyah is used. See our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-charcoal px-5 py-2 text-sm text-ivory"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
