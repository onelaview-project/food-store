import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../services/productService"

export const useProducts = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  return {
    products,
    isLoading,
    error
  }
}
