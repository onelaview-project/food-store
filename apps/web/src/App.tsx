import "./App.css";
import CartContainer from "./components/CartContainer";
import CartPriceSummary from "./components/CartPriceSummary";
import { ProductsProvider } from "./context/products-context/products-provider";
import { ShoppingCartProvider } from "./context/shopping-cart-context/shopping-cart-provider";
import { CartItem } from "./context/shopping-cart-context/shopping-cart-context";

function App() {
  const handleCalculate = (cartItems: CartItem[], memberNumber: string) => {
    console.log("Calculating price...");
    console.log("Member Number:", memberNumber);
    console.log("Cart Items:", cartItems);
  };

  return (
    <ProductsProvider>
      {({ products, isLoading, error }) => {
        if (isLoading) {
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
              >
                <CartContainer />
              </ShoppingCartProvider>
            </div>
            <div className="bg-green-950 p-4">
              <CartPriceSummary />
            </div>
          </div>
        );
      }}
    </ProductsProvider>
  );
}

export default App;
