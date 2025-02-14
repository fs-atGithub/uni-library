import pluginJs from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Apply to specific file extensions
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  // Set global variables for browser environments
  { languageOptions: { globals: globals.browser } },

  // Recommended configurations from various plugins
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Specify React version in settings
  {
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },

  // Next.js-specific and custom rules configuration
  {
    plugins: {
      import: pluginImport,
      tailwindcss: pluginTailwindcss,
      next: pluginNext,
    },
    rules: {
      // Import order rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@app/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      tailwindcss: {
        // Tailwind-specific settings (if needed)
      },
    },
  },

  // Adding Next.js specific rules directly
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      // Add Next.js specific rules here if needed
      'next/no-html-link-for-pages': 'warn', // Example rule for Next.js
      // You might want to add more Next.js specific rules based on your needs
    },
  },

  // Ignore specific patterns
  {
    ignores: ['components/ui/**'],
  },

  // TypeScript-specific overrides
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      'no-undef': 'off', // Disable no-undef for TypeScript files
    },
  },
];
