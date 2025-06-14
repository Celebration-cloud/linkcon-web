/* eslint-disable prettier/prettier */
/**
 * Terms and Conditions Page Component
 *
 * Displays the terms and conditions that users must agree to when accessing
 * or using oxabags.com.
 */

export const metadata = {
  title: "Terms and Conditions",
  description:
    "Please review the Terms and Conditions of using oxabags.com. By accessing our website, you agree to these terms.",
  openGraph: {
    title: "Terms and Conditions",
    description:
      "Please review the Terms and Conditions of using oxabags.com. By accessing our website, you agree to these terms.",
    url: "/terms-and-conditions",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions",
    description:
      "Please review the Terms and Conditions of using oxabags.com. By accessing our website, you agree to these terms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Terms and Conditions Server Component
 *
 * Renders the main content of the Terms and Conditions page in an organized,
 * readable format.
 *
 * @returns {JSX.Element} Rendered terms and conditions page
 */
export default function Page() {
  return (
    <section className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Terms Of Service
      </h1>

      {/* Acceptance of Terms */}
      <ol className="list-decimal space-y-6 pl-5">
        <li className="text-xl font-semibold">Acceptance of Terms</li>
        <p className="text-gray-700 dark:text-gray-300">
          By accessing and using oxabags.com, you agree to comply with and be
          bound by these Terms of Service.
        </p>

        {/* Use of the Service */}
        <li className="text-xl font-semibold">Use of the Service</li>
        <p className="text-gray-700 dark:text-gray-300">
          Our website and its content are intended solely for personal and
          non-commercial use. You may not use our website for any illegal or
          unauthorized purpose.
        </p>

        {/* Intellectual Property Rights */}
        <li className="text-xl font-semibold">Intellectual Property Rights</li>
        <p className="text-gray-700 dark:text-gray-300">
          All content, trademarks, logos, and intellectual property displayed on
          oxabags.com are the property of Aman Enterprise. You may not use,
          reproduce, or distribute any content from our website without prior
          written permission.
        </p>

        {/* Payment Processing */}
        <li className="text-xl font-semibold">Payment Processing</li>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            We utilize Razorpay, a third-party payment gateway, for processing
            payments on our website. By making a purchase through oxabags.com,
            you agree to abide by Razorpay&apos;s terms and conditions.
          </p>
          <p>
            Aman Enterprise shall not be liable for any issues, disputes, or
            discrepancies arising from payment processing through Razorpay.
            Please refer to Razorpay&apos;s policies and procedures for more
            information.
          </p>
        </div>

        {/* Limitation of Liability */}
        <li className="text-xl font-semibold">Limitation of Liability</li>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            We strive to provide accurate and up-to-date information on our
            website. However, we do not guarantee the accuracy, completeness, or
            reliability of any content.
          </p>
          <p>
            Aman Enterprise shall not be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            any way connected with the use of our website or services.
          </p>
        </div>
      </ol>
    </section>
  );
}
