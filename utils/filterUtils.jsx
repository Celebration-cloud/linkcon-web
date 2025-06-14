/* eslint-disable prettier/prettier */
// utils/filterUtils.js

export const applyFiltersNow = (
  products,
  searchQuery,
  selectedCategories,
  priceRange,
  inStockOnly,
  sortBy
) => {
  // Defensive copy
  let filtered = Array.isArray(products) ? [...products] : [];

  // Search Filter
  if (searchQuery?.trim()) {
    filtered = filtered.filter((item) =>
      item.productName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Category Filter
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((item) =>
      selectedCategories.includes(item.categoryName)
    );
  }

  // Price Filter
  filtered = filtered.filter((item) => {
    const price = parseFloat(item.productPrice);

    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Stock Filter
  if (inStockOnly) {
    filtered = filtered.filter((item) => item.inStock === true);
  }
  console.log("Sort By:", sortBy);
  console.log("Sample product:", filtered[0]);
  
  // Sorting
  if (sortBy && typeof sortBy === "string") {
    switch (sortBy) {
      case "price-low-high":
        filtered.sort(
          (a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice)
        );
        break;

      case "price-high-low":
        filtered.sort(
          (a, b) => parseFloat(b.productPrice) - parseFloat(a.productPrice)
        );
        break;

      case "rating-high-low":
        filtered.sort(
          (a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0)
        );
        break;

      case "most-reviews":
        filtered.sort(
          (a, b) => parseInt(b.reviews || 0) - parseInt(a.reviews || 0)
        );
        break;

      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdDate || 0).getTime() -
            new Date(a.createdDate || 0).getTime()
        );
        break;

      default:
        break;
    }
  }
console.log("Filtered products:", filtered);

  return filtered;
};

export const resetFiltersNow = (products) => [...products];
