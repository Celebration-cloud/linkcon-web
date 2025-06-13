/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { useDisclosure } from "@heroui/react";

import { FilterBar } from "./FilterBar";

export const FilterDrawer = ({ categories, product, title }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="hidden max-lg:flex" onPress={onOpen}>
        Filter
      </Button>
      {/* <Button isIconOnly>
        <ion-icon name="grid-outline" size="large" />
      </Button>
      <Button isIconOnly>
        <ion-icon name="list-outline" size="large" />
      </Button> */}

      <Drawer
        isOpen={isOpen}
        placement="left"
        size="sm"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerBody className="px-2">
                <div className="p-4 space-x-2">
                  <FilterBar
                    categories={categories}
                    product={product}
                    title={title}
                  />
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
