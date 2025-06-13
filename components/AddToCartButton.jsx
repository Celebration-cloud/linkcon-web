/* eslint-disable prettier/prettier */
"use client";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { addToast } from "@heroui/toast";
import { useUser } from "@clerk/nextjs";

import { addToCart } from "../store/actions/cartActions";

export const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userId = user?.id;

  const handleAddToCart = () => {
    if (!userId) {
      addToast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart.",
        status: "warning",
        color: "warning",
        duration: 3000,
      });

      return;
    }
    dispatch(addToCart(product, userId));
    addToast({
      title: "Added to Cart",
      description: `"${product.productName}" has been added to your cart.`,
      status: "success",
      color: "success",
      duration: 3000,
    });
  };

  return (
    <Button
      color="success"
      startContent={<ion-icon name="cart-outline" size="small" />}
      onPress={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};
