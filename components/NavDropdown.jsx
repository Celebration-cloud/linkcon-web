/* eslint-disable prettier/prettier */
"use client";
import { useState } from "react";
import { Dropdown, DropdownTrigger } from "@heroui/dropdown";
import { Listbox, ListboxItem } from "@heroui/react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

// Light/Dark mode styled wrapper
const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border px-1 py-2 rounded-md  border-neutral-200 bg-white text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white shadow-lg">
    {children}
  </div>
);

export const NavDropdown = ({ categories }) => {
  const [drop, setDrop] = useState(false);
  const router = useRouter();

  const handleRoute = (value) => {
    const selected = categories.find(
      (item) => item.categoryId.toString() === value,
    );

    if (selected) {
      router.push(`/browse/${selected.categoryName}`, {
        title: selected.categoryName,
      });
      setDrop(false);
    }
  };

  return (
    <div className="relative">
      <Dropdown open={drop} onOpenChange={setDrop}>
        <DropdownTrigger>
          <Button
            className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg"
            endContent={
              <ion-icon
                suppressHydrationWarning
                name={drop ? "chevron-up-outline" : "chevron-down-outline"}
              />
            }
            radius="sm"
            variant="light"
          >
            Products
          </Button>
        </DropdownTrigger>
      </Dropdown>

      {drop && (
        <div className="absolute z-50 mt-2 w-[260px]">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              isVirtualized
              aria-label="Categories"
              className="max-w-xs"
              itemClasses={{
                base: "text-black dark:text-white data-[hovered=true]:bg-neutral-100 dark:data-[hovered=true]:bg-neutral-800",
              }}
              selectionMode="single"
              virtualization={{
                maxListboxHeight: 400,
                itemHeight: 40,
              }}
              onSelectionChange={handleRoute}
            >
              {categories.map((item) => (
                <ListboxItem
                  key={item.categoryId}
                  value={item.categoryId.toString()}
                >
                  {item.categoryName}
                </ListboxItem>
              ))}
            </Listbox>
          </ListboxWrapper>
        </div>
      )}
    </div>
  );
};
