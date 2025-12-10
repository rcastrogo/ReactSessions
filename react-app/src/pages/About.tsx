
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { AlertManager } from "../lib/alert-manager";
import PageHeader from "../components/PegeHeader";
import { IndeterminateProgressBar } from "../components/Loading";

export default function About() {
  const { t } = useTranslation();

  const videos = [
    'nfBvabsUUGw',
    'HB5pfcV2Xbk',
    'UxyGuUJ1ctg',
    'CCE39IWEWAA',
    'Tq8Jmk59fdo',
    'Juwf9NOV4Co',
    'pZ3bfGqinl4',
    'q0EFog9fTD0',
    'kbvAnHOMtuM',
    'JBD7Jd7Y2_o',
    'wHKNgSSNV5M',
    'dczcOUPrvys'
  ];

  return (
    <div className="w-full">
      <PageHeader
        title={t("about.title")}
        imageUrl="https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1200&q=80"
      />

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{t("about.section1.title")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("about.section1.body")}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">
          {t("about.section2.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("about.section2.body")}
          {/* Grid de tecnologías */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {/* Vite */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border-1 shadow hover:shadow-lg transition">
              <img
                src="https://vitejs.dev/logo.svg"
                alt="Vite"
                className="w-16 h-16 mb-3"
              />
              <h3 className="font-semibold text-lg">Vite</h3>
              <p className="text-gray-500 text-sm mt-1">
                Herramienta de bundling ultra rápida para desarrollo y build.
              </p>
            </div>

            {/* React */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border-1 shadow hover:shadow-lg transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React"
                className="w-16 h-16 mb-3"
              />
              <h3 className="font-semibold text-lg">React</h3>
              <p className="text-gray-500 text-sm mt-1">
                Librería para construir interfaces de usuario interactivas.
              </p>
            </div>

            {/* i18next */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border-1 shadow hover:shadow-lg transition">
              <img
                src="https://avatars.githubusercontent.com/u/11401882?s=200&v=4"
                alt="i18next"
                className="w-16 h-16 mb-3"
              />
              <h3 className="font-semibold text-lg">i18next</h3>
              <p className="text-gray-500 text-sm mt-1">
                Internacionalización y gestión de traducciones para tu app.
              </p>
            </div>

            {/* Tailwind CSS */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border-1 shadow hover:shadow-lg transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                alt="Tailwind CSS"
                className="w-16 h-16 mb-3"
              />
              <h3 className="font-semibold text-lg">Tailwind CSS</h3>
              <p className="text-gray-500 text-sm mt-1">
                Framework de utilidades CSS para construir interfaces rápidas y responsivas.
              </p>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border-1 shadow hover:shadow-lg transition">
              <img
                src="https://www.typescriptlang.org/icons/icon-48x48.png"
                alt="TypeScript"
                className="w-16 h-16 mb-3"
              />
              <h3 className="font-semibold text-lg">TypeScript</h3>
              <p className="text-gray-500 text-sm mt-1">
                Superset de JavaScript con tipado estático para mayor seguridad y escalabilidad.
              </p>
            </div>
          </div>
        </p>
      </section>

      {/* ALERT DEMO SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-2 space-y-2">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {t("about.alertDemo.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="default" onClick={() => AlertManager.showinfo(t("about.alertDemo.sample.info"))}>
            {t("about.alertDemo.buttons.info")}
          </Button>

          <Button variant="default" onClick={() => AlertManager.showSuccess(t("about.alertDemo.sample.success"))}>
            {t("about.alertDemo.buttons.success")}
          </Button>

          <Button variant="default" onClick={() => AlertManager.showWarning(t("about.alertDemo.sample.warning"))}>
            {t("about.alertDemo.buttons.warning")}
          </Button>

          <Button variant="destructive" onClick={() => AlertManager.showError(t("about.alertDemo.sample.error"))}>
            {t("about.alertDemo.buttons.error")}
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              AlertManager.showQuestion(t("about.alertDemo.sample.question"), {
                title: t("about.alertDemo.sample.questionTitle"),
                acceptLabel: t("general.action.accept"),
                closeLabel: t("general.action.cancel"),
                onAccept: () => AlertManager.showSuccess(t("about.alertDemo.sample.accepted")),
              })
            }
          >
            {t("about.alertDemo.buttons.question")}
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              AlertManager.showLoading(
                <div>
                  {t("about.alertDemo.sample.loading")}
                  <IndeterminateProgressBar />
                </div>);
              setTimeout(() => AlertManager.close(), 2000);
            }}
          >
            {t("about.alertDemo.buttons.loading")}
          </Button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-2 px-6 py-2 space-y-2">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {t('about.games.title')}
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line indent-8
               first-letter:text-3xl first-letter:font-bold first-letter:mr-[2px]
               ">
          {t("about.games.body")}
        </p>
        <div className="max-w-5xl mx-auto space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {videos.map(url =>
            <div
              key={url}
              className=" p-4
          aspect-video w-full overflow-hidden rounded-xl shadow-lg border
          border-gray-300 bg-white
          dark:border-gray-700 dark:bg-gray-900
          transition-colors duration-300
        "
            >
              <iframe
                className="w-full h-full rounded-xl"
                src={'https://www.youtube.com/embed/' + url}
                title="Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}