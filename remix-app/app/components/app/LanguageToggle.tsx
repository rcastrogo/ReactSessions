import { t } from 'i18next';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';

export type LanguageMap = 'es' | 'en';

interface LanguageToggleProps {
  handleLanguageChange: (lang: LanguageMap) => void;
}

export function LanguageToggle({ handleLanguageChange }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.slice(-2) as LanguageMap;

  const languages = [
    { code: 'es' as LanguageMap, label: t('language.spanish') },
    { code: 'en' as LanguageMap, label: t('language.english') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm uppercase">
          {currentLang} <ChevronDown className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn('flex cursor-pointer items-center justify-center gap-3', {
              'bg-accent text-accent-foreground': currentLang === lang.code,
            })}
          >
            <span className="text-xs font-semibold">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
