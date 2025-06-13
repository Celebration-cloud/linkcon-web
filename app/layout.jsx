import "@/styles/globals.css";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { NavbarComponent } from "@/components/navbar";
import { FooterComponent } from "@/components/footerComponent";
import { PaymentFooter } from "@/components/paymentFooter";
import { SpeedDial } from "@/components/SpeedDial";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ThemeSwitch } from "@/components/theme-switch";
import { CartDrawer } from "@/components/CartDrawer";
import { getTemuCategories, getTemuProduct } from "@/libs/dataAction";
import CookiesAlert from "@/components/CookiesAlert";

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

export default async function RootLayout({ children }) {
  const temuCategories = await getTemuCategories();
  const categories = temuCategories.data;
  const temuProductResponse = await getTemuProduct();
  const temuProduct = temuProductResponse.data; // Ensure temuProduct is an array

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta charSet="UTF-8" />
          <title>{metadata.title.default}</title>
          <link href={metadata.icons.icon} rel="icon" />
          <meta content={metadata.description} name="description" />
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
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
          suppressHydrationWarning={true}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative mx-auto max-w-7xl min-h-screen flex flex-col gap-5">
              <NavbarComponent
                categories={categories}
                temuProducts={temuProduct}
              />
              <main
                className="container mx-auto max-w-7xl px-6 flex-grow"
                role="main"
              >
                {children}
              </main>
              <footer className="w-full ">
                <PaymentFooter />
                <FooterComponent />
              </footer>
              <div
                aria-label="Speed Dial"
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-20"
                role="button"
              >
                <SpeedDial />
              </div>
              <div className="fixed bottom-1/2 z-20 left-1 hidden max-sm:flex">
                <CartDrawer />
              </div>
              <div className="fixed bottom-16 right-5 bg-foreground-200 items-center p-2 z-20 rounded-md hidden max-sm:flex">
                <ThemeSwitch />
              </div>
            </div>
            <CookiesAlert />
          </Providers>
          <script
            defer
            suppressHydrationWarning
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
            type="module"
          />
          <script
            defer
            suppressHydrationWarning
            noModule
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

export const revalidate = 60 * 60 * 24;
