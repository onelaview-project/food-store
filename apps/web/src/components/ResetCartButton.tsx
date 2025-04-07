import { useShoppingCartContext } from "../context/shopping-cart-context/shopping-cart-context";

const ResetCartButton: React.FC = () => {
  const { reset } = useShoppingCartContext();
  return (
    <button
      className="bg-blue-300 text-white rounded-sm text-lg p-1 m-1"
      onClick={reset}
    >
      Reset Cart
    </button>
  );
};

export default ResetCartButton;
