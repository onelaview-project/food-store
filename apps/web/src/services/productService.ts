import http from "../api/http";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountCampaigns: string[];
  imageUrl: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await http.get<Product[]>("/products");
  return response.data;
};
