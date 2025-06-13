/* eslint-disable prettier/prettier */
"use client";

import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Button } from "@heroui/button";

import { SearchIcon } from "@/components/icons";

const SearchInput = ({
  isOpen,
  onOpen,
  onClose,
  searchQuery,
  searchResults,
  handleSearch,
  handleCard,
}) => {
  // Only the OUTSIDE search bar should open the modal
  const searchInput = (
    <div
      className="hidden md:flex gap-4 w-full cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyPress={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <Input
        readOnly // <-- keep this input readOnly so it only opens the modal
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchQuery}
      />
    </div>
  );

  // Inside the modal, the input should be editable and update searchQuery
  const searchInputVisible = (
    <div className="gap-4 w-full">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );

  return (
    <>
      {searchInput}
      <Modal
        hideCloseButton
        isOpen={isOpen}
        placement="center"
        scrollBehavior="inside"
        size="xl"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {searchInputVisible}
              </ModalHeader>
              <ModalBody>
                <h6 className="m-0 p-0">Search Items</h6>
                <div>
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.productId}
                        className="p-2 hover:bg-blue-500 hover:text-white rounded-lg "
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCard(product)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleCard(product);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <SearchIcon className="text-base hover:text-white pointer-events-none flex-shrink-0" />
                          <h4 className="text-lg font-bold">
                            {product.productName}
                          </h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No results found for &quot;{searchQuery}&quot;</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchInput;
