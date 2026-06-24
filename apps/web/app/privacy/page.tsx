import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sada Vyah",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl text-charcoal">Privacy Policy</h1>
      <p className="mt-2 text-sm text-charcoal/50">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-charcoal/80">
        <section>
          <h2 className="font-heading text-xl text-charcoal">What we collect</h2>
          <p className="mt-2">
            When you create a couple or vendor account we collect your name, email address, and
            wedding or business details you provide. When guests RSVP through a couple's wedding
            website, we collect the guest's name and, optionally, email or phone number, along with
            their RSVP responses (attendance, plus-ones, meal preference). We do not require guests
            to create an account.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">How we use it</h2>
          <p className="mt-2">
            We use this information to operate the planning tools (budget, guest list, events,
            tasks), to power the vendor directory, and to process vendor subscription payments via
            Stripe. We never sell guest or couple data to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Vendors are a directory, not a marketplace</h2>
          <p className="mt-2">
            Sada Vyah does not pass your contact details to vendors, and does not pass vendor leads
            or messages between couples and vendors. Vendor profile pages display each vendor's own
            published contact details (phone, email, website, social links) so you can reach out
            directly — we are not a party to that conversation and don't store its contents.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Third parties we use</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Clerk — authentication for couple and vendor accounts.</li>
            <li>Stripe — payment processing for vendor subscriptions.</li>
            <li>Resend — transactional email delivery.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Your rights</h2>
          <p className="mt-2">
            You can request access to, correction of, or deletion of your personal data at any
            time by contacting us. Guests can ask the couple who invited them to remove their RSVP,
            or contact us directly.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-charcoal">Contact</h2>
          <p className="mt-2">Questions about this policy can be sent to privacy@sadavyah.com.</p>
        </section>
      </div>
    </main>
  );
}
