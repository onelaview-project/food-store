import { skipToken, useQuery } from "@tanstack/react-query";
import { postCalculateShoppingCartPrice } from "../services/orderService";
import { ShoppingCart } from "../context/shopping-cart-context/shopping-cart-context";

export const useCalculateShoppingCartPriceQuery = (
  shoppingCart?: ShoppingCart,
) => {
  const { data: shoppingCartPrice, ...props } = useQuery({
    queryKey: ["calculateShoppingCartPrice", shoppingCart],
    queryFn: shoppingCart
      ? () => postCalculateShoppingCartPrice(shoppingCart)
      : skipToken,
  });

  return {
    shoppingCartPrice,
    ...props,
  };
};
