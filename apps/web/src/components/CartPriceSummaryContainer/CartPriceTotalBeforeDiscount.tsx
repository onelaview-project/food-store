const CartPriceTotalBeforeDiscount: React.FC<{ value: number }> = ({
  value,
}) => {
  return (
    <div className="shadow-md p-4 my-3 rounded-xl">
      <p>Total (before discount)</p>
      <p className="font-bold">${value.toFixed(2)}</p>
    </div>
  );
};

export default CartPriceTotalBeforeDiscount;
