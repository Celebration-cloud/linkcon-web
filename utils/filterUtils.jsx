/* eslint-disable prettier/prettier */
export const applyFiltersNow = (
  products,
  searchQuery,
  selectedCategories,
  priceRange,
  inStockOnly,
  sortBy
) => {
  let filtered = products.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Category filter
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((item) =>
      selectedCategories.includes(item.categoryName)
    );
  }

  // Price filter
  filtered = filtered.filter(
    (item) =>
      item.productPrice >= priceRange[0] && item.productPrice <= priceRange[1]
  );

  // In stock filter
  if (inStockOnly) {
    filtered = filtered.filter((item) => item.inStock);
  }

  // Sorting
  switch (sortBy) {
    case "price-low-high":
      filtered.sort((a, b) => a.productPrice - b.productPrice);
      break;
    case "price-high-low":
      filtered.sort((a, b) => b.productPrice - a.productPrice);
      break;
    case "rating-high-low":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "most-reviews":
      filtered.sort((a, b) => b.reviews - a.reviews);
      break;
    case "latest":
      filtered.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      break;
  }

  return filtered;
};

export const resetFiltersNow = (products) => {
  return products;
};
