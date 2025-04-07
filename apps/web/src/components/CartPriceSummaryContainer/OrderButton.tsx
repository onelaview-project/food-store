// TODO: Refactor this component to be a more generic button component
const OrderButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return (
    <button
      {...props}
      className="bg-red-500 hover:bg-red-700 text-white font-extrabold rounded-full text-2xl p-1 px-8 m-1 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Order
    </button>
  );
};

export default OrderButton;
