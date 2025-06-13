/* eslint-disable prettier/prettier */
"use client";

import { Card } from "@heroui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Divider } from "@heroui/divider";
import { Badge } from "@heroui/react";

export const OrderSummary = ({ cartItems = [] }) => {
  // Calculate subtotal from cartItems
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * (item.quantity || 1),
    0
  );
  const shippingCost = 0; // You can make this dynamic if needed
  const total = subtotal + shippingCost;

  return (
    <Card className="w-full p-5 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Invoice</h3>
      <Table aria-label="Order summary table">
        <TableHeader>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>UNIT PRICE</TableColumn>
          <TableColumn>QTY</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
        </TableHeader>
        <TableBody>
          {cartItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400">
                No items in cart.
              </TableCell>
            </TableRow>
          ) : (
            cartItems.map((item, index) => (
              <TableRow key={item.$id || item.productId || index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>${item.productPrice}</TableCell>
                <TableCell>{item.quantity || 1}</TableCell>
                <TableCell>
                  ${item.productPrice * (item.quantity || 1)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between py-2">
        <span className="font-medium">Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="font-medium">Shipping Cost</span>
        <span>{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between py-2 text-lg font-semibold">
        <span>Total</span>
        <Badge variant="destructive">${total}</Badge>
      </div>
    </Card>
  );
};
