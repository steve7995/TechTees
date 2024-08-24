"use client";

import { useContext, useState, createContext, useEffect } from "react";
import React from "react";
// creating context
export const CartContext = createContext();

const stockProducts = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Python Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/Python-Black-scaled-1.jpg?v=1714161073&width=493",
    imageAlt: "Python Tee ",
    price: "$35",
    color: "black",
  },
  {
    id: 3,
    name: " Git Hub Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/git-hub-scaled-1.jpg?v=1714161064&width=713",
    imageAlt: " Git Hub Tee",
    price: "$35",
    color: "black",
  },
  {
    id: 4,
    name: "aws Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/AWS-Black-T-Shirt-scaled-1.jpg?v=1714161114&width=713",
    imageAlt: "aws Tee",
    price: "$35",
    color: "black",
  },
  {
    id: 5,
    name: "Google  Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/Google-Half-Sleeve-Black-scaled-1.jpg?v=1714161312&width=493",
    imageAlt: "Google  Tee",
    price: "$35",
    color: "black",
  },
  {
    id: 6,
    name: "StackOverflow Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/May-Stock-Overflow-With-Me-Half-Sleeve-Black-scaled-1.jpg?v=1714161338&width=493",
    imageAlt: "StackOverflow Tee",
    price: "$35",
    color: "black",
  },
  {
    id: 7,
    name: " Devops Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/Devops-Half-Sleeve-Bottle-Green-scaled-1.jpg?v=1714161185&width=493 ",
    imageAlt: " Devops Tee",
    price: "$35",
    color: "green",
  },
  {
    id: 8,
    name: " VS Code Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/VS-Code-Half-Sleeve-White-scaled-1.jpg?v=1714161690&width=493",
    imageAlt: "VS Code Tee",
    price: "$35",
    color: "White",
  },
  {
    id: 9,
    name: " IBM  Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/IBM-Half-Sleeve-White-scaled-1.jpg?v=1714161859&width=493",
    imageAlt: " IBM  Tee",
    price: "$35",
    color: "White",
  },
  {
    id: 10,
    name: " Microsoft Dot Net Tee",
    href: "#",
    imageSrc:
      "https://crazymonk.in/cdn/shop/files/Microsoft-dot-net-Half-Sleeve-White-scaled-1.jpg?v=1714161779&width=713",
    imageAlt: " Microsoft Dot Net Tee",
    price: "$35",
    color: "white",
  },
];
// creating the provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id); // check if the item is already in the cart

    if (isItemInCart) {
      setCartItems(
        cartItems.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
      );
    }
  };
  const clearCart = (item) => {
    setCartItems(cartItems.filter((x) => x.id !== item.id));
  };

  const getCartTotal = () => {
    // calculate the total price of the items in the cart
    let total = 0;
    for (let x of cartItems) {
      const price = parseInt(x.price.replace("$", ""));
      total += x.quantity * price;
    }
    return total;
  };

  const clearAll = () => {
    setCartItems([]);
  };

  const [orderAmount, setorderAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        products: stockProducts,
        setorderAmount,
        orderAmount,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        clearAll
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  // return the context data
  return context;
}
