import{c as a,u as t,j as e,J as r}from"./index-YeKzORhc.js";import{P as n}from"./PegeHeader-AzBhnLJD.js";const o=[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]],i=a("sliders-horizontal",o);const c=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]],l=a("wrench",c);function m(){const{t:s}=t();return e.jsxs("div",{className:"w-full flex-cols items-center",children:[e.jsx(n,{title:s("home.cards.config.title"),imageUrl:"https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"}),e.jsxs("section",{className:"max-w-5xl mx-auto px-6 py-10 space-y-10",children:[e.jsxs("div",{className:"group flex items-start gap-4",children:[e.jsx(r,{className:"w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-foreground mb-2",children:s("config.section.general.title")}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:s("config.section.general.body")})]})]}),e.jsxs("div",{className:"group flex items-start gap-4",children:[e.jsx(i,{className:"w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-foreground mb-2",children:s("config.section.preferences.title")}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:s("config.section.preferences.body")})]})]}),e.jsxs("div",{className:"group flex items-start gap-4",children:[e.jsx(l,{className:"w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-foreground mb-2",children:s("config.section.advanced.title")}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:s("config.section.advanced.body")})]})]})]}),e.jsxs("div",{className:"max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-center text-indigo-600",children:"Vite + React + i18next + GH Pages"}),e.jsx("p",{className:"text-gray-700",children:"Guía rápida de buenas prácticas para desplegar apps de React con Vite en GitHub Pages, usando rutas correctas, traducciones y Tailwind."}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-indigo-500",children:"1️⃣ Configuración de Vite"}),e.jsx("pre",{className:"bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800",children:e.jsx("code",{children:`import { defineConfig, loadEnv } from 'vite';
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
});`})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-indigo-500",children:"2️⃣ Variables de entorno"}),e.jsx("p",{className:"text-gray-700",children:"Siempre crear estos ficheros en la raíz:"}),e.jsxs("ul",{className:"list-disc list-inside text-gray-700 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:".env"})," → ",e.jsx("code",{children:"VITE_APP_BASE_URL=/"})," (dev)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:".env.production"})," → ",e.jsx("code",{children:"VITE_APP_BASE_URL=/NombreRepo/"})," (build GH Pages)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:".env.preview"})," → ",e.jsx("code",{children:"VITE_APP_BASE_URL=/NombreRepo/"})," (preview)"]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-indigo-500",children:"3️⃣ React Router"}),e.jsx("pre",{className:"bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800",children:e.jsx("code",{children:`import { BrowserRouter } from "react-router";

const APP_BASENAME = import.meta.env.VITE_APP_BASE_URL || '/';

<BrowserRouter basename={APP_BASENAME}>
  <App />
</BrowserRouter>`})}),e.jsxs("p",{className:"text-gray-700",children:["El ",e.jsx("code",{children:"basename"})," indica a React Router que la app no está en ",e.jsx("code",{children:"/"})," sino en ",e.jsx("code",{children:"/NombreRepo/"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-indigo-500",children:"4️⃣ i18next"}),e.jsx("pre",{className:"bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800",children:e.jsx("code",{children:`import i18next from "i18next";
import Backend from "i18next-http-backend";

i18next.use(Backend).init({
  backend: {
    loadPath: \`\${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json\`
  },
  fallbackLng: 'en',
});`})}),e.jsx("p",{className:"text-gray-700",children:"Así i18next carga las traducciones desde la ruta correcta tanto en dev como en GH Pages."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-indigo-500",children:"5️⃣ Carpeta de traducciones"}),e.jsxs("p",{className:"text-gray-700",children:["Deben estar dentro de ",e.jsx("code",{children:"public/locales"}),":"]}),e.jsx("pre",{className:"bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800",children:e.jsx("code",{children:`public/
  locales/
    en/translation.json
    es/translation.json`})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-indigo-500",children:"6️⃣ Build y Deploy"}),e.jsx("pre",{className:"bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800",children:e.jsx("code",{children:`npm run build
npm run deploy`})}),e.jsx("p",{className:"text-gray-700",children:"Siempre rebuild y deploy limpio para GH Pages. Así las rutas y traducciones se mantienen correctas."})]}),e.jsx("div",{className:"text-center mt-6",children:e.jsx("span",{className:"text-green-600 font-bold text-lg",children:"🎉 Tu app ahora funciona perfectamente en GitHub Pages!"})})]})]})}export{m as default};
