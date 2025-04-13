import api from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  shopId: number | null;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
  shopId: number;
}): Promise<Product> => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const updateProduct = async (
  id: number,
  productData: Partial<{ name: string; description: string; price: number; stock: number; shopId: number }>
): Promise<Product> => {
  const response = await api.patch(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
