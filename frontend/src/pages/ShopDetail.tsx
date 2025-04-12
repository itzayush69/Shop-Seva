import React from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '@/contexts/ShopContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ShopDetails = () => {
  const { shopId } = useParams();
  const { shops } = useShop();

  const shop = shops.find(s => s.id.toString() === shopId);

  if (!shop) {
    return <div className="text-center mt-20 text-2xl">Shop not found 😢</div>;
  }

  return (
    <div className="container mx-auto p-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8 font-serif">{shop.name}</h1>
      <p className="text-center text-muted-foreground mb-10">{shop.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {shop.products && shop.products.length > 0 ? (
          shop.products.map(product => (
            <Card 
              key={product.id} 
              className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="aspect-video relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">No products available.</div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
