const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return (
    <button
      {...props}
      className={
        "bg-blue-400 hover:bg-blue-600 text-white transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full " +
        (props.className ?? "")
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
