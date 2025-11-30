
import clsx from 'clsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
  type LoaderFunctionArgs,
} from 'react-router';
import { PreventFlashOnWrongTheme, Theme, ThemeProvider, useTheme } from 'remix-themes';

import { themeSessionResolver } from './sessions.server';
import type { Route } from './+types/root';
import './app.css';
import AppNavbar from './components/app/AppNavbar';
import AlertMessage from './components/app/AlertMessageComponent';
import Loading from './components/app/Loading';


export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap',
  },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
];

export function getCookieValue(
  cookieHeader: string | null,
  name: string
): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map(c => c.trim());
    if (cookieName === name && cookieValue) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function createCookie(
  name: string,
  value: string,
  maxAge: number = 31536000
): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const cookieHeader = request.headers.get("Cookie");
  const lang = getCookieValue(cookieHeader, "i18nextLng");
  const theme = getTheme();
  return {
    theme,
    lang,
    overview: {
    },
  };
}
export function App() {
  const [theme] = useTheme();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';
  const shouldShowLoading = isLoading;

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>
      <body>
        {shouldShowLoading && <Loading />}
        <main className="min-h-screen">
          <AppNavbar />
          <Outlet />
          <AlertMessage />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  if (i18n.language !== data.lang) i18n.changeLanguage(data.lang || 'es');
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/set-theme">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
