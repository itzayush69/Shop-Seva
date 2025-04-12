
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useShop } from '@/contexts/ShopContext';
import { ProductGrid } from '@/components/ProductGrid';
import { ShoppingBag, Globe, Languages, Settings } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { shops } = useShop();

  // Get featured products (first 4)
  const featuredProducts = shops.flatMap(shop => shop.products).slice(0, 10);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen px-4 bg-gradient-to-br from-primary/10 to-secondary/30 flex justify-center">
        <div className="text-center max-w-3xl animate-fade-in flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('welcome')}</h1>
          <p className="text-xl mb-8">{t('tagline')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">{t('getStarted')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">{t('login')}</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('whyChooseUs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('reason1')}</h3>
              <p className="text-muted-foreground">
                {t('regionalReachDesc')}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('reason2')}</h3>
              <p className="text-muted-foreground">
                {t('fastSetupDesc')}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Languages className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('reason3')}</h3>
              <p className="text-muted-foreground">
                {t('supportsRegionalLanguagesDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products Section
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{t('featuredProducts')}</h2>
              <Button variant="outline" asChild>
                <Link to="/products">{t('viewAll')}</Link>
              </Button>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )} */}

      {/* Call to Action
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto text-center max-w-2xl">
          <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">{t('startSelling')}</h2>
          <p className="text-lg mb-8">{t('shopDescription')}</p>
          <Button asChild size="lg">
            <Link to="/signup">{t('getStarted')}</Link>
          </Button>
        </div>
      </section> */}

      <section>
        
      </section>
    </div>
  );
};

export default HomePage;