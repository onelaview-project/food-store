import Button from "../common/Button";
import { useShoppingCartContext } from "../../context/shopping-cart-context/shopping-cart-context";

const CartActionsContainer: React.FC = () => {
  const { shoppingCart, reset, calculatePrice } = useShoppingCartContext();

  return (
    <div className="text-center">
      <Button
        className="font-semibold text-lg"
        disabled={
          shoppingCart.items.length === 0 && !shoppingCart.memberCardNumber
        }
        onClick={reset}
      >
        Reset
      </Button>
      <Button
        className="font-semibold text-lg"
        disabled={shoppingCart.items.length === 0}
        onClick={calculatePrice}
      >
        Calculate Price
      </Button>
    </div>
  );
};

export default CartActionsContainer;
