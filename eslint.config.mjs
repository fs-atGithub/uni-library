import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:tailwindcss/recommended',
      'plugin:import/typescript',
      'prettier',
    ],

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
              pattern: '@app/**/*', // Adjusted to include files within directories
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

      // Unused variables rules
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'tailwindcss/migration-from-tailwind-2': ['off'],

      // Disable Tailwind CSS migration rule for Tailwind v2 to v3 migration.
      // 'tailwindcss/migration-from-tailwind-2': ['error', { onlyReportUsedFeatures: true },],

      // Or completely disable it:
      //"tailwindcss/migration-from-tailwind-2": ["warn", { onlyReportUsedFeatures : false }],
      //"tailwindcss/migration-from-tailwind-2": ["error", { onlyReportUsedFeatures : false }],
    },
  }),
];

export default eslintConfig;
