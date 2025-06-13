/* eslint-disable prettier/prettier */
"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { InvoiceForm } from "./InvoiceForm";
import { OrderSummary } from "./OrderSummary";
import { CartCard } from "./CartCard";
import { SignInPrompt } from "./SignInPrompt";

export const CheckoutClient = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.back();
    }
  }, [cartItems, router]);

  return (
    <>
      <SignedIn>
        <div className="flex gap-5 w-full max-md:block max-md:space-y-5 ">
          <div className="w-1/2 space-y-4 max-md:w-full">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Cart</h3>
              <div className="space-y-2">
                {cartItems.length === 0 ? (
                  <div className="text-gray-400 text-center">
                    Your cart is empty.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <CartCard key={item.productId} item={item} />
                  ))
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Order Summary</h3>
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
          <div className="space-y-4 w-1/2 max-md:w-full">
            <h3 className="text-xl font-bold">Checkout</h3>
            <InvoiceForm cartItems={cartItems} />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
    </>
  );
};
