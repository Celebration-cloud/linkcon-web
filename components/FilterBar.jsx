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
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("latest");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    handleApplyFilters();
  }, [sortBy]);

  const handleApplyFilters = () => {
    const filtered = applyFiltersNow(
      product,
      searchQuery,
      selectedCategories,
      priceRange,
      inStockOnly,
      sortBy
    );

    console.log(filtered, "sortBy:", sortBy);
    dispatch(applyFilters(filtered, searchQuery));
  };

  const handleResetFilters = () => {
    const resetProducts = resetFiltersNow(product);

    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSortBy("latest");
    setInStockOnly(false);
    setSearchQuery("");
    console.log(resetProducts);

    dispatch(resetFilters(resetProducts));
  };

  return (
    <div className="">
      {/* Header */}
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
          defaultValue={[0, 10000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          maxValue={10000}
          minValue={0}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
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
              className="flex items-center gap-2 text-gray-700"
              isSelected={selectedCategories.includes(category.categoryName)}
              onValueChange={(isSelected) => {
                if (isSelected) {
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
          className="flex items-center gap-2 text-gray-700"
          isSelected={inStockOnly}
          onValueChange={setInStockOnly}
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
          placeholder="Select sorting"
          selectedKeys={new Set([sortBy])}
          variant="bordered"
          onSelectionChange={(keySet) => {
            const selected = Array.from(keySet)[0];

            if (selected) setSortBy(selected);
          }}
        >
          <SelectItem key="latest">Latest Arrivals</SelectItem>
          <SelectItem key="price-low-high">Price: Low to High</SelectItem>
          <SelectItem key="price-high-low">Price: High to Low</SelectItem>
          <SelectItem key="rating-high-low">Rating: High to Low</SelectItem>
          <SelectItem key="most-reviews">Most Reviews</SelectItem>
        </Select>
      </div>

      {/* Apply Filters */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
        onPress={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};
