import { ShoppingCart } from "../../context/shopping-cart-context/shopping-cart-context";
import { usePlaceOrderMutation } from "../../hooks/usePlaceOrderMutation";
import { ShoppingCartPrice } from "../../services/orderService";
import Button from "../common/Button";
import Loading from "../common/Loading";
import CartPriceDiscountFromMemberCard from "./CartPriceDiscountFromMemberCart";
import CartPriceDiscountItems from "./CartPriceDiscountItems";
import CartPriceFinalTotal from "./CartPriceFinalTotal";
import CartPriceTotalBeforeDiscount from "./CartPriceTotalBeforeDiscount";

interface CartPriceSummaryProps {
  shoppingCart?: ShoppingCart;
  shoppingCartPrice?: ShoppingCartPrice;
  onPlaceOrder: () => void;
}

const CartPriceSummaryContainer: React.FC<CartPriceSummaryProps> = ({
  shoppingCart,
  shoppingCartPrice,
  onPlaceOrder,
}) => {
  const placeOrderMutation = usePlaceOrderMutation();
  let finalTotalPrice = 0;

  if (shoppingCartPrice) {
    finalTotalPrice =
      shoppingCartPrice.totalPriceBeforeDiscount -
      shoppingCartPrice.discountFromMemberCard -
      shoppingCartPrice.discountItems.reduce(
        (acc, item) => acc + item.discount,
        0,
      );
  }

  const handleOrderButtonClick = () => {
    if (shoppingCart) {
      placeOrderMutation.mutate(shoppingCart, {
        onSuccess: (data) => {
          if (data.success) {
            alert("Order placed successfully");
          } else {
            alert(`Error placing order. ${data.message} (${data.errorCode})`);
          }
        },
        onError: (error) => {
          alert(`Error placing order. ${error.message}`);
        },
        onSettled: () => {
          onPlaceOrder();
        },
      });
    }
  };

  return (
    <>
      <h2 className="text-left text-xl font-bold">Calculate Total</h2>
      <div>
        <CartPriceTotalBeforeDiscount
          value={shoppingCartPrice?.totalPriceBeforeDiscount ?? 0}
        />

        <CartPriceDiscountItems
          discountItems={shoppingCartPrice?.discountItems ?? []}
        />

        <CartPriceDiscountFromMemberCard
          value={shoppingCartPrice?.discountFromMemberCard ?? 0}
        />

        <CartPriceFinalTotal value={finalTotalPrice} />
      </div>
      <div className="text-right">
        {placeOrderMutation.isPending && (
          <div className="flex items-center pr-10">
            <Loading className="h-12 ml-auto" />
          </div>
        )}
        {!placeOrderMutation.isPending && (
          <Button
            className="bg-red-500 hover:bg-red-700 text-2xl px-8 font-extrabold"
            onClick={handleOrderButtonClick}
            disabled={!shoppingCart}
          >
            Order
          </Button>
        )}
      </div>
    </>
  );
};

export default CartPriceSummaryContainer;
