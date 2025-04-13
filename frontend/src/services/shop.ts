import api from "./api";

export interface Shop {
  id: number;
  name: string;
  description: string;
  products?: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
    shopId: number | null;
  }>;
}

export const getShops = async (): Promise<Shop[]> => {
  const response = await api.get("/shops");
  return response.data;
};

export const getShopById = async (id: number): Promise<Shop> => {
  const response = await api.get(`/shops/${id}`);
  return response.data;
};

export const createShop = async (shopData: { name: string; description: string }): Promise<Shop> => {
  const response = await api.post("/shops", shopData);
  return response.data;
};

export const updateShop = async (id: number, shopData: { name?: string; description?: string }): Promise<Shop> => {
  const response = await api.patch(`/shops/${id}`, shopData);
  return response.data;
};

export const deleteShop = async (id: number): Promise<Shop> => {
  const response = await api.delete(`/shops/${id}`);
  return response.data;
};
