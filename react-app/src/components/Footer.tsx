
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { APP_VERSION } from "../config/constans";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="text-muted-foreground mt-6 border-t bg-background dark:bg-background">
      <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">{t('app-name')} <span className="text-xs">({APP_VERSION})</span></h3>
          <p className="text-sm">
            {t('footer.description')}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3">{t('footer.links.title')}</h4>
          <ul className="space-y-2">
            <li><Link className="hover:text-primary transition" to="/">{t('footer.links.home')}</Link></li>
            <li><Link className="hover:text-primary transition" to="/about">{t('footer.links.about')}</Link></li>
            <li><Link className="hover:text-primary transition" to="/countries">{t('footer.links.countries')}</Link></li>
            <li><Link className="hover:text-primary transition" to="/contact">{t('footer.links.contact')}</Link></li>
            <li><Link className="hover:text-primary transition" to="/dashboard">{t('footer.links.dashboard')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3">{t('footer.resources.title')}</h4>
          <ul className="space-y-2">
            <li><a className="hover:text-primary transition" href="#">{t('footer.resources.documentation')}</a></li>
            <li><a className="hover:text-primary transition" href="#">{t('footer.resources.api')}</a></li>
            <li><a className="hover:text-primary transition" href="#">{t('footer.resources.blog')}</a></li>
            <li><a className="hover:text-primary transition" href="#">{t('footer.resources.support')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3">{t('footer.follow.title')}</h4>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition"><Facebook /></a>
            <a href="#" className="hover:text-primary transition"><Twitter /></a>
            <a href="#" className="hover:text-primary transition"><Instagram /></a>
            <a href="#" className="hover:text-primary transition"><Linkedin /></a>
            <a href="#" className="hover:text-primary transition"><Github /></a>
            <a href="#" className="hover:text-primary transition"><Youtube /></a>
          </div>
        </div>

      </div>

      <div className="border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} {t('footer-text')}.
      </div>
    </footer>

  );
}
