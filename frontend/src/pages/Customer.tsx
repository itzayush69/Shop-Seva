import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Store } from 'lucide-react';

const Customer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { shops } = useShop();
  const navigate = useNavigate();
  const name = "Ayush";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 py-8 animate-fade-in">
      {/* Welcome Title */}
      <h1 className="text-4xl font-bold text-center mb-8 font-serif">
        <span className="font-extrabold">Welcome {name}</span>
      </h1>

      {/* Featured Shops Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-serif tracking-wide">
          Featured Shops
        </h2>
      </div>

      {/* Featured Shops Grid */}
      {shops.length === 0 ? (
        <Card className="p-8 text-center">
          <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">{t('noShopsAvailable')}</h3>
          <p className="text-muted-foreground mb-6">{t('checkBackLater')}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {shops.map(shop => (
            <Card 
              key={shop.id} 
              className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="aspect-video relative">
                <img 
                  src={shop.logo} 
                  alt={shop.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{shop.description}</p>
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <Link to={`/shops/${shop.id}`}>{t('Browse Shop')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Popular Products Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-serif tracking-wide">
          Popular Products
        </h2>
      </div>

      {/* Popular Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {/* Example Products (You should fetch real data) */}
        {[ 
          { id: 1, name: 'Fresh Apple', price: '₹100', description: 'Crisp and fresh apples, perfect for snacking.', image: '/images/apple.jpg' },
          { id: 2, name: 'Organic Rice', price: '₹80', description: 'Premium organic rice, ideal for daily meals.', image: '/images/rice.jpg' },
          { id: 3, name: 'Milk (1L)', price: '₹50', description: 'Fresh milk, packed with essential nutrients.', image: '/images/milk.jpg' },
          { id: 4, name: 'Eggs (Pack of 6)', price: '₹60', description: 'Farm-fresh eggs, rich in protein.', image: '/images/eggs.jpg' },
        ].map(product => (
          <Card 
            key={product.id} 
            className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="aspect-w-1 aspect-h-1 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
              <p className="text-green-600 font-bold mb-4">{product.price}</p>
              <Button variant="secondary" size="sm" className="w-full">
                {t('addToCart')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Customer;
