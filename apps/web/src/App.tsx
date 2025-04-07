import { useRef, useState } from "react";
import "./App.css";
import CartPriceSummaryContainer from "./components/CartPriceSummaryContainer/CartPriceSummaryContainer";
import { ProductsProvider } from "./context/products-context/products-provider";
import {
  ShoppingCartProvider,
  ShoppingCartRef,
} from "./context/shopping-cart-context/shopping-cart-provider";
import { ShoppingCart } from "./context/shopping-cart-context/shopping-cart-context";
import { useCalculateShoppingCartPriceQuery } from "./hooks/useCalculateShoppingCartPriceQuery";
import CartContainer from "./components/CartContainer/CartContainer";
import Loading from "./components/common/Loading";

function App() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | undefined>(
    undefined,
  );
  const shoppingCartRef = useRef<ShoppingCartRef>({} as ShoppingCartRef);

  const { shoppingCartPrice, isFetching: isCalculatingCartPrice } =
    useCalculateShoppingCartPriceQuery(shoppingCart);

  const handleCalculate = (shoppingCart: ShoppingCart) => {
    setShoppingCart(shoppingCart);
  };

  const handleReset = () => {
    setShoppingCart(undefined);
  };

  const handlePlaceOrder = () => {
    setShoppingCart(undefined);
    shoppingCartRef.current.resetCard();
  };

  return (
    <ProductsProvider>
      {({ products, isPending, error }) => {
        if (isPending) {
          return (
            <div className="flex items-center justify-center h-screen">
              <Loading />;
            </div>
          );
        }

        if (error) {
          return <div className="text-center">Error: {error.message}</div>;
        }

        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4">
              <ShoppingCartProvider
                products={products ?? []}
                onCalculate={handleCalculate}
                onReset={handleReset}
                ref={shoppingCartRef}
              >
                <CartContainer />
              </ShoppingCartProvider>
            </div>
            <div className="p-4">
              {isCalculatingCartPrice ? (
                <div className="flex items-center justify-center h-48 mt-20">
                  <Loading className="h-24" />
                </div>
              ) : (
                <CartPriceSummaryContainer
                  shoppingCart={shoppingCart}
                  shoppingCartPrice={shoppingCartPrice}
                  onPlaceOrder={handlePlaceOrder}
                />
              )}
            </div>
          </div>
        );
      }}
    </ProductsProvider>
  );
}

export default App;
