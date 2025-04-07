import { useShoppingCartContext } from "../../context/shopping-cart-context/shopping-cart-context";

const CalculateCartButton: React.FC = () => {
  const { calculatePrice } = useShoppingCartContext();

  return (
    <button
      className="bg-blue-300 text-white rounded-sm text-lg p-1 m-1"
      onClick={calculatePrice}
    >
      Calculate Price
    </button>
  );
};

export default CalculateCartButton;
