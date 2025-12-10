import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log(process.cwd());
  console.log(env.VITE_APP_BASE_URL);

  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
})
