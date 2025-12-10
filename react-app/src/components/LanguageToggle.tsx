import { useState, useTransition } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "../lib/utils";

const languages = ['en', 'es'];

export default function LanguageToggle() {
  const [language, setLanguage] = useState(i18next.language);
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation();

  function handleLanguageChange(value: string) {
    startTransition(async () => {
      setLanguage(value);
      await i18next.changeLanguage(value);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="text-sm uppercase"
          disabled={isPending}
          >
          <Globe />
          <span className="text-sm uppercase block md:hidden">{language}</span>
          <span className="text-sm uppercase hidden md:block">{t('language.' + language)}</span>
           <ChevronDown className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={cn('flex cursor-pointer items-center justify-center gap-3', {
              'bg-accent text-accent-foreground': language === lang,
            })}
          >
            <span className="text-sm uppercase block md:hidden">{lang}</span>
            <span className="text-sm uppercase hidden md:block">{t('language.' + lang)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}