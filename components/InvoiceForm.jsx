/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/react";
import { useForm } from "react-hook-form";

// import { Button, Input } from "@/components/ui"; 

export function InvoiceForm({cartItems}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Prepare data for the API call
    console.log("Form data submitted:", { ...data, cartItems });

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, cartItems }),
      });

      const result = await res.json();

      console.log("API response:", result);
      if (!res.ok) {
        throw new Error(result.error || "Failed to create checkout session");
      }
      if (result.url) {
        window.location.href = result.url; // Redirect to Stripe Checkout
        Alert({
          title: "Redirecting to Payment",
          description: "You are being redirected to the payment page.",
          status: "info",
        });
      } else {
        alert("Failed to redirect to payment.");
        Alert({
          title: "Payment Error",
          description: "Failed to redirect to payment.",
          status: "error",
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      Alert({
        title: "Payment Error",
        description: err.message || "Something went wrong during payment.",
        status: "error",
      });
    }

    reset(); // Reset form after submission
    Alert({
      title: "Invoice Sent",
      description: "Your invoice has been sent successfully!",
      status: "success",
    });
  };
  

  return (
    <div className=" p-6 bg-white shadow-md rounded-lg">
      <form className="space-y-4 max-md:flex-wrap" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <Input
            placeholder="Enter Name"
            {...register("name", {
              required: "Name must contain at least 2 characters",
              minLength: 2,
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Enter Email"
              type="email"
              {...register("email", {
                required: "Invalid email",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Enter Phone Number"
              type="tel"
              {...register("phone", {
                required: "Invalid phone number",
                minLength: 10,
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <Input
            placeholder="Enter Address"
            {...register("address", {
              required: "Address too short",
              minLength: 5,
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Zipcode & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Enter Zipcode"
              {...register("zipcode", {
                required: "Invalid zipcode",
                minLength: 5,
              })}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Enter City"
              {...register("city", { required: "Invalid city" })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* State & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Enter State"
              {...register("state", { required: "Invalid state" })}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div>
            <Input disabled className="bg-gray-100" value="Nigeria" />
            <p className="text-gray-500 text-sm">
              Only Nigeria is supported currently
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-red-500 text-white py-2 rounded-lg"
          type="submit"
        >
          Send Invoice
        </Button>
      </form>
    </div>
  );
}
