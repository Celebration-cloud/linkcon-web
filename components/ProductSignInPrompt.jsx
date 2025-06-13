/* eslint-disable prettier/prettier */
"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@heroui/button";

export function ProductSignInPrompt() {
  return (
    <div className="flex flex-col items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 mt-2">
      <span className="text-red-600 dark:text-red-300 font-semibold text-sm">
        Sign in to add to cart, wishlist, or buy now.
      </span>
      <SignInButton mode="modal">
        <Button color="danger" size="sm" variant="flat">
          Sign In to Continue
        </Button>
      </SignInButton>
    </div>
  );
}
