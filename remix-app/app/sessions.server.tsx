import { createCookieSessionStorage } from 'react-router';
import { createThemeSessionResolver } from 'remix-themes';

const isProduction = process.env.NODE_ENV === 'production';
const SECRETS = process.env.SESSION_SECRET ? [process.env.SESSION_SECRET] : ['s3cr3t'];

const getCookieConfig = (name: string) => ({
  name: name,
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secrets: SECRETS,
  ...(isProduction ? { domain: 'your-production-domain.com', secure: true } : {}),
});

export const themeStorage = createCookieSessionStorage({
  cookie: getCookieConfig('theme'),
});

export const themeSessionResolver = createThemeSessionResolver(themeStorage);
