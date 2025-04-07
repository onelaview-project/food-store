import { useShoppingCartContext } from "../context/shopping-cart-context/shopping-cart-context";
import { Product } from "../services/productService";

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { cartItems, addToCart, removeFromCart } = useShoppingCartContext();

  const cartItem = cartItems.find((item) => item.productId === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="flex items-center gap-4 p-4 w-fit">
      <img
        className="flex-none w-14 h-14 rounded-lg object-cover"
        src={product.imageUrl}
      />
      <div className="flex-1 flex flex-col w-36">
        <span className="font-medium text-gray-800">{product.name}</span>
        <span className="text-gray-500 text-sm">${product.price}</span>
      </div>
      <div className="flex-1 flex items-center ml-auto gap-2">
        <button
          className="bg-blue-300 text-white w-8 h-8 rounded-full text-lg"
          onClick={() => removeFromCart(product.id)}
        >
          -
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          className="bg-blue-300 text-white w-8 h-8 rounded-full text-lg"
          onClick={() => addToCart(product.id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
