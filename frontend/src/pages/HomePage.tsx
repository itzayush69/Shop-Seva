
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
    <div className="flex flex-col justify-center w-full">
      <div className="bg-gray-950 justify-center items-center flex flex-col min-h-screen">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mt-2 mb-12">
          {t('welcomeTo')} <span className="text-primary">ShopSeva</span>
        </h1>

        {/* Hero Section */}
        <section className="px-4 py-12 bg-gradient-to-br flex justify-center">
          <div className="w-full max-w-4xl animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            {/* Seller Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-md text-center bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-center border border-white/10 min-h-[240px] min-w-[300px]">
                <h2 className="text-3xl font-bold mb-4 text-white">{t('seller')}</h2>
                <p className="text-lg mb-6 text-gray-300">{t('sellerDesc')}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg">
                    <Link to="/login">{t('getStarted')}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">{t('login')}</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Buyer Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-md text-center bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-center border border-white/10 min-h-[240px] min-w-[300px]">
                <h2 className="text-3xl font-bold mb-4 text-white">{t('buyer')}</h2>
                <p className="text-lg mb-6 text-gray-300">{t('buyerDesc')}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg">
                    <Link to="/login">{t('getStarted')}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">{t('login')}</Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>





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

<footer className="bg-gray-950 text-white py-12 px-4 mt-20">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    <div>
      <h3 className="text-xl font-semibold mb-4">{t('aboutTitle')}</h3>
      <p className="text-gray-400">
        {t('aboutDescription')}
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-4">{t('contactTitle')}</h3>
      <p className="text-gray-400">{t('contactEmail')}</p>
      <p className="text-gray-400">{t('contactPhone')}</p>
      <p className="text-gray-400">{t('contactLocation')}</p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-4">{t('quickLinksTitle')}</h3>
      <ul className="space-y-2">
        <li><Link to="/login" className="text-gray-300 hover:text-primary">{t('login')}</Link></li>
        <li><Link to="/signup" className="text-gray-300 hover:text-primary">{t('signup')}</Link></li>
        <li><Link to="/products" className="text-gray-300 hover:text-primary">{t('exploreProducts')}</Link></li>
      </ul>
    </div>

  </div>

  <div className="text-center text-sm text-gray-500 mt-12">
    &copy; {new Date().getFullYear()} ShopSeva. {t('allRightsReserved')}
  </div>
</footer>


    </div>
  );
};

export default HomePage;