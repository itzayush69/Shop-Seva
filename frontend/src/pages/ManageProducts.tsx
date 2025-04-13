
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import your Input component

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

const initialProducts: Product[] = [
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [addingNew, setAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProduct({ price: product.price, quantity: product.quantity });
  };

  const handleSaveEdit = (id: string) => {
    setProducts(products.map((p) =>
      p.id === id
        ? { ...p, price: Number(editedProduct.price), quantity: Number(editedProduct.quantity) }
        : p
    ));
    setEditingProductId(null);
    setEditedProduct({});
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    setEditingProductId(null);
  };

  const handleAddProduct = () => {
    const newId = (products.length + 1).toString();
    setProducts([
      ...products,
      {
        id: newId,
        name: newProduct.name ?? 'New Product',
        category: newProduct.category ?? 'Category',
        price: Number(newProduct.price) || 0,
        quantity: Number(newProduct.quantity) || 0,
        image: newProduct.image ?? 'https://via.placeholder.com/150',
      } as Product,
    ]);
    setAddingNew(false);
    setNewProduct({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        {!addingNew ? (
          <Button onClick={() => setAddingNew(true)} variant="default" size="sm">
            + Add Product
          </Button>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            <Input
              placeholder="Name"
              value={newProduct.name || ''}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Category"
              value={newProduct.category || ''}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={newProduct.quantity || ''}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
            />
            <Input
              placeholder="Image URL"
              value={newProduct.image || ''}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddProduct} variant="default" size="sm">
                Save
              </Button>
              <Button onClick={() => setAddingNew(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col md:flex-row items-center gap-4 p-4 transition-all duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex-1 space-y-1 w-full">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>

              {editingProductId === product.id ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Price"
                    value={editedProduct.price || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={editedProduct.quantity || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleSaveEdit(product.id)} size="sm">
                      Save
                    </Button>
                    <Button onClick={() => handleDelete(product.id)} variant="destructive" size="sm">
                      Delete
                    </Button>
                    <Button onClick={() => setEditingProductId(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm">₹ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-green-600">In Stock: {product.quantity}</p>
                </>
              )}
            </div>
            {editingProductId !== product.id && (
              <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>
                Edit
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
