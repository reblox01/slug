export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Slug - an open-source URL shortener.",
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        Last updated: January 2026
      </p>

      <p className="mb-6">
        These Terms of Service ("Terms") govern your access to and use of the
        Slug service (the "Service"). By using the Service you agree to these
        Terms. If you do not agree, do not use the Service.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Service Description</h2>
        <p className="mb-2">
          Slug is a URL shortening service that allows users to create short
          links that redirect to longer destination URLs. We also provide
          analytics for links you create.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum age in your
          jurisdiction) to use the Service. By using the Service you represent
          and warrant that you meet this requirement.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Acceptable Use</h2>
        <p className="mb-2">
          You agree not to use the Service to host, link to, or promote content
          that is illegal, infringing, malicious, or that violates the rights of
          others. We reserve the right to remove or disable access to any links
          or accounts that violate these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Account and Security</h2>
        <p className="mb-2">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. Notify us immediately if you suspect unauthorized access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
        <p className="mb-2">
          We may suspend or terminate your access to the Service at any time for
          violations of these Terms or for other legitimate business reasons.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Disclaimers and Limitation of Liability</h2>
        <p className="mb-2">
          The Service is provided "as is" and "as available" without warranties
          of any kind. To the fullest extent permitted by law, we are not
          liable for indirect, incidental, special, or consequential damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
        <p className="mb-2">
          We may modify these Terms from time to time. If we make material
          changes, we will notify users via the Service or by other means.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p>
          If you have questions about these Terms, contact us at{" "}
          <a className="underline" href="mailto:contact@sohailkoutari.com">contact@sohailkoutari.com</a>.
        </p>
      </section>
    </main>
  );
}

