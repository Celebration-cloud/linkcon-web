/* eslint-disable prettier/prettier */
/**
 * Return and Refund Policy Page Component
 *
 * Displays the return and refund policy to inform users about product returns,
 * eligibility, process, and timelines.
 */

import Link from "next/link";

export const metadata = {
  title: "Return and Refund Policy",
  description:
    "Learn about our return and refund policy. We accept returns within 48 hours under specific conditions. Read more before making Link purchase.",
  openGraph: {
    title: "Return and Refund Policy",
    description:
      "Learn about our return and refund policy. We accept returns within 48 hours under specific conditions. Read more before making Link purchase.",
    url: "/return-policy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Return and Refund Policy | Aman Enterprise",
    description:
      "Learn about our return and refund policy. We accept returns within 48 hours under specific conditions. Read more before making Link purchase.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Return and Refund Policy Server Component
 *
 * Renders the full Return and Refund Policy page with structured sections.
 *
 * @returns {JSX.Element} Rendered return and refund policy page
 */
export default function refund() {
  return (
    <section className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Return and Refund Policy
      </h1>

      {/* Section: Handcrafted Products */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Handcrafted Products
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          At Aman Enterprise, we take pride in offering handcrafted products,
          where slight differences in detailing may occur. These minor printing
          and weaving irregularities contribute to the uniqueness and beauty of
          each handcrafted bag and cannot be labeled as defects.
        </p>
      </div>

      {/* Section: Color Fastness */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Color Fastness
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We do not provide guarantees on color fastness. Natural colors, such
          as indigo, may bleed during the first wash. Therefore, we do not offer
          refunds or exchanges in such cases.
        </p>
      </div>

      {/* Section: Care Instructions */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Care Instructions
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Handmade bags require special care to preserve their beauty and
          strength. We recommend reading our instruction manual for washing and
          care before using the bags. Requests for bag replacement or refund
          will not be considered valid if incorrect washing and caring methods
          cause damage.
        </p>
      </div>

      {/* Section: Customer Satisfaction */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Customer Satisfaction
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Your satisfaction is of utmost importance to us. If you are not
          satisfied with your purchase, we are prepared to replace the product
          when the parameters of our return policy are met.
        </p>
      </div>

      {/* Section: Uncommon Occurrences */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          In the Uncommon Occurrence That
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Wrong product has been delivered to you (i.e., the size or color
            differs from the option you selected).
          </li>
          <li>The product you have received is defective.</li>
          <li>
            Minor differences due to monitor settings should be measured as
            normal and are not subject to return.
          </li>
        </ul>
      </div>

      {/* Section: Steps to Notify Us */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Steps to Notify Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Please notify us immediately by following the steps below:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Send an email to{" "}
            <Link
              className="text-blue-500 underline"
              href="mailto:info@oxabags.com"
            >
              info@oxabags.com
            </Link>{" "}
            along with Link photo of the damaged product.
          </li>
          <li>
            A Returns and Exchanges form is also required with necessary
            information.{" "}
            <Link className="text-blue-500 underline" href="#">
              Download the form here
            </Link>
            .
          </li>
        </ul>
      </div>

      {/* Section: Return Procedure */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Return Procedure
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Goods are returnable within 48 hours of receiving, provided they
            contain the original tags and sales invoice and are in unused
            condition.
          </li>
          <li>
            Choose any trusted courier service or place Link pickup request with
            our courier partner. Our team will coordinate the process if the
            service is available in your area.
          </li>
          <li>
            Safely package the return packets to eliminate chances of further
            damage during transit. Refunds and replacements will be void on
            arrival of damaged products.
          </li>
        </ul>
      </div>

      {/* Section: After Receiving the Package */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          After Receiving the Package
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Our team will decide whether the product is eligible for refunds or
          replacement and inform you via email.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            If eligible for return, the item will be replaced free of cost
            (subject to availability), or the cost of the goods (excluding
            freight charges) will be refunded to the credit/debit card used for
            purchasing.
          </li>
          <li>
            Freight charges for returning the goods will be deducted based on
            our predetermined tariff, depending on your location. If our courier
            partner is involved, no additional payments are required for the
            service.
          </li>
          <li>
            If the product is deemed unfit for return, goods will be delivered
            back to you.
          </li>
        </ul>
      </div>

      {/* Section: Processing Time */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Processing Time
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          It may take up to 10 days from our end to process and close Link
          refund/replacement issue.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Allow one billing cycle for credits issued to your debit/credit card
          to appear on your statement.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          The issuing bank manages the cardholder&apos;s account. We are not
          responsible for any delays in the amount being credited to Link bank
          account. The time taken for the refund to appear on the
          cardholder&apos;s account may vary depending on the bank.
        </p>
      </div>
    </section>
  );
}
