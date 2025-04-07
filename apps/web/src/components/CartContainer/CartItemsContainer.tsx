import { useProductsContext } from "../../context/products-context/products-context";
import CartItem from "./CartItem";

const CartItemsContainer: React.FC = () => {
  const { products, isPending, error } = useProductsContext();

  return (
    <div className="shadow-md">
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {products && products.length === 0 && <p>No products available</p>}
      {products && products.length > 0 && (
        <ul>
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartItemsContainer;
