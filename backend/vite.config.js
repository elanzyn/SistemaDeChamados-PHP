import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // suporte ao React

export default defineConfig({
    plugins: [
        laravel({
            //  app.js para app.jsx
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(), // plugin do React
    ],
});