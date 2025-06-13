/* eslint-disable prettier/prettier */

import { SignedOut, SignInButton } from "@clerk/nextjs";

export const SignInPrompt = () => (
  <SignedOut>
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <p className="mb-4 text-lg font-semibold">
        Please sign in to continue to checkout.
      </p>
      <SignInButton mode="modal">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Sign In
        </button>
      </SignInButton>
    </div>
  </SignedOut>
);
