import http from "../api/http";
import { ShoppingCart } from "../context/shopping-cart-context/shopping-cart-context";

interface DiscountItem {
  productId: string;
  discount: number;
}

export interface ShoppingCartPrice {
  totalPriceBeforeDiscount: number;
  discountFromMemberCard: number;
  discountItems: DiscountItem[];
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
