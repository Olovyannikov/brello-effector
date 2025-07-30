import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        snapshotFormat: {
            escapeString: true,
        },
        globals: true,
        environment: 'happy-dom',
        outputFile: 'reports/unit/index.html',
        include: ['**/__tests__/**/*.spec.(ts|js|tsx|jsx)'],
        reporters: ['html'],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
