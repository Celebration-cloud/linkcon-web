/* eslint-disable prettier/prettier */
"use client";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";



export const NavDropdown = ({categories}) => {
  const [drop, setDrop] = useState(false);
  const router = useRouter();
  const handleRoute = (id, name) => { 
    console.log(id, name)
    router.push(`/browse/${name}`, {title: name})
   };

  return (
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
      <DropdownMenu aria-label="Static Actions">
        {categories.map((item, idx) => (
          <DropdownItem key={idx} onPress={handleRoute.bind(this, item.categoryId, item.categoryName)}>{item.categoryName}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
