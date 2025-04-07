import { createContext, use } from "react";

export interface CartItem {
  productId: string
  quantity: number
}

export interface ShoppingCartContextType {
  cartItems: CartItem[];
  memberNumber: string;
  reset: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setMemberNumber: (memberNumber: string) => void;
  calculatePrice: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cartItems: [],
  memberNumber: "",
  reset: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  setMemberNumber: () => {},
  calculatePrice: () => {},
});

export const useShoppingCartContext = () => {
  return use(ShoppingCartContext)
}
