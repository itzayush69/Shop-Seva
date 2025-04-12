
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/ShopContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="overflow-hidden aspect-square">
        <img 
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{product.category}</p>
        <p className="font-semibold mt-2">₹ {product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/product/${product.id}`}>View Details</Link>
        </Button>
        <Button size="icon" variant="secondary">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}