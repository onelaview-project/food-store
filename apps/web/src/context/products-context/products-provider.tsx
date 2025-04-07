import { ProductsContext, ProductsContextType } from "./products-context";
import { useProducts } from "../../hooks/useProducts";

interface ProductsProviderProps {
  children: (productContext: ProductsContextType) => React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const productContext: ProductsContextType = useProducts();

  return (
    <ProductsContext.Provider value={productContext}>
      {children(productContext)}
    </ProductsContext.Provider>
  );
};
