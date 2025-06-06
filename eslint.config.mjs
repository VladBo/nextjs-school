import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      'next/core-web-vitals',
      'plugin:tailwindcss/recommended',
      'prettier'
    ),
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error'],
      'prefer-const': ['error'],
      'no-unused-vars': 'error',
      'no-console': 'error',
      'import/no-default-export': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: compat.extends('plugin:@typescript-eslint/recommended'),

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'react/prop-types': 'off',
      'tailwindcss/enforces-negative-arbitrary-values': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
]);
