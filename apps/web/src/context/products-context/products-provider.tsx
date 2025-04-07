import { ProductsContext, ProductsContextType } from "./products-context";
import { useProductsQuery } from "../../hooks/useProductsQuery";

interface ProductsProviderProps {
  children: (productContext: ProductsContextType) => React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const productContext: ProductsContextType = useProductsQuery();

  return (
    <ProductsContext.Provider value={productContext}>
      {children(productContext)}
    </ProductsContext.Provider>
  );
};
