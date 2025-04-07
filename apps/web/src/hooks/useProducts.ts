import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../services/productService"

export const useProducts = () => {
  const { data: products, ...props } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    products,
    ...props,
  };
}
