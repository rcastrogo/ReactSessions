# React + TypeScript + Vite

# Guía de Configuración de ESLint en Proyectos de React y TypeScript

Este documento te guía a través de la configuración de ESLint en proyectos de React que utilizan TypeScript, asegurando un código más limpio y sin errores.

---
## 1. Instalación de Dependencias

Para empezar, necesitas instalar las librerías necesarias para que ESLint funcione con tu proyecto.

- **ESLint Core**: El motor principal de ESLint.
- **Plugins de TypeScript**: Para reglas específicas de TypeScript.
- **Plugins de React**: Para reglas relacionadas con React.
- **`eslint-plugin-simple-import-sort`**: Para ordenar automáticamente tus imports.
- **`globals`**: Para definir variables de entorno globales.

Ejecuta el siguiente comando en tu terminal para instalarlas como dependencias de desarrollo:

```bash
npm install -D eslint eslint-plugin-react typescript-eslint eslint-plugin-simple-import-sort globals @eslint/js
