/* eslint-disable prettier/prettier */
/**
 * Checkout Page Component
 *
 * Renders the checkout page with client-side interactivity.
 * Uses the CheckoutClient component for all dynamic behavior.
 */

import { CheckoutClient } from "@/components/CheckoutClient";

/**
 * Metadata for SEO and social sharing.
 * Can be dynamically extended based on user/cart data if needed.
 */
export const metadata = {
  title: "Checkout",
  description:
    "Complete your purchase securely. Review your items and provide shipping and payment details to proceed with checkout.",
  openGraph: {
    title: "Checkout",
    description:
      "Complete your purchase securely. Review your items and provide shipping and payment details to proceed with checkout.",
    url: "/checkout",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-images/checkout.jpg",
        alt: "Checkout Page",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | Your Store Name",
    description:
      "Complete your purchase securely. Review your items and provide shipping and payment details to proceed with checkout.",
    images: ["https://yourdomain.com/og-images/checkout.jpg"],
  },
  robots: {
    index: false, // Prevent indexing of checkout page (sensitive content)
    follow: false,
  },
};

/**
 * Checkout Page Server Component
 *
 * This is a minimal wrapper that renders the client-side CheckoutClient component.
 * All interactive logic (form handling, payment processing) should happen in the client component.
 *
 * @returns {JSX.Element} Rendered checkout page
 */
export default function Page() {
  return <CheckoutClient />;
}
