import { RefObject, useImperativeHandle, useState } from "react";
import {
  ShoppingCartContext,
  ShoppingCartContextType,
  ShoppingCart,
} from "./shopping-cart-context";
import { Product } from "../../services/productService";

export interface ShoppingCartRef {
  resetCard: () => void;
}

interface ShoppingCartProviderProps {
  products: Product[];
  onCalculate: (shoppingCartState: ShoppingCart) => void;
  onReset: () => void;
  children: React.ReactNode;
  ref: RefObject<ShoppingCartRef>;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  products,
  onCalculate,
  onReset,
  children,
  ref,
}) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({
    memberCardNumber: "",
    items: [],
  });

  useImperativeHandle(ref, () => ({
    resetCard: () => {
      setShoppingCart({
        items: [],
        memberCardNumber: "",
      });
    },
  }));

  const contextValue: ShoppingCartContextType = {
    shoppingCart,
    reset: () => {
      setShoppingCart({
        items: [],
        memberCardNumber: "",
      });
      onReset();
    },
    addToCart: (productId: string) => {
      const cartItem = shoppingCart.items.find(
        (item) => item.productId === productId,
      );
      if (cartItem) {
        setShoppingCart((prev) => ({
          ...prev,
          items: prev.items.map((item) => {
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
            items: [...prev.items, { productId, quantity: 1 }],
          }));
        }
      }
    },
    removeFromCart: (productId: string) => {
      const cartItem = shoppingCart.items.find(
        (item) => item.productId === productId,
      );
      if (!cartItem) {
        return;
      }

      setShoppingCart((prev) => ({
        ...prev,
        items: prev.items
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
      // Sanitize the member number to remove non-digit characters
      memberNumber = memberNumber.replace(/\D/g, "");

      setShoppingCart((prev) => ({
        ...prev,
        memberCardNumber: memberNumber,
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
