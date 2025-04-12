
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductGrid } from '@/components/ProductGrid';
import { PlusCircle, Store, Package } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const { userShops, activeShop } = useShop();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render until redirect happens
  }

  return (
    <div className="container mx-auto p-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">{t('dashboard')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('myShops')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userShops.length}</div>
            <p className="text-muted-foreground mt-2">
              {userShops.length === 0
                ? "You haven't created any shops yet"
                : `You have ${userShops.length} ${userShops.length === 1 ? 'shop' : 'shops'}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('products')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {activeShop ? activeShop.products.length : 0}
            </div>
            <p className="text-muted-foreground mt-2">
              {!activeShop
                ? "Select a shop to see products"
                : `Products in ${activeShop.name}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Shop</CardTitle>
          </CardHeader>
          <CardContent>
            {activeShop ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={activeShop.logo}
                    alt={activeShop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{activeShop.name}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                    {activeShop.description}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">
                No active shop selected
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('myShops')}</h2>
        <Button asChild>
          <Link to="/create-shop">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('createShop')}
          </Link>
        </Button>
      </div>

      {userShops.length === 0 ? (
        <Card className="p-8 text-center">
          <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No shops yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first shop to start selling products
          </p>
          <Button asChild>
            <Link to="/create-shop">{t('createShop')}</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {userShops.map(shop => (
            <Card key={shop.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-background"
                  />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">{shop.products.length}</span> products
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <Link to={`/shops/${shop.id}/manage-products`}>Manage</Link>
                  </Button>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeShop && activeShop.products.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('products')}</h2>
            <Button asChild variant="outline">
              <Link to="/add-product">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('addProduct')}
              </Link>
            </Button>
          </div>
          <ProductGrid products={activeShop.products} />
        </>
      )}

      {activeShop && activeShop.products.length === 0 && (
        <Card className="p-8 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No products yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first product to start selling
          </p>
          <Button asChild>
            <Link to="/add-product">{t('addProduct')}</Link>
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
