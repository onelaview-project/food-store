import { useShoppingCartContext } from "../../context/shopping-cart-context/shopping-cart-context";

// TODO: Refactor this component to be a more generic button component
const CalculateCartButton: React.FC = () => {
  const { shoppingCart, calculatePrice } = useShoppingCartContext();

  return (
    <button
      className="bg-blue-300 hover:bg-blue-600 text-white font-semibold rounded-full text-lg p-1 px-4 m-1 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={shoppingCart.items.length === 0}
      onClick={calculatePrice}
    >
      Calculate Price
    </button>
  );
};

export default CalculateCartButton;
