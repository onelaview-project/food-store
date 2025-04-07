import { useState } from "react";
import "./App.css";
import CartPriceSummaryContainer from "./components/CartPriceSummaryContainer/CartPriceSummaryContainer";
import { ProductsProvider } from "./context/products-context/products-provider";
import { ShoppingCartProvider } from "./context/shopping-cart-context/shopping-cart-provider";
import { ShoppingCart } from "./context/shopping-cart-context/shopping-cart-context";
import { useCalculateShoppingCartPrice } from "./hooks/useCalculateShoppingCartPrice";
import CartContainer from "./components/CartContainer/CartContainer";

function App() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | undefined>(
    undefined,
  );

  const { shoppingCartPrice } = useCalculateShoppingCartPrice(shoppingCart);

  const handleCalculate = (shoppingCart: ShoppingCart) => {
    console.log("Calculating price...");
    console.log("Member Number:", shoppingCart.memberCardNumber);
    console.log("Cart Items:", shoppingCart.items);
    setShoppingCart(shoppingCart);
  };

  const handleReset = () => {
    setShoppingCart(undefined);
  };

  return (
    <ProductsProvider>
      {({ products, isPending, error }) => {
        if (isPending) {
          return <div className="text-3xl text-center">Loading...</div>;
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
              >
                <CartContainer />
              </ShoppingCartProvider>
            </div>
            <div className="p-4">
              <CartPriceSummaryContainer
                shoppingCartPrice={shoppingCartPrice}
              />
            </div>
          </div>
        );
      }}
    </ProductsProvider>
  );
}

export default App;
