/* eslint-disable prettier/prettier */
/**
 * Privacy Policy Page Component
 *
 * Displays the privacy policy content to inform users how their data is collected,
 * used, and protected on this website.
 */

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read our Privacy Policy to learn how we collect, use, and protect your personal information when you use our website and services.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Read our Privacy Policy to learn how we collect, use, and protect your personal information when you use our website and services.",
    url: "/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description:
      "Read our Privacy Policy to learn how we collect, use, and protect your personal information when you use our website and services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Privacy Policy Server Component
 *
 * Renders the main content of the Privacy Policy page with clearly structured sections.
 *
 * @returns {JSX.Element} Rendered privacy policy page
 */
export default function Page() {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Privacy Policy
      </h1>

      {/* Section 1 */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          How We Use Your Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use the information we collect to process your orders, communicate
          with you about your purchases, provide customer support, and improve
          our products and services.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          We do not use your personal information for promotional email
          campaigns or direct marketing purposes.
        </p>
      </div>

      {/* Section 2 */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Information Sharing and Disclosure
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use the information we collect to process your orders, communicate
          with you about your purchases, provide customer support, and improve
          our products and services.
        </p>
      </div>

      {/* Section 3 */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Data Security
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use the information we collect to process your orders, communicate
          with you about your purchases, provide customer support, and improve
          our products and services.
        </p>
      </div>
    </section>
  );
}
