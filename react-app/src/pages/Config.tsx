import { useTranslation } from "react-i18next";
import PageHeader from "../components/PegeHeader";
import { Settings, SlidersHorizontal, Wrench } from "lucide-react";

export default function Config() {
  const { t } = useTranslation();

  return (
    <div className="w-full flex-cols items-center">
      <PageHeader
        title={t("home.cards.config.title")}
        imageUrl="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
      />

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* SECTION 1 */}
        <div className="group flex items-start gap-4">
          <Settings className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("config.section.general.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("config.section.general.body")}
            </p>
          </div>
        </div>


        {/* SECTION 2 */}
        <div className="group flex items-start gap-4">
          <SlidersHorizontal className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("config.section.preferences.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("config.section.preferences.body")}
            </p>
          </div>
        </div>


        {/* SECTION 3 */}
        <div className="group flex items-start gap-4">
          <Wrench className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("config.section.advanced.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("config.section.advanced.body")}
            </p>
          </div>
        </div>


      </section>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Vite + React + i18next + GH Pages</h1>

        <p className="text-gray-700">
          Guía rápida de buenas prácticas para desplegar apps de React con Vite en GitHub Pages, usando rutas correctas, traducciones y Tailwind.
        </p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-500">1️⃣ Configuración de Vite</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
            <code>
              {`import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});`}
            </code>
          </pre>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-500">2️⃣ Variables de entorno</h2>
          <p className="text-gray-700">Siempre crear estos ficheros en la raíz:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>.env</strong> → <code>VITE_APP_BASE_URL=/</code> (dev)</li>
            <li><strong>.env.production</strong> → <code>VITE_APP_BASE_URL=/NombreRepo/</code> (build GH Pages)</li>
            <li><strong>.env.preview</strong> → <code>VITE_APP_BASE_URL=/NombreRepo/</code> (preview)</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-500">3️⃣ React Router</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
            <code>
              {`import { BrowserRouter } from "react-router";

const APP_BASENAME = import.meta.env.VITE_APP_BASE_URL || '/';

<BrowserRouter basename={APP_BASENAME}>
  <App />
</BrowserRouter>`}
            </code>
          </pre>
          <p className="text-gray-700">
            El <code>basename</code> indica a React Router que la app no está en <code>/</code> sino en <code>/NombreRepo/</code>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-500">4️⃣ i18next</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
            <code>
              {`import i18next from "i18next";
import Backend from "i18next-http-backend";

i18next.use(Backend).init({
  backend: {
    loadPath: \`\${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json\`
  },
  fallbackLng: 'en',
});`}
            </code>
          </pre>
          <p className="text-gray-700">
            Así i18next carga las traducciones desde la ruta correcta tanto en dev como en GH Pages.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-500">5️⃣ Carpeta de traducciones</h2>
          <p className="text-gray-700">
            Deben estar dentro de <code>public/locales</code>:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
            <code>
              {`public/
  locales/
    en/translation.json
    es/translation.json`}
            </code>
          </pre>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-500">6️⃣ Build y Deploy</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
            <code>
              {`npm run build
npm run deploy`}
            </code>
          </pre>
          <p className="text-gray-700">
            Siempre rebuild y deploy limpio para GH Pages. Así las rutas y traducciones se mantienen correctas.
          </p>
        </div>

        <div className="text-center mt-6">
          <span className="text-green-600 font-bold text-lg">🎉 Tu app ahora funciona perfectamente en GitHub Pages!</span>
        </div>
      </div>


    </div>




  );
}