export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Slug - an open-source URL shortener.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        Last updated: January 2026
      </p>

      <p className="mb-6">
        Slug ("we", "our", or "us") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you use our website and services (the "Service").
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-2">
          We collect information that you provide directly (for example when you
          create an account or contact support) and information that is
          automatically collected when you use the Service.
        </p>
        <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300">
          <li>Account information: email, name (optional), and hashed password.</li>
          <li>Usage data: Browser type, device information and pages visited.</li>
          <li>Link metadata: original URLs and click statistics for links you create.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-2">
          We use the information we collect to provide, maintain, and improve the
          Service and to protect the security of our systems. Specifically:
        </p>
        <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300">
          <li>
            Usage and link data (e.g., pages visited, link click statistics,
            browser/device information) are used to understand how the Service is
            used, to improve features, and to provide aggregated analytics.
          </li>
          <li>Account data (email and name) is used only to create and manage your account and to communicate with you; <span className="text-red-600">we do not use email or name for product analytics or profiling.</span></li>
          <li>We use collected data to detect and prevent abuse or fraudulent activity and to enforce our Terms of Service.</li>
        </ul>
        <p className="mt-3 text-sm">
          We do not sell your personal information. Third-party services that
          process data on our behalf are restricted from using it for other
          purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cookies and Tracking</h2>
        <p className="mb-2">
          We may use cookies and similar technologies to operate and improve the
          Service. We also use third-party analytics (e.g., Vercel Analytics)
          which may collect aggregate usage information. You can control cookies
          through your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
        <p className="mb-2">
          We may share data with third-party providers who perform services on
          our behalf (hosting, analytics, email delivery). These parties are
          restricted from using your information for other purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
        <p className="mb-2">
          We retain personal data for as long as necessary to provide the
          Service and to comply with legal obligations. If you delete your
          account, we will remove or anonymize your personal data within a
          reasonable timeframe.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p className="mb-2">
          Depending on your jurisdiction, you may have rights to access, correct,
          or delete your personal data. To exercise these rights, please contact
          us at <a className="underline" href="mailto:contact@sohailkoutari.com">contact@sohailkoutari.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Security</h2>
        <p className="mb-2">
          We take reasonable measures to protect your information, including
          hashing passwords and limiting access to production data. However,
          no method of transmission over the internet is completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make
          material changes, we will provide notice on the site or by other
          means.
        </p>
      </section>
    </main>
  );
}

