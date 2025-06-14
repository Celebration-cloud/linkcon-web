"use client";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@heroui/react";

import { NavDropdown } from "./NavDropdown";
import { NavItemComponent } from "./NavItemComponent";
import { ThemeSwitch } from "./theme-switch";
import SearchInput from "./SearchInput";
import { NavbarUserActions } from "./NavbarUserActions";
import WishlistIndicator from "./WishlistIndicator";

import { CartDrawer } from "@/components/CartDrawer";
import { siteConfig } from "@/config/site";

export const NavbarComponent = ({ categories, temuProducts }) => {
  const shop = "shopping";
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOpen = () => {
    onOpen();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);

      return;
    }
    const results = temuProducts.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchResults(results);
  };

  const handleCard = (product) => {
    router.push(`/item/${product.productId}`);
    onClose();
  };

  const handleShop = () => {
    router.push(`/browse/${shop}`);
  };

  return (
    <Navbar
      shouldHideOnScroll
      className="justify-between border-b-1"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link className="flex items-center gap-3" href="/">
          <div className="w-50 h-50 rounded-full border-cyan-300 overflow-hidden hidden sm:flex">
            <Image
              alt="HeroUI hero Image"
              height={200}
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={50}
            />
          </div>
          <p className="font-extrabold">{siteConfig.name}</p>
        </Link>
      </NavbarBrand>
      {/* Desktop Nav */}
      <NavbarContent className="hidden lg:flex gap-8 -ml-72" justify="start">
        <NavItemComponent />
        <NavbarItem>
          <NavDropdown categories={categories} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* Theme switch always visible */}
        <div className="hidden sm:flex items-center">
          <ThemeSwitch />
        </div>
        {/* Search button (mobile) */}
        <Button isIconOnly className="flex" onPress={handleOpen}>
          <ion-icon suppressHydrationWarning name="search-outline" />
        </Button>
        {/* Shop buttons */}
        <Button
          aria-label="sShop"
          className="bg-gray-500 hidden sm:inline-flex"
          onPress={handleShop}
        >
          Shop Now
        </Button>
        <Button
          isIconOnly
          aria-label="shopIcon"
          className="bg-gray-500 sm:hidden"
          onPress={handleShop}
        >
          <ion-icon
            suppressHydrationWarning
            name="bag-handle-outline"
            size="small"
          />
        </Button>
        {/* Cart always visible */}
        <div className="hidden sm:block">
          <CartDrawer />
        </div>
        <div className="hidden">
          <SearchInput
            handleCard={handleCard}
            handleSearch={handleSearch}
            isOpen={isOpen}
            searchQuery={searchQuery}
            searchResults={searchResults}
            onClose={onClose}
            onOpen={handleOpen}
          />
        </div>
        {/* User actions */}
        <WishlistIndicator />
        <NavbarUserActions className="hidden sm:flex" />
      </NavbarContent>
      {/* Mobile menu */}
      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`w-full hover:text-gray-400 ${pathname === item.href ? "text-blue-600" : ""}`}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          <NavDropdown categories={categories} />
        </NavbarItem>
        {/* Mobile search input */}
        <div className="w-full px-4">
          <SearchInput
            handleCard={handleCard}
            handleSearch={handleSearch}
            isOpen={isOpen}
            searchQuery={searchQuery}
            searchResults={searchResults}
            onClose={onClose}
            onOpen={handleOpen}
          />
        </div>
        {/* Mobile user actions */}
        <NavbarUserActions className="flex flex-col gap-2 mt-4 sm:hidden" />
        {/* Mobile cart */}
        {/* Theme switch in mobile menu */}
        <NavbarMenuItem className="mt-4 absolute bottom-0 left-0 flex items-center justify-between w-full border-t-1 p-4 bg-white dark:bg-gray-800">
          <div className="block mt-4">
            <CartDrawer />
          </div>
          <ThemeSwitch />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
