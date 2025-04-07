const CartPriceFinalTotal: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="shadow-md p-4 my-3 rounded-xl">
      <p className="text-xl font-bold">Final Total</p>
      <p className="text-xl font-bold">${value.toFixed(2)}</p>
    </div>
  );
};

export default CartPriceFinalTotal;
