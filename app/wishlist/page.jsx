/* eslint-disable prettier/prettier */
/**
 * Wishlist Page Component
 *
 * Displays the user's wishlist items using the client-side WishlistClient component.
 */

import WishlistClient from "@/components/WishlistClient";

/**
 * Metadata for SEO and social sharing
 */
export const metadata = {
  title: "My Wishlist",
  description: "View and manage your wishlist of products on Linkcon.",
  openGraph: {
    title: "My Wishlist",
    description:
      "View and manage your wishlist of products on Aman Enterprise.",
    url: "/wishlist",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "My Wishlist | Aman Enterprise",
    description:
      "View and manage your wishlist of products on Aman Enterprise.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * WishlistPage Server Component
 *
 * Renders the main wishlist page with heading and client-side wishlist component.
 *
 * @returns {JSX.Element} Rendered wishlist page
 */
export default function WishlistPage() {
  return (
    <section className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Wishlist
      </h1>
      <WishlistClient />
    </section>
  );
}
