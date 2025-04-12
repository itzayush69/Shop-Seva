
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';

export function Navbar() {
  const { t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const { activeShop } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">ShopSeva</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition">
            {t('welcome')}
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition">
                {t('dashboard')}
              </Link>
              <Link to="/shops" className="text-foreground/80 hover:text-foreground transition">
                {t('myShops')}
              </Link>
              <Link to="/products" className="text-foreground/80 hover:text-foreground transition">
                {t('products')}
              </Link>
            </>
          )}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>
          <ThemeSwitcher />

          {/* Auth buttons */}
          {!isAuthenticated ? (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">{t('login')}</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">{t('signup')}</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user?.name}
                </div>
                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  {user?.email}
                </div>
                {activeShop && (
                  <div className="px-2 py-1.5 text-xs">
                    Active shop: <span className="font-semibold">{activeShop.name}</span>
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    {t('dashboard')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shops" className="w-full cursor-pointer">
                    {t('myShops')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full cursor-pointer">
                    {t('settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('welcome')}
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('dashboard')}
                </Link>
                <Link 
                  to="/shops" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('myShops')}
                </Link>
                <Link 
                  to="/products" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('products')}
                </Link>
              </>
            )}
            
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 p-4">
                <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/login">{t('login')}</Link>
                </Button>
                <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/signup">{t('signup')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
