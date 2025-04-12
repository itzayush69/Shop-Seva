
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

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Aashirvaad Atta - 10 kg',
    description: 'Premium quality whole wheat flour for making soft and delicious rotis, parathas, and more.',
    price: 555,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/afa00338-bc65-474a-9094-54c8b35798c1.jpeg',
    shopId: 'shop1',
    category: 'Grocery'
  },

  {
    id: '2',
    name: 'Maggi Instant Noodles - 70g',
    description: 'Quick and tasty Maggi noodles for a fast snack or meal.',
    price: 15,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/bed4b8a8-fe00-4856-9e69-4313cada9334.jpeg',
    shopId: 'shop1',
    category: 'Snacks'
  },
  
  {
    id: '3',
    name: 'Home Matchsticks - 2 Box',
    description: 'Reliable matchsticks for lighting up your stove or candles.',
    price: 5,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/inventory/product/ccff3d82-be05-4dd4-a536-eca367b838a8-2650.jpg',
    shopId: 'shop1',
    category: 'Household'
  },
  
  {
    id: '4',
    name: 'Parle-G Biscuit - 250g (Pack of 3)',
    description: 'Classic Parle-G biscuits, perfect for tea time or a light snack.',
    price: 20,
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-1500-1500,pr-true,f-auto,q-80/inventory/product/b31f9cf6-6aef-44cf-9a16-7d61c7179d85-3381/Parle-G-Original-Gluco-Biscuits-250-g-Combo.jpg',
    shopId: 'shop1',
    category: 'Snacks'
  },

  {
    id: '5',
    name: 'Lays Potato Chips - 100g',
    description: 'Crunchy, crispy, and delicious potato chips for your snack cravings.',
    price: 30,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-655-993,pr-true,f-auto,q-80/cms/product_variant/f520f20b-60fe-48bf-830d-2aa5b98dc318.jpeg',
    shopId: 'shop1',
    category: 'Snacks'
  },
  
  {
    id: '6',
    name: 'Tata Salt - 1 kg',
    description: 'Pure, iodized salt for daily use in cooking.',
    price: 20,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e5aa24aa-efba-40ac-9e81-930e26468036.jpeg',
    shopId: 'shop1',
    category: 'Grocery'
  },
  
  {
    id: '7',
    name: 'Amul Butter - 200g',
    description: 'Creamy, rich butter for a perfect taste in your recipes.',
    price: 55,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/238198ac-e000-47e7-a0e4-3b0c3b98cb34.jpeg',
    shopId: 'shop1',
    category: 'Dairy'
  },
  
  {
    id: '8',
    name: 'Red Label Tea - 500g (Combo)',
    description: 'A refreshing blend of tea leaves for a perfect cup of chai.',
    price: 100,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/946f3865-110e-45a7-814e-4fc7857d2ece.jpg',
    shopId: 'shop2',
    category: 'Beverages'
  },
  
  {
    id: '9',
    name: 'Dove Soap - 100g',
    description: 'Mild and moisturizing soap for soft, smooth skin.',
    price: 35,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/28024662-ff89-449b-9772-8370bf26b83c.jpg',
    shopId: 'shop3',
    category: 'Personal Care'
  },
  
  {
    id: '10',
    name: 'Patanjali Dant Kanti Toothpaste - 100g',
    description: 'Herbal toothpaste with the power of neem and other natural ingredients for healthy teeth.',
    price: 45,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/inventory/product/e9fdb2a5-b028-4601-92f5-9ff030608b00-2385.jpg',
    shopId: 'shop1',
    category: 'Personal Care'
  }
];


const mockShops: Shop[] = [
  {
    id: 'shop1',
    name: 'Bihar Supermart',
    description: 'Your one-stop grocery destination for essentials, snacks, and daily needs.',
    owner: '1',
    logo: 'https://images.unsplash.com/photo-1739065882919-03c8ae1a3da3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9jYWwlMjBpbmRpYW4lMjBzaG9wfGVufDB8fDB8fHww',
    products: mockProducts.filter(p => p.shopId === 'shop1'),
  },
  {
    id: 'shop2',
    name: 'Modern Meats',
    description: 'Fresh fish and chicken flesh.',
    owner: '2',
    logo: 'https://plus.unsplash.com/premium_photo-1664360227360-16628277f9f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxvY2FsJTIwaW5kaWFuJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D',
    products: mockProducts.filter(p => p.shopId === 'shop2'),
  },
  {
    id: 'shop3',
    name: 'Kitchen Essentials',
    description: 'All your home & kitchen needs, just a lane away.',
    owner: '3',
    logo: 'https://images.unsplash.com/photo-1641048174454-5c48dc0baafc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9jYWwlMjBpbmRpYW4lMjBzaG9wJTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D',
    products: mockProducts.filter(p => p.shopId === 'shop3'),
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