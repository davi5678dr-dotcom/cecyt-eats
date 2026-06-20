# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# CECyT-Eats 🍽️
Sistema de pedidos para la cafetería escolar.
## Tecnologías
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: MySQL
## Instalación local
### 1. Base de datos
1. Inicia XAMPP y enciende Apache y MySQL
2. Abre phpMyAdmin (http://localhost/phpmyadmin)
3. Ejecuta el script: `servidor/database/cecyt_eats.sql`
### 2. Backend
```bash
cd servidor
npm install
# Crea el archivo .env con tus credenciales (ver .env.example)
node index.js
```
### 3. Frontend
```bash
cd cecyt-eats
npm install
npm run dev
```
## Variables de entorno
Copia `.env.example` como `.env` y completa tus datos.