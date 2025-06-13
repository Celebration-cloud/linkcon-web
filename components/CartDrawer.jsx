/* eslint-disable prettier/prettier */
"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Badge } from "@heroui/badge";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";

import { CartCard } from "@/components/CartCard";
import { fetchCart } from "@/store/actions/cartActions";

export const CartDrawer = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useUser();
  const userId = user?.id;
  const cartItems = useSelector((state) => state.cart.cartItems) 

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId, dispatch]);

  const handleCheckout = () => {
    router.push("/checkout");
    onClose();
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <Badge
          color="danger"
          content={cartItems.length}
          shape="rectangle"
          showOutline={false}
          size="sm"
        >
          <Button
            isIconOnly
            aria-label="Cart"
            className="bg-foreground-300 relative"
            size="md"
            variant="bordered"
            onPress={onOpen}
          >
            <ion-icon suppressHydrationWarning name="cart-outline" size="small" />
          </Button>
        </Badge>
      ) : (
        <Button
          isIconOnly
          aria-label="Cart"
          className="bg-foreground-300 relative"
          size="lg"
          variant="bordered"
          onPress={onOpen}
        >
          <ion-icon suppressHydrationWarning name="cart-outline" size="small" />
        </Button>
      )}

      <Drawer isOpen={isOpen} size="sm" onOpenChange={onOpenChange}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Cart</DrawerHeader>
              <DrawerBody className="px-2">
                <div className="space-y-2">
                  {cartItems.length === 0 ? (
                    <div className="text-center text-gray-400">
                      Your cart is empty.
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <CartCard key={item.$id || item.productId} item={item} />
                    ))
                  )}
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  className="w-full"
                  color="primary"
                  isDisabled={cartItems.length === 0}
                  radius="sm"
                  onPress={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};