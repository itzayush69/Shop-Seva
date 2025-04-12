import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Aashirvaad Atta - 10 kg',
    category: 'Grocery',
    price: 555,
    quantity: 25,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/afa00338-bc65-474a-9094-54c8b35798c1.jpeg',
  },
  {
    id: '2',
    name: 'Maggi Instant Noodles - 70g',
    category: 'Snacks',
    price: 15,
    quantity: 120,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/bed4b8a8-fe00-4856-9e69-4313cada9334.jpeg',
  },
  {
    id: '3',
    name: 'Home Matchsticks - 2 Box',
    category: 'Household',
    price: 5,
    quantity: 50,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/inventory/product/ccff3d82-be05-4dd4-a536-eca367b838a8-2650.jpg',
  },
  {
    id: '4',
    name: 'Parle-G Biscuit - 250g (Pack of 3)',
    category: 'Snacks',
    price: 20,
    quantity: 80,
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-1500-1500,pr-true,f-auto,q-80/inventory/product/b31f9cf6-6aef-44cf-9a16-7d61c7179d85-3381/Parle-G-Original-Gluco-Biscuits-250-g-Combo.jpg',
  },
  {
    id: '5',
    name: 'Lays Potato Chips - 100g',
    category: 'Snacks',
    price: 30,
    quantity: 60,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-655-993,pr-true,f-auto,q-80/cms/product_variant/f520f20b-60fe-48bf-830d-2aa5b98dc318.jpeg',
  },
  {
    id: '6',
    name: 'Tata Salt - 1 kg',
    category: 'Grocery',
    price: 20,
    quantity: 45,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e5aa24aa-efba-40ac-9e81-930e26468036.jpeg',
  },
  {
    id: '7',
    name: 'Amul Butter - 200g',
    category: 'Dairy',
    price: 55,
    quantity: 35,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/238198ac-e000-47e7-a0e4-3b0c3b98cb34.jpeg',
  },
  {
    id: '8',
    name: 'Red Label Tea - 500g (Combo)',
    category: 'Beverages',
    price: 100,
    quantity: 20,
    image: 'https://cdn.zeptonow.com/production/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/946f3865-110e-45a7-814e-4fc7857d2ece.jpg',
  },
];

export default function ManageProducts() {
  const { shopId } = useParams();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products for Shop #{shopId}</h1>
        <Button variant="default" size="sm">
          + Add Product
        </Button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="flex items-center gap-4 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <p className="text-sm">₹ {product.price.toFixed(2)}</p>
              <p className="text-sm text-green-600">In Stock: {product.quantity}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}