import { createContext, use } from "react";

export interface CartItem {
  productId: string
  quantity: number
}

export interface ShoppingCart {
  memberNumber: string;
  cartItems: CartItem[];
}

export interface ShoppingCartContextType {
  shoppingCart: ShoppingCart;
  reset: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setMemberNumber: (memberNumber: string) => void;
  calculatePrice: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  shoppingCart: {
    memberNumber: "",
    cartItems: [],
  },
  reset: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  setMemberNumber: () => {},
  calculatePrice: () => {},
});

export const useShoppingCartContext = () => {
  return use(ShoppingCartContext)
}
