import { useState } from "react";
import {
  CartItem,
  ShoppingCartContext,
  ShoppingCartContextType,
} from "./shopping-cart-context";
import { Product } from "../../services/productService";

interface ShoppingCartProviderProps {
  products: Product[];
  onCalculate: (cartItems: CartItem[]) => void;
  onReset: () => void;
  children: React.ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  products,
  onCalculate,
  onReset,
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const contextValue: ShoppingCartContextType = {
    cartItems,
    reset: () => {
      setCartItems([]);
      onReset();
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
    calculatePrice: () => {
      onCalculate(cartItems);
    },
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
