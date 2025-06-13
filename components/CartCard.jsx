/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";

import {
  updateCartItemQuantity,
  removeFromCart,
} from "../store/actions/cartActions";

export const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userId = user?.id;

  const handleIncrement = () => {
    dispatch(
      updateCartItemQuantity(
        item.$id || item.productId,
        item.quantity + 1,
        userId
      )
    );
    // Use Appwrite's $id if available, fallback to productId
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItemQuantity(
          item.$id || item.productId,
          item.quantity - 1,
          userId
        )
      );
    }
  };

  const handleRemove = () => {
    // Use Appwrite's $id if available, fallback to productId
    dispatch(removeFromCart(item.$id || item.productId, userId));
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full"
      shadow="sm"
    >
      <CardBody>
        <div className="flex gap-6 md:gap-4 ">
          <div className="relative">
            <Image
              alt={item.productName}
              className="object-cover"
              height={100}
              shadow="md"
              src={item.productImageUrl}
              width={100}
            />
          </div>
          <div className="flex flex-col w-4/5 justify-between">
            <div>
              <h2 className="text-md font-semibold">{item.productName}</h2>
              <p className="text-red-500">${item.productPrice}</p>
            </div>
            <div className="self-end space-x-1 flex items-center">
              <Button
                isIconOnly
                color="default"
                disabled={item.quantity <= 1}
                onPress={handleDecrement}
              >
                <ion-icon name="remove-outline" />
              </Button>
              <span className="px-2">{item.quantity}</span>
              <Button isIconOnly color="default" onPress={handleIncrement}>
                <ion-icon name="add-outline" />
              </Button>
              <Button
                isIconOnly
                aria-label="Remove"
                color="danger"
                onPress={handleRemove}
              >
                <ion-icon name="trash-outline" size="sm" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
