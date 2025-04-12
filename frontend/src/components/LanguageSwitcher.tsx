import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी', // Hindi
  bho: 'भोजपुरी', // Bhojpuri
  ne: 'नेपाली', // Nepali
};

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-fit flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          {languageNames['en']}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')}>
          {languageNames['hi']}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bho')}>
          {languageNames['bho']}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ne')}>
          {languageNames['ne']}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}