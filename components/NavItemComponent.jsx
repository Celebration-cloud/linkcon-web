/* eslint-disable prettier/prettier */
"use client";

import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
export const NavItemComponent = () => {
  const router = useRouter();
  const pathname = usePathname()
const [activeItem, setActiveItem] = useState("");

useEffect(() => {
  setActiveItem(router.pathname);
}, [router.pathname]);

  return (
    <>
      {siteConfig.navItems.map((item, idx) => (
        <NavbarItem
          key={idx}
          isActive={activeItem === item.href ? true : false}
        >
          <Link
            className={`w-full hover:underline ${pathname === item.href ? "underline" : ""}`}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
}
