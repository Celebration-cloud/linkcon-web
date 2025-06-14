/* eslint-disable prettier/prettier */
/**
 * Contact Us Page Component
 *
 * Displays the contact information using the ContactTable component.
 * Intended to show customer service details, addresses, or other relevant contact data.
 */

import { ContactTable } from "@/components/contactTable";

/**
 * Metadata for SEO and social sharing.
 */
export const metadata = {
  title: "Contact Us",
  description:
    "Have questions or need assistance? Reach out to us through the contact information provided here. We're happy to help!",
  openGraph: {
    title: "Contact Us",
    description:
      "Have questions or need assistance? Reach out to us through the contact information provided here. We're happy to help!",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-images/contact.jpg",
        width: 800,
        height: 600,
        alt: "Contact Us Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Your Store Name",
    description:
      "Have questions or need assistance? Reach out to us through the contact information provided here. We're happy to help!",
    images: ["https://yourdomain.com/og-images/contact.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Contact Us Server Component
 *
 * Renders the main content of the Contact Us page including heading and table-based contact info.
 *
 * @returns {JSX.Element} Rendered contact page
 */
export default function Page() {
  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Us
      </h1>
      <ContactTable />
    </section>
  );
}
