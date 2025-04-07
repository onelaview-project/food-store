import { createContext, use } from "react";
import { Product } from "../../services/productService";

export interface ProductsContextType {
  products?: Product[];
  isPending: boolean;
  error: Error | null;
}

export const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType,
);

export const useProductsContext = () => {
  return use(ProductsContext)
}
