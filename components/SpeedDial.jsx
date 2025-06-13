/* eslint-disable prettier/prettier */
"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { addToast } from "@heroui/toast";

import { CallIcon, ShareIcon, WhatsAppIcon } from "./icons";

export const SpeedDial = () => {
  // Replace with your actual contact info
  const phoneNumber = "+2349014194307";
  const whatsappNumber = "+2349014194307";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      addToast({
        title: "Link copied!",
        description: "The page link has been copied to your clipboard.",
        status: "success",
        duration: 2500,
      });
    }
  };

  return (
    <ButtonGroup>
      <Button startContent={<CallIcon />} onPress={handleCall}>
        Call Us
      </Button>
      <Button startContent={<WhatsAppIcon />} onPress={handleWhatsApp}>
        Whatsapp
      </Button>
      <Button startContent={<ShareIcon />} onPress={handleShare}>
        Share
      </Button>
    </ButtonGroup>
  );
};
