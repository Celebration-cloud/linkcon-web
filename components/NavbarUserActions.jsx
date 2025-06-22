/* eslint-disable prettier/prettier */
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@heroui/button";

export const NavbarUserActions = ({ className = "" }) => (
  <div className={`flex items-center -mr-4`}>
    <SignedIn>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>

    {/* Show Sign In and Sign Up buttons when user is not signed in */}
    <div className={`flex items-center ${className}`}>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <Button color="primary" size="sm" variant="flat">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button color="secondary" size="sm" variant="flat">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  </div>
);
