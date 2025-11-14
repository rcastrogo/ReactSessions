import { useTranslation } from 'react-i18next';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

import AutoCompleteControl from '../components/app/Autocomplete';

type ProjectItem = {
  label: string;
  value: string;
};

type ActionData = {
  data: ProjectItem[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  console.log(request);
  const data = [
    {
      label: 'Project Aether',
      value: 'Project Aether',
    },
    {
      label: 'Quantum Leap',
      value: 'Quantum Leap',
    },
    {
      label: 'Nexus Hub',
      value: 'Nexus Hub',
    },
    {
      label: 'Data Fusion',
      value: 'Data Fusion',
    },
    {
      label: 'Sentinel Core',
      value: 'Sentinel Core',
    },
    {
      label: 'Apex Tracker',
      value: 'Apex Tracker',
    },
    {
      label: 'Vortex Engine',
      value: 'Vortex Engine',
    },
    {
      label: 'Chrono DB',
      value: 'Chrono DB',
    },
    {
      label: 'Phoenix Revival',
      value: 'Phoenix Revival',
    },
    {
      label: 'Gateway Connect',
      value: 'Gateway Connect',
    },
    {
      label: 'Aurora UI',
      value: 'Aurora UI',
    },
    {
      label: 'Blaze Compiler',
      value: 'Blaze Compiler',
    },
    {
      label: 'Talon Security',
      value: 'Talon Security',
    },
    {
      label: 'Echo Stream',
      value: 'Echo Stream',
    },
    {
      label: 'Inifinity Link',
      value: 'Inifinity Link',
    },
    {
      label: 'Nebula Stack',
      value: 'Nebula Stack',
    },
    {
      label: 'Onyx Pipeline',
      value: 'Onyx Pipeline',
    },
    {
      label: 'Zephyr Cloud',
      value: 'Zephyr Cloud',
    },
    {
      label: 'Nova Metrics',
      value: 'Nova Metrics',
    },
    {
      label: 'Atlas Mapper',
      value: 'Atlas Mapper',
    },
  ];
  return { data: data };
}

export default function About() {
  const { t } = useTranslation();
  const { data } = useLoaderData<ActionData>() || {};
  return (
    <main className="">
      <header className="">
        <h1>About page</h1>
        {t('general.wellcome-message')}
      </header>

      <div className="bg-background relative m-auto my-6 flex w-96 flex-col rounded-lg border border-slate-200 shadow-sm">
        <div className="text-foreground relative m-2.5 flex h-24 items-center justify-center rounded-md bg-slate-800">
          <h3 className="text-2xl">Proyectos</h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="project" className="text-foreground mb-2 block text-sm">
              Buscar:
            </label>
            <AutoCompleteControl
              id="project"
              name="project"
              type="text"
              maxLength={255}
              placeholder={t('about.project-placeholder')}
              className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
              listHeight="initial"
              onClear={() => console.log('AutoCompleteControl.onClear')}
              onItemSelected={item => console.log(item)}
              renderItem={item => <span>{item.value}</span>}
              searchAction="./"
              searchIntent="search-projets-names"
              searchResults={10000}
              searchLength={2}
              searchDataSource={data ?? []}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
