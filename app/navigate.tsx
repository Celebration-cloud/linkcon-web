/* eslint-disable prettier/prettier */
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/system";

interface NavigateProps {
  children: ReactNode;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const Navigate: React.FC<NavigateProps> = ({ children }) => {
  const router = useRouter();

  return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>;
};

export default Navigate;
