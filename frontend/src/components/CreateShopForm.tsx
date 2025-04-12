
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '@/contexts/ShopContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export function CreateShopForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=200&auto=format&fit=crop');
  const [isLoading, setIsLoading] = useState(false);
  
  const { createShop } = useShop();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Get user from localStorage for mock functionality
  const user = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}') 
    : { id: '1' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    createShop({
      name,
      description,
      owner: user.id,
      logo
    });
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">{t('createShop')}</CardTitle>
        <CardDescription className="text-center">
          Set up your own online shop
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              placeholder="Shop name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              placeholder="Describe your shop"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (optional)</Label>
            <Input
              id="logo"
              placeholder="https://example.com/your-logo.png"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
            {logo && (
              <div className="mt-2 flex justify-center">
                <img
                  src={logo}
                  alt="Shop logo preview"
                  className="w-24 h-24 object-cover rounded-full border border-border"
                />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating shop...' : t('createShop')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
