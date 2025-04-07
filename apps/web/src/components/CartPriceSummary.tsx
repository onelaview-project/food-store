import { ShoppingCartPrice } from "../services/orderService";

interface CartPriceSummaryProps {
  shoppingCartPrice?: ShoppingCartPrice;
}

const CartPriceSummary: React.FC<CartPriceSummaryProps> = ({
  shoppingCartPrice,
}) => {
  return (
    <>
      <h2 className="text-center text-xl font-medium">Calculate Total</h2>
    </>
  );
};

export default CartPriceSummary;
