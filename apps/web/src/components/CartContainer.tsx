import { RefObject } from "react";
import CartActionsContainer from "./CartActionsContainer";
import CartItemsContainer from "./CartItemsContainer";
import MemberCardInput, { MemberNumberRef } from "./MemberCardInput";

interface CartContainerProps {
  ref: RefObject<MemberNumberRef>;
}

const CartContainer: React.FC<CartContainerProps> = ({ ref }) => {
  return (
    <div>
      <h2 className="text-left text-xl font-medium">Assets</h2>
      <CartItemsContainer />
      <MemberCardInput ref={ref} />
      <CartActionsContainer />
    </div>
  );
};

export default CartContainer;
