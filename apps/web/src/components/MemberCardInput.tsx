import { useShoppingCartContext } from "../context/shopping-cart-context/shopping-cart-context";

const MemberCardInput: React.FC = () => {
  const {
    shoppingCart: { memberCardNumber: memberNumber },
    setMemberNumber,
  } = useShoppingCartContext();

  return (
    <div className="flex flex-col p-2 my-2">
      <label htmlFor="member-number">Card Number</label>
      <input
        className="border-1"
        id="member-number"
        value={memberNumber}
        onChange={(event) => setMemberNumber(event.target.value)}
      />
    </div>
  );
};

export default MemberCardInput;
