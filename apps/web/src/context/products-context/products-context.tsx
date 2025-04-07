import { createContext, use } from "react";
import { Product } from "../../services/productService";

export interface ProductsContextType {
  products?: Product[];
  isLoading: boolean;
  error: Error | null;
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  error: null,
})

export const useProductsContext = () => {
  return use(ProductsContext)
}
