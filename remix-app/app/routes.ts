import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('/set-theme', 'routes/set-theme.ts'),
    route('/about', 'routes/about.tsx'),
    route('/users', 'routes/users.tsx'),
    route('/api/users', 'api/users.server.ts')
] satisfies RouteConfig;
