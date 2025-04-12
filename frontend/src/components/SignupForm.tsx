

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'shopkeeper' | 'customer'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pass role to signup, so you can later send it to backend

    // const success = await signup(name, email, password, role); //commenting it out bec ayush sharma said so
    const success = await signup(name, email, password,role);
    setIsLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">{t('signup')}</CardTitle>
        <CardDescription className="text-center">
          Create your account to start selling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 6 characters
            </p>

            {/* Add some spacing above role selection */}
            <div className="mt-4 space-y-2">
              <Label className="text-sm font-medium text-foreground">Select your role</Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="role"
                    value="shopkeeper"
                    checked={role === 'shopkeeper'}
                    onChange={() => setRole('shopkeeper')}
                    className="accent-primary"
                  />
                  <span>Shopkeeper</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === 'customer'}
                    onChange={() => setRole('customer')}
                    className="accent-primary"
                  />
                  <span>Customer</span>
                </label>
              </div>
            </div>

          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : t('signup')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-center text-sm">
          Already have an account?{' '}
          <a onClick={() => navigate('/login')} className="text-primary hover:underline cursor-pointer">
            {t('login')}
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}