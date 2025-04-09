import { useState } from "react";
import { ShoppingCart } from "../../context/shopping-cart-context/shopping-cart-context";
import { usePlaceOrderMutation } from "../../hooks/usePlaceOrderMutation";
import { ShoppingCartPrice } from "../../services/orderService";
import Button from "../common/Button";
import Loading from "../common/Loading";
import CartPriceDiscountFromMemberCard from "./CartPriceDiscountFromMemberCart";
import CartPriceDiscountItems from "./CartPriceDiscountItems";
import CartPriceFinalTotal from "./CartPriceFinalTotal";
import CartPriceTotalBeforeDiscount from "./CartPriceTotalBeforeDiscount";
import PlaceOrderResultModal from "../PlaceOrderResultModal";

interface CartPriceSummaryProps {
  shoppingCart?: ShoppingCart;
  shoppingCartPrice?: ShoppingCartPrice;
  onPlaceOrder: () => void;
}

export interface PlaceOrderResult {
  message: string;
  error?: string;
}

const CartPriceSummaryContainer: React.FC<CartPriceSummaryProps> = ({
  shoppingCart,
  shoppingCartPrice,
  onPlaceOrder,
}) => {
  const [placeOrderResult, setPlaceOrderResult] = useState<
    PlaceOrderResult | undefined
  >();
  const placeOrderMutation = usePlaceOrderMutation();
  const shoppingCartItemAmount =
    shoppingCart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
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
            setPlaceOrderResult({
              message: data.message,
            });
          } else {
            setPlaceOrderResult({
              message: data.message,
              error: data.errorCode,
            });
          }
        },
        onError: (error) => {
          setPlaceOrderResult({
            message: error.message,
            error: "UnknownError",
          });
        },
      });
    }
  };

  const handleModalRequestClose = () => {
    setPlaceOrderResult(undefined);
    if (!placeOrderResult?.error) {
      onPlaceOrder();
    }
  };

  return (
    <>
      <h2 className="text-left text-xl font-bold">
        Calculate Total{" "}
        <span className="text-base">
          ({shoppingCartItemAmount} item
          {shoppingCartItemAmount > 1 ? "s" : ""})
        </span>
      </h2>
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
            className="bg-red-500 hover:bg-red-700 text-2xl font-extrabold px-8 py-1 m-1"
            onClick={handleOrderButtonClick}
            disabled={!shoppingCart}
          >
            Order
          </Button>
        )}
      </div>
      <PlaceOrderResultModal
        result={placeOrderResult}
        onRequestClose={handleModalRequestClose}
      />
    </>
  );
};

export default CartPriceSummaryContainer;
