"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { ToastProvider } from "@heroui/toast";

import store from "@/store/storeConfig";
// import { NetworkStatusToast } from "@/components/NetworkStatusToast";

export function Providers({ children, themeProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider placement="top-center" />
      {/* <NetworkStatusToast /> */}
      <NextThemesProvider {...themeProps}>
        <PrimeReactProvider>
          <Provider store={store}>{children}</Provider>
        </PrimeReactProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
