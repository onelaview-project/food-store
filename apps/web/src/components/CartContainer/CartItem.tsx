import { useShoppingCartContext } from "../../context/shopping-cart-context/shopping-cart-context";
import { Product } from "../../services/productService";
import Button from "../common/Button";

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const {
    shoppingCart: { items: cartItems },
    addToCart,
    removeFromCart,
  } = useShoppingCartContext();

  const cartItem = cartItems.find((item) => item.productId === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="flex items-center gap-4 p-4 w-fit">
      <img
        className="flex-none w-14 h-14 rounded-lg object-cover"
        src={product.imageUrl}
      />
      <div className="flex-1 flex flex-col w-47">
        <span className="font-medium text-gray-800">{product.name}</span>
        <span className="text-gray-500 text-sm">${product.price}</span>
      </div>
      <div className="flex-1 flex items-center ml-auto gap-2">
        <Button
          className="w-8 h-8 text-lg"
          onClick={() => removeFromCart(product.id)}
        >
          -
        </Button>
        <span className="w-6 text-center">{quantity}</span>
        <Button
          className="w-8 h-8 text-lg"
          onClick={() => addToCart(product.id)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
