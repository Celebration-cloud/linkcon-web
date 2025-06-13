/* eslint-disable prettier/prettier */
"use client";
import { useEffect, useState } from "react";
import { Alert, Button } from "@heroui/react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function CookiesAlert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookiesConsent");

    if (!consent) setShow(true);
  }, []);

  const handleAccept = () => {
    Cookies.set("cookiesConsent", "accepted", { expires: 365 });
    setShow(false);
  };

  const handleReject = () => {
    Cookies.set("cookiesConsent", "rejected", { expires: 365 });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex items-center justify-center w-1/2">
      <Alert
        color="warning"
        description={
          <span>
            We use cookies to improve your experience. By using our site, you
            agree to our use of cookies. See our{" "}
            <Link className="underline text-primary-600" href="/privacy">
              Privacy Policy
            </Link>
            .
          </span>
        }
        endContent={
          <div className="flex gap-2">
            <Button
              color="warning"
              size="sm"
              variant="flat"
              onPress={handleReject}
            >
              Reject
            </Button>
            <Button color="primary" size="sm" onPress={handleAccept}>
              Accept
            </Button>
          </div>
        }
        title="Cookies Notice"
        variant="faded"
      />
    </div>
  );
}
