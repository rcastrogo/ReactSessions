
import { useTranslation } from "react-i18next";
import { PolTable, type ActionButtonProps, type Column, type ActionHandlers } from '../components/Table';
import { useEffect, useState } from 'react';
import { UserIcon } from 'lucide-react';
import { MENU_SEPARATOR_KEY } from '../components/TableMenu';
import { AlertManager } from '../lib/alert-manager';
import { getAllCountries, type Country } from '../services/countries';
import { CUSTOM_ACTIONS } from '../components/types';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';
import PageHeader from "../components/PegeHeader";
import { formatNumber } from "../lib/utils";

const showSuccess = AlertManager.showSuccess;
const showError = AlertManager.showError;

const TABLE_COLUMNS_DEF: Column<Country>[] = [
  {
    title: 'Id',
    key: 'id',
    sorter: 'id',
    className: 'w-[20px]',
    hideValueSelection: true,
  } as Column<Country>,
  {
    title: 'Nombre',
    key: 'name',
    resolver: 'name',
    sorter: 'name',
    className: '',
    hideValueSelection: true,
  } as Column<Country>,
  {
    title: 'Capital',
    key: 'capital',
    sorter: 'capital',
    className: 'w-[180px]',
    hideValueSelection: true,
  } as Column<Country>,
  {
    title: 'Región',
    key: 'region',
    sorter: 'region',
    className: 'w-[160px]',
    hideValueSelection: false,
  } as Column<Country>,
  {
    title: 'Población',
    key: 'population',
    resolver: (c) => formatNumber(c.population),
    sorter: 'population',
    className: 'w-[60px] text-right',
    hideValueSelection: true,
  } as Column<Country>,
  {
    title: 'Cod',
    key: 'cca2',
    sorter: 'cca2',
    className: 'w-[20px]',
    hideValueSelection: true,
  } as Column<Country>,
  {
    title: 'Bandera',
    key: 'flag',
    resolver: (c) => <div className="p-1"><img className="rounded-xl" src={c.flag} /></div>,
    className: 'w-[60px]',
    //hideValueSelection: true,
    hideSeachButton: true,
  } as Column<Country>,
];

export default function Countries() {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>();
  const { t } = useTranslation();

  async function load() {
    setIsLoading(true);
    const result = await getAllCountries();
    setIsLoading(false);
    if (typeof result === 'string') {
      showError(result);
      return;
    }
    setCountries(result.data);
  }

  useEffect(() => {
    load();
  }, []);

  const ACTION_HANDLERS_DEF = {
    onCreate: () => showSuccess('onCreate'),
    onEdit: (target) => showSuccess(JSON.stringify(target), 'onEdit'),
    onDelete: (ids) => showSuccess('onDelete: ' + ids.toString(), 'onDelete'),
    onCustomAction: async (action: string) => {
      if (action === CUSTOM_ACTIONS.reload)
        await load();
      else
        showSuccess(action);
    },
  } as ActionHandlers<Country>;

  const MENU_BUTTONS_DEF = [
    {
      label: 'Ver perfil del usuario',
      key: 'view-profile',
      onClick: () => showSuccess('Perfil de usuario'),
      icon: <UserIcon />,
      show: 'both',
      enabledWhen: (selected) => selected.size == 1,
    },
    {
      label: '',
      key: MENU_SEPARATOR_KEY,
      show: 'menu'
    },
    {
      label: 'Exportar',
      key: 'menu-export',
      show: 'menu',
      enabledWhen: (selected) => selected.size >= 1,
    }
  ] as ActionButtonProps[];

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background dark:bg-background">
        <AppNavbar />
        <main className="flex-1 max-w-5xl mx-auto w-full p-4">
          <PageHeader 
            title={t('home.cards.pagedTable.title')} 
            imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
          />
          <PolTable
            id="country-table"
            entity="País"
            dataSource={countries || []}
            waitingForRows={isLoading}
            columns={TABLE_COLUMNS_DEF}
            actionHandlers={ACTION_HANDLERS_DEF}
            buttons={MENU_BUTTONS_DEF}
          />
        </main>
        <Footer/>
      </div>
    </>
  );
}