import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "simple-import-sort": pluginImportSort,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "@typescript-eslint/explicit-function-return-type": ["off"],
      "semi": ["error", "always"],
      "simple-import-sort/imports": [
        "warn",
        {
          "groups": [
            // Agrupación simple: importa todas las dependencias sin nuevas líneas entre grupos.
            ["^react", "^[a-z]"], // Agrupa 'react' y otras librerías de terceros
            ["^@/"], // Agrupa tus imports internos
            ["^\\u0000"], // Agrupa side-effect imports
            ["^\\.\\."], // Agrupa imports relativos a la carpeta padre
            ["^\\."] // Agrupa imports de la misma carpeta
          ]
        }
      ],
      "simple-import-sort/exports": "warn",
    },
  },
];
