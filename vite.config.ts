import { defineConfig } from 'vite-plus';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules') && id.includes('react')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },

  fmt: {
    singleQuote: true,
  },

  lint: {
    categories: {
      correctness: 'error',
      perf: 'warn',
      style: 'warn',
      suspicious: 'error',
    },
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['typescript', 'unicorn', 'oxc'],
    rules: {
      curly: 'error',
      'eslint/func-style': 'off',
      'eslint/id-length': 'off',
      'eslint/no-magic-numbers': 'off',
      'eslint/no-ternary': 'off',
      'eslint/sort-imports': 'off',
      'max-statements': ['warn', { max: 20 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-null': 'off',
      'no-shadow': 'off',
      'typescript/no-explicit-any': 'warn',
      'typescript/no-unused-vars': 'error',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },

  plugins: [tailwindcss(), react()],

  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },

  staged: {
    '*.{js,ts,tsx,css,json,html,md}': 'vp check --fix',
  },
});
