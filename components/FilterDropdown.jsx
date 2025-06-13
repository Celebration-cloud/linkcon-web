/* eslint-disable prettier/prettier */
"use client";

import { Select, SelectItem } from "@heroui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FilterDropdown = ({ categories, title }) => {
  const router = useRouter();

  // Find the correct key for the initial selection
  const getInitialSelectedKey = () => {
    const found = categories.find(
      (cat, idx) =>
        cat.categoryName === title ||
        cat.id === title ||
        `${cat.categoryName}-${idx}` === title
    );

    if (!found) return "";
    // Use id if present, else categoryName-idx
    const idx = categories.indexOf(found);

    return found.id || `${found.categoryName}-${idx}`;
  };

  const [selected, setSelected] = useState(getInitialSelectedKey());

  const handleChange = (key) => {
    // If key is in the format "categoryName-idx", remove the "-idx" part
    const categoryName = key.includes("-")
      ? key.substring(0, key.lastIndexOf("-"))
      : key;

    const selectedCategory = categories.find(
      (cat) => cat.categoryName === categoryName
    );

    if (selectedCategory) {
      setSelected(key);
      router.push(`/browse/${selectedCategory.categoryName}`);
    }
  };

  return (
    <Select
      className="max-w-xs"
      label="Categories"
      placeholder="Select a Group"
      selectedKeys={[selected]}
      onSelectionChange={(keys) => handleChange([...keys][0])}
    >
      {categories.map((item, idx) => (
        <SelectItem
          key={item.id || `${item.categoryName}-${idx}`}
          value={item.id || `${item.categoryName}-${idx}`}
        >
          {item.categoryName}
        </SelectItem>
      ))}
    </Select>
  );
};
