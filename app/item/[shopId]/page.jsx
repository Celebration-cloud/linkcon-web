/* eslint-disable prettier/prettier */
import { SingleItemCarousel } from "../../../components/SingleItemCarousel";
import {
  getSingleTemuProduct,
  getTemuCategoriesById,
} from "../../../libs/dataAction";
import { ProductActions } from "../../../components/ProductActions";

import { ItemDetails } from "@/components/ItemDetails";
import { ItemCarousel } from "@/components/ItemCarousel";

/**
 * Metadata for SEO and social sharing.
 *
 * @type {{title: string, description: string}}
 */
export const generateMetadata = async ({ params }) => {
  const { shopId } = await Promise.resolve(params);

  try {
    const temuProduct = await getSingleTemuProduct(shopId);

    return {
      title: temuProduct?.productName || "Product Details",
      description:
        temuProduct?.productDescription?.slice(0, 160) ||
        "View details about this product.",
    };
  } catch (error) {
    console.error("Failed to load product metadata:", error);

    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
};

// Default image URL used when no product image is available
const defaultImageUrl = "/404 Error-rafiki.svg";

/**
 * Main Product Detail Page Component
 *
 * Renders the full product page including:
 * - Product carousel
 * - Product actions (price, add to cart, etc.)
 * - Product description
 * - Related products carousel
 *
 * @param {Object} props
 * @param {Object} props.params - Dynamic route parameters containing `shopId`
 * @returns {JSX.Element}
 */
export default async function Page({ params }) {
  const { shopId } = await Promise.resolve(params);
  const temuProduct = await getSingleTemuProduct(shopId);
  const setOfCategories = await getTemuCategoriesById(temuProduct.categoryId);

  return (
    <div className="h-fit space-y-4">
      {/* Product Section */}
      <section className="flex max-lg:flex-wrap items-center gap-5">
        {/* Image Carousel */}
        <div className="w-full flex items-center justify-center">
          <SingleItemCarousel
            image={[temuProduct.productImageUrl || defaultImageUrl]}
          />
        </div>

        {/* Product Actions / Info */}
        <div className="w-full space-y-4 flex-wrap">
          <ProductActions temuProduct={temuProduct} />
        </div>
      </section>

      {/* Product Description */}
      <ItemDetails
        descriptions={temuProduct.productDescription}
        productId={temuProduct.productId}
      />

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Other Related Product</h2>
        <ItemCarousel sampleProducts={setOfCategories.data} />
      </div>
    </div>
  );
}
