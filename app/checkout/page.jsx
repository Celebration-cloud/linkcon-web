/* eslint-disable prettier/prettier */

// import { auth } from "@clerk/nextjs/server";

import { CheckoutClient } from "@/components/CheckoutClient";

export const metadata = {
  title: `Checkout`,
  description: "Descrição da página",
};

export default function Page() {

  return <CheckoutClient />;
}
