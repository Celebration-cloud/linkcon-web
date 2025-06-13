/* eslint-disable prettier/prettier */
import Image from "next/image";

export const PaymentFooter = () => {
  return (
    <div className="flex max-md:flex-col max-md:gap-10 max-md:py-10 max-md:h-64 justify-around h-40 border-t-1 mx-10 items-center">
      <p className="text-xl font-bold">Free Shipping</p>
      <p className="text-xl font-bold">Made in Nigeria</p>
      <div className="place-items-center items-center gap-2">
        <p className="text-xl font-bold">Payments via</p>
        <Image alt="Stripe" height={24} src="/stripe-image.png" width={80} />
      </div>
    </div>
  );
};
