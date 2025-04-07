import { createContext, use } from "react";

export interface CartItem {
  productId: string
  quantity: number
}

export interface ShoppingCartContextType {
  cartItems: CartItem[];
  reset: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  calculatePrice: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cartItems: [],
  reset: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  calculatePrice: () => {}
})

export const useShoppingCartContext = () => {
  return use(ShoppingCartContext)
}
