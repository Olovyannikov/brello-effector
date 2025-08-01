import { URL, fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';

    return {
        plugins: [
            react({
                plugins: [
                    [
                        '@effector/swc-plugin',
                        {
                            factories: ['./src/shared/factories', '@/shared/factories'],
                            debugSids: isDev,
                            hmr: isDev ? 'es' : false,
                            addNames: isDev,
                            addLoc: isDev,
                        },
                    ],
                ],
            }),
        ],
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName: isDev ? '[folder]__[local]_[hash:base64:5]' : '[hash:base64:5]',
            },
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
