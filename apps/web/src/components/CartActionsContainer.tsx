import CalculateCartButton from "./CalculateCartButton";
import ResetCartButton from "./ResetCartButton";

const CartActionsContainer: React.FC = () => {
  return (
    <div className="text-center">
      <ResetCartButton />
      <CalculateCartButton />
    </div>
  );
};

export default CartActionsContainer;
