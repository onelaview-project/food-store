import { createContext, use } from "react";

export interface CartItem {
  productId: string
  quantity: number
}

export interface ShoppingCart {
  memberCardNumber: string;
  items: CartItem[];
}

export interface ShoppingCartContextType {
  shoppingCart: ShoppingCart;
  reset: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setMemberNumber: (memberNumber: string) => void;
  calculatePrice: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType,
);

export const useShoppingCartContext = () => {
  return use(ShoppingCartContext)
}
