import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router';
import { Globe, Info, Mail, Search, Settings } from 'lucide-react';

export default function AppNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="bg-background dark:bg-background sticky top-0 z-50 w-full border-b-2 p-2">
      <h1 className="flex-1 text-5xl font-extrabold transition text-center block sm:hidden">
        <Link to="/">{t('app-name')}</Link>
      </h1>
      <div className="flex items-center gap-2 p-3 max-w-5xl mx-auto sm:flex justify-center mt-4 sm:mt-0">
        <h1 className="hidden flex-1 text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold transition sm:block">
          <Link to="/">{t('app-name')}</Link>
        </h1>
        <div className="flex items-center gap-1 pt-0 sm:pt-[10px]">
          <Button title={t('footer.links.search')} variant="outline" type="button" onClick={() => navigate('/dashboard')}><Search /><span className="hidden md:inline">{t('footer.links.search')}</span></Button>
          <Button title={t('footer.links.countries')} variant="outline" type="button" onClick={() => navigate('/countries')}><Globe /><span className="hidden md:inline">{t('footer.links.countries')}</span></Button>
          <Button title={t('footer.links.about')} variant="outline" type="button" onClick={() => navigate('/about')}><Info /></Button>
          <Button variant="outline" type="button" onClick={() => navigate('/contact')}><Mail /></Button>
          <Button variant="outline" type="button" onClick={() => navigate('/config')}><Settings /></Button>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
