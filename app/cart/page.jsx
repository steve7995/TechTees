"use client";

import ShoppingCard from "../components/ShoppingCard";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../components/CartContext";
import { useEffect,useState } from "react";

export default function Cart() {
  const { cartItems,getCartTotal} = useCart();

  useEffect(() => {}, [cartItems]);
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems &&
                cartItems.map((product) => {
                  return (
                    <div key={product.id}>
                      <ShoppingCard product={product}  />
                    </div>
                  );
                })}
            </div>
          </div>
          <OrderSummary  getCartTotal = {getCartTotal} />
        </div>
      </div>
    </section>
  );
}
