
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  shopId: string;
  category: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  owner: string;
  logo: string;
  products: Product[];
}

interface ShopContextType {
  shops: Shop[];
  userShops: Shop[];
  activeShop: Shop | null;
  createShop: (shop: Omit<Shop, 'id' | 'products'>) => void;
  setActiveShop: (shopId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Eco-friendly Water Bottle',
    description: 'Stainless steel, BPA-free water bottle that keeps your drinks cold for 24 hours.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500&auto=format&fit=crop',
    shopId: 'shop1',
    category: 'Home Goods'
  },
  {
    id: '2',
    name: 'Handmade Ceramic Mug',
    description: 'Artisan crafted ceramic mug, perfect for your morning coffee or tea.',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop',
    shopId: 'shop1',
    category: 'Kitchen'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, breathable t-shirt made from 100% organic cotton.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop',
    shopId: 'shop2',
    category: 'Apparel'
  },
  {
    id: '4',
    name: 'Natural Wood Cutting Board',
    description: 'Handcrafted cutting board made from sustainable acacia wood.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1541781550883-93594983a9b4?q=80&w=500&auto=format&fit=crop',
    shopId: 'shop3',
    category: 'Kitchen'
  }
];

const mockShops: Shop[] = [
  {
    id: 'shop1',
    name: 'EcoGoods',
    description: 'Sustainable products for everyday life',
    owner: '1', // matches user id
    logo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=200&auto=format&fit=crop',
    products: mockProducts.filter(p => p.shopId === 'shop1')
  },
  {
    id: 'shop2',
    name: 'Modern Apparel',
    description: 'Contemporary clothing made with sustainable materials',
    owner: '2',
    logo: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=200&auto=format&fit=crop',
    products: mockProducts.filter(p => p.shopId === 'shop2')
  },
  {
    id: 'shop3',
    name: 'Kitchen Essentials',
    description: 'Quality kitchenware for the home chef',
    owner: '3',
    logo: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=200&auto=format&fit=crop',
    products: mockProducts.filter(p => p.shopId === 'shop3')
  }
];

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [activeShop, setActiveShopState] = useState<Shop | null>(null);
  const { toast } = useToast();
  
  // Get user from localStorage for mock functionality
  const user = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}') 
    : null;
    
  // Filter shops owned by the current user
  const userShops = shops.filter(shop => user && shop.owner === user.id);
  
  // Set active shop by ID
  const setActiveShop = (shopId: string) => {
    const shop = shops.find(s => s.id === shopId) || null;
    setActiveShopState(shop);
    if (shop) {
      localStorage.setItem('activeShop', JSON.stringify(shop));
    }
  };
  
  // Create a new shop
  const createShop = (shopData: Omit<Shop, 'id' | 'products'>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please login to create a shop",
      });
      return;
    }
    
    const newShop: Shop = {
      id: `shop${shops.length + 1}`,
      ...shopData,
      products: []
    };
    
    setShops([...shops, newShop]);
    setActiveShopState(newShop);
    localStorage.setItem('activeShop', JSON.stringify(newShop));
    
    toast({
      title: "Shop created",
      description: `${newShop.name} has been created successfully!`,
    });
  };
  
  // Add a product to the active shop
  const addProduct = (productData: Omit<Product, 'id'>) => {
    if (!activeShop) {
      toast({
        variant: "destructive",
        title: "No active shop",
        description: "Please select a shop first",
      });
      return;
    }
    
    const newProduct: Product = {
      id: `product${Math.random().toString(36).substring(2, 9)}`,
      ...productData
    };
    
    const updatedShop = {
      ...activeShop,
      products: [...activeShop.products, newProduct]
    };
    
    setShops(shops.map(shop => 
      shop.id === activeShop.id ? updatedShop : shop
    ));
    
    setActiveShopState(updatedShop);
    localStorage.setItem('activeShop', JSON.stringify(updatedShop));
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to ${activeShop.name}`,
    });
  };
  
  // Load active shop from localStorage on mount
  useEffect(() => {
    const storedShop = localStorage.getItem('activeShop');
    if (storedShop) {
      try {
        setActiveShopState(JSON.parse(storedShop));
      } catch (error) {
        localStorage.removeItem('activeShop');
      }
    }
  }, []);
  
  return (
    <ShopContext.Provider value={{ 
      shops, 
      userShops, 
      activeShop, 
      createShop, 
      setActiveShop, 
      addProduct 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
