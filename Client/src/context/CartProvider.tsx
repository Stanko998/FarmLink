// src/components/cart/CartProvider.tsx
import React, { createContext, useState, ReactNode } from "react";
import CartPopup from "../components/cart/CartPopup";

// Define the Product type (adjust fields as needed)
export interface Product {
  name: string;
  price: number;
  // Additional fields like id, image, etc., can be added if needed.
}

// Extend Product for CartItem with count and totalPrice
export interface CartItem extends Product {
  count: number;
  totalPrice: number;
}

// Define the shape of the CartContext
export interface CartContextType {
  cartItems: CartItem[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  toggleCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name
            ? {
                ...item,
                count: item.count + 1,
                totalPrice: (item.count + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          { ...product, count: 1, totalPrice: product.price },
        ];
      }
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem && existingItem.count > 1) {
        return prevItems.map((item) =>
          item.name === product.name
            ? {
                ...item,
                count: item.count - 1,
                totalPrice: (item.count - 1) * item.price,
              }
            : item
        );
      } else {
        return prevItems.filter((item) => item.name !== product.name);
      }
    });
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        toggleCart,
      }}
    >
      {children}
      {isCartOpen && <CartPopup />}
    </CartContext.Provider>
  );
};

export default CartProvider;
