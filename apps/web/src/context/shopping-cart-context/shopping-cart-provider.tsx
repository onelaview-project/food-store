import { useState } from "react";
import {
  ShoppingCartContext,
  ShoppingCartContextType,
  ShoppingCart,
} from "./shopping-cart-context";
import { Product } from "../../services/productService";

interface ShoppingCartProviderProps {
  products: Product[];
  onCalculate: (shoppingCartState: ShoppingCart) => void;
  children: React.ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  products,
  onCalculate,
  children,
}) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({
    memberNumber: "",
    cartItems: [],
  });

  const contextValue: ShoppingCartContextType = {
    shoppingCart,
    reset: () => {
      setShoppingCart({
        cartItems: [],
        memberNumber: "",
      });
    },
    addToCart: (productId: string) => {
      const cartItem = shoppingCart.cartItems.find(
        (item) => item.productId === productId,
      );
      if (cartItem) {
        setShoppingCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.map((item) => {
            if (item === cartItem) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        }));
      } else {
        const product = products?.find((product) => product.id === productId);
        if (product) {
          setShoppingCart((prev) => ({
            ...prev,
            cartItems: [...prev.cartItems, { productId, quantity: 1 }],
          }));
        }
      }
    },
    removeFromCart: (productId: string) => {
      const cartItem = shoppingCart.cartItems.find(
        (item) => item.productId === productId,
      );
      if (!cartItem) {
        return;
      }

      setShoppingCart((prev) => ({
        ...prev,
        cartItems: prev.cartItems
          .map((item) => {
            if (item === cartItem) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      }));
    },
    setMemberNumber: (memberNumber: string) => {
      setShoppingCart((prev) => ({
        ...prev,
        memberNumber,
      }));
    },
    calculatePrice: () => {
      onCalculate(shoppingCart);
    },
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
