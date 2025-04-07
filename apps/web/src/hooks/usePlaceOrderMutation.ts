import { useMutation } from "@tanstack/react-query";
import { postPlaceOrder } from "../services/orderService";
import { ShoppingCart } from "../context/shopping-cart-context/shopping-cart-context";

export const usePlaceOrderMutation = () => {
  return useMutation({
    mutationFn: (shoppingCart: ShoppingCart) => {
      return postPlaceOrder(shoppingCart);
    },
  });
};
