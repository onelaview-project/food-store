import { ShoppingCartPrice } from "../../services/orderService";

interface CartPriceSummaryProps {
  shoppingCartPrice?: ShoppingCartPrice;
}

const CartPriceSummaryContainer: React.FC<CartPriceSummaryProps> = ({
  shoppingCartPrice,
}) => {
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

  return (
    <>
      <h2 className="text-center text-xl font-medium">Calculate Total</h2>
      <div>
        <p>Total (before discount)</p>
        <p>{shoppingCartPrice?.totalPriceBeforeDiscount ?? 0}</p>
      </div>

      <div>
        <p>Discount from Member Card</p>
        <p>{shoppingCartPrice?.discountFromMemberCard ?? 0}</p>
      </div>

      <div>
        <p>Final Total</p>
        <p>{finalTotalPrice}</p>
      </div>
    </>
  );
};

export default CartPriceSummaryContainer;
