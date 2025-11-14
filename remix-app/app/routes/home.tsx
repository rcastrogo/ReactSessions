import { useTranslation } from 'react-i18next';

import PubSub from '~/lib/pubsub';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAlert from '../hooks/useAlert';

import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  console.log(request);
  return {};
}

export default function Home() {
  const { showMessage, info, success, warning, error, question } = useAlert();
  const { t } = useTranslation();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4 text-center text-lg font-medium">
            {t('general.wellcome-message')}
          </div>
        </header>

        {/* Sección de prueba de useAlert */}
        <Card className="w-full max-w-[400px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Test de useAlert</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button
              variant="default"
              onClick={() => {
                PubSub.publish(PubSub.messages.SHOW_ALERT, 'Mensaje un poco largo con pubsub!!!');
                PubSub.publish(
                  PubSub.messages.SHOW_ALERT,
                  <div>
                    Mensaje <b>negrita</b> dentro de un div
                  </div>
                );
              }}
            >
              Publicar mensajes pub
            </Button>
            <Button
              variant="default"
              onClick={() => showMessage('Mensaje básico usando showMessage')}
            >
              Mostrar mensaje genérico
            </Button>

            <Button
              variant="secondary"
              onClick={() => info('Esto es un mensaje informativo', 'Información')}
            >
              Mostrar info
            </Button>

            <Button
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-100"
              onClick={() => success('Operación completada con éxito', 'Éxito')}
            >
              Mostrar success
            </Button>

            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-700 hover:bg-yellow-100"
              onClick={() => warning('Atención, posible conflicto detectado', 'Aviso')}
            >
              Mostrar warning
            </Button>

            <Button
              variant="outline"
              className="border-red-500 text-red-700 hover:bg-red-100"
              onClick={() => error('Ha ocurrido un error inesperado intente establecer antes de todo los campos con lo valores indicados en el proceso de tal y tal....', 'Error')}
            >
              Mostrar error
            </Button>

            <Button
              variant="outline"
              className="border-blue-500 text-blue-700 hover:bg-blue-100"
              onClick={() =>
                question('¿Seguro que quieres continuar?', {
                  title: 'Confirmación requerida con extra',
                  onAccept: () => console.log('✅ Aceptado'),
                  onClose: () => console.log('❌ Cancelado'),
                  onExtra: () => alert('Extra, extra!!'),
                  extraLabel: 'Reintentar',
                  closeLabel: 'Ceeeeerrrar',
                })
              }
            >
              Mostrar pregunta (question)
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
