import { useTranslation } from 'react-i18next';

import { LanguageToggle } from './LanguageToggle';
import { ModeToggle } from './ModeToggle';

export default function AppNavbar() {
  const { t, i18n } = useTranslation();

  // const currentLang = i18n.language.slice(-2) || 'es';
  return (
    <header className="bg-background sticky z-50 w-full border-b-2 p-2">
      <div className="flex items-center justify-between justify-items-center">
        <div className="flex">Remix-App {t('general.wellcome-message')}</div>
        <div className="flex">
          <ModeToggle />
          <LanguageToggle handleLanguageChange={i18n.changeLanguage} />
        </div>
      </div>
    </header>
  );
}
