
import { useTranslation } from "react-i18next";
import { FullScreenLoader } from "../components/Loading";
import { useEffect, useState } from "react";
import Show from "../components/Show";
import { Link } from "react-router";
import { APP_BASENAME } from "../config/constans";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {t("home.title")}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
          {t("home.subtitle")}
        </p>
      </section>

      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <HomeCard
          title={t("text:intro")}
          description={t("text:intro2")}
          image={APP_BASENAME + "glypy.webp"}
          to="/"
        />
        <HomeCard
          title={t("home.cards.pagedTable.title")}
          description={t("home.cards.pagedTable.description")}
          image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
          to="/countries"
        />

        <HomeCard
          title={t("home.cards.about.title")}
          description={t("home.cards.about.description")}
          image="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80"
          to="/about"
        />

        <HomeCard
          title={t("home.cards.config.title")}
          description={t("home.cards.config.description")}
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
          to="/config"
        />

        <HomeCard
          title={t("home.cards.contact.title")}
          description={t("home.cards.contact.description")}
          image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
          to="/contact"
        />

        <HomeCard
          title={t("home.cards.dashboard.title")}
          description={t("home.cards.dashboard.description")}
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
          to="/dashboard"
        />
        <HomeCard
          title={t("text:intro")}
          description={t("text:intro2")}
          image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
          to="/"
        />       
      </section>
      <Show when={isLoading}>
        <FullScreenLoader message={t('general.action.loading')} />
      </Show>
      
    </div>
  );
}

function HomeCard({
  title,
  description,
  image,
  to
}: {
  title: string
  description: string
  image: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="block group rounded-xl overflow-hidden border hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}