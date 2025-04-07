import http from "../api/http";
import { ShoppingCart } from "../context/shopping-cart-context/shopping-cart-context";

export interface DiscountItem {
  productId: string;
  discount: number;
}

export interface ShoppingCartPrice {
  totalPriceBeforeDiscount: number;
  discountFromMemberCard: number;
  discountItems: DiscountItem[];
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  errorCode?: string;
}

export const postCalculateShoppingCartPrice = async (
  shoppingCart: ShoppingCart,
) => {
  const response = await http.post<ShoppingCartPrice>(
    "/orders/calculate-price",
    {
      items: shoppingCart.items,
      memberCardNumber: shoppingCart.memberCardNumber || null,
    },
  );

  return response.data;
};

export const postPlaceOrder = async (shoppingCart: ShoppingCart) => {
  const response = await http.post<PlaceOrderResponse>("/orders/place-order", {
    items: shoppingCart.items,
    memberCardNumber: shoppingCart.memberCardNumber || null,
  });

  return response.data;
};
