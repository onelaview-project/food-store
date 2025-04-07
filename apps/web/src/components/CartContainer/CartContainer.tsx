import CartActionsContainer from "./CartActionsContainer";
import CartItemsContainer from "./CartItemsContainer";
import MemberCardInput from "./MemberCardInput";

const CartContainer: React.FC = () => {
  return (
    <div>
      <h2 className="text-left text-xl font-bold">Products:</h2>
      <CartItemsContainer />
      <MemberCardInput />
      <CartActionsContainer />
    </div>
  );
};

export default CartContainer;
