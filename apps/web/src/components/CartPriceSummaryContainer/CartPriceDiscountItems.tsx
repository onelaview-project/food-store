import { useProductsContext } from "../../context/products-context/products-context";
import { DiscountItem } from "../../services/orderService";

const CartPriceDiscountItems: React.FC<{ discountItems: DiscountItem[] }> = ({
  discountItems,
}) => {
  const { products } = useProductsContext();

  return (
    <div className="shadow-md p-4 my-3 rounded-xl">
      <p>Discount Items</p>
      <ul>
        {discountItems.length === 0 && (
          <li className="text-gray-500 text-sm">No discount items</li>
        )}
        {discountItems.map((item) => {
          const product = products.find(
            (product) => product.id === item.productId,
          );

          return (
            <li key={item.productId} className="flex justify-between">
              <span className="text-gray-500 text-sm">
                {product?.name ?? item.productId}
              </span>
              <span className="text-gray-500 text-sm">
                -${item.discount.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartPriceDiscountItems;
