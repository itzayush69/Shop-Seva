// import React, { useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { useShop } from '@/contexts/ShopContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ProductGrid } from '@/components/ProductGrid';
// import { Store } from 'lucide-react';

// const Customer: React.FC = () => {
//   const { isAuthenticated } = useAuth();
//   const { t } = useLanguage();
//   const { shops } = useShop(); // Assume you fetch all shops for customer
//   const navigate = useNavigate();

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [isAuthenticated, navigate]);

//   if (!isAuthenticated) {
//     return null; // Don't render until redirect happens
//   }

//   return (
//     <div className="container mx-auto p-4 py-8 animate-fade-in">
//       <h1 className="text-3xl font-bold mb-8">{t('welcomeCustomer')}</h1>

//       {/* Featured Shops */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">{t('featuredShops')}</h2>
//       </div>

//       {shops.length === 0 ? (
//         <Card className="p-8 text-center">
//           <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//           <h3 className="text-xl font-medium mb-2">{t('noShopsAvailable')}</h3>
//           <p className="text-muted-foreground mb-6">
//             {t('checkBackLater')}
//           </p>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           {shops.map(shop => (
//             <Card key={shop.id} className="overflow-hidden">
//               <div className="aspect-video relative">
//                 <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
//                   <img 
//                     src={shop.logo} 
//                     alt={shop.name}
//                     className="w-20 h-20 rounded-full object-cover border-4 border-background"
//                   />
//                 </div>
//               </div>
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
//                 <p className="text-muted-foreground mb-4 line-clamp-2">{shop.description}</p>
//                 <Button asChild variant="secondary" size="sm" className="w-full">
//                   <Link to={`/shops/${shop.id}`}>{t('browseShop')}</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Optionally show Popular Products */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">{t('popularProducts')}</h2>
//       </div>

//       {/* Assume you have a list of popular products */}
//       {/* Replace [] with your products data */}
//       <ProductGrid products={[]} /> 
//     </div>
//   );
// };

// export default Customer;
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductGrid } from '@/components/ProductGrid';
import { Store } from 'lucide-react';

const Customer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { shops } = useShop();
  const navigate = useNavigate();
  const name="Ayush";
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
        <span className="font-extrabold">Welcome {name}!</span>
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
                  <Link to={`/shops/${shop.id}`}>{t('browseShop')}</Link>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Example Products (You should fetch real data) */}
        {[
          { id: 1, name: 'Smartphone', description: 'Latest model with advanced features.', image: '/images/product1.jpg' },
          { id: 2, name: 'Laptop', description: 'Powerful laptop for work and gaming.', image: '/images/product2.jpg' },
          { id: 3, name: 'Headphones', description: 'Noise-cancelling wireless headphones.', image: '/images/product3.jpg' },
        ].map(product => (
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
                {t('buyNow')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Customer;
