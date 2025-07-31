import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import effector from 'eslint-plugin-effector';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            vitest.configs.recommended,
            pluginPrettierRecommended,
            jsxA11yPlugin.flatConfigs.recommended,
            eslintReact.configs.flat.recommended,
        ],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.vitest,
            },
        },
        plugins: {
            vitest,
            'no-only-tests': noOnlyTests,
            effector: fixupPluginRules(effector),
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            ...effector.configs.recommended.rules,
            ...effector.configs.scope.rules,
            ...effector.configs.react.rules,
            ...vitest.configs.recommended.rules,
            // base rules
            'no-console': [2, { allow: ['warn', 'error', 'info'] }],
            'no-unused-vars': 0,
            // react
            'react/react-in-jsx-scope': 'off',
            // typescript
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
            ],
            // prettier
            // vitest
        },
    },
]);
