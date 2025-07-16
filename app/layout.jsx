"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import React, { useEffect, useState } from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { NavbarComponent } from "@/components/navbar";
import { FooterComponent } from "@/components/footerComponent";
import { PaymentFooter } from "@/components/paymentFooter";
import { SpeedDial } from "@/components/SpeedDial";
import { ThemeSwitch } from "@/components/theme-switch";
import { CartDrawer } from "@/components/CartDrawer";
import CookiesAlert from "@/components/CookiesAlert";
import { getTemuCategories, getTemuProduct } from "@/libs/dataAction";

import "primereact/resources/themes/lara-light-cyan/theme.css";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  const [categories, setCategories] = useState([]);
  const [temuProduct, setTemuProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const temuCategories = await getTemuCategories();

        setCategories(temuCategories.data || []);
        const temuProductResponse = await getTemuProduct();

        setTemuProduct(temuProductResponse.data || []);
      } catch (error) {
        // Optionally handle error
        setCategories([]);
        setTemuProduct([]);
      }
    }
    fetchData();
  }, []);

  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta charSet="UTF-8" />
          <link href={metadata.icons.icon} rel="icon" />
          <meta content={metadata.description} name="description" />

          {/* Google AdSense Verification Meta Tag */}
          <meta
            content="ca-pub-7517532434811402"
            name="google-adsense-account"
          />

          {/* Optional: Google Site Verification Token */}
          {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}

          {/* Theme Color Meta Tags */}
          {viewport.themeColor.map(({ media, color }) => (
            <meta
              key={media}
              content={color}
              media={media}
              name="theme-color"
            />
          ))}
        </head>

        <body
          className={clsx(
            "min-h-screen font-sans antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white",
            fontSans.variable,
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative mx-auto max-w-7xl min-h-screen flex flex-col gap-5">
              {/* Navbar */}
              <NavbarComponent
                categories={categories}
                temuProducts={temuProduct}
              />

              {/* Main Content */}
              <main className="container mx-auto max-w-7xl px-6 flex-grow">
                {children}
              </main>

              {/* Footer */}
              <footer className="w-full">
                <PaymentFooter />
                <FooterComponent />
              </footer>

              {/* Floating Buttons */}
              <div
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-20"
                role="button"
              >
                <SpeedDial />
              </div>
              <div
                aria-label="Cart Drawer"
                className="fixed bottom-1/2 left-1 z-20 flex sm:hidden"
              >
                <CartDrawer />
              </div>
              <div
                aria-label="Theme Switcher"
                className="fixed bottom-16 right-5 bg-gray-200 dark:bg-gray-700 p-2 z-20 rounded-md flex sm:hidden"
              >
                <ThemeSwitch />
              </div>
            </div>

            {/* Cookie Consent */}
            <CookiesAlert />
          </Providers>

          {/* ✅ Google AdSense Script (must be in body for app directory) */}
          <Script
            async
            crossOrigin="anonymous"
            id="adsense-script"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7517532434811402"
            strategy="afterInteractive"
          />

          {/* Ionicons */}
          <Script
            defer
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
            type="module"
          />
          <Script
            defer
            noModule
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          />

          {/* Vercel Analytics */}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

export const revalidate = 60;
