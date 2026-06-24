import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sada Vyah",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl text-charcoal">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-charcoal/50">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-charcoal/80">
        <section>
          <h2 className="font-heading text-xl text-charcoal">What Sada Vyah is</h2>
          <p className="mt-2">
            Sada Vyah is a wedding planning toolkit and vendor directory for Punjabi weddings. It is
            free for couples to use. Sada Vyah is <strong>not</strong> a booking platform or
            marketplace: we do not take bookings, payments, leads, or commissions on behalf of
            vendors, and we do not relay messages between couples and vendors. All contact between a
            couple and a vendor happens directly, outside of Sada Vyah, using the contact details a
            vendor chooses to publish on their profile.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Couple accounts</h2>
          <p className="mt-2">
            You're responsible for the accuracy of the wedding, guest, budget, and event information
            you enter. Guest RSVP data submitted by your guests is provided to you as-is; we don't
            verify guest identities.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Vendor accounts &amp; subscriptions</h2>
          <p className="mt-2">
            Vendors list their business at their own risk and are solely responsible for the
            accuracy of their listing, pricing, and availability. Paid plans (Silver, Gold,
            Platinum) are billed monthly via Stripe and can be cancelled at any time from the vendor
            dashboard; there are no refunds for partial billing periods. We reserve the right to
            remove a listing that is fraudulent, misleading, or violates these terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Reviews</h2>
          <p className="mt-2">
            Reviews must reflect a genuine experience with the vendor. We may moderate or remove
            reviews that are abusive, fake, or unrelated to the vendor's services.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Liability</h2>
          <p className="mt-2">
            Sada Vyah is provided "as is." We are not responsible for the quality, conduct, or
            outcome of any vendor's services, since all arrangements are made directly between you
            and the vendor.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Contact</h2>
          <p className="mt-2">Questions about these terms can be sent to legal@sadavyah.com.</p>
        </section>
      </div>
    </main>
  );
}
