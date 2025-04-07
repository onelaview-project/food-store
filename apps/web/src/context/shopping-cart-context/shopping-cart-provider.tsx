import { useState } from "react";
import {
  CartItem,
  ShoppingCartContext,
  ShoppingCartContextType,
} from "./shopping-cart-context";
import { Product } from "../../services/productService";

interface ShoppingCartProviderProps {
  products: Product[];
  onCalculate: (cartItems: CartItem[], memberNumber: string) => void;
  children: React.ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  products,
  onCalculate,
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [memberNumber, setMemberNumber] = useState<string>("");

  const contextValue: ShoppingCartContextType = {
    cartItems,
    memberNumber,
    reset: () => {
      setCartItems([]);
      setMemberNumber("");
    },
    addToCart: (productId: string) => {
      const cartItem = cartItems.find((item) => item.productId === productId);
      if (cartItem) {
        setCartItems((prev) => {
          return prev.map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        });
      } else {
        const product = products?.find((product) => product.id === productId);
        if (product) {
          setCartItems((prev) => [...prev, { productId, quantity: 1 }]);
        }
      }
    },
    removeFromCart: (productId: string) => {
      const cartItem = cartItems.find((item) => item.productId === productId);
      if (!cartItem) {
        return;
      }

      setCartItems((prev) => {
        return prev
          .map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          })
          .filter((item) => item.quantity > 0);
      });
    },
    setMemberNumber,
    calculatePrice: () => {
      onCalculate(cartItems, memberNumber);
    },
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
