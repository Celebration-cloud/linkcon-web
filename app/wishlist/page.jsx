/* eslint-disable prettier/prettier */
import WishlistClient from "@/components/WishlistClient";

export default function WishlistPage() {
  return (
    <section className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <WishlistClient />
    </section>
  );
}
