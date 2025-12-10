import { useTranslation } from "react-i18next";
import PageHeader from "../components/PegeHeader";
import AutoComplete, { type Suggestion } from "../components/Autocomplete";
import { searchCountryByName } from "../services/countries";
import { useState } from "react";
import CountryCard from "./Components/CountryCard";
import Show from "../components/Show";
import { IndeterminateProgressBar } from "../components/Loading";

export default function Dashboard() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (term: string) => {
    const response = await searchCountryByName(term);
    if (typeof response === 'string') return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((c: Record<string, any>) => {
      return {
        ...c,
        value: c.name.common || '',
      } as Suggestion;
    });
  }

  return (
    <div className="w-full flex-cols items-center">
      <PageHeader
        title={t('home.cards.dashboard.title')}
        imageUrl="https://images.unsplash.com/photo-1534201041980-ab6cb6c36cc3?q=80&w=687&auto=format&fit=crop"
      />
      <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">{t('dashboard.search-title')}</h2>
          <p className="text-gray-500 text-sm">
            {t('dashboard.search-description')}
          </p>
          <AutoComplete
            placeholder={t('dashboard.search-placeholder')}
            minLength={2}
            debounceTime={400}
            searchProvider={search}
            onResults={(countries) => setCountries(countries)}
            onLoading={loading => {
              if (!loading) {
                setTimeout(() => setIsLoading(false), 400);
                return;
              }
              setIsLoading(loading)
            }}
            className="mt-2"
          />
          <Show when={isLoading}>
            <IndeterminateProgressBar containerClasses="h-[2px]" progressClasses="bg-gray-800 dark:bg-blue-800" />
          </Show>
        </div>
        <Show when={countries.length > 0}>
          <div className="">
            <p className="text-gray-700 font-medium mb-2 py-2 border-b">
              {t('dashboard.results-found', { count: countries.length })}
            </p>
            <Show when={countries.length === 1}>
              <CountryCard country={countries[0]} />
            </Show>
            <Show when={countries.length > 1}>
              <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-6
          ">
                {countries.map((country, index) => (
                  <CountryCard key={index} country={country} />
                ))}
              </div>
            </Show>
          </div>
        </Show>

        {/* No results message */}
        <Show when={countries.length === 0}>
          <p className="text-gray-700 font-medium mt-2">{t('dashboard.no-results')}</p>
        </Show>
      </div>

    </div>
  );

}