/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { Checkbox, Select, SelectItem, Slider } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { applyFilters, resetFilters } from "../store/actions/filtersActions";
import { applyFiltersNow, resetFiltersNow } from "../utils/filterUtils";

export const FilterBar = ({ categories, product, title }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states
  const titles = title === "shopping" ? [] : title;
  const [selectedCategories, setSelectedCategories] = useState(titles);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("latest");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    setFilteredProducts(product);
    setIsLoading(false);
  }, [product]);

  useEffect(() => {
    handleApplyFilters();
  }, [sortBy]);

  const handleApplyFilters = () => {
    const filtered = applyFiltersNow(product, searchQuery, selectedCategories, priceRange, inStockOnly, sortBy);

    setFilteredProducts(filtered);
    setIsFiltersOpen(false);
    console.log(filtered);

    // Dispatch the applyFilters action
    dispatch(applyFilters(filtered, searchQuery));
  };

  const handleResetFilters = () => {
    const resetProducts = resetFiltersNow(product);

    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortBy("latest");
    setInStockOnly(false);
    setSearchQuery("");
    setFilteredProducts(resetProducts);
    console.log(resetProducts);

    // Dispatch the resetFilters action
    dispatch(resetFilters(resetProducts));
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <div className="flex gap-2">
          <Button
            className="text-sm text-blue-600 hover:text-blue-700"
            onPress={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Price Range</h3>
        <Slider
          aria-label="Price Range"
          className="w-full"
          max={1000}
          min={0}
          step={10}
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
        />
        <div className="flex justify-between text-sm mt-2 text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category, idx) => (
            <Checkbox
              key={idx}
              checked={selectedCategories.includes(category.categoryName)}
              className="flex items-center gap-2 text-gray-700"
              label={category.categoryName}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([
                    ...selectedCategories,
                    category.categoryName,
                  ]);
                } else {
                  setSelectedCategories(
                    selectedCategories.filter(
                      (c) => c !== category.categoryName
                    )
                  );
                }
              }}
            >
              {category.categoryName}
            </Checkbox>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Availability</h3>
        <Checkbox
          checked={inStockOnly}
          className="flex items-center gap-2 text-gray-700"
          label="In Stock Only"
          onChange={(e) => setInStockOnly(e.target.checked)}
        >
          In Stock Only
        </Checkbox>
      </div>

      {/* Sort By */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Sort By</h3>
        <Select
          className="w-full"
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <SelectItem value="latest">Latest Arrivals</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="rating-high-low">Rating: High to Low</SelectItem>
          <SelectItem value="most-reviews">Most Reviews</SelectItem>
        </Select>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
        onPress={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};